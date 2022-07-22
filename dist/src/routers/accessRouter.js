import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { UserSchema } from "../schemas/schemas.js";
import { registerUser, login } from "../controllers/userControllers.js";
var accessRouter = Router();
accessRouter.post("/signUp", validateSchema(UserSchema), registerUser);
accessRouter.post("/signIn", validateSchema(UserSchema), login);
export default accessRouter;
