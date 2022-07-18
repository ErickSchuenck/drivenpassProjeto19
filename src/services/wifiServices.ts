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
  const allWifis = await wifiRepository.getAllWifisByUserId(userId)
  allWifis.map(wifi=> wifi.password = encryptServices.decrypt(wifi.password))
  return allWifis
}

export async function getWifiById(userId : number, wifiId : number) {
  const wifi = await wifiRepository.getWifiById(userId, wifiId);
  if (!wifi) {
    throw {
      status: 404,
      type: 'Not Found',
      message: 'Wifi not found, please double check the id input'
    }
  }
  const decryptedWifiPassword = encryptServices.decrypt(wifi.password)
  return {...wifi, password : decryptedWifiPassword};
}

export async function deleteWifiById(userId : number, wifiId : number){
  const wifi = await wifiRepository.getWifiById(userId, wifiId);
  if (!wifi) {
    throw {
      status: 404,
      type: 'Not Found',
      message: 'Wifi not found, please double check the id input'
    }
  }
  if (wifi.ownerId !== userId){
    throw {
      status: 401,
      type: 'Unathorized',
      message: "You have no ownership over this wifi register"
    }
  }
  await wifiRepository.deleteWifiById(wifiId)
}
