import data from "../data/data.json";
import { applyFilters } from "./helpers";
import { GraphQLScalarType, Kind } from "graphql";

const emailScalar = new GraphQLScalarType({
    name: "Email",
    description: "A custom scalar to validate email addresses",
    //Outgoing value
    serialize(value) {
        if (typeof value !== "string") {
            throw new Error("Email must be a string");
        }
        return value.toLowerCase();
    },
    //The parseValue method converts the scalar's JSON value to its back-end representation before it's added to a resolver's args.
    /***Incoming value*/
    parseValue(value) {
        if (
            typeof value !== "string" ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ) {
            throw new Error("Invalid email address");
        }
        return value.toLowerCase();
    },
    //When an incoming query string includes the scalar as a hard-coded argument value, that value is part of the query document's abstract syntax tree (AST).
    //Apollo Server calls the parseLiteral method to convert the value's AST representation to the scalar's back-end representation.
    //In the example above, parseLiteral converts the AST value from a string to an integer, and then converts from integer to Date to match the result of parseValue.

    /***Incoming value from query string*/
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ast.value)) {
                throw new Error("Invalid email address");
            }
            return ast.value.toLowerCase();
        }
        throw new Error("Email must be a string");
    },
});

export const resolvers = {
    Email: emailScalar,
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
            if (filter)
                result = result.filter((item) => applyFilters(item, filter));
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
            if (filter)
                result = result.filter((item) => applyFilters(item, filter));
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
            data.galaxies[galaxyIndex] = { id, ...galaxyInput };
            return { id, ...galaxyInput };
        },
        deleteGalaxy: (_, { id }) => {
            const galaxyIndex = data.galaxies.findIndex((m) => m.id === id);
            if (galaxyIndex === -1)
                return { success: false, message: "Not Found", code: "404" };
            data.galaxies.splice(galaxyIndex, 1);
            return { success: true, message: "Deleted", code: "204" };
        },
    },
};
