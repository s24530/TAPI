import data from "../data/data.json";
import { applyFilters } from "./helpers";

export const resolvers = {
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
            if (filter) result = result.filter((item) => applyFilters(item, filter));
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
            if (filter) result = result.filter((item) => applyFilters(item, filter));
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
            if (galaxyIndex === -1) return { success: false, message: "Not Found", code: "404" };
            data.galaxies.splice(galaxyIndex, 1);
            return { success: true, message: "Deleted", code: "204" };
        },
    },
};
