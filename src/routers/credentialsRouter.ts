import { Router } from "express";
import {validateSchema} from "../middlewares/validateSchema.js"
import { createCredentialsSchema } from "../schemas/schemas.js";
import { createCredential, getCredentials, getCredentialById, deleteCredentialById } from "../controllers/credentialsController.js"
import { validateToken } from "../middlewares/validateToken.js";

const credentialsRouter = Router();
credentialsRouter.post("/credentials", validateSchema(createCredentialsSchema), validateToken, createCredential );
credentialsRouter.get("/credentials", validateToken, getCredentials)
credentialsRouter.get("/credentials/:credentialId", validateToken, getCredentialById)
credentialsRouter.delete("/credentials/:credentialId", validateToken, deleteCredentialById)
export default credentialsRouter;