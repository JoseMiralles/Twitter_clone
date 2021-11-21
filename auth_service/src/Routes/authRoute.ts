import express from "express";
import createHttpError from "http-errors";
import User from "../models/userModel";
import { authSchema } from "../helpers/validationSchema";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../helpers/jwtHelper";
import redisClient from "../helpers/initRedis";
import authController from "../controllers/authController";

const authRouter = express.Router();

authRouter.post("/register", authController.register);

authRouter.post("/login", authController.login);

authRouter.post("/refresh-token", authController.refreshToken);

authRouter.delete("/logout", authController.logout);

export default authRouter;