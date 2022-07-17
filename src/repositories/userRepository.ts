import prisma from "../config/database.js"

export async function getUserFromDb(email : string){
  const result = await prisma.users.findUnique({where: {email: email}})
  if (!result) { 
    throw {
      status: 404,
      type: 'Not Found',
      message: `Sorry, but the email: ${email} is not registered in our database`
    }
  }
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