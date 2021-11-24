import JWT from "jsonwebtoken";
import createHttpError from "http-errors";
import redisClient from "./initRedis";

/**
 * Generates and returns a JWT
 */
export const signAccessToken = async (userId: string): Promise<string> => {
    return new Promise((resolve, reject) => {

        const payload = {};
        const secret = process.env.ACCESS_TOKEN_SECRET ?? "";
        const options: JWT.SignOptions = {
            expiresIn: "1h",
            issuer: "example.com",
            audience: userId.toString()
        };

        JWT.sign( payload, secret, options, (err, token) => {

            if (err) {
                console.log(err.message);
                reject(new createHttpError.InternalServerError());
            }
            if (token) resolve(token);
            else reject("Token was empty or undefined")
        });
    });
}

/**
 * Middleware verifies the given token using the
 * secret token in the .env file.
 * 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const verifyAccessToken = (req: any, res: any, next: any) => {
    
    if (!req.headers["authorization"])
        return next(new createHttpError.Unauthorized());

    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];

    JWT.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET ?? "",
        (err: any, payload: any) => {

            if (err.name === "JsonWebTokenError")
                return next(new createHttpError.Unauthorized());
            else if (err)
                return next(new createHttpError.Unauthorized(err.message));

            req.payload = payload;
            next();
        });
}

/**
 * Generates a refresh token
 */
export const signRefreshToken = async (userId: string): Promise<string> => {
    return new Promise((resolve, reject) => {

        const payload = {};
        const secret = process.env.REFRESH_TOKEN_SECRET ?? "";
        const options: JWT.SignOptions = {
            expiresIn: "1y",
            issuer: "example.com",
            audience: userId.toString()
        };

        JWT.sign( payload, secret, options, (err, token) => {

            if (err) {
                console.log(err.message);
                reject(new createHttpError.InternalServerError());
            }

            if (token) {
                
                // Set this entry to expire in one year.
                const expiration = 365 * 24 * 60 * 60;

                // Blacklist this refresh token
                redisClient.SET(userId, token, "EX", expiration, (err, reply) => {

                    if (err) {
                        console.log(err.message);
                        reject(new createHttpError.InternalServerError());
                    }

                    resolve(token);
                });
            }

            else reject("Token was empty or undefined")
        });
    });
}

export const verifyRefreshToken = async (refreshToken: string): Promise<string> => {
    return new Promise((resolve, reject) => {

        JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET ?? "", (err, payload: any) => {
            
            if (err) return reject(new createHttpError.Unauthorized());

            const userId: string = payload.aud

            /**
             * Compare the incoming refresh token with the cached refresh token.
             * If they are not the same, then someone might be attempting to
             * re-use an old token. In that case, reject the promise and 
             * return unauthorized.
             * 
             * Otherwise, resolve the promise and include the userId.
             */

            redisClient.GET(userId, (redisErr, result) => {

                if (redisErr) {
                    
                    console.log(redisErr.message);
                    reject(new createHttpError.InternalServerError());
                    return;
                }

                if (refreshToken === result) return resolve(userId);
                reject(new createHttpError.Unauthorized());
            });
        });
    });
}
