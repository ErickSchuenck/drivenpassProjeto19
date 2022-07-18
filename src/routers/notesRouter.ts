import { Router } from "express";
import {validateSchema} from "../middlewares/validateSchema.js"
import { notesSchema } from "../schemas/schemas.js";
import {registerNote} from "../controllers/notesController.js"

const notesRouter = Router();
notesRouter.post("/notes", validateSchema(notesSchema), registerNote);

export default notesRouter;