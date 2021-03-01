import axios, { AxiosResponse, Method } from "axios";

export const buildHeader = (secure?: boolean): HeadersInit => {
  const header = {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    // 'Accept': '*/*',
  };
  return header;
};

export const makeUrlKeyValuePairs = (json: { [key: string]: any }): string => {
  if (!json || Object.keys(json).length < 1) {
    return "";
  }
  const keys: string[] = Object.keys(json);
  let query = "?";
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    query +=
      encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
  }
  return query.replace(/&$/g, "");
};

type RequestObject = {
  type: Method;
  queryParams?: { [key: string]: any };
  data?: { [key: string]: any };
  route: string;
};
export async function httpRequestMaker({
  data,
  type = "GET",
  queryParams,
  route,
}: RequestObject): Promise<any> {
  let response: AxiosResponse<any>;
  let routePlusParams = route;
  if (queryParams) {
    routePlusParams += makeUrlKeyValuePairs(queryParams);
  }

  response = await axios({
    url: routePlusParams.trim(),
    method: type,
    headers: buildHeader(),
    data:
      type === "POST" || type === "DELETE" || type === "PUT" || type === "PATCH"
        ? JSON.stringify(data)
        : null,
  });

  try {
    if (response) {
      return response;
      const responseJSON = response.data;
      return { ...responseJSON, statusCode: response.status };
    }
    return { exception: "No response returned!" };
  } catch (error) {
    let errorMsg = error.response;
    return {
      message: errorMsg,
    };
  }
}
