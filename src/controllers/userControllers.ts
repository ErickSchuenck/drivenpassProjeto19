import { Request, Response } from "express";
import * as userService from "../services/userService.js"

export async function registerUser (req: Request, res: Response) {
  const data = req.body;
  await userService.registerUser(data);
  res.sendStatus(201);
}