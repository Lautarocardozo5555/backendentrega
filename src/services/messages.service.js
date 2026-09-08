import MessagesRepository from "../repositories/messages.repository.js";

export default class MessagesService {
    constructor() {
        this.repository = new MessagesRepository();
}

    async createMessage(data) {
        const { user, text } = data;

    if (!user || !text) {
        throw new Error("Todos los campos del mensaje son obligatorios");
    }

    return await this.repository.createMessage(data);
}

    async getMessages() {
        return await this.repository.getAll();
}
}
