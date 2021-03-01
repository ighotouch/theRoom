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
const index_1 = __importDefault(require("../../src/database/models/index"));
const app_1 = __importDefault(require("../../src/app"));
jest.mock("../../src/database/models/index");
process.env.JWT_SECRET = "dddddkslkdlsdklskslkd";
describe("UserController", () => {
    test("Should return 200 for a valid registration", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const requestPayload = {
            firstName: "igho",
            lastName: "matt",
            email: "ighotoch@gmail.com",
            password: "comms",
        };
        yield supertest_1.default(app_1.default)
            .post("/v1/auth/register")
            .send(requestPayload)
            .expect("Content-Type", /json/)
            .expect(200);
        expect(index_1.default.User.create).toBeCalledWith(requestPayload);
        done();
    }));
    test("Should pass with correct params", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const requestPayload = {
            firstName: "igho",
            lastName: "matt",
            email: "ighotoch@gmail.com",
            password: "comms",
        };
        expect(index_1.default.User.create).toBeCalledWith(requestPayload);
        done();
    }));
    test("Should return 400 for request with invalid params", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const invalidPayload = {
            firstName: "igho",
            lastName: "matt",
            email: "ighotoch@gmail",
            password: "comms",
        };
        yield supertest_1.default(app_1.default)
            .post("/v1/auth/register")
            .send(invalidPayload)
            .expect("Content-Type", /json/)
            .expect(400);
        done();
    }));
    test("Should return 200 for a valid login", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const loginPayload = {
            email: "ighotoch@gmail.com",
            password: "password",
        };
        yield supertest_1.default(app_1.default)
            .post("/v1/auth/login")
            .send(loginPayload)
            .expect("Content-Type", /json/)
            .expect(200);
        expect(index_1.default.User.findOne).toBeCalledTimes(1);
        done();
    }));
    test("Should return 400 for invalid login", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const loginPayload = {
            password: "ighotoch@gmail.com",
        };
        yield supertest_1.default(app_1.default)
            .post("/v1/auth/login")
            .send(loginPayload)
            .expect("Content-Type", /json/)
            .expect(400);
        expect(index_1.default.User.findOne).toBeCalledTimes(1);
        done();
    }));
    test("Should return 404 if user is not found", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const loginErrorPayload = {
            email: "notfound@gmail.com",
            password: "notfound",
        };
        yield supertest_1.default(app_1.default)
            .post("/v1/auth/login")
            .send(loginErrorPayload)
            .expect(404);
        done();
    }));
    test("Should return 401 for invalid password", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const loginPayload = {
            email: "ighotoch@gmail.com",
            password: "passwords",
        };
        yield supertest_1.default(app_1.default)
            .post("/v1/auth/login")
            .send(loginPayload)
            .expect("Content-Type", /json/)
            .expect(401);
        done();
    }));
});
