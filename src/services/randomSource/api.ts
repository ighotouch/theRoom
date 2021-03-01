import { IAnimeResponse } from "./api.types";
import { httpRequestMaker } from "../../utils/httpRequestMaker";

const BASE_URL = "https://kitsu.io/api/edge";

const GET_ANIME = BASE_URL + "/anime";

export function getAnimesRequest(): Promise<IAnimeResponse> {
  return httpRequestMaker({ type: "GET", route: GET_ANIME });
}
