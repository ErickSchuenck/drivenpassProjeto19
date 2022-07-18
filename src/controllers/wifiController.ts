import { Request, Response } from "express";
import * as wifiServices from "../services/wifiServices.js"

export async function registerWifi(req: Request, res: Response) {
  const {title, userName, password} : {title : string, userName : string, password : string}= req.body;
  const userId  = parseInt(res.locals.userId);
  await wifiServices.registerWifi(title, userName, password, userId)
  res.sendStatus(201);
}

export async function getAllWifisByUserId(req: Request, res: Response) {
  const userId  = parseInt(res.locals.userId);
  const allWifis = await wifiServices.getAllWifisByUserId(userId);
  res.status(200).send(allWifis)
}

export async function getWifiById(req: Request, res: Response) {
  const userId  = parseInt(res.locals.userId);
  const wifiId = parseInt(req.params.wifiId);
  const wifi = await wifiServices.getWifiById(userId, wifiId);
  res.status(200).send(wifi)
}

export async function deleteWifiById(req: Request, res: Response) {
  const userId  = parseInt(res.locals.userId);
  const wifiId = parseInt(req.params.wifiId);
  await wifiServices.deleteWifiById(userId, wifiId);
  res.sendStatus(200)
}