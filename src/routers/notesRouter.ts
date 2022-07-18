import { Router } from "express";
import {validateSchema} from "../middlewares/validateSchema.js"
import { notesSchema } from "../schemas/schemas.js";
import {registerNote, getRoutes} from "../controllers/notesController.js"
import { validateToken } from "../middlewares/validateToken.js";

const notesRouter = Router();
notesRouter.post("/notes", validateToken, validateSchema(notesSchema), registerNote);
notesRouter.get("/notes", validateToken, getRoutes);

export default notesRouter;