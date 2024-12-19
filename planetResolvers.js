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

    updatePlanet: (req, res) => {
        const planetID = req.request.id;
        res(null, {
            galaxy_id: planetID,
            name: `Updated Galaxy ${galaxyId}`,
            star_name: `Updated Star ${galaxyId}`,
            distance: 2000,
            size: 700,
            planets: [7, 8, 9],
        });
    },

    deletePlanet: (req, res) => {
        const planetID = req.request.id;
        res(null, {
            galaxy_id: planetID,
            name: "",
            star_name: "",
            distance: 0,
            size: 0,
            planets: [],
        });
    },
};
