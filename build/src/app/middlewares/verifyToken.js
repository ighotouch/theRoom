"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.JWT_SECRET;
function verifyToken(req, res, next) {
    const token = req.headers["x-access-token"];
    if (!token)
        return res.status(403).send({ auth: false, message: "No token provided." });
    jsonwebtoken_1.default.verify(token, secret, function (err, decoded) {
        if (err)
            return res
                .status(500)
                .send({ auth: false, message: "Failed to authenticate token." });
        // if everything good, save to request for use in other routes
        req.userId = decoded.id;
        next();
    });
}
exports.default = verifyToken;
