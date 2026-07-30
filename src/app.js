import express from "express";
import servicesRouter from "./routes/services.router.js";

const app = express();

// Middlewares globales
app.use(express.json());

// Routers
app.use("/api/services", servicesRouter);

export default app;

