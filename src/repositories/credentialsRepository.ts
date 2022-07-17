import prisma from "../config/database.js"

export async function selectCredentialByTitle(title: string) {
    const credential = await prisma.credentials.findFirst({ where: { title } })
    return credential
}