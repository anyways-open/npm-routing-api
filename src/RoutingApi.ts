import { Profile } from "./Profile";

export { Profile }

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
                const parsed = <Profile[]>response;
                parsed.forEach(p => {
                    p.id = p.type;
                    if (p.name) {
                        p.id = p.type + "." + p.name;
                    }
                });
                callback(parsed);
            }
            else {
                console.log("getProfiles failed: " + xhr.status);
            }
        };
        xhr.send();
    }

    getRoute(options: { locations: { lng: number, lat: number }[], profile: string, alternative?: boolean }, callback: (route: any) => void) : void {
        const path = "v1/routes";

        let loc = "";
        for (const l in options.locations) {
            const location = options.locations[l];
            if (loc.length > 0) loc += "&";
            loc = loc + `loc=${ location.lng },${ location.lat }`;
        }
        loc = loc + ``;

        let url = `${ this.url }${ path }?apiKey=${ this.key }&profile=${ options.profile }&${ loc }`;

        if (options.alternative) {
            url = `${ url }&alternative=true`;
        }

        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = () => {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);

                const parse = response;
                callback(parse);
            }
            else {
                console.log("getRoute failed: " + xhr.status);
            }
        };
        xhr.send();
    }

    getRoutes(options: { locations: { lng: number, lat: number }[], profiles: string[] }, callback: (routes: any) => void) : void {
        const path = "v1/routes";

        let loc = "";
        for (const l in options.locations) {
            const location = options.locations[l];
            if (loc.length > 0) loc += "&";
            loc = loc + `loc=${ location.lng },${ location.lat }`;
        }
        loc = loc + ``;

        let prof = "";
        for (const l in options.profiles) {
            const profile = options.profiles[l];
            if (prof.length > 0) prof += "&";
            prof = prof + `profile=${ profile }`;
        }

        const url = `${ this.url }${ path }?apiKey=${ this.key }&${ prof }&${ loc }&format=multijson`;

        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = () => {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);

                const parse = response;
                callback(parse);
            }
            else {
                console.log("getRoutes failed: " + xhr.status);
            }
        };
        xhr.send();
    }
}