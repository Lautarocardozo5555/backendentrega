import app from "./app.js";
import dotenv from "dotenv"
import { connectDB } from "./config/db.config.js";

dotenv.config()

connectDB()

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
