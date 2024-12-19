import data from "./data.json" assert { type: "json" };
import { applyFilters } from "./helperFunctions.js";

const mapGalaxy = (galaxy) => {
    return {
        galaxy_id: galaxy.id,
        name: galaxy.name,
        distance: galaxy.distance,
        size: galaxy.size,
        star_name: galaxy.mainStar,
        planets: galaxy.planets,
    };
};

export const galaxyResolvers = {
    CreateGalaxy: (req, res) => {
        const id = data.galaxies[data.galaxies.length - 1].id + 1;
        const newGalaxy = { id, ...req.request.galaxy };
        data.galaxies.push(newGalaxy);
        const galaxy = mapGalaxy(newGalaxy);
        res(null, { galaxy });
    },
    GetGalaxies: (req, res) => {
        const { filter, sort, page } = req.request || {};
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

        const galaxies = result.map((galaxy) => mapGalaxy(galaxy));

        res(null, { galaxies });
    },

    GetGalaxy: (req, res) => {
        const galaxyID = req.request.id;
        const galaxy = data.galaxies.find((p) => p.id === parseInt(galaxyID));
        const result = mapGalaxy(galaxy);
        res(null, result);
    },

    UpdateGalaxy: (req, res) => {
        const galaxyIndex = data.galaxies.findIndex(
            (m) => m.id === req.request.id
        );
        data.galaxies[galaxyIndex] = { id, ...req.request.galaxy };
        const galaxy = mapGalaxy({ id, ...req.request.galaxy });
        res(null, galaxy);
    },

    DeleteGalaxy: (req, res) => {
        const galaxyIndex = data.galaxies.findIndex(
            (m) => m.id === req.request.id
        );
        if (galaxyIndex === -1) {
            res(null, { success: false, message: "Not Found", code: "404" });
        } else {
            data.galaxies.splice(galaxyIndex, 1);
            res(null, { success: true, message: "Deleted", code: "204" });
        }
    },
};
