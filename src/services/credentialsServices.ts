import { selectCredentialByTitleRestrictedByOwnersId } from "../repositories/credentialsRepository.js";
import * as encryptServices from "./encryptServices.js"
import * as credentialsRepository from "../repositories/credentialsRepository.js"


export type credentialType = {
  url : string;
  title : string; 
  userName : string;
  password : string;
  userId : number
}


export async function createCredential(data : credentialType){
  const {url, title, userName, password, userId} = data;
  await checkIfCredentialIsUnique(title, userId);
  const encriptedPassword = encryptServices.encrypt(password)
  await credentialsRepository.insertCredential(url, title, userName, encriptedPassword, userId);
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

export async function getAllCredentials(userId: number) {
  let allCredentials =  await credentialsRepository.getAllCredentialsByUserId(userId)
  allCredentials.map(item => item.password = encryptServices.decrypt(item.password))
  return allCredentials;
}

export async function getCredentialById(userId: number, credentialId : number) {
  const credential = await credentialsRepository.getCredentialById(userId, credentialId);
  if (!credential) {
    throw {
      status: 404,
      type: 'Not Found',
      message: 'Credential not found'
    }
  }
  const {id, ownerId, password, title, url, userName} = credential;
  const decryptedPassword = encryptServices.decrypt(password)
  const decryptedCredential = {id, ownerId, decryptedPassword, title, url, userName}
  return decryptedCredential;
}

export async function deleteCredentialById(userId : number, credentialId : number) {
  const credential = await credentialsRepository.getCredentialById(userId, credentialId);
  if (!credential) {
    throw {
      status: 404,
      type: 'Not Found',
      message: "Credential not found"
    }
  }
  if (credential.ownerId !== userId){
    throw {
      status: 401,
      type: 'Unathorized',
      message: "You have no ownership over this credential"
    }
  }
  await credentialsRepository.deleteCredentialById(credentialId)
}