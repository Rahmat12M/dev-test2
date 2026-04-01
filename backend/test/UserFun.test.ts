process.env.DB_USER = "test";
process.env.DB_PWD = "test";
process.env.DB_HOST = "localhost";
process.env.DB_PORT = "5432";
process.env.DB_DB = "test";

import Users from "../src/db/models/Users";
import { UserFun } from "../src/db/func/UserFun";
import { describe, expect, jest, test } from "@jest/globals";
import type { IUserFun } from "../src/db/func/IUserFun";

jest.mock("../src/db/models/Users", () => ({
  __esModule: true,
  default: {
    findOne: jest.fn(),
  },
}));

// Mocker fuer getUser()
jest.spyOn(Users, "findOne").mockResolvedValue({
  username: "admin",
  password: "123456789",
} as Users);

// Mocker fuer getUserById()
(Users as any).findByPk = jest.fn() as jest.Mock;
(Users as any).findByPk.mockResolvedValue({
  username: "admin",
  password: "123456789",
});

// Mocker fuer createUser().
(Users as any).create = jest.fn();
(Users as any).create.mockResolvedValue({} as Users);
(Users as any).create.mockResolvedValue({
  username: "admin",
  password: "123456789",
});

describe("User Sequelize Tests", () => {
  const userData: IUserFun = new UserFun();

  test("find one user by username", async () => {
    const result = await userData.getUser("admin");

    expect(result).toEqual({
      username: "admin",
      password: "123456789",
    });
  });

  test("find one user by id", async () => {
    const result = await userData.getUserById(1);

    expect(result).toEqual({
      username: "admin",
      password: "123456789",
    });
  });

  test("compare equal passwords", () => {
    const result = userData.comparePwd("asdf", "asdf");
    expect(result).toBe(true);
  });

  test("compare not equal passwords", () => {
    const result = userData.comparePwd("asdf", "assdf");
    expect(result).toBe(false);
  });

  test("returns false if username or password missing", async () => {
    const result = await userData.createUser("", "123");
    expect(result).toBe(false);

    const result2 = await userData.createUser("admin", "");
    expect(result2).toBe(false);
  });

  test("returns true when Users.create succeeds", async () => {
    const result = await userData.createUser("admin", "123456789");

    expect(result).toBe(true);
    expect(Users.create).toHaveBeenCalledWith({
      username: "admin",
      password: "123456789",
    });
  });test("returns false when Users.create throws", async () => {
    (Users as any).create.mockRejectedValue(new Error("DB error"));

    const result = await userData.createUser("admin", "123456789");

    expect(result).toBe(false);
  });


});
