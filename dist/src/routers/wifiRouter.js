import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { wifiSchema } from "../schemas/schemas.js";
import { registerWifi, getAllWifisByUserId, getWifiById, deleteWifiById } from "../controllers/wifiController.js";
import { validateToken } from "../middlewares/validateToken.js";
var wifiRouter = Router();
wifiRouter.post("/wifi", validateToken, validateSchema(wifiSchema), registerWifi);
wifiRouter.get("/wifi", validateToken, getAllWifisByUserId);
wifiRouter.get("/wifi/:wifiId", validateToken, getWifiById);
wifiRouter["delete"]("/wifi/:wifiId", validateToken, deleteWifiById);
export default wifiRouter;
