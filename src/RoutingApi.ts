import { Profile } from "./Profile";
import { Profiles } from "./Profiles";

export class RoutingApi {
    url: string;
    key?: string;

    constructor(url: string, key?: string) {
        this.url = url;
        this.key = key;
    }

    getProfiles(callback: (profiles: Profile[]) => void) : void {      
        const path = "v1/profiles";
        const url = `${ this.url }${ path }?apiKey=${ this.key }`;

        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = () => {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);

                if (response.profiles) {
                    // In an older version of the API, the API gave a list for the profiles
                    // But the profiles had to be encapsulated...
                    response = response.profiles;
                }
                const parse = <Profile[]>response;
                callback(parse);
            }
            else {
                console.log("getProfiles failed: " + xhr.status);
            }
        };
        xhr.send();
    }

    getRoute(options: { locations: { lng: number, lat: number }[], profile: string }, callback: (route: any) => void) : void {
        const path = "v1/routes";

        let loc = "";
        for (const l in options.locations) {
            const location = options.locations[l];
            if (loc.length > 0) loc += "&";
            loc = loc + `loc=${ location.lng },${ location.lat }`;
        }
        loc = loc + ``;

        const url = `${ this.url }${ path }?apiKey=${ this.key }&profile=${ options.profile }&${ loc }`;

        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = () => {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);

                const parse = response;
                callback(parse);
            }
            else {
                console.log("getProfiles failed: " + xhr.status);
            }
        };
        xhr.send();
    }
}