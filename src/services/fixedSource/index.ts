import { getJokes } from "./api";
import { IJoke, IJokesResponse } from "./api.types";

export async function getAllJokes(): Promise<IJokesResponse> {
  try {
    const resp = await getJokes();
    return resp;
  } catch (error) {
    return {
      data: [],
    };
  }
}
