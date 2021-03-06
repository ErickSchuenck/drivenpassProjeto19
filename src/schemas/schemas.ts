import joi from "joi"

export const UserSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(10).required()
})

export const createCredentialsSchema = joi.object({
    url: joi.string().required(),  
    title: joi.string().required(),
    userName: joi.string().required(),
    password: joi.string().required(),
});

export const notesSchema = joi.object({
  title: joi.string().max(50).required(),
  content: joi.string().max(1000).required()
})

export const cardSchema = joi.object({
  title: joi.string().required(),
  name: joi.string().required(),
  number: joi.string().length(23).pattern(/^[0-9]{5}\s[0-9]{5}\s[0-9]{5}\s[0-9]{5}$/).required(),
  expirationDate: joi.string().pattern(/^((0[1-9])|(1[0-2]))\/(\d{2})|((0[1-9])|(1[0-2]))\-(\d{2})$/).required(),
  cvc: joi.string().pattern(/[0-9]$/).min(3).max(3).required(),
  password: joi.string().pattern(/[0-9]$/).min(4).max(6).required(),
  isVirtual: joi.boolean().required(),
  type: joi.string().valid('CREDIT', 'DEBIT', 'BOTH').required()
})

export const wifiSchema = joi.object({
  title: joi.string().required(),
  userName: joi.string().required(),
  password: joi.string().required()
})