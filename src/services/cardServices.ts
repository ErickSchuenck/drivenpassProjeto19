import * as cardsRepository from "../repositories/cardsRepository.js"
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
  await cardsRepository.insertCard(insertData)
}

async function checkIfCardIsUnique(title : string, userId : number) {
  const cardAlreadyExists = await cardsRepository.selectCardRestrictedByOwnersId(userId, title);
  if (cardAlreadyExists) {
    throw {
      status: 400,
      type: "bad request",
      message: "Card already exists"
    }
  }
}

export async function getAllCards(userId : number) {
  const allCards =  await cardsRepository.getAllCardsByUserId(userId)
  allCards.map(card => {
        card.password = encryptServices.decrypt(card.password)
        card.cvc = encryptServices.decrypt(card.cvc)
      })
  return allCards;
}

export async function getCardById(userId : number, cardId : number) {
  const card = await cardsRepository.getCardById(userId, cardId);
  if (!card) {
    throw {
      status: 404,
      type: 'Not Found',
      message: 'Card not found, please double check the id input'
    }
  }
  const decryptedCard = decryptCard(card)
  return decryptedCard;
}

export async function deleteCardById(userId : number, cardId : number) {
  const card = await cardsRepository.getCardById(userId, cardId);
  if (!card) {
    throw {
      status: 404,
      type: 'Not Found',
      message: 'Card not found, please double check the id input'
    }
  }
  if (card.ownerId !== userId){
    throw {
      status: 401,
      type: 'Unathorized',
      message: "You have no ownership over this card"
    }
  }
  await cardsRepository.deleteCardById(cardId)
}

function decryptCard(card : data){
  const {title, name, number, expirationDate, cvc, password, isVirtual, type, ownerId} = card
  const decryptedPassword = encryptServices.decrypt(password)
  const output = {title, name, number, expirationDate, cvc, decryptedPassword, isVirtual, type, ownerId}
  return output
}