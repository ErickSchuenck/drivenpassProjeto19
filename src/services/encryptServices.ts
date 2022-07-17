import Cryptr from "cryptr"
import bcrypt from "bcrypt"
const saltRounds = 10;

const cryptr = new Cryptr(process.env.SECRET as string);

export function encrypt(password : string){
  return cryptr.encrypt(password)
}

export function decrypt(password : string){
  return cryptr.decrypt(password)
}

export function compare(password : string, encryptedPassword : string){
  const verification = bcrypt.compareSync(password, encryptedPassword)
  if (!verification) {
    throw {
      status: 401,
      type: "Unauthorized", 
      message: "Incorrect password, please double check the input"
    }
  }
}

export function hash(password : string){
  return bcrypt.hashSync(password, saltRounds)
}
