import MessagesService from "../services/messages.service.js";
import { io } from "../server.js"

const messageService = new MessagesService();

export const getMessages = async (req, res) => {
try {
    const messages = await messageService.getAllMessages();
    res.status(200).json({ status: "success", payload: messages });
} catch (error) {
    res.status(500).json({ status: "error", message: "Error al obtener los mensajes" });
}
};

export const createMessage = async (req, res) => {
try {
    const { user, text } = req.body;
    const newMessage = await messageService.createMessage({user, text})
    io.emit("newMessage", newMessage)

    res.status(201).json({ status: "success", payload: newMessage });
}catch (error) {
    res.status(400).json({ status: "error", message: error.message });
}
};