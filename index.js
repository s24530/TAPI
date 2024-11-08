import express from "express";
import data from "./data.json" assert { type: "json" };
import cors from "cors"
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
const app = express();
const port = 4000;

const typeDefs = `#graphql

    type Galaxy{
        id: Int!
        name: String
        distance: Float
        size: Int
        mainStar: String
        planets: [Int]!
    }

    type Planet{
        id: Int!
        name: String
        climate: String
        diameter: Int
        orbitalPeriod: Int
        species: String
        dayLength: Float
        moons: [Int]!
        galaxy: Int
    }

    type Moon{
        id: Int!
        name: String
        distanceFromPlanet: Int
        diameter: Int
        orbitalPeriod: Float
        planet: Int!
    }

    input GalaxyInput{
        name: String
        distance: Float
        size: Int
        mainStar: String
        planets: [Int]!
    }

    input PlanetInput{
        name: String
        climate: String
        diameter: Int
        orbitalPeriod: Int
        species: String
        dayLength: Float
        moons: [Int]!
        galaxy: Int
    }

    input MoonInput{
        name: String
        distanceFromPlanet: Int
        diameter: Int
        orbitalPeriod: Float
        planet: Int!
    }

    type DeleteResponse{
        success: Boolean!
        message: String
        code: String!
    }

    type ErrorResponse{
        message: String
        code: String
    } 

    type Query{
        galaxies: [Galaxy]
        planets: [Planet]
        moons: [Moon]
        galaxy(id: Int): Galaxy
        planet(id: Int): Planet
        moon(id: Int): Moon
    }

    type Mutations{
        createGalaxy(galaxyInput: GalaxyInput): Galaxy
        updateGalaxy(id: Int, galaxyInput: GalaxyInput): Galaxy
        deleteGalaxy(id: Int): DeleteResponse

        createPlanet(planetInput: PlanetInput): Planet
        updatePlanet(id: Int, planetInput: PlanetInput): Planet
        deletePlanet(id: Int): DeleteResponse

        createMoon(moonInput: MoonInput): Moon
        updateMoon(id: Int, moonInput: MoonInput): Moon
        deleteMoon(id: Int): DeleteResponse
    }
`

const resolvers = {
    Query:{
        galaxies: () => data.galaxies,
        planets: () => data.planets,
        moons: () => data.moons,
        galaxy: (_,{id}) => data.galaxies.find(g => g.id === id),
        planet: (_,{id}) => data.planets.find(p => p.id === id),
        moon: (_,{id}) => data.moons.find(m => m.id === id),
    },

    Mutation:{
        createGalaxy: (_, {galaxyInput}) => {
            const id = data.galaxies[data.galaxies.length - 1].id + 1;
            const newGalaxy = {id,...galaxyInput}
            data.galaxies.push(newGalaxy);
            return newGalaxy;
        },
        updateGalaxy: (_, {id, galaxyInput}) => data.galaxies,
        deleteGalaxy: (_, {id}) => {
            const galaxy = data.galaxies.find((g) => g.id === id);
            data.galaxies.pop(galaxy)
            return {success: true, message:"Deleted"}
        },

        createPlanet: (_, {planetInput}) => {
            const id = data.planet[data.planets.length - 1].id + 1;
            const newPlanet = {id,...planetInput}
            data.planets.push(planetInput);
            return newPlanet;
        },
        updatePlanet: (_, {id, planetInput}) => data.planets,
        deletePlanet: (_, {id}) => {
            const planet = data.planets.find((p) => p.id === id);
            data.planets.pop(planet)
            return {success: true, message:"Deleted"}
        },

        createMoon: (_, {moonInput}) => {
            const id = data.moons[data.moons.length - 1].id + 1;
            const newMoon = {id,...moonInput}
            data.moons.push(newMoon);
            return newMoon;
        },
        updateMoon: (_, {id, moonInput}) => data.moons,
        deleteMoon: (_, {id}) => {
            const moon = data.moons.find((g) => g.id === id);
            data.moons.pop(moon)
            return {success: true, message:"Deleted"}
        },
    }
}

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
});
await apolloServer.start();

app.use('/graphql', cors(), express.json(), expressMiddleware(apolloServer))
app.listen(port, () => {
    console.log(`Server listening on localhost:${port}`);
});