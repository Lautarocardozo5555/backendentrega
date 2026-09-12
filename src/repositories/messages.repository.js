import Message from "../models/message.model.js";

export default class MessagesRepository {
    async createMessage(data) {
        const newMessage = new Message(data);
        return await newMessage.save();
    }

    async getAllSorted(order) {
        return await Message.find()
        .sort({timestamp: order === "desc" ? -1 : 1})
        .lean()
    }

    async getFiltered(filter, sort, skip, limit) {
        return await Message.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean()
    }
    
    async countDocuments(filter) {
        return await Message.countDocuments(filter)
    }

}

