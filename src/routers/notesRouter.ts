import { Router } from "express";
import {validateSchema} from "../middlewares/validateSchema.js"
import { notesSchema } from "../schemas/schemas.js";
import {registerNote, getAllNotesByUserId, getNoteById, deleteNoteById} from "../controllers/notesController.js"
import { validateToken } from "../middlewares/validateToken.js";

const notesRouter = Router();
notesRouter.post("/notes", validateToken, validateSchema(notesSchema), registerNote);
notesRouter.get("/notes", validateToken, getAllNotesByUserId);
notesRouter.get("/notes/:noteId", validateToken, getNoteById);
notesRouter.delete("/notes/:noteId", validateToken, deleteNoteById);

export default notesRouter;