import Message from "../models/message.model.js";

export default class MessagesRepository {
    async createMessage(data) {
        const newMessage = new Message(data);
        return await newMessage.save();
    }

    async getAll() {
        return await Message.find().lean();
    }
}

