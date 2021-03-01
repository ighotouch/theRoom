"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FixedController_1 = __importDefault(require("./app/controllers/FixedController"));
const RandomController_1 = __importDefault(require("./app/controllers/RandomController"));
const UserController_1 = __importDefault(require("./app/controllers/UserController"));
const verifyToken_1 = __importDefault(require("./app/middlewares/verifyToken"));
const apiV1Router = express_1.Router();
// Auth
apiV1Router.post('/auth/login', UserController_1.default.login);
apiV1Router.post('/auth/register', UserController_1.default.register);
// resource
apiV1Router.get('/jokes', verifyToken_1.default, FixedController_1.default.getJokes);
apiV1Router.get('/anime', verifyToken_1.default, RandomController_1.default.getAnime);
exports.default = apiV1Router;
