"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnimesRequest = void 0;
const httpRequestMaker_1 = require("../../utils/httpRequestMaker");
const BASE_URL = "https://kitsu.io/api/edge";
const GET_ANIME = BASE_URL + "/anime";
function getAnimesRequest() {
    return httpRequestMaker_1.httpRequestMaker({ type: "GET", route: GET_ANIME });
}
exports.getAnimesRequest = getAnimesRequest;
