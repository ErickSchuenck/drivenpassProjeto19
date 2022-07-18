import { Request, Response } from "express";
import * as cardServices from "../services/cardServices.js"


export async function registerCard(req: Request, res: Response) {
  const { userId } = res.locals;
  const ownerId = userId
  const data = {ownerId, ...req.body};
  await cardServices.registerCard(data)
  res.sendStatus(201)
}

export async function getAllCards(req: Request, res: Response) {
  const { userId } = res.locals;
  const allCards = await cardServices.getAllCards(userId);
  res.status(200).send(allCards)
}