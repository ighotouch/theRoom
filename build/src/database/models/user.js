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
/* eslint-disable no-param-reassign */
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const sequelize_1 = require("sequelize");
;
const UserModel = (sequelize) => {
    const User = sequelize.define("User", {
        id: {
            allowNull: true,
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true
        },
        firstName: {
            allowNull: true,
            type: sequelize_1.DataTypes.STRING,
        },
        lastName: {
            allowNull: true,
            type: sequelize_1.DataTypes.STRING,
        },
        email: {
            unique: true,
            allowNull: false,
            type: sequelize_1.DataTypes.STRING,
        },
        password: {
            allowNull: true,
            type: sequelize_1.DataTypes.STRING,
        },
    }, {
        tableName: "users",
    });
    User.addHook("beforeCreate", (user) => __awaiter(void 0, void 0, void 0, function* () {
        const salt = bcryptjs_1.default.genSaltSync(10);
        const pass = yield bcryptjs_1.default.hash(user.getDataValue('password'), salt);
        user.setDataValue('password', pass);
    }));
    User.addHook("beforeUpdate", (user) => __awaiter(void 0, void 0, void 0, function* () {
        const salt = bcryptjs_1.default.genSaltSync(10);
        const pass = yield bcryptjs_1.default.hash(user.getDataValue('password'), salt);
        user.setDataValue('password', pass);
    }));
    User.prototype.validatePassword = function validatePassword(passwordInput) {
        return bcryptjs_1.default.compare(passwordInput, this.dataValues.password);
    };
    return User;
};
exports.default = UserModel;
