import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"

const packageDefinition = protoLoader.loadSync('./proto/galaxy.proto');
const proto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(proto.cosmos.GalaxyService.service, {
    GetGalaxy: (req, res) =>{
        res(null, {
            galaxyId: 0,
            name:   "jajco",
            starName: "Jajco"
        });
    }
});

server.bindAsync("127.0.0.1:4000", grpc.ServerCredentials.createInsecure(), (err) => console.log(err))