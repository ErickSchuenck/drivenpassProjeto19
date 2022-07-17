import { prisma } from "@prisma/client"

export async function registerUser(data : {email : string, password : string}) {
  const userAlreadyExits = await checkUserExistance(data.email)
  if (userAlreadyExits) {
    throw { 
      status: 409,
      type: "Conflict", 
      message: "This user is already registered" 
    }
  }
}

async function checkUserExistance(email : string){
  const result = await prisma.users.findUnique({where: {email: email}})
  return result
}