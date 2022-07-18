import { Request, Response } from "express";
import * as wifiServices from "../services/wifiServices.js"

export async function registerWifi(req: Request, res: Response) {
  const {title, userName, password} : {title : string, userName : string, password : string}= req.body;
  const {userId} = res.locals;
  await wifiServices.registerWifi(title, userName, password, userId)
  res.sendStatus(201);
}

export async function getAllWifisByUserId(req: Request, res: Response) {
  const {userId} = res.locals;
  const allWifis = await wifiServices.getAllWifisByUserId(userId);
  res.status(200).send(allWifis)
}