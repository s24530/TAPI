import data from "./data.json" assert { type: "json" };
import { applyFilters } from "./helperFunctions.js";

const mapMoon = (moon) => {
    return {
        moon_id: moon.id,
        name: moon.name,
        distance_from_planet: moon.distanceFromPlanet,
        diameter: moon.diameter,
        orbital_period: moon.orbitalPeriod,
        planet: moon.planet,
    };
};

export const moonResolvers = {
    CreateMoon: (req, res) => {
        const id = data.moons[data.moons.length - 1].id + 1;
        const newMoon = { id, ...req.request.moon };
        data.moons.push(newMoon);
        const moon = mapGalaxy(newMoon);
        res(null, { moon });
    },
    GetMoons: (req, res) => {
        const { filter, sort, page } = req.request || {};
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

        const moons = result.map((moon) => mapMoon(moon));

        res(null, { moons });
    },

    GetMoon: (req, res) => {
        const moonID = req.request.id;
        const moon = data.moons.find((p) => p.id === parseInt(moonID));
        const result = mapMoon(moon);
        res(null, result);
    },

    UpdateMoon: (req, res) => {
        const moonIndex = data.moons.findIndex((m) => m.id === req.request.id);
        data.moons[moonIndex] = { id, ...req.request.moon };
        const moon = mapMoon({ id, ...req.request.moon });
        res(null, moon);
    },

    DeleteMoon: (req, res) => {
        const moonIndex = data.moons.findIndex((m) => m.id === req.request.id);

        if (moonIndex === -1) {
            res(null, { success: false, message: "Not Found", code: "404" });
        } else {
            data.moons.splice(moonIndex, 1);
            res(null, { success: true, message: "Deleted", code: "204" });
        }
    },
};
