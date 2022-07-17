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

export async function getAllCredentials(userId: number) {
  const allCredentials =  await credentialsRepository.getAllCredentialsByUserId(userId)
  const decryptedCredentials = allCredentials.map(item => item.password = encryptServices.decrypt(item.password))
  return decryptedCredentials;
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
      message: "Credential not found, or you don't have ownership over this credential"
    }
  }
  await credentialsRepository.deleteCredentialById(userId, credentialId)
}