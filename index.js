import express from "express";
import { galaxyRouter } from "./routes/galaxyRouter.js";
import { planetRouter } from "./routes/planetRouter.js";
import { moonRouter } from "./routes/moonRouter.js";
const app = express();
const port = 4000

app.use(express.json());

app.use("/galaxies", galaxyRouter);
app.use("/planets", planetRouter);
app.use("/moons", moonRouter);

app.get("/", (req, res) => {
    res.send("Hello world!")
})

app.listen(port, () => {
    console.log("Server started on" , port)
});