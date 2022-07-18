import { cards } from "@prisma/client"
import prisma from "../config/database.js"

interface insertData {
    title: string, 
    name: string,
    number : string, 
    expirationDate: string,
    encryptedCVC: string,
    encryptedPassword : string,
    isVirtual : boolean,
    type : 'CREDIT' | "DEBIT" | 'BOTH',
    ownerId : number
}

export async function selectCardRestrictedByOwnersId(userId : number, title : string) {
  const card = await prisma.cards.findFirst({ 
        where: {
            title : title,
            ownerId: userId   
        }
    })
    return card
}

export async function insertCard(data : insertData) {
    const {title, name, number, expirationDate, encryptedCVC, encryptedPassword, isVirtual, type, ownerId} = data
    await prisma.cards.create({
        data: {
            title, 
            name, 
            number, 
            expirationDate, 
            cvc : encryptedCVC, 
            password : encryptedPassword, 
            isVirtual, 
            type : type, 
            ownerId
        }
    })
}

export async function getAllCardsByUserId(userId : number) {
    const result = await prisma.cards.findMany({
        where: {
            ownerId: userId,
        }
    });
    return result;
}

export async function getCardById(userId : number, cardId : number) {
    const result = await prisma.cards.findFirst({
        where: {
            id: cardId,
            ownerId: userId
        }
    });
  return result;
}