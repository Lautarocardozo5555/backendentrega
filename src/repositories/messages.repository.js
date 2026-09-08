import MessagesDAO from "../dao/messages.dao.js";

export default class MessagesRepository {
    constructor() {
        this.dao = new MessagesDAO();
}

    async createMessage(data) {
        return await this.dao.createMessage(data);
}

    async getAll() {
        return await this.dao.getMessages();
}
}
