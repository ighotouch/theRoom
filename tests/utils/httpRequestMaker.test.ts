import axios, { AxiosStatic } from "axios";
import { makeUrlKeyValuePairs } from "../../src/utils/httpRequestMaker";

interface AxiosMock extends AxiosStatic {
  mockResolvedValue: Function;
  mockRejectedValue: Function;
}

jest.mock("axios");
const mockAxios = axios as AxiosMock;

const TEST_BASE_URL = "http://localhost:3000";

describe("Http Request Maker", () => {
  test("Should return correct url if params are passed", () => {
    const params = { name: "igho", type: "great" };
    const resp = makeUrlKeyValuePairs(params);
    expect(resp).toEqual("?name=igho&type=great");
  });
});
