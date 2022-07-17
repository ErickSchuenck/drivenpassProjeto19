import joi from "joi"

export const UserSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(10).required()
})

export const credentialsSchema = joi.object({
    url: joi.string().uri().required(),  
    title: joi.string().required(),
    userName: joi.string().required(),
    password: joi.string().required(),
    ownerId: joi.number().required()
});