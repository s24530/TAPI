import express from "express";
import cors from "cors";
import swaggerjsdoc from "swagger-jsdoc";
import swaggerui from "swagger-ui-express";
import { galaxyRouter } from "./routes/galaxyRouter.js";
import { planetRouter } from "./routes/planetRouter.js";
import { moonRouter } from "./routes/moonRouter.js";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const port = 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use(middlewareContentTypeOptions);

app.use("/docus", express.static(path.join(__dirname, "build")));

app.use(
    "/galaxies",
    middlewareAuthorization,
    middlewareContentType,
    galaxyRouter
);
app.use(
    "/planets",
    middlewareAuthorization,
    middlewareContentType,
    planetRouter
);
app.use("/moons", middlewareAuthorization, middlewareContentType, moonRouter);

app.get("/", (req, res) => {
    res.json({
        galaxies: "localhost:4000/galaxies",
        planets: "localhost:4000/planets",
        moons: "localhost:4000/moons",
    });
});

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Space API Documentation",
            version: "1.0.0",
            description: "API documentation for the space exploration service",
            contact: {
                name: "Jacob",
                url: "jacob.com",
                email: "jacob@gmail.com",
            }, //random information
        },
        servers: [
            {
                url: "http://localhost:4000",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerjsdoc(options);
app.use("/api-docs", swaggerui.serve, swaggerui.setup(specs));

app.listen(port, () => {
    console.log("Server started on localhost:", port);
});
