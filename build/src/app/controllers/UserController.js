"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const index_1 = __importDefault(require("../../database/models/index"));
const userSchema_1 = require("../validators/userSchema");
require("../../database/config/dotenv");
const { User } = index_1.default;
const secret = process.env.JWT_SECRET;
class UserController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const value = yield userSchema_1.registrationRequestSchema.validateAsync(req.body);
                const resp = yield User.create(req.body);
                return res.status(200).json({
                    message: "Registration successful",
                });
            }
            catch (err) {
                return res.status(400).json({
                    message: err.message,
                });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const value = yield userSchema_1.loginRequestSchema.validateAsync(req.body);
                const usr = yield User.findOne({ where: { email: req.body.email } });
                if (!usr)
                    return res.status(404).send("No user found.");
                if (!usr || !bcryptjs_1.default.compareSync(req.body.password, usr.password)) {
                    return res
                        .status(401)
                        .send({ auth: false, token: null, message: "Invalid Credentials" });
                }
                var token = jsonwebtoken_1.default.sign({ id: usr.id }, secret, {
                    expiresIn: 86400, // expires in 24 hours
                });
                return res
                    .status(200)
                    .send({ auth: true, token: token, message: "success" });
            }
            catch (err) {
                res.status(400).json({
                    message: err.message,
                });
            }
        });
    }
}
exports.default = UserController;
