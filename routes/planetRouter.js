import express from "express";

export const planetRouter = express.Router()

planetRouter.get("/", (req, res) => {
    res.send("planets")
})

planetRouter.get("/:id", (req, res) => {
    res.send("planet with id")
})

planetRouter.post("/", (req, res) =>{
    if(!Object.keys(req.body).length){
        res.status(400).send("No data provided")
    }

    if(!req.body.diameter){
        res.status(400).send("No diameter provided")
    }else if(!req.body.climate){
        res.status(400).send("No climate provided")
    }else if(!req.body.orbital_period){
        res.status(400).send("No orbital period provided")
    }

})

planetRouter.put("/:id", (req, res) => {
    if(!Object.keys(req.body).length){
        res.status(400).send("No data provided")
    }
})

planetRouter.patch("/:id", (req, res) => {
    if(!Object.keys(req.body).length){
        res.status(400).send("No data provided")
    }
})

planetRouter.delete("/:id", (req, res) => {
    res.send('OK')
})