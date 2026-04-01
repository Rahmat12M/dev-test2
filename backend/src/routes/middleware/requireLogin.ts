import type { Response, NextFunction } from "express";
import type { RequestUser } from "@/@types/types";
import type { IUserFun } from "@/db/func/IUserFun";
import { UserFun } from "@/db/func/UserFun";

/**
 * 
 * @returns 
 */
export async function requireLogin(req: RequestUser, res: Response, next: NextFunction) {
  const userFun: IUserFun = new UserFun();
  if (!req.session.user) {
    return res.sendStatus(401);
  }

  const user = await userFun.getUser(req.session.user.name);

  if (user)
    req.user = user;
  
  next();
}