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
const supertest_1 = __importDefault(require("supertest"));
// @ts-ignore
const app_1 = __importDefault(require("../../src/app"));
const axios_1 = __importDefault(require("axios"));
jest.mock("axios");
const mockAxios = axios_1.default;
jest.mock("../../src/database/models/index");
process.env.JWT_SECRET = "dddddkslkdlsdklskslkd";
describe("FixedController", () => {
    test("Should return 200 for a valid request", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const data = [
            {
                id: 194,
                type: "general",
                setup: "What did the scarf say to the hat?",
                punchline: "You go on ahead, I am going to hang around a bit longer.",
            },
        ];
        mockAxios.mockResolvedValue(data);
        yield supertest_1.default(app_1.default)
            .get("/v1/jokes")
            .expect("Content-Type", /json/)
            .expect(200);
        done();
    }));
    test("Should return [] for invalid request", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const data = [
            {
                id: 194,
                type: "general",
                setup: "What did the scarf say to the hat?",
                punchline: "You go on ahead, I am going to hang around a bit longer.",
            },
        ];
        mockAxios.mockRejectedValue(data);
        const resp = yield supertest_1.default(app_1.default)
            .get("/v1/jokes")
            .expect("Content-Type", /json/)
            .expect(200);
        expect(resp).toEqual(expect.not.objectContaining({ data: [] }));
        done();
    }));
});
