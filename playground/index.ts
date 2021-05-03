import { RoutingApi } from "../src/RoutingApi";

const api = "https://staging.anyways.eu/routing-api2/";
// const api = "https://routing.anyways.eu/api/",

const ra = new RoutingApi(api, "Vc32GLKD1wjxyiloWhlcFReFor7aAAOz");

ra.getProfiles(ps => {
    console.log(ps);
});

ra.getRoute({
    locations: [ {
        lng: 4.801197052001953,
        lat: 51.267929925864756
    }, {
        lng: 4.798192977905273,
        lat: 51.25960528564359
    } ],
    profile: "bicycle.commute",
    alternative: true
}, r => console.log(r));