import { selectCredentialByTitleRestrictedByOwnersId } from "../repositories/credentialsRepository.js";
import * as encryptServices from "./encryptServices.js"
import * as credentialsRepository from "../repositories/credentialsRepository.js"


export type credentialType = {
  url : string;
  title : string; 
  userName : string;
  password : string;
  ownerId : number
  userId : number
}


export async function createCredential(data : credentialType){
  const {url, title, userName, password, ownerId, userId} = data;
  await checkIfCredentialIsUnique(title, userId);
  const encriptedPassword = encryptServices.encrypt(password)
  await credentialsRepository.insertCredential(url, title, userName, encriptedPassword, ownerId);
}

async function checkIfCredentialIsUnique(title : string, userId : number) {
  const credentialAlreadyExists = await selectCredentialByTitleRestrictedByOwnersId(userId, title);
  if (credentialAlreadyExists) {
    throw {
      status: 400,
      type: "bad request",
      message: "credential already exists"
    }
  }
}
