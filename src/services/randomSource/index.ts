import { getAnimesRequest } from "./api";
import { IAnimeResponse } from "./api.types";

export async function getAnimeService(): Promise<IAnimeResponse> {
  try {
    const resp = await getAnimesRequest();
    return resp;
  } catch (error) {
    return {
      data: [],
    };
  }
}
