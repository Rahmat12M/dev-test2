import type { IUserFun } from "@/db/func/IUserFun";
import { UserFun } from "@/db/func/UserFun";
import { Router } from "express";
import type { Request, Response } from 'express';

const routesUser: Router = Router();

/**
 * Mit middleware (midAuthenticateToken).
 */
routesUser.post('/register', async (req: Request, res: Response) => {
  const user: IUserFun = new UserFun();
  const {username, password}: {username: string, password: string} = req.body;

  const userCreated: boolean = await user.createUser(username, password);

  if (userCreated) return res.sendStatus(201);

  // Not acceptable
  return res.sendStatus(406);
});


export default routesUser;