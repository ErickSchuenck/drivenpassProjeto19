import * as userRepository from "../repositories/userRepository.js"
import * as encryptServices from "./encryptServices.js"
import jwt from "jsonwebtoken"

export async function registerUser(data : {email : string, encryptedPassword : string}) {
  await verifyIfUserIsUnique(data.email)
  await userRepository.insertUser(data)
}

export async function login(data : {email : string, password : string}) {
  const {email, password} = data;
  const user = await userRepository.getUserFromDb(email)
  encryptServices.compare(user.password, password)
  const token = jwt.sign(`${user.id}`, process.env.JWT_SECRET as string)
  return token;
}

async function verifyIfUserIsUnique(email : string) {
  const userAlreadyExits = await userRepository.getUserFromDb(email)
  if (userAlreadyExits) {
    throw { 
      status: 409,
      type: "Conflict", 
      message: "This user is already registered" 
    }
  }
}