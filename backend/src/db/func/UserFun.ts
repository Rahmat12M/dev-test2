import { Users } from "@/db/index";
import type { IUserFun } from "@/db/func/IUserFun";

export class UserFun implements IUserFun {
  /**
   * 
   */
  async getUserById(id: number): Promise<Users | null> {
    const user = await Users.findByPk(id);
    return user;
  }

  /*
   */
  async createUser(username: string, password: string): Promise<boolean> {
    if (!username || !password) return false;

    try {
      await Users.create({ username: username, password: password });
      return true;
    } catch (err) {
      return false;
    }
  }

  /*
   */
  comparePwd(pwd1: string, pwd2: string): boolean {
    if (pwd1 === pwd2) return true;

    return false;
  }

  /*
   */
  async getUser(
    username: string,
  ): Promise<Users | null> {
    const user = await Users.findOne({
      where: { username: username },
    });

    return user;
  }
}
