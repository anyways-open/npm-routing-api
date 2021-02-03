import { RoutingApi } from "../src/RoutingApi";

const ra = new RoutingApi("https://routing.anyways.eu/api/", "Vc32GLKD1wjxyiloWhlcFReFor7aAAOz");

ra.getProfiles(ps => {
    console.log(ps);
});