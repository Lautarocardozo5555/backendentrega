import ServicesDAO from "../dao/services.dao.js";
import Service from "../models/service.model.js"

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

    async getFiltered(filter, sort, skip, limit) {
    return await Service.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean();
}

    async countDocuments(filter) {
    return await Service.countDocuments(filter);
}
}
