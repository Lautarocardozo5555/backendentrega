import ServicesDAO from "../dao/services.dao.js";

export default class ServicesRepository{
    constructor() {
        this.dao = new ServicesDAO()
    }
    async getAllServices() {
        return await this.dao.getServices()
    }

    async getServiceById(id) {
        return await this.dao.getServiceById(id)
    }

    async createService(data) {
        return await this.dao.createService(data)
    }

    async updateService(id, update) {
        return await this.dao.updateService(id, update)
    }

    async deleteService(id) {
        return await this.dao.deleteService(id)
    }
}
