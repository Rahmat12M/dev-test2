process.env.DB_USER = "test";
process.env.DB_PWD = "test";
process.env.DB_HOST = "localhost";
process.env.DB_PORT = "5432";
process.env.DB_DB = "test";

import request from "supertest";
import app from "../src/app";
import { describe, expect, jest, test } from "@jest/globals";
import Users from "../src/db/models/Users";

jest.spyOn(Users, "findOne").mockResolvedValue({
  username: "enrico",
  password: "abcd",
} as Users);

describe("Logout Endpoint Test", () => {
  test("Logout", async () => {
    const loginRes = await request(app)
      .post("/login")
      .send({ username: "enrico", password: "abcd" });

    expect(loginRes.status).toBe(202);
    expect(loginRes.body).toEqual({ user: "enrico" });

    // Cookie extrahieren
    const cookies = loginRes.headers["set-cookie"];
    expect(cookies).toBeDefined();


    const logoutRes = await request(app).get("/logout").set("Cookie", cookies);
    expect(logoutRes.status).toBe(200);
    expect(logoutRes.headers["set-cookie"][0]).toMatch(/connect\.sid=;/);
  });
});
