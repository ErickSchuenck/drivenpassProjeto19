import { Router } from "express";
import { cardSchema } from "../schemas/schemas.js";
import { validateSchema } from "../middlewares/validateSchema.js"
import { validateToken } from "../middlewares/validateToken.js";
import { registerCard } from "../controllers/cardsController.js";


const cardRouter = Router();
cardRouter.post("/card", validateToken, validateSchema(cardSchema), registerCard);

export default cardRouter;