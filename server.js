import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { galaxyResolvers } from "./galaxyResolvers.js";
import { planetResolvers } from "./planetResolvers.js";
import { moonResolvers } from "./moonResolvers.js";

const galaxyPackageDefinition = protoLoader.loadSync("./proto/galaxy.proto");
const planetPackageDefinition = protoLoader.loadSync("./proto/planet.proto");
const moonPackageDefinition = protoLoader.loadSync("./proto/moon.proto");
const galaxyProto = grpc.loadPackageDefinition(galaxyPackageDefinition);
const planetProto = grpc.loadPackageDefinition(planetPackageDefinition);
const moonProto = grpc.loadPackageDefinition(moonPackageDefinition);

const server = new grpc.Server();

server.addService(galaxyProto.cosmos.GalaxyService.service, galaxyResolvers);
server.addService(planetProto.cosmos.PlanetService.service, planetResolvers);
server.addService(moonProto.cosmos.MoonService.service, moonResolvers);

server.bindAsync(
    "127.0.0.1:4000",
    grpc.ServerCredentials.createInsecure(),
    (err) => console.log(err)
);
