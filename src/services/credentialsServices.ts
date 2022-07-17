import { selectCredentialByTitle } from "../repositories/credentialsRepository.js";


export type credentialType = {
  url : string;
  title : string; 
  userName : string;
  password : string;
  ownerId : number
}


export async function createCredential(data : credentialType){
  const {title} = data;
  checkIfCredentialIsUnique(title);
}

async function checkIfCredentialIsUnique(title : string) {
  const credentialAlreadyExists = await selectCredentialByTitle(title);
  if (credentialAlreadyExists) {
    throw {
      status: 400,
      type: "bad request",
      message: "credential already exists"
    }
  }
}