import { IJoke, IJokesResponse } from "./api.types";
import { httpRequestMaker } from "../../utils/httpRequestMaker";

const BASE_URL = "https://official-joke-api.appspot.com";

const GET_JOKES = BASE_URL + "/jokes/ten";

export function getJokes(): Promise<IJokesResponse> {
  return httpRequestMaker({ type: "GET", route: GET_JOKES });
}
