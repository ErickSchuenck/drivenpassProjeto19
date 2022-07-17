import { Router } from "express";
import {validateSchema} from "../middlewares/validateSchema.js"
import { credentialsSchema } from "../schemas/schemas.js";
import { createCredential } from "../controllers/credentialsController.js"

const credentialsRouter = Router();
credentialsRouter.post("/createCredential", validateSchema(credentialsSchema), createCredential );

export default credentialsRouter;