import dotenv from "dotenv";
dotenv.config(); // This has to run before any access.

import cors from "cors";
import express from "express";
import morgan from "morgan";
import createError from "http-errors";
import authRouter from "./Routes/authRoute";
import "./helpers/initMongoDB";
import { verifyAccessToken } from "./helpers/jwtHelper"
import "./helpers/initRedis";


const app = express();

app.use(cors({
    origin: "http://localhost:3000"
}));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", verifyAccessToken, async ( req, res, next ) => {
    console.log(req.headers["authorization"]);
    res.send("Hello from express!");
});

app.use("/auth", authRouter);

// Handle not found
app.use(async (req, res, next) => {
    next(new createError.NotFound(
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

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Auth service listening: http://localhost:${port}`));
