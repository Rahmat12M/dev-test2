process.env.DB_USER = "test";
process.env.DB_PWD = "test";
process.env.DB_HOST = "localhost";
process.env.DB_PORT = "5432";
process.env.DB_DB = "test";

import request from "supertest";
import app from "../src/app";
import { describe, expect, jest, test } from "@jest/globals";
import Users from "../src/db/models/Users";

(Users as any).create = jest.fn() as jest.Mock;
(Users as any).create.mockResolvedValue({
  username: "testUser",
  password: "1234",
});

describe("User Endpoint Test", () => {
  test("Register User", async () => {
    const registerRes = await request(app)
      .post("/register")
      .send({ username: "test", password: "1234" });

    expect(registerRes.status).toBe(201);
  });

  test("Register User fails when username exists", async () => {
    // simulate duplicate user. The catch case.
    (Users as any).create.mockRejectedValue(new Error("duplicate"));

    const res = await request(app)
      .post("/register")
      .send({ username: "testUser", password: "1234" });

    expect(res.status).toBe(406);
  });
});
