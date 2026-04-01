process.env.DB_USER = "test";
process.env.DB_PWD = "test";
process.env.DB_HOST = "localhost";
process.env.DB_PORT = "5432";
process.env.DB_DB = "test";

import request from "supertest";
import app from "../src/app";
import { describe, expect, jest, test } from "@jest/globals";
import Books from "../src/db/models/Books";
import Users from "../src/db/models/Users";

jest.spyOn(Users, "findOne").mockResolvedValue({
  username: "enrico",
  password: "abcd",
} as Users);

jest.spyOn(Users, "findByPk").mockResolvedValue({
  id: 1,
  username: "enrico",
  password: "abcd",
} as Partial<Users> as Users);

jest.spyOn(Books, "findOne").mockResolvedValue({
  name: "testBook",
  isbn: "123-1-456",
  author: "testAuthor",
  userId: 1,
} as Partial<Books> as Books);

jest.spyOn(Books, "findAll").mockResolvedValue([
  {
    name: "testBook",
    isbn: "123-1-456",
    author: "testAuthor",
  },
  {
    name: "testBook2",
    isbn: "123-2-456",
    author: "testAuthor2",
  },
] as Books[]);

(Books as any).create = jest.fn() as jest.Mock;
(Books as any).create.mockResolvedValue({
  name: "testBook",
  isbn: "123-1-456",
  author: "testAuthor",
});

describe("Books Endpoint Test", () => {
  let cookies = "";
  beforeAll(async () => {
    const loginRes = await request(app)
      .post("/login")
      .send({ username: "enrico", password: "abcd" });

    expect(loginRes.status).toBe(202);
    expect(loginRes.body).toEqual({ user: "enrico" });

    // Cookie extrahieren
    cookies = loginRes.headers["set-cookie"];
    expect(cookies).toBeDefined();
  });

  test("Add a book successfully", async () => {
    const addRes = await request(app)
      .post("/book")
      .send({ name: "testBook", isbn: "123-1-456", author: "testAuthor" })
      .set("Cookie", cookies);

    expect(addRes.status).toBe(201);
  });

  test("Add Book fails when isbn exists", async () => {
    // simulate duplicate user. The catch case.
    (Books as any).create.mockRejectedValue(new Error("duplicate"));

    const res = await request(app)
      .post("/book")
      .send({ name: "testBook", isbn: "123-1-456", author: "testAuthor" })
      .set("Cookie", cookies);

    expect(res.status).toBe(406);
  });

  test("get one book by isbn with belonging user", async () => {
    const addRes = await request(app)
      .get("/book/123-1-456")
      .set("Cookie", cookies);

    expect(addRes.status).toBe(302);
    expect(addRes.body).toEqual({
      book: {
        name: "testBook",
        isbn: "123-1-456",
        author: "testAuthor",
        userId: 1,
      },
      username: "enrico",
    });
  });

  test("get one book by isbn with no belonging user", async () => {
    jest.spyOn(Books, "findOne").mockResolvedValue({
      name: "testBook",
      isbn: "123-1-456",
      author: "testAuthor",
    } as Partial<Books> as Books);

    const addRes = await request(app)
      .get("/book/123-1-456")
      .set("Cookie", cookies);

    expect(addRes.status).toBe(302);
    expect(addRes.body).toEqual({
      book: {
        name: "testBook",
        isbn: "123-1-456",
        author: "testAuthor",
      },
      username: null,
    });
  });

  test("get all books", async () => {
    const addRes = await request(app).get("/book").set("Cookie", cookies);

    expect(addRes.status).toBe(302);
    expect(addRes.body).toEqual({
      books: [
        {
          name: "testBook",
          isbn: "123-1-456",
          author: "testAuthor",
        },
        {
          name: "testBook2",
          isbn: "123-2-456",
          author: "testAuthor2",
        },
      ],
    });
  });
});
