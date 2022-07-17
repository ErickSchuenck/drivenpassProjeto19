import prisma from "../config/database.js"

export async function selectCredentialByTitleRestrictedByOwnersId( userId : number, title: string) {
    const credential = await prisma.credentials.findFirst({ 
        where: {
            title : title,
            ownerId: userId   
        }
    })
    return credential
}

export async function insertCredential( url : string, title : string, userName : string, password : string, ownerId : number) {
    await prisma.credentials.create({
        data: {
            url,
            title,
            userName,
            password,
            ownerId,
        }
    })
}