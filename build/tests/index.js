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
exports.mockAxios = void 0;
const axios_1 = __importDefault(require("axios"));
const axios_mock_adapter_1 = __importDefault(require("axios-mock-adapter"));
// This sets the mock adapter on the default instance
exports.mockAxios = new axios_mock_adapter_1.default(axios_1.default);
const context = {
    user: () => __awaiter(void 0, void 0, void 0, function* () {
        const loggedInUser = {
            password: yield PasswordManager.hashPassword("testing"),
            id: 1,
            firstName: "igho",
            lastName: "matthew",
            email: "igho@gmail.com",
        };
        const currentUser = {
            userId: 1,
        };
        return {
            currentUser,
            loggedInUser,
            isAuthenticated: true,
        };
    }),
};
const testUtils = (contextType) => {
    const server = new ApolloServer(Object.assign(Object.assign({}, serverOptions), { context: context[contextType || "user"] }));
    return createTestClient(server);
};
exports.default = (contextType) => testUtils(contextType);
