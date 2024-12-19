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

// const newPlanet = {
//     name: "Tatooine",
//     climate: "arid",
//     diameter: 10465,
//     orbital_period: 304,
//     species: "Hutt",
//     day_length: 23,
//     moons: [1, 2],
//     galaxy: "Milky Way",
// };

// clientPlanet.CreatePlanet(newPlanet, (err, res) => {
//     if (err) {
//         console.error("Error creating planet:", err);
//     } else {
//         console.log("Created planet:", res);
//     }
// });

// clientPlanet.GetPlanets(
//     {
//         filter: { field: "climate", operation: "EQUAL", value: "temperate" },
//         sort: { field: "name", order: "ASC" },
//         page: { limit: 100, offset: 0 },
//     },
//     (err, res) => {
//         console.log(res);
//     }
// );

// clientPlanet.GetPlanet({ id: 1 }, (err, res) => {
//     console.log(res);
// });

// const updatedPlanet = {
//     name: "Tatooine",
//     climate: "arid",
//     diameter: 10465,
//     orbital_period: 304,
//     species: "Hutt",
//     day_length: 23,
//     moons: [1, 2],
//     galaxy: "Milky Way",
// };

// clientPlanet.UpdatePlanet({ id: 1, planet: updatedPlanet }, (err, res) => {
//     if (err) {
//         console.error("Error updating planet:", err);
//     } else {
//         console.log("Updated planet:", res);
//     }
// });

// clientPlanet.DeletePlanet({ id: 1 }, (err, res) => {
//     console.log(res);
// });
