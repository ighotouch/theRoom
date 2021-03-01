"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJokes = void 0;
const httpRequestMaker_1 = require("../../utils/httpRequestMaker");
const BASE_URL = "https://official-joke-api.appspot.com";
const GET_JOKES = BASE_URL + "/jokes/ten";
function getJokes() {
    return httpRequestMaker_1.httpRequestMaker({ type: "GET", route: GET_JOKES });
}
exports.getJokes = getJokes;
