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

moonRouter.get("/", (req, res) => {
    const moons = data.moons.map(addHateoas);
    res.send(moons);
});

moonRouter.get("/:id", (req, res) => {
    const moon = data.moons.find((g) => g.id === parseInt(req.params.id));
    if (moon) {
        res.json({ moon, url: `localhost:4000/moons/${req.params.id}` });
    } else {
        res.status(404).send("Moon not found");
    }
});

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

moonRouter.delete("/:id", (req, res) => {
    const index = data.moons.findIndex((g) => g.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send("Moon not found");
    }

    data.planets.splice(index, 1);
    res.status(204).send("Moon deleted");
});
