import axios, { AxiosStatic } from "axios";
import { getJokes } from "../../../src/services/fixedSource/api";

interface AxiosMock extends AxiosStatic {
  mockResolvedValue: Function;
  mockRejectedValue: Function;
}

jest.mock("axios");
const mockAxios = axios as AxiosMock;

describe("Fixed Service Api", () => {
  test("Should return successful fix response", async (done) => {
    const data = [
      {
        id: 194,
        type: "general",
        setup: "What did the scarf say to the hat?",
        punchline: "You go on ahead, I am going to hang around a bit longer.",
      },
    ];

    mockAxios.mockResolvedValue(data);

    const resp = await getJokes();
    
    expect(resp).toEqual(data)
    done();
  });
});


