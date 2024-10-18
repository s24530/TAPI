import express from "express";

export const moonRouter = express.Router()

//query paramsy opcjonalne do wyszukiwania
moonRouter.get("/", (req, res) => {
    res.send()
})

moonRouter.get("/:id", (req, res) => {
    res.send("moon with id")
})

moonRouter.post("/", (req, res) => {
    if(!Object.keys(req.body).length){
        res.status(400).send("No data provided")
    }
    
    if(!req.body.distance){
        res.status(400).send("No distance provided")
    }else if(!req.body.diameter){
        res.status(400).send("No diameter provided")
    }else if(!req.body.orbital_period){
        res.status(400).send("No orbital_period provided")
    }else{
        res.send("ok")
    }
})

moonRouter.put("/:id", (req, res) => {
    if(!Object.keys(req.body).length){
        res.status(400).send("No data provided")
    }
})

// ... <- spread operator
moonRouter.patch("/:id", (req, res) => {
    if(!Object.keys(req.body).length){
        res.status(400).send("No data provided")
    }
})

moonRouter.delete("/:id", (req, res) => {
    res.send("OK")
})