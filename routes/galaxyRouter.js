import express from "express";

export const galaxyRouter = express.Router()

galaxyRouter.get("/", (req, res) => {
    res.send("galaxies")
})
galaxyRouter.get("/:id", (req, res) => {
    res.send("galaxy with id")
})

galaxyRouter.post("/", (req, res) => {
    if(!Object.keys(req.body).length){
        res.status(400).send("No data provided")
    }

    if(!req.body.size){
        res.status(400).send("No galaxy size provided")
    }else if(!req.body.star_name){
        res.status(400).send("No star name provided")
    }else if(!req.body.distance_from_milkyway){
        res.status(400).send("No distance from milkyway provided")
    }else{
        res.send("OK")
    }
})

galaxyRouter.put("/:id", (req, res) => {
    if(!Object.keys(req.body).length){
        res.status(400).send("No data provided")
    }
})

galaxyRouter.patch("/:id", (req, res) => {
    if(!Object.keys(req.body).length){
        res.status(400).send("No data provided")
    }
})

galaxyRouter.delete("/:id", (req, res) => {
    res.send('OK')
})