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
exports.httpRequestMaker = exports.makeUrlKeyValuePairs = exports.buildHeader = void 0;
const axios_1 = __importDefault(require("axios"));
const buildHeader = (secure) => {
    const header = {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        // 'Accept': '*/*',
    };
    return header;
};
exports.buildHeader = buildHeader;
const makeUrlKeyValuePairs = (json) => {
    if (!json || Object.keys(json).length < 1) {
        return "";
    }
    const keys = Object.keys(json);
    let query = "?";
    for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        query +=
            encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
    }
    return query.replace(/&$/g, "");
};
exports.makeUrlKeyValuePairs = makeUrlKeyValuePairs;
function httpRequestMaker({ data, type = "GET", queryParams, route, }) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        let routePlusParams = route;
        if (queryParams) {
            routePlusParams += exports.makeUrlKeyValuePairs(queryParams);
        }
        response = yield axios_1.default({
            url: routePlusParams.trim(),
            method: type,
            headers: exports.buildHeader(),
            data: type === "POST" || type === "DELETE" || type === "PUT" || type === "PATCH"
                ? JSON.stringify(data)
                : null,
        });
        try {
            if (response) {
                return response;
                const responseJSON = response.data;
                return Object.assign(Object.assign({}, responseJSON), { statusCode: response.status });
            }
            return { exception: "No response returned!" };
        }
        catch (error) {
            let errorMsg = error.response;
            return {
                message: errorMsg,
            };
        }
    });
}
exports.httpRequestMaker = httpRequestMaker;
