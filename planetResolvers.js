import data from "./data.json" assert { type: "json" };
import { applyFilters } from "./helperFunctions.js";

const mapPlanet = (planet) => {
    return {
        planet_id: planet.id, // Map 'id' to 'planet_id'
        name: planet.name,
        climate: planet.climate,
        diameter: planet.diameter,
        orbital_period: planet.orbitalPeriod, // Map 'orbitalPeriod' to 'orbital_period'
        species: planet.species,
        day_length: planet.dayLength, // Map 'dayLength' to 'day_length'
        moons: planet.moons,
        galaxy: planet.galaxy,
    };
};

export const planetResolvers = {
    CreatePlanet: (req, res) => {
        const id = data.planets[data.planets.length - 1].id + 1;
        const newPlanet = { id, ...req.request };
        data.planets.push(newPlanet);
        console.log(newPlanet);
        const planet = mapPlanet(newPlanet);
        res(null, planet);
    },
    GetPlanets: (req, res) => {
        const { filter, sort, page } = req.request || {};
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

        const planets = result.map((planet) => mapPlanet(planet));

        res(null, { planets });
    },

    GetPlanet: (req, res) => {
        const planetID = req.request.id;
        const planet = data.planets.find((p) => p.id === parseInt(planetID));
        const result = mapPlanet(planet);
        res(null, result);
    },

    UpdatePlanet: (req, res) => {
        const planetIndex = data.planets.findIndex(
            (m) => m.id === req.request.id
        );
        const id = req.request.id;
        data.planets[planetIndex] = { id, ...req.request.planet };
        const planet = mapPlanet({ id, ...req.request.planet });
        res(null, planet);
    },

    DeletePlanet: (req, res) => {
        const planetIndex = data.planets.findIndex(
            (m) => m.id === req.request.id
        );
        if (planetIndex === -1) {
            res(null, { success: false, message: "Not Found", code: "404" });
        } else {
            data.planets.splice(planetIndex, 1);
            res(null, { success: true, message: "Deleted", code: "204" });
        }
    },
};
