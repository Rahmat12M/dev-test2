import type Users from "@/db/models/Users";
import type { Request } from "express";

/**
 * 
 */
export type UserDB = {
  username: string,
  password: string
}

export type BookDB = {
  name: string,
  isbn: string,
  author: string
}

/**
 * 
 */
export interface RequestUser extends Request {
  user?: Users;
}