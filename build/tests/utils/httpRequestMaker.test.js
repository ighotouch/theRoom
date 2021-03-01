"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const httpRequestMaker_1 = require("../../src/utils/httpRequestMaker");
jest.mock("axios");
const mockAxios = axios_1.default;
const TEST_BASE_URL = "http://localhost:3000";
describe("Http Request Maker", () => {
    test("Should return correct url if params are passed", () => {
        const params = { name: "igho", type: "great" };
        const resp = httpRequestMaker_1.makeUrlKeyValuePairs(params);
        expect(resp).toEqual("?name=igho&type=great");
    });
});
