import * as wifiRepository from "../repositories/wifiRepository.js"
import * as encryptServices from "./encryptServices.js"

export async function registerWifi(title : string, userName : string, password : string, userId : number) {
  await checkForWifiUniqueness(userId, title);
  const encryptedPassword = encryptServices.encrypt(password);
  wifiRepository.registerWifi(title, userName, encryptedPassword, userId)
}

async function checkForWifiUniqueness(userId : number, title : string){
  const wifi = await wifiRepository.findWifi(userId, title)
  if (wifi) {
    throw {
      status: 409,
      type: 'Conflict',
      message: 'You already created a wifi with this title'
    }
  }
}

export async function getAllWifisByUserId(userId : number){
  const allNotes = await wifiRepository.getAllWifisByUserId(userId)
  return allNotes
}