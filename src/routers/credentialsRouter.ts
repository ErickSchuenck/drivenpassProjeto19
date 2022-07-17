import { Router } from "express";
import {validateSchema} from "../middlewares/validateSchema.js"
import { createCredentialsSchema } from "../schemas/schemas.js";
import { createCredential, getCredentials } from "../controllers/credentialsController.js"
import { validateToken } from "../middlewares/validateToken.js";

const credentialsRouter = Router();
credentialsRouter.post("/createCredential", validateSchema(createCredentialsSchema), validateToken, createCredential );
credentialsRouter.get("/credentials", validateToken, getCredentials)
export default credentialsRouter;