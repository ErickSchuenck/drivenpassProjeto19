import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();
var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Server up and running on port ".concat(port));
});
