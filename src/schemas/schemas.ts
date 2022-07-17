import joi from "joi"

export const UserSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(3).required()
})