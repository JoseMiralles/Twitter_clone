"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = void 0;
var http_errors_1 = __importDefault(require("http-errors"));
var verifyAccessToken = function (req, res, next) {
    if (!req.headers["authorization"])
        return next(new http_errors_1.default.Unauthorized());
    var authHeader = req.headers["authorization"];
    var token = authHeader.split(" ")[1]; // Remove "Bearer " from the value.
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
    next();
};
exports.verifyAccessToken = verifyAccessToken;
