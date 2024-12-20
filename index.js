import express from "express";
import cors from "cors";
import { absolutePath } from "swagger-ui-dist";
import { galaxyRouter } from "./routes/galaxyRouter.js";
import { planetRouter } from "./routes/planetRouter.js";
import { moonRouter } from "./routes/moonRouter.js";
const app = express();
const port = 4000;

const allowedOrigins = ["http://localhost:4000"];

const corsOptions = {
    origin: "localhost:4000",
    // function(origin, callback){
    //     if(allowedOrigins.indexOf(origin) === -1){
    //         var msg = 'The CORS policy for this site does not ' +
    //                     'allow access from the specified Origin.';
    //         return callback(new Error(msg), false);
    //     }
    //     return callback(null, true);
    // }
};

const middlewareContentType = (req, res, next) => {
    const ct = req.get("Content-Type");
    if (ct !== "application/json")
        return res.status(400).send("Wrong Content-Type");
    next();
};

const middlewareAuthorization = (req, res, next) => {
    const auth = req.get("Authorization");
    if (!auth) {
        return res.status(401).send("No token provided");
    }
    if (auth !== "jajco") {
        return res.status(403).send("Authorization not successfull");
    }
    next();
};

const middlewareContentTypeOptions = (req, res, next) => {
    res.set("X-Content-Type-Options", "nosniff");
    next();
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(absolutePath()))

app.use(middlewareAuthorization);
app.use(middlewareContentType);
app.use(middlewareContentTypeOptions);

app.use("/galaxies", galaxyRouter);
app.use("/planets", planetRouter);
app.use("/moons", moonRouter);

app.get("/", (req, res) => {
    res.json({
        galaxies: "localhost:4000/galaxies",
        planets: "localhost:4000/planets",
        moons: "localhost:4000/moons]",
    });
});

app.listen(port, () => {
    console.log("Server started on localhost:", port);
});
