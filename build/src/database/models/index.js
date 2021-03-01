"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
// models
const user_1 = __importDefault(require("./user"));
const con = config_1.default;
const env = process.env.NODE_ENV || "development";
const _a = con[env], { database, username, password, host, dialect } = _a, rest = __rest(_a, ["database", "username", "password", "host", "dialect"]);
const sequelize = new sequelize_1.Sequelize(Object.assign({ database,
    username,
    password,
    host,
    dialect }, rest));
const models = {
    User: user_1.default(sequelize),
};
const wrapper = Object.assign(Object.assign({}, models), { sequelize,
    Sequelize: sequelize_1.Sequelize });
exports.default = wrapper;
// module.exports = db;
