import dotenv from "dotenv";
dotenv.config();

import "./helpers/mongoInit"

import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { verifyAccessToken } from "./middleware/jwtValidation";
import createHttpError from "http-errors";
import schema from "./schema";

const app = express();

app.use(cors({origin: "http://localhost:3000"}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.use(verifyAccessToken);

app.get("/", (req, res) => {
    res.send("Authorized!!!");
});

app.use("/graphql", graphqlHTTP ({
    schema: schema,
    graphiql: true
}));

app.use((req, res, next) => {

    console.log(req.body);
    console.log(res.json);

    return next();
});

// Handle not found
app.use(async (req, res, next) => {
    next(new createHttpError.NotFound(
        "Route was not found."
    ));
});

app.use((
    err: Error & {status?: number}, req: any, res: any, next: any
) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});

const port = 5000
app.listen(port, () => console.log("GQL Listening: http://localhost:" + port));