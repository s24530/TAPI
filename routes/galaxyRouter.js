/**
 * @swagger
 * components:
 *   schemas:
 *     Galaxy:
 *       type: object
 *       required:
 *         - name
 *         - distance
 *         - size
 *         - mainStar
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the galaxy
 *         name:
 *           type: string
 *           description: The name of the galaxy
 *         distance:
 *           type: number
 *           description: The distance of the galaxy from Earth in light-years
 *         size:
 *           type: number
 *           description: The size of the galaxy in light-years
 *         mainStar:
 *           type: string
 *           description: The name of the main star of the galaxy
 *       example:
 *         id: 1
 *         name: Milky Way
 *         distance: 27000
 *         size: 100000
 *         mainStar: Sun
 */

/**
 * @swagger
 * tags:
 *   name: Galaxies
 *   description: The galaxy managing router
 */

import express from "express";
import data from "./data.json" assert { type: "json" };
export const galaxyRouter = express.Router();

function validateGalaxy(galaxy) {
    return (
        galaxy.name &&
        typeof galaxy.distance === "number" &&
        typeof galaxy.size === "number" &&
        galaxy.mainStar
    );
}

const addHateoas = (item) => {
    return {
        ...item,
        links: [
            {
                rel: "self",
                method: "GET",
                href: `localhost:4000/galaxies/${item.id}`,
            },
            {
                rel: "update",
                method: "PUT",
                href: `localhost:4000/galaxies/${item.id}`,
            },
            {
                rel: "update",
                method: "PATCH",
                href: `localhost:4000/galaxies/${item.id}`,
            },
            {
                rel: "delete",
                method: "DELETE",
                href: `localhost:4000/galaxies/${item.id}`,
            },
            { rel: "list", method: "GET", href: `localhost:4000/galaxies` },
        ],
    };
};

/**
 * @swagger
 * /galaxies:
 *   get:
 *     summary: Returns the list of all the galaxies
 *     tags: [Galaxies]
 *     responses:
 *       200:
 *         description: The list of galaxies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Galaxy'
 */
galaxyRouter.get("/", (req, res) => {
    const galaxies = data.galaxies.map(addHateoas);
    res.json(galaxies);
});

/**
 * @swagger
 * /galaxies/{id}:
 *   get:
 *     summary: Get a galaxy by ID
 *     tags: [Galaxies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The galaxy id
 *     responses:
 *       200:
 *         description: The galaxy description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Galaxy'
 *       404:
 *         description: The galaxy was not found
 */
galaxyRouter.get("/:id", (req, res) => {
    // if(typeof req.params.id !== "number")
    //     return res.status(400).send("Please provide a number")
    const galaxy = data.galaxies.find((g) => g.id === parseInt(req.params.id));
    if (galaxy) {
        res.json(addHateoas(galaxy));
    } else {
        res.status(404).send("Galaxy not found");
    }
});

/**
 * @swagger
 * /galaxies:
 *   post:
 *     summary: Create a new galaxy
 *     tags: [Galaxies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Galaxy'
 *     responses:
 *       201:
 *         description: The galaxy was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Galaxy'
 *       400:
 *         description: Invalid data provided
 */
galaxyRouter.post("/", (req, res) => {
    if (!Object.keys(req.body).length) {
        return res.status(400).send("No data provided");
    }
    const newGalaxy = req.body;
    if (!validateGalaxy(newGalaxy)) {
        return res.status(400).send("Invalid galaxy data");
    }
    data.galaxies.push(newGalaxy);
    res.status(201).send(addHateoas(newGalaxy));
});

/**
 * @swagger
 * /galaxies/{id}:
 *   put:
 *     summary: Update a galaxy by the id
 *     tags: [Galaxies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The galaxy id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Galaxy'
 *     responses:
 *       201:
 *         description: The galaxy was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Galaxy'
 *       404:
 *         description: The galaxy was not found
 *       400:
 *         description: Invalid data provided
 */
galaxyRouter.put("/:id", (req, res) => {
    if (!Object.keys(req.body).length) {
        return res.status(400).send("No data provided");
    }
    const galaxy = data.galaxies.find((g) => g.id === parseInt(req.params.id));
    if (!galaxy) {
        return res.status(404).send("Galaxy not found");
    }
    if (!validateGalaxy(galaxy)) {
        return res.status(400).send("Invalid galaxy data");
    }
    const galaxyIndex = data.galaxies.findIndex(
        (g) => g.id === parseInt(req.params.id)
    );
    data.galaxies[galaxyIndex] = {
        ...req.body,
        id: parseInt(req.params.id),
        planets: data.galaxies[galaxyIndex].planets,
    };
    res.status(201).json(addHateoas(data.galaxies[galaxyIndex]));
});

/**
 * @swagger
 * /galaxies/{id}:
 *   patch:
 *     summary: Partially update a galaxy by id
 *     tags: [Galaxies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The galaxy id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Galaxy'
 *     responses:
 *       200:
 *         description: The galaxy was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Galaxy'
 *       404:
 *         description: The galaxy was not found
 *       400:
 *         description: Invalid data provided
 */
galaxyRouter.patch("/:id", (req, res) => {
    if (!Object.keys(req.body).length) {
        return res.status(400).send("No data provided");
    }
    const galaxyIndex = data.galaxies.findIndex(
        (g) => g.id === parseInt(req.params.id)
    );
    if (galaxyIndex === -1) return res.status(404).send("Galaxy not found");

    const galaxyToUpdate = data.galaxies[galaxyIndex];
    const { name, distance, size, mainStar } = req.body;
    if (name !== undefined && typeof name !== "string")
        return res.status(400).send("Invalid name");
    if (distance !== undefined && typeof distance !== "number")
        return res.status(400).send("Invalid distance");
    if (size !== undefined && typeof size !== "number")
        return res.status(400).send("Invalid size");
    if (mainStar !== undefined && typeof mainStar !== "string")
        return res.status(400).send("Invalid main star");

    data.galaxies[galaxyIndex] = { ...galaxyToUpdate, ...req.body };
    res.json(addHateoas(data.galaxies[galaxyIndex]));
});

/**
 * @swagger
 * /galaxies/{id}:
 *   delete:
 *     summary: Remove a galaxy by id
 *     tags: [Galaxies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The galaxy id
 *     responses:
 *       204:
 *         description: The galaxy was deleted
 *       404:
 *         description: The galaxy was not found
 */
galaxyRouter.delete("/:id", (req, res) => {
    const galaxy = data.galaxies.find((g) => g.id === parseInt(req.params.id));
    if (!galaxy) {
        return res.status(404).send("Galaxy not found");
    }
    //202
    data.galaxies.pop(galaxy);
    res.status(204).send("Galaxy deleted");
});
