import { Request, Response } from "express";
import * as credentialsServices from "../services/credentialsServices.js"

export async function createCredential(req: Request, res: Response) {
  const userId = parseInt(res.locals.userId);
  const data = {userId, ...req.body};
  await credentialsServices.createCredential(data);
  res.sendStatus(201)
}

export async function getCredentials(req: Request, res: Response) {
  const userId = parseInt(res.locals.userId);
  const allCredentials = await credentialsServices.getAllCredentials(userId);
  res.status(200).send(allCredentials)
}

export async function getCredentialById(req: Request, res: Response) {
  const userId = parseInt(res.locals.userId);
  const credentialId = parseInt(req.params.credentialId);
  const credential = await credentialsServices.getCredentialById(userId, credentialId);
  res.status(200).send(credential)
}

export async function deleteCredentialById(req: Request, res: Response) {
  const userId = parseInt(res.locals.userId);
  const credentialId = parseInt(req.params.credentialId);
  await credentialsServices.deleteCredentialById(userId, credentialId);
  res.sendStatus(200)
}
