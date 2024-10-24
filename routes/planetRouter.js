import express from "express";
import data from "./data.json" assert { type: "json" };
export const planetRouter = express.Router();

function validatePlanet(planet) {
    return (
        planet.name &&
        planet.climate &&
        typeof planet.diameter === "number" &&
        typeof planet.orbitalPeriod === "number" &&
        typeof planet.dayLength === "number" &&
        typeof planet.galaxy === "number"
    );
}

planetRouter.get("/", (req, res) => {
    res.send(data.planets);
});

planetRouter.get("/:id", (req, res) => {
    const planet = data.planets.find((g) => g.id === parseInt(req.params.id));
    if (planet) {
        res.json(planet);
    } else {
        res.status(404).send("Planet not found");
    }
});

planetRouter.post("/", (req, res) => {
    if (!Object.keys(req.body).length) {
        return res.status(400).send("No data provided");
    }
    const newPlanet = req.body;
    if (!validatePlanet(newPlanet)) {
        return res.status(400).send("Invalid planet data");
    }
    res.status(201).send(newPlanet);
});

planetRouter.put("/:id", (req, res) => {
    if (!Object.keys(req.body).length) {
        return res.status(400).send("No data provided");
    }
    const planet = data.planets.find((g) => g.id === parseInt(req.params.id));
    if (!planet) {
        return res.status(404).send("Planet not found");
    }
    if (!validatePlanet(planet)) {
        return res.status(400).send("Invalid planet data");
    }
    data.planets[planetIndex] = {
        ...req.body,
        id: parseInt(req.params.id),
        moons: data.planets[planetIndex].moons,
    };
    res.json(data.planets[planetIndex]);
});

planetRouter.patch("/:id", (req, res) => {
    if (!Object.keys(req.body).length) {
        res.status(400).send("No data provided");
    }

    const planetIndex = data.planets.findIndex(
        (p) => p.id === parseInt(req.params.id)
    );
    if (planetIndex === -1) return res.status(404).send("Planet not found");

    const planetToUpdate = data.planets[planetIndex];
    const {
        name,
        climate,
        diameter,
        orbitalPeriod,
        species,
        dayLength,
        galaxy,
    } = req.body;
    if (name !== undefined && typeof name !== "string")
        return res.status(400).send("Invalid name");
    if (climate !== undefined && typeof climate !== "string")
        return res.status(400).send("Invalid climate");
    if (diameter !== undefined && typeof diameter !== "number")
        return res.status(400).send("Invalid diameter");
    if (orbitalPeriod !== undefined && typeof orbitalPeriod !== "number")
        return res.status(400).send("Invalid orbital period");
    if (species !== undefined && typeof species !== "string")
        return res.status(400).send("Invalid species");
    if (dayLength !== undefined && typeof dayLength !== "number")
        return res.status(400).send("Invalid day length");
    if (galaxy !== undefined && typeof galaxy !== "number")
        return res.status(400).send("Invalid galaxy");

    data.planets[planetIndex] = { ...planetToUpdate, ...req.body };
    res.json(data.planets[planetIndex]);
});

planetRouter.delete("/:id", (req, res) => {
    const index = data.galaxies.findIndex(
        (g) => g.id === parseInt(req.params.id)
    );
    if (index === -1) {
        return res.status(404).send("Planet not found");
    }

    data.planets.splice(index, 1);
    res.status(204).send("Planet deleted");
});
