"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = void 0;
var http_errors_1 = __importDefault(require("http-errors"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var verifyAccessToken = function (req, res, next) {
    if (!req.headers["authorization"])
        return next(new http_errors_1.default.Unauthorized());
    var authHeader = req.headers["authorization"];
    var token = authHeader.split(" ")[1]; // Remove "Bearer " from the value.
    jsonwebtoken_1.default.verify(token, "32cff7225b1b848f46d8f77fa7b8dc2865b2039dffe5f5aa29debfa19435d80c", function (err, payload) {
        if (err)
            return next(new http_errors_1.default.Unauthorized(err.message));
        req.payload = payload;
        next();
    });
};
exports.verifyAccessToken = verifyAccessToken;
