import app from "./app.js";
import dotenv from "dotenv"
import { connectDB } from "./config/db.config.js";
import { Server } from "socket.io"

dotenv.config()
connectDB()

const PORT = process.env.PORT || 8080;
//levanto el servidor HTTP
const httpServer = app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})
//configuracion del Socket.IO
const io = new Server(httpServer)

io.on("connection", socket =>{
    console.log("Cliente conectado")
    socket.on("disconnect", ()=> {
        console.log("Cliente desconectado")
    })
})

export { io }