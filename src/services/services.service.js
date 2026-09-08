import ServicesRepository from "../repositories/services.repository.js";

export default class ServicesService {
    constructor() {
        this.repository = new ServicesRepository();
}

    async getAllServices() {
        return await this.repository.getAllServices();
}

    async getServiceById(id) {
        const service = await this.repository.getServiceById(id);
        if (!service) {
        throw new Error("Servicio no encontrado");
    }
    return service;
}

    async createService(data) {
        const { name, description, price, category, duration, available } = data;

    if (!name || !description || !price || !category || !duration || available === undefined) {
        throw new Error("Todos los campos son obligatorios");
    }

    return await this.repository.createService(data);
}

    async updateService(id, update) {
        const service = await this.repository.getServiceById(id);
    if (!service) {
        throw new Error("Servicio no encontrado");
    }

    delete update.id; 
    return await this.repository.updateService(id, update);
}

    async deleteService(id) {
        const service = await this.repository.getServiceById(id);
    if (!service) {
        throw new Error("Servicio no encontrado");
    }
    return await this.repository.deleteService(id);
}
}
