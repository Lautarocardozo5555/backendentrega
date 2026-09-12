import Message from "../models/message.model.js";

export default class MessagesDAO {
    async createMessage(data) {
        const newMessage = new Message(data);
        return await newMessage.save();
}

    async getMessages() {
        return await Message.find().lean();
}
}
