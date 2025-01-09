/**
 * @swagger
 * components:
 *   schemas:
 *     Moon:
 *       type: object
 *       required:
 *         - name
 *         - distanceFromPlanet
 *         - diameter
 *         - orbitalPeriod
 *         - planet
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the moon
 *         name:
 *           type: string
 *           description: The name of the moon
 *         distanceFromPlanet:
 *           type: number
 *           description: The distance of the moon from its planet in kilometers
 *         diameter:
 *           type: number
 *           description: The diameter of the moon in kilometers
 *         orbitalPeriod:
 *           type: number
 *           description: The orbital period of the moon in days
 *         planet:
 *           type: integer
 *           description: The id of the planet the moon orbits
 *       example:
 *         id: 1
 *         name: Europa
 *         distanceFromPlanet: 670900
 *         diameter: 3121.6
 *         orbitalPeriod: 3.551
 *         planet: 5
 */

/**
 * @swagger
 * tags:
 *   name: Moons
 *   description: The moons managing router
 */
import express from "express";
import data from "./data.json" assert { type: "json" };
export const moonRouter = express.Router();

function validateMoon(moon) {
    return (
        moon.name &&
        typeof moon.distanceFromPlanet === "number" &&
        typeof moon.diameter === "number" &&
        typeof moon.orbitalPeriod === "number" &&
        typeof moon.planet == "number"
    );
}

const addHateoas = (item) => {
    return {
        ...item,
        links: [
            {
                rel: "self",
                method: "GET",
                href: `localhost:4000/moons/${item.id}`,
            },
            {
                rel: "update",
                method: "PUT",
                href: `localhost:4000/moons/${item.id}`,
            },
            {
                rel: "update",
                method: "PATCH",
                href: `localhost:4000/moons/${item.id}`,
            },
            {
                rel: "delete",
                method: "DELETE",
                href: `localhost:4000/moons/${item.id}`,
            },
            { rel: "list", method: "GET", href: `localhost:4000/moons` },
        ],
    };
};

/**
 * @swagger
 * /moons:
 *   get:
 *     summary: Returns the list of all the moons
 *     tags: [Moons]
 *     responses:
 *       200:
 *         description: The list of moons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Moon'
 */
moonRouter.get("/", (req, res) => {
    const moons = data.moons.map(addHateoas);
    res.send(moons);
});

/**
 * @swagger
 * /moons/{id}:
 *   get:
 *     summary: Get a moon by ID
 *     tags: [Moons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The moon id
 *     responses:
 *       200:
 *         description: The moon description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Moon'
 *       404:
 *         description: The moon was not found
 */
moonRouter.get("/:id", (req, res) => {
    const moon = data.moons.find((g) => g.id === parseInt(req.params.id));
    if (moon) {
        res.json({ moon, url: `localhost:4000/moons/${req.params.id}` });
    } else {
        res.status(404).send("Moon not found");
    }
});

/**
 * @swagger
 * /moons:
 *   post:
 *     summary: Create a new moon
 *     tags: [Moons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Moon'
 *     responses:
 *       201:
 *         description: The moon was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Moon'
 *       400:
 *         description: Invalid data provided
 */
moonRouter.post("/", (req, res) => {
    if (!Object.keys(req.body).length) {
        return res.status(400).send("No data provided");
    }
    const newMoon = req.body;
    if (!validateMoon(newMoon)) {
        return res.status(400).send("Invalid moon data");
    }
    data.moons.push(newMoon);
    res.status(201).send(addHateoas(newMoon));
});

/**
 * @swagger
 * /moons/{id}:
 *   put:
 *     summary: Update a moon by the id
 *     tags: [Moons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The moon id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Moon'
 *     responses:
 *       201:
 *         description: The moon was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Moon'
 *       404:
 *         description: The moon was not found
 *       400:
 *         description: Invalid data provided
 */
moonRouter.put("/:id", (req, res) => {
    if (!Object.keys(req.body).length) {
        return res.status(400).send("No data provided");
    }
    const moon = data.moons.find((g) => g.id === parseInt(req.params.id));
    if (!moon) {
        return res.status(404).send("Moon not found");
    }
    if (!validateMoon(moon)) {
        return res.status(400).send("Invalid moon data");
    }
    const moonIndex = data.moons.findIndex(
        (m) => m.id === parseInt(req.params.id)
    );
    data.moons[moonIndex] = { ...req.body, id: parseInt(req.params.id) };
    res.status(201).json(addHateoas(data.moons[moonIndex]));
});

/**
 * @swagger
 * /moons/{id}:
 *   patch:
 *     summary: Partially update a moon by id
 *     tags: [Moons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The moon id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Moon'
 *     responses:
 *       200:
 *         description: The moon was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Moon'
 *       404:
 *         description: The moon was not found
 *       400:
 *         description: Invalid data provided
 */
// ... <- spread operator
moonRouter.patch("/:id", (req, res) => {
    if (!Object.keys(req.body).length) {
        res.status(400).send("No data provided");
    }
    const moonIndex = data.moons.findIndex(
        (m) => m.id === parseInt(req.params.id)
    );
    if (moonIndex === -1) return res.status(404).send("Moon not found");

    const moonToUpdate = data.moons[moonIndex];

    const { name, distanceFromPlanet, diameter, orbitalPeriod, planet } =
        req.body;
    if (name !== undefined && typeof name !== "string")
        return res.status(400).send("Invalid name");
    if (
        distanceFromPlanet !== undefined &&
        typeof distanceFromPlanet !== "number"
    )
        return res.status(400).send("Invalid distance from planet");
    if (diameter !== undefined && typeof diameter !== "number")
        return res.status(400).send("Invalid diameter");
    if (orbitalPeriod !== undefined && typeof orbitalPeriod !== "number")
        return res.status(400).send("Invalid orbital period");
    if (planet !== undefined && typeof planet !== "number")
        return res.status(400).send("Invalid planet");

    data.moons[moonIndex] = { ...moonToUpdate, ...req.body };
    res.json(addHateoas(data.moons[moonIndex]));
});

/**
 * @swagger
 * /moons/{id}:
 *   delete:
 *     summary: Remove a moon by id
 *     tags: [Moons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The moon id
 *     responses:
 *       204:
 *         description: The moon was deleted
 *       404:
 *         description: The moon was not found
 */
moonRouter.delete("/:id", (req, res) => {
    const index = data.moons.findIndex((g) => g.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send("Moon not found");
    }

    data.planets.splice(index, 1);
    res.status(204).send("Moon deleted");
});
