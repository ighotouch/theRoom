import request from "supertest";
// @ts-ignore
import models from "../../src/database/models/index";
import app from "../../src/app";

jest.mock("../../src/database/models/index");

process.env.JWT_SECRET = "dddddkslkdlsdklskslkd";

describe("UserController", () => {
  test("Should return 200 for a valid registration", async (done) => {
    const requestPayload = {
      firstName: "igho",
      lastName: "matt",
      email: "ighotoch@gmail.com",
      password: "comms",
    };

    await request(app)
      .post("/v1/auth/register")
      .send(requestPayload)
      .expect("Content-Type", /json/)
      .expect(200);
    
    expect(models.User.create).toBeCalledWith(requestPayload);
    done();
  });

  test("Should pass with correct params", async (done) => {
    const requestPayload = {
      firstName: "igho",
      lastName: "matt",
      email: "ighotoch@gmail.com",
      password: "comms",
    };
    
    expect(models.User.create).toBeCalledWith(requestPayload);
    done();
  });



  test("Should return 400 for request with invalid params", async (done) => {
    const invalidPayload = {
      firstName: "igho",
      lastName: "matt",
      email: "ighotoch@gmail",
      password: "comms",
    };

    await request(app)
      .post("/v1/auth/register")
      .send(invalidPayload)
      .expect("Content-Type", /json/)
      .expect(400);
    
    done();
  });


  test("Should return 200 for a valid login", async (done) => {
    const loginPayload = {
      email: "ighotoch@gmail.com",
      password: "password",
    };

    await request(app)
      .post("/v1/auth/login")
      .send(loginPayload)
      .expect("Content-Type", /json/)
      .expect(200);
    
    expect(models.User.findOne).toBeCalledTimes(1);
    done();
  });



  test("Should return 400 for invalid login", async (done) => {
    const loginPayload = {
      password: "ighotoch@gmail.com",
    };

    await request(app)
      .post("/v1/auth/login")
      .send(loginPayload)
      .expect("Content-Type", /json/)
      .expect(400);
    
    expect(models.User.findOne).toBeCalledTimes(1);
    done();
  });

  test("Should return 404 if user is not found", async (done) => {
    const loginErrorPayload = {
      email: "notfound@gmail.com",
      password: "notfound",
    };

    await request(app)
      .post("/v1/auth/login")
      .send(loginErrorPayload)
      .expect(404);
    
    done();
  });

  test("Should return 401 for invalid password", async (done) => {
    const loginPayload = {
      email: "ighotoch@gmail.com",
      password: "passwords",
    };

    await request(app)
      .post("/v1/auth/login")
      .send(loginPayload)
      .expect("Content-Type", /json/)
      .expect(401);
    
    done();
  });

  
});
