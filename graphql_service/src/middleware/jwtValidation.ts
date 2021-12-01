import createHttpError from "http-errors";
import JWT from "jsonwebtoken";

export const verifyAccessToken = (req: any, res: any, next: any) => {

    if (!req.headers["authorization"])
        return next(new createHttpError.Unauthorized());

    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1]; // Remove "Bearer " from the value.

    // JWT.verify(
    //     token,
    //     process.env.ACCESS_TOKEN_SECRET ?? "",
    //     (err: any, payload: any) => {

    //         if (err)
    //             return next(new createHttpError.Unauthorized(err.message));

    //         req.payload = payload;
    //         next();
    //     }
    // );

    next ();
};
