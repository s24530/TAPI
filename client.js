import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"

const packageDefinition = protoLoader.loadSync('./proto/galaxy.proto');
const proto = grpc.loadPackageDefinition(packageDefinition);

const client = new proto.cosmos.GalaxyService("127.0.0.1:4000", grpc.ChannelCredentials.createInsecure(), (err) => console.log(err));

client.GetGalaxy(null, (err, res) =>{
    console.log(res);
})