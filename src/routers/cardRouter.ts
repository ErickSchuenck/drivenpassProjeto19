import { Router } from "express";
import { cardSchema } from "../schemas/schemas.js";
import { validateSchema } from "../middlewares/validateSchema.js"
import { validateToken } from "../middlewares/validateToken.js";
import { registerCard, getAllCards, getCardById, deleteCardById } from "../controllers/cardsController.js";


const cardRouter = Router();
cardRouter.post("/card", validateToken, validateSchema(cardSchema), registerCard);
cardRouter.get("/card", validateToken, getAllCards);
cardRouter.get("/card/:cardId", validateToken, getCardById);
cardRouter.delete("/card/:cardId", validateToken, deleteCardById);


export default cardRouter;