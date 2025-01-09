/**
 * @swagger
 * components:
 *   schemas:
 *     Planet:
 *       type: object
 *       required:
 *         - name
 *         - climate
 *         - diameter
 *         - orbitalPeriod
 *         - dayLength
 *         - galaxy
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the planet
 *         name:
 *           type: string
 *           description: The name of the planet
 *         climate:
 *           type: string
 *           description: The climate type of the planet
 *         diameter:
 *           type: number
 *           description: The diameter of the planet in kilometers
 *         orbitalPeriod:
 *           type: number
 *           description: The orbital period of the planet in days
 *         dayLength:
 *           type: number
 *           description: The length of a day on the planet in hours
 *         galaxy:
 *           type: integer
 *           description: The id of the galaxy the planet belongs to
 *       example:
 *         id: 1
 *         name: Earth
 *         climate: Temperate
 *         diameter: 12742
 *         orbitalPeriod: 365
 *         dayLength: 24
 *         galaxy: 1
 */

/**
 * @swagger
 * tags:
 *   name: Planets
 *   description: The planets managing router
 */

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

/**
 * @swagger
 * /planets:
 *   get:
 *     summary: Returns the list of all the planets
 *     tags: [Planets]
 *     responses:
 *       200:
 *         description: The list of planets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Planet'
 */
planetRouter.get("/", (req, res) => {
    const planets = data.planets.map(addHateoas);
    res.send(planets);
});

/**
 * @swagger
 * /planets/{id}:
 *   get:
 *     summary: Get a planet by ID
 *     tags: [Planets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The planet id
 *     responses:
 *       200:
 *         description: The planet description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Planet'
 *       404:
 *         description: The planet was not found
 */
planetRouter.get("/:id", (req, res) => {
    const planet = data.planets.find((g) => g.id === parseInt(req.params.id));
    if (planet) {
        res.json({ planet, url: `localhost:4000/planets/${req.params.id}` });
    } else {
        res.status(404).send("Planet not found");
    }
});

/**
 * @swagger
 * /planets:
 *   post:
 *     summary: Create a new planet
 *     tags: [Planets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Planet'
 *     responses:
 *       201:
 *         description: The planet was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Planet'
 *       400:
 *         description: Invalid data provided
 */
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

/**
 * @swagger
 * /planets/{id}:
 *   put:
 *     summary: Update a planet by the id
 *     tags: [Planets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The planet id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Planet'
 *     responses:
 *       201:
 *         description: The planet was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Planet'
 *       404:
 *         description: The planet was not found
 *       400:
 *         description: Invalid data provided
 */
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

/**
 * @swagger
 * /planets/{id}:
 *   patch:
 *     summary: Partially update a planet by id
 *     tags: [Planets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The planet id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Planet'
 *     responses:
 *       200:
 *         description: The planet was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Planet'
 *       404:
 *         description: The planet was not found
 *       400:
 *         description: Invalid data provided
 */
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

/**
 * @swagger
 * /planets/{id}:
 *   delete:
 *     summary: Remove a planet by id
 *     tags: [Planets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The planet id
 *     responses:
 *       204:
 *         description: The planet was deleted
 *       404:
 *         description: The planet was not found
 */
planetRouter.delete("/:id", (req, res) => {
    const planet = data.planets.find((g) => g.id === parseInt(req.params.id));
    if (!planet) {
        return res.status(404).send("Planet not found");
    }

    data.planets.pop(planet);
    res.status(204);
});
