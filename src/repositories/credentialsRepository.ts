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

export async function getAllCredentialsByUserId(userId:number) {
    const result = await prisma.credentials.findMany({
        where: {
            ownerId: userId,
        }
    });
    return result;
}

export async function getCredentialById(userId : number, credentialId : number) {
    const result = await prisma.credentials.findFirst({
        where: {
            id: credentialId,
            ownerId: userId
        }
    });
    return result;
}

export async function deleteCredentialById(credentialId : number) {
    await prisma.credentials.delete({
        where: {
            id: credentialId
        }
    })
}