import { Router } from "express";
import accessRouter from "./accessRouter.js";
import credentialsRouter from "./credentialsRouter.js";
import notesRouter from "./notesRouter.js";
import cardRouter from "./cardRouter.js"
import wifiRouter from "./wifiRouter.js";

const router = Router();
router.use(accessRouter);
router.use(credentialsRouter);
router.use(notesRouter);
router.use(cardRouter);
router.use(wifiRouter);

export default router;