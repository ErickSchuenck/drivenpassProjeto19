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

export async function getCardById(req: Request, res: Response) {
  const {userId} = res.locals;
  const cardId = parseInt(req.params.cardId);
  const card = await cardServices.getCardById(userId, cardId)
  res.status(200).send(card)
}

export async function deleteCardById(req: Request, res: Response) {
  const {userId} = res.locals;
  const cardId = parseInt(req.params.cardId);
  await cardServices.deleteCardById(userId, cardId);
  res.sendStatus(200)
}