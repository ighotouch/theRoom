import axios, { AxiosStatic } from "axios";
import { getAllJokes } from "../../../src/services/fixedSource";

interface AxiosMock extends AxiosStatic {
  mockResolvedValue: Function;
  mockRejectedValue: Function;
}

jest.mock("axios");
const mockAxios = axios as AxiosMock;

describe("Fixed Service", () => {
  test("should get successful response", async (done) => {
    const data = {
      data: [
        {
          id: 194,
          type: "general",
          setup: "What did the scarf say to the hat?",
          punchline: "You go on ahead, I am going to hang around a bit longer.",
        },
      ],
    };

    mockAxios.mockResolvedValue(data);
    const resp = await getAllJokes();
    expect(resp).toEqual(data);
    done();
  });

  test("should return an empty array if service call fails", async (done) => {
    const data: any = {data: []};
    mockAxios.mockRejectedValue({});
    const resp = await getAllJokes();
    expect(resp).toEqual(data);
    done();
  });
});
