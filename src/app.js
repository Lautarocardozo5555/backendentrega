import express from "express";
import servicesRouter from "./routes/services.router.js";
import bookingsRouter from "./routes/bookings.router.js"
import messagesRouter from "./routes/messages.router.js"

const app = express();

// Middlewares globales
app.use(express.json());

// Routers
app.use("/api/services", servicesRouter);
app.use("/api/bookings", bookingsRouter)
app.use("/api/messages", messagesRouter);

export default app;

