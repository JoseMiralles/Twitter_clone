"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var jwtValidation_1 = require("./middleware/jwtValidation");
var app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "http://localhost:3000" }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(jwtValidation_1.verifyAccessToken);
app.get("/", function (req, res) {
    res.send("Authorized!!!");
});
// app.use("/graphql", graphqlHTTP ({
// }));
var port = 5000;
app.listen(port, function () { return console.log("GQL Listening: http://localhost:" + port); });
