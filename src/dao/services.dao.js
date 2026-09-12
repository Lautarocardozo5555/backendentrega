import Service from "../models/service.model.js";

export default class ServicesDAO {
    async getServices() {
        return await Service.find().lean();
}

    async getServiceById(id) {
        return await Service.findById(id).lean();
}

    async createService(data) {
        const newService = new Service(data);
        return await newService.save();
}

    async updateService(id, update) {
        return await Service.findByIdAndUpdate(id, update, { new: true }).lean();
}

    async deleteService(id) {
        return await Service.findByIdAndDelete(id).lean();
}
}
