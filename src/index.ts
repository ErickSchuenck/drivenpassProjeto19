import express, { json } from "express";
import cors from "cors"
import "express-async-errors";
import errorHandler from "./middlewares/errorHandlerMiddleware.js";
import router from "./routers/index.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(json());
app.use(router);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});
