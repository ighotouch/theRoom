import request from "supertest";
// @ts-ignore
import app from "../../src/app";
import axios, { AxiosStatic } from "axios";

interface AxiosMock extends AxiosStatic {
  mockResolvedValue: Function;
  mockRejectedValue: Function;
}

jest.mock("axios");
const mockAxios = axios as AxiosMock;

jest.mock("../../src/database/models/index");

process.env.JWT_SECRET = "dddddkslkdlsdklskslkd";

describe("FixedController", () => {
  test("Should return 200 for a valid request", async (done) => {
    const data = [
      {
        id: 194,
        type: "general",
        setup: "What did the scarf say to the hat?",
        punchline: "You go on ahead, I am going to hang around a bit longer.",
      },
    ];

    mockAxios.mockResolvedValue(data);

    await request(app)
      .get("/v1/jokes")
      .expect("Content-Type", /json/)
      .expect(200);

    done();
  });

  test("Should return [] for invalid request", async (done) => {
    const data = [
      {
        id: 194,
        type: "general",
        setup: "What did the scarf say to the hat?",
        punchline: "You go on ahead, I am going to hang around a bit longer.",
      },
    ];

    mockAxios.mockRejectedValue(data);

    const resp = await request(app)
      .get("/v1/jokes")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(resp).toEqual(expect.not.objectContaining({data: []}));
    
    done();
  });
});
