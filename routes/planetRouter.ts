import express, {Request, Response} from "express";
import data from "./data.json" assert { type: "json" };
import { Planet, PlanetWithLinks, RequestWithID } from "../types/planetType";
export const planetRouter = express.Router();

function validatePlanet(planet: Planet) {
    return (
        planet.name &&
        planet.climate &&
        typeof planet.diameter === "number" &&
        typeof planet.orbitalPeriod === "number" &&
        typeof planet.dayLength === "number" &&
        typeof planet.galaxy === "number"
    );
}

const addHateoas = (item: Planet): PlanetWithLinks => {
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

planetRouter.get<Request, PlanetWithLinks[]>("/", (req, res) => {
    const planets: PlanetWithLinks[] = data.planets.map(planet => addHateoas(planet));
    res.send(planets);
});

planetRouter.get<RequestWithID, string| PlanetWithLinks>("/:id", (req, res) => {
    const planet: Planet | undefined = data.planets.find((g) => g.id === parseInt(req.params.id));
    if (planet) {
        res.send(addHateoas(planet));
    } else {
        res.status(404).send("Planet not found");
    }
});

planetRouter.post<Request, string|PlanetWithLinks >("/", (req, res) => {
    if (!Object.keys(req.body).length) {
        res.status(400).send("No data provided");
        return;
    }
    const newPlanet: Planet = req.body;
    if (!validatePlanet(newPlanet)) {
        res.status(400).send("Invalid planet data");
        return;
    }
    data.planets.push(newPlanet);
    res.status(201).send(addHateoas(newPlanet));
});

planetRouter.put<RequestWithID, string| PlanetWithLinks>("/:id", (req, res) => {
    if (!Object.keys(req.body).length) {
       res.status(400).send("No data provided");
       return;
    }
    const planet: Planet|undefined = data.planets.find((g) => g.id === parseInt(req.params.id));
    if (!planet) {
        res.status(404).send("Planet not found");
        return;
    }
    if (!validatePlanet(planet)) {
        res.status(400).send("Invalid planet data");
        return;
    }
    const planetIndex: number = data.planets.findIndex(
        (p) => p.id === parseInt(req.params.id)
    );
    data.planets[planetIndex] = {
        ...req.body,
        id: parseInt(req.params.id),
        moons: data.planets[planetIndex].moons,
    };
    res.status(201).json(addHateoas(data.planets[planetIndex]));
});

planetRouter.patch<RequestWithID, string|PlanetWithLinks>("/:id", (req, res) => {
    if (!Object.keys(req.body).length) {
        res.status(400).send("No data provided");
    }

    const planetIndex: number = data.planets.findIndex(
        (p) => p.id === parseInt(req.params.id)
    );
    if (planetIndex === -1) {
        res.status(404).send("Planet not found");
        return;
    }

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
    if (name !== undefined && typeof name !== "string"){
        res.status(400).send("Invalid name");
        return ;
    }
    if (climate !== undefined && typeof climate !== "string"){
        res.status(400).send("Invalid climate");
        return;
    }
    if (diameter !== undefined && typeof diameter !== "number"){
       res.status(400).send("Invalid diameter");
       return;
    }
    if (orbitalPeriod !== undefined && typeof orbitalPeriod !== "number"){
        res.status(400).send("Invalid orbital period");
        return;
    }
    if (species !== undefined && typeof species !== "string"){
        res.status(400).send("Invalid species");
        return;
    }
    if (dayLength !== undefined && typeof dayLength !== "number"){
        res.status(400).send("Invalid day length");
        return;
    }
    if (galaxy !== undefined && typeof galaxy !== "number"){
        res.status(400).send("Invalid galaxy");
        return;
    }

    data.planets[planetIndex] = { ...planetToUpdate, ...req.body };
    res.json(addHateoas(data.planets[planetIndex]));
});

planetRouter.delete<RequestWithID,string>("/:id", (req, res) => {
    const index: number = data.planets.findIndex((g) => g.id === parseInt(req.params.id));
    if (index === -1) {
        res.status(404).send("Moon not found");
        return;
    }

    data.planets.splice(index, 1);
    res.status(204).send("Moon deleted");
});
