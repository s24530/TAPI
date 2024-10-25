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

galaxyRouter.get("/", (req, res) => {
    res.json(data.galaxies);
});

galaxyRouter.get("/:id", (req, res) => {
    // if(typeof req.params.id !== "number")
    //     return res.status(400).send("Please provide a number")
    const galaxy = data.galaxies.find((g) => g.id === parseInt(req.params.id));
    if (galaxy) {
        res.json(galaxy);
    } else {
        res.status(404).send("Galaxy not found");
    }
});

galaxyRouter.post("/", (req, res) => {
    if (!Object.keys(req.body).length) {
        return res.status(400).send("No data provided");
    }
    const newGalaxy = req.body;
    if (!validateGalaxy(newGalaxy)) {
        return res.status(400).send("Invalid galaxy data");
    }
    data.galaxies.push(newGalaxy)
    res.status(201).send(newGalaxy);
});

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
    res.status(201).json(data.galaxies[galaxyIndex]);
});

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
    res.json(data.galaxies[galaxyIndex]);
});

galaxyRouter.delete("/:id", (req, res) => {
    const galaxy = data.galaxies.find((g) => g.id === parseInt(req.params.id));
    if (!galaxy) {
        return res.status(404).send("Galaxy not found");
    }
    //202
    data.galaxies.pop(galaxy)
    res.status(204).send("Galaxy deleted");
});
