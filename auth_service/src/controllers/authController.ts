import createHttpError from "http-errors";
import { signAccessToken, signRefreshToken } from "../helpers/jwtHelper";
import { authSchema } from "../helpers/validationSchema";
import { verifyRefreshToken } from "../helpers/jwtHelper";
import User from "../models/userModel";
import * as express from "express";
import redisClient from "../helpers/initRedis";

namespace authController {

    export const register = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        try {
    
            /**
             * Password hashing is done using bcrypt and mongoose middleware.
             * See Model/UserMode.ts
             */
    
            const result = await authSchema.validateAsync({
                email: req.body.email,
                password: req.body.password
            });
    
            const exist = await User.findOne({ email: result.email });
    
            if (exist)
                throw new createHttpError.Conflict("Email is already in use");
    
            const user = new User ({ 
                email: result.email,
                password: result.password
            });
            const savedUser = await user.save();
            const accessToken = await signAccessToken(savedUser.id);
            const refreshToken = await signRefreshToken(savedUser.id);
    
            res.send({accessToken, refreshToken});
    
        } catch (error: any) {
    
            if (error.isJoi === true) error.status = 422;
            next(error);
        }
    }

    export const login = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        try {

            const result = await authSchema.validateAsync(
                req.body
            );
            const user = await User.findOne({email: result.email});
    
            if (!user) throw new createHttpError.NotFound("User not registered");
    
            const isPasswordValid = await user.isValidPassword(result.password);
            
            if (!isPasswordValid) throw new createHttpError.Unauthorized(
                "Username or Password is invalid"
            );
    
            const accessToken = await signAccessToken(user.id);
            const refreshToken = await signRefreshToken(user.id);
    
            res.send({accessToken, refreshToken});
    
        } catch (error: any) {
            
            if (error.isJoi === true)
                return next(new createHttpError.BadRequest(
                    "Invalid username or password"
                ));
            next(error);
        }
    }

    export const refreshToken = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        try {
            
            const oldRefreshToken = req.body.refreshToken;
    
            if (!oldRefreshToken) throw new createHttpError.BadRequest();
    
            const userId = await verifyRefreshToken(oldRefreshToken);
    
            const accessToken = await signAccessToken(userId);
            const refreshToken = await signRefreshToken(userId);
    
            res.send({ accessToken, refreshToken });
    
        } catch (error) {
            next(error);
        }
    }

    export const logout = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        try {
            
            const { refreshToken } = req.body;
    
            if (!refreshToken) throw new createHttpError.BadRequest();
    
            const userId = await verifyRefreshToken(refreshToken);
            
            redisClient.DEL(userId, (err, val) => {
    
                if (err) {
                    
                    console.log(err.message);
                    throw new createHttpError.InternalServerError();
                }
    
                console.log(val);
                res.sendStatus(204);
            });
        }
    
        catch (err) {
            next(err);
        }
    }
}

export default authController;
