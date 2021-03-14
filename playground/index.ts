import { RoutingApi } from "../src/RoutingApi";

const ra = new RoutingApi("https://routing.anyways.eu/api/", "Vc32GLKD1wjxyiloWhlcFReFor7aAAOz");

ra.getProfiles(ps => {
    console.log(ps);
});

ra.getRoutes({
    locations: [ {
        lng: 4.801197052001953,
        lat: 51.267929925864756
    }, {
        lng: 4.798192977905273,
        lat: 51.25960528564359
    } ],
    profiles: [ "bicycle.commute", "bicycle.shortest" ]
}, r => console.log(r));