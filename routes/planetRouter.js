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

const addHateoas = (item) => {
    return {
        ...item,
        links: [
            {
                rel: "self",
                method: "GET",
                href: `localhost:4000/planets/${item.id}`,
            },
            {
                rel: "update",
                method: "PUT",
                href: `localhost:4000/planets/${item.id}`,
            },
            {
                rel: "update",
                method: "PATCH",
                href: `localhost:4000/planets/${item.id}`,
            },
            {
                rel: "delete",
                method: "DELETE",
                href: `localhost:4000/planets/${item.id}`,
            },
            { rel: "list", method: "GET", href: `localhost:4000/planets` },
        ],
    };
};

planetRouter.get("/", (req, res) => {
    const planets = data.planets.map(addHateoas);
    res.send(planets);
});

planetRouter.get("/:id", (req, res) => {
    const planet = data.planets.find((g) => g.id === parseInt(req.params.id));
    if (planet) {
        res.json({ planet, url: `localhost:4000/planets/${req.params.id}` });
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
    data.planets.push(newPlanet);
    res.status(201).send(addHateoas(newPlanet));
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
    const planetIndex = data.planets.findIndex(
        (p) => p.id === parseInt(req.params.id)
    );
    data.planets[planetIndex] = {
        ...req.body,
        id: parseInt(req.params.id),
        moons: data.planets[planetIndex].moons,
    };
    res.status(201).json(addHateoas(data.planets[planetIndex]));
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
    res.json(addHateoas(data.planets[planetIndex]));
});

planetRouter.delete("/:id", (req, res) => {
    const planet = data.planets.find((g) => g.id === parseInt(req.params.id));
    if (!planet) {
        return res.status(404).send("Planet not found");
    }

    data.planets.pop(planet);
    res.status(204);
});
