import express from "express";
import handlebars from "express-handlebars"
import path from "path"
import { fileURLToPath } from "url";
import servicesRouter from "./routes/services.router.js";
import bookingsRouter from "./routes/bookings.router.js"
import messagesRouter from "./routes/messages.router.js"
import viewsRouter from "./routes/views.router.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express();

//configuracion de handlebars
app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"))

// Middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routers
app.use("/api/services", servicesRouter);
app.use("/api/bookings", bookingsRouter)
app.use("/api/messages", messagesRouter);
app.use("/views", viewsRouter)
export default app;

