import { Request, Response } from "express";
import * as credentialsServices from "../services/credentialsServices.js"

export async function createCredential(req: Request, res: Response) {
  const data = req.body;
  await credentialsServices.createCredential(data);
  res.sendStatus(201)
}