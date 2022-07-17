import { Router } from "express";
import accessRouter from "./accessRouter.js";
import credentialsRouter from "./credentialsRouter.js";

const router = Router();
router.use(accessRouter);
router.use(credentialsRouter);

export default router;