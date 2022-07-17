import { Router } from "express";
import accessRouter from "./accessRouter.js";

const router = Router();
router.use(accessRouter);

export default router;