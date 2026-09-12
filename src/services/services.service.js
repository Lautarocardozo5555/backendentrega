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

    async getAdvancedServices(query) {
        const { category, available, durationFilter,
        page = 1, limit = 3, sortBy = "name", order = "asc" } = query;

        const filter = {};
    if (category) filter.category = category;
    if (available !== undefined && available !== "") filter.available = available === "true";

    if (durationFilter === "less30") {
    filter.duration = { $lt: 30 };
}
    if (durationFilter === "greater30") {
    filter.duration = { $gt: 30 };
}

    const sort = {};
    sort[sortBy] = order === "desc" ? -1 : 1;

  const skip = (page - 1) * limit;

    const [docs, totalDocs] = await Promise.all([
    this.repository.getFiltered(filter, sort, skip, limit),
    this.repository.countDocuments(filter)
]);

    const totalPages = Math.ceil(totalDocs / limit);

return {
    payload: docs,
    page: Number(page),
    limit: Number(limit),
    totalDocs,
    totalPages,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages
};
}

}
