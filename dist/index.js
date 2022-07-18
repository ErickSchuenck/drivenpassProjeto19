import express, { json } from "express";
import cors from "cors";
import "express-async-errors";
import errorHandler from "./middlewares/errorHandlerMiddleware.js";
import router from "./routers/index.js";
import dotenv from "dotenv";
dotenv.config();
var app = express();
app.use(cors());
app.use(json());
app.use(router);
app.use(errorHandler);
var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Server up and running on port ".concat(port));
});
