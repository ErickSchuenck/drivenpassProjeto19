import { Router } from "express";
import {validateSchema} from "../middlewares/validateSchema.js"
import { credentialsSchema } from "../schemas/schemas.js";
import { createCredential } from "../controllers/credentialsController.js"
import { validateToken } from "../middlewares/validateToken.js";

const credentialsRouter = Router();
credentialsRouter.post("/createCredential", validateSchema(credentialsSchema), validateToken, createCredential );

export default credentialsRouter;