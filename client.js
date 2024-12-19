import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

const galaxyPackageDefinition = protoLoader.loadSync("./proto/galaxy.proto");
const planetPackageDefinition = protoLoader.loadSync("./proto/planet.proto");
const moonPackageDefinition = protoLoader.loadSync("./proto/moon.proto");
const galaxyProto = grpc.loadPackageDefinition(galaxyPackageDefinition);
const planetProto = grpc.loadPackageDefinition(planetPackageDefinition);
const moonProto = grpc.loadPackageDefinition(moonPackageDefinition);

const clientGalaxy = new galaxyProto.cosmos.GalaxyService(
    "127.0.0.1:4000",
    grpc.ChannelCredentials.createInsecure(),
    (err) => console.log(err)
);

const clientMoon = new moonProto.cosmos.MoonService(
    "127.0.0.1:4000",
    grpc.ChannelCredentials.createInsecure(),
    (err) => console.log(err)
);

const clientPlanet = new planetProto.cosmos.PlanetService(
    "127.0.0.1:4000",
    grpc.ChannelCredentials.createInsecure(),
    (err) => console.log(err)
);

clientPlanet.GetPlanets(
    {
        filter: { field: "climate", operation: "EQUAL", value: "arid" },
        sort: { field: "name", order: "ASC" },
        page: { limit: 2, offset: 0 },
    },
    (err, res) => {
        console.log(res);
    }
);

clientPlanet.GetPlanet({ id: 1 }, (err, res) => {
    console.log(res);
});

clientPlanet.DeletePlanet({ id: 1 }, (err, res) => {
    console.log(res);
});
