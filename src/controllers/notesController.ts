import { Request, Response } from "express";
import * as notesServices from "../services/notesServices.js"


export async function registerNote(req: Request, res: Response) {
  const {userId} = res.locals;
  const {content, title} = req.body;
  await notesServices.registerNote(userId, content, title)
  res.sendStatus(201);
}

export async function getRoutes(req: Request, res: Response) {
  const {userId} = res.locals;
  const allNotes = await notesServices.getAllNotes(userId);
  res.status(200).send(allNotes)
}