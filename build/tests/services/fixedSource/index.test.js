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
const axios_1 = __importDefault(require("axios"));
const fixedSource_1 = require("../../../src/services/fixedSource");
jest.mock("axios");
const mockAxios = axios_1.default;
describe("Fixed Service", () => {
    test("should get successful response", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            data: [
                {
                    id: 194,
                    type: "general",
                    setup: "What did the scarf say to the hat?",
                    punchline: "You go on ahead, I am going to hang around a bit longer.",
                },
            ],
        };
        mockAxios.mockResolvedValue(data);
        const resp = yield fixedSource_1.getAllJokes();
        expect(resp).toEqual(data);
        done();
    }));
    test("should return an empty array if service call fails", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const data = { data: [] };
        mockAxios.mockRejectedValue({});
        const resp = yield fixedSource_1.getAllJokes();
        expect(resp).toEqual(data);
        done();
    }));
});
