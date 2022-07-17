import { Request, Response } from "express";
import * as userService from "../services/userService.js"
import * as encryptServices from "../services/encryptServices.js"

export async function registerUser (req: Request, res: Response) {
  const {password, email} : {password : string, email : string}= req.body;
  const encryptedPassword = encryptServices.hash(password)
  const data = {encryptedPassword, email}
  await userService.registerUser(data);
  res.sendStatus(201);
}

export async function login(req: Request, res: Response) {
  const {password, email} : {password : string, email : string}= req.body;
  
}