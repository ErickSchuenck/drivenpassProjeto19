import * as cardRepository from "../repositories/cardsRepository.js"
import * as encryptServices from "./encryptServices.js"

interface data {
    title: string, 
    name: string,
    number : string, 
    expirationDate: string,
    cvc: string,
    password : string,
    isVirtual : boolean,
    type : 'CREDIT' | "DEBIT" | 'BOTH',
    ownerId : number
}

export async function registerCard(data : data) {
  const {title, name, number, expirationDate, cvc, password, isVirtual, type, ownerId} = data
  await checkIfCardIsUnique(title, ownerId);
  const encryptedPassword = encryptServices.encrypt(password)
  const encryptedCVC = encryptServices.encrypt(cvc)
  const insertData = {title, name, number, expirationDate, encryptedCVC, encryptedPassword, isVirtual, type, ownerId}
  await cardRepository.insertCard(insertData)
}

async function checkIfCardIsUnique(title : string, userId : number) {
  const cardAlreadyExists = await cardRepository.selectCardRestrictedByOwnersId(userId, title);
  if (cardAlreadyExists) {
    throw {
      status: 400,
      type: "bad request",
      message: "Card already exists"
    }
  }
}