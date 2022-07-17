import { Router } from "express";
import {validateSchema} from "../middlewares/validateSchema.js"
import { UserSchema } from "../schemas/schemas.js";
import {registerUser} from "../controllers/userControllers.js"

const accessRouter = Router();
accessRouter.post("/signUp", validateSchema(UserSchema), registerUser);
accessRouter.post("/signIn", validateSchema(UserSchema), )

export default accessRouter;