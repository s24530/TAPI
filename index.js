import express from "express";
import data from "./data.json" assert { type: "json" };
import cors from "cors";
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
        name: String!
        distance: Float!
        size: Int!
        mainStar: String!
        planets: [Int]!
    }

    input PlanetInput{
        name: String!
        climate: String!
        diameter: Int!
        orbitalPeriod: Int!
        species: String!
        dayLength: Float!
        moons: [Int]!
        galaxy: Int!
    }

    input MoonInput{
        name: String!
        distanceFromPlanet: Int!
        diameter: Int!
        orbitalPeriod: Float!
        planet: Int!
    }

    input FilterInput {
    field: String!
    operation: String! # EQUAL, NOT_EQUAL, CONTAINS, NOT_CONTAINS, GREATER, LESS, etc.
    value: String!
    }

    input SortInput {
        field: String!
        order: String! # ASC or DESC
    }

    input PageInput {
        limit: Int!
        offset: Int!
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

    union GalaxyResult = Galaxy | ErrorResponse 
    union PlanetResult = Planet | ErrorResponse
    union MoonResult = Moon | ErrorResponse

    type Query{
        galaxies(filter: [FilterInput], sort: SortInput, page: PageInput): [Galaxy]
        planets(filter: [FilterInput], sort: SortInput, page: PageInput): [Planet]
        moons(filter: [FilterInput], sort: SortInput, page: PageInput): [Moon]
        galaxy(id: Int): GalaxyResult
        planet(id: Int): PlanetResult
        moon(id: Int): MoonResult
    }

    type Mutation{
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
`;

const applyFilters = (item, filters) => {
    for (const { field, operation, value } of filters) {
        const itemValue = item[field];

        switch (operation) {
            case "EQUAL":
                return itemValue !== value;
                break;
            case "NOT_EQUAL":
                return itemValue === value;
                break;
            case "CONTAINS":
                return !String(itemValue).includes(value);
                break;
            case "NOT_CONTAINS":
                return String(itemValue).includes(value);
                break;
            case "GREATER":
                return itemValue <= value;
                break;
            case "GREATER_OR_EQUAL":
                return itemValue < value;
                break;
            case "LESS":
                return itemValue >= value;
                break;
            case "LESS_OR_EQUAL":
                return itemValue > value;
                break;
            default:
                throw new Error(`Unsupported filter operation: ${operation}`);
        }
    }
};
const resolvers = {
    Query: {
        galaxies: (_, { filter, sort, page }) => {
            let result = data.galaxies;

            if (filter) {
                result = result.filter((item) => applyFilters(item, filter));
            }

            if (sort) {
                const { field, order } = sort;
                result = result.sort((a, b) => {
                    if (a[field] < b[field]) return order === "ASC" ? -1 : 1;
                    if (a[field] > b[field]) return order === "ASC" ? 1 : -1;
                    return 0;
                });
            }

            if (page) {
                const { limit, offset } = page;
                result = result.slice(offset, offset + limit);
            }

            return result;
        },
        planets: (_, { filter, sort, page }) => {
            let result = data.planets;

            if (filter) {
                result = result.filter((item) => applyFilters(item, filter));
            }

            if (sort) {
                const { field, order } = sort;
                result = result.sort((a, b) => {
                    if (a[field] < b[field]) return order === "ASC" ? -1 : 1;
                    if (a[field] > b[field]) return order === "ASC" ? 1 : -1;
                    return 0;
                });
            }

            if (page) {
                const { limit, offset } = page;
                result = result.slice(offset, offset + limit);
            }

            return result;
        },
        moons: (_, { filter, sort, page }) => {
            let result = data.moons;

            if (filter) {
                result = result.filter((item) => applyFilters(item, filter));
            }

            if (sort) {
                const { field, order } = sort;
                result = result.sort((a, b) => {
                    if (a[field] < b[field]) return order === "ASC" ? -1 : 1;
                    if (a[field] > b[field]) return order === "ASC" ? 1 : -1;
                    return 0;
                });
            }

            if (page) {
                const { limit, offset } = page;
                result = result.slice(offset, offset + limit);
            }

            return result;
        },
        galaxy: (_, { id }) => {
            const galaxy = data.galaxies.find((g) => g.id === id);
            if (!galaxy) {
                return {
                    __typename: "ErrorResponse",
                    message: "Galaxy not found",
                    code: "404",
                };
            }

            return {
                __typename: "Galaxy",
                ...galaxy,
            };
        },
        planet: (_, { id }) => {
            const planet = data.planets.find((g) => g.id === id);
            if (!planet) {
                return {
                    __typename: "ErrorResponse",
                    message: "Planet not found",
                    code: "404",
                };
            }

            return {
                __typename: "Planet",
                ...planet,
            };
        },
        moon: (_, { id }) => {
            const moon = data.moons.find((g) => g.id === id);
            if (!moon) {
                return {
                    __typename: "ErrorResponse",
                    message: "Moon not found",
                    code: "404",
                };
            }

            return {
                __typename: "Moon",
                ...moon,
            };
        },
    },

    Mutation: {
        createGalaxy: (_, { galaxyInput }) => {
            const id = data.galaxies[data.galaxies.length - 1].id + 1;
            const newGalaxy = { id, ...galaxyInput };
            data.galaxies.push(newGalaxy);
            return newGalaxy;
        },
        updateGalaxy: (_, { id, galaxyInput }) => {
            const galaxyIndex = data.galaxies.findIndex((m) => m.id === id);
            data.galaxies[galaxyIndex] = {
                id: id,
                ...galaxyInput,
            };
            return { id: id, ...galaxyInput };
        },
        deleteGalaxy: (_, { id }) => {
            const galaxyIndex = data.galaxies.findIndex((m) => m.id === id);

            if (galaxyIndex === -1)
                return { success: false, message: "Not Found", code: "404" };

            data.galaxies.splice(galaxyIndex, 1);
            return { success: true, message: "Deleted", code: "204" };
        },

        createPlanet: (_, { planetInput }) => {
            const id = data.planet[data.planets.length - 1].id + 1;
            const newPlanet = { id, ...planetInput };
            data.planets.push(newPlanet);
            return newPlanet;
        },
        updatePlanet: (_, { id, planetInput }) => {
            const planetIndex = data.planets.findIndex((m) => m.id === id);
            data.planets[planetIndex] = {
                id: id,
                ...planetInput,
            };
            return { id: id, ...planetInput };
        },
        deletePlanet: (_, { id }) => {
            const planetIndex = data.planets.findIndex((m) => m.id === id);

            if (planetIndex === -1)
                return { success: false, message: "Not Found", code: "404" };

            data.planets.splice(moonIndex, 1);
            return { success: true, message: "Deleted", code: "204" };
        },

        createMoon: (_, { moonInput }) => {
            const id = data.moons[data.moons.length - 1].id + 1;
            const newMoon = { id, ...moonInput };
            data.moons.push(newMoon);
            return newMoon;
        },
        updateMoon: (_, { id, moonInput }) => {
            const moonIndex = data.moons.findIndex((m) => m.id === id);
            data.moons[moonIndex] = {
                id: id,
                ...moonInput,
            };
            return { id: id, ...moonInput };
        },
        deleteMoon: (_, { id }) => {
            const moonIndex = data.moons.findIndex((m) => m.id === id);

            if (moonIndex === -1)
                return { success: false, message: "Not Found", code: "404" };

            data.moons.splice(moonIndex, 1);
            return { success: true, message: "Deleted", code: "204" };
        },
    },
};

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
});
await apolloServer.start();

app.use("/graphql", cors(), express.json(), expressMiddleware(apolloServer));
app.listen(port, () => {
    console.log(`Server listening on localhost:${port}`);
});
