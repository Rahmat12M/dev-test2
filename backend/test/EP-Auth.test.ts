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

describe("Login Endpoint Tests", () => {
  test("successful login returns 202 and sets session", async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: "enrico", password: "abcd" });

    expect(res.status).toBe(202);
    expect(res.body).toEqual({ user: "enrico" });
    expect(res.headers["set-cookie"]).toBeDefined();
  });

  test("wrong password returns 401", async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: "enrico", password: "wrong" });

    expect(res.status).toBe(401);
  });

  test("unknown user returns 401", async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: "unknown", password: "whatever" });

    expect(res.status).toBe(401);
  });

  test("Autologin", async () => {
    // Keine Session -> Kein Login
    const res1 = await request(app).get("/login");
    expect(res1.status).toBe(401);

    // Fake Session-Cookie
    const cookie = "connect.sid=someFakeSessionId";

    // Fake Session-Daten in Memory-Store simulieren
    // Falls du MemoryStore nutzt, kannst du das so machen:
    (app.request.session as any) = { user: { name: "enrico" } };

    const res = await request(app).get("/login").set("Cookie", cookie);
    expect(res.status).toBe(202);
    expect(res.body).toEqual({ user: "enrico" });
  });
});
