import prisma from "../config/database.js"

export async function getUserFromDb(email : string){
  const result = await prisma.users.findUnique({where: {email: email}})
  return result
}

export async function insertUser(data : {email : string, encryptedPassword : string}) {
  const {encryptedPassword, email} = data
  await prisma.users.create({
        data:{
            email,
            password : encryptedPassword,
        }
    });
}