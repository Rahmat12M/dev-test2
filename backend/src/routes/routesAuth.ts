import type { IUserFun } from "@/db/func/IUserFun";
import { UserFun } from "@/db/func/UserFun";
import { Router } from "express";
import type { Request, Response } from 'express';
import { requireLogin } from "@/routes/middleware/requireLogin";
import type { RequestUser } from "@/@types/types";

const routesAuth: Router = Router();

/**
 * 
 */
routesAuth.post("/login", async (req: Request, res: Response) => {
  const userData: IUserFun = new UserFun();

  const username = String(req.body.username ?? "");
  const password = String(req.body.password ?? "");


  const user = await userData.getUser(username);
  if (!user) return res.sendStatus(401);

  const pwdOk = userData.comparePwd(password, user.password);
  if (!pwdOk) return res.sendStatus(401);

  req.session.user = { name: username };
  return res.status(202).json({user: username});
});

/**
 * 
 */
routesAuth.get("/login", requireLogin, (req: RequestUser, res: Response) => {
  res.status(202).json({user: req.user?.username});
});

/**
 * 
 */
routesAuth.get("/logout", requireLogin, (req: RequestUser, res: Response) => {
  req.session.destroy(err => {
    if (err) return res.sendStatus(500); // Internal Servererror

    res.clearCookie('connect.sid');
    res.sendStatus(200);
  });
});

export default routesAuth;