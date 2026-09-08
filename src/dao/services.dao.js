import Service from "../models/service.model.js";

export default class ServicesDAO {
    async getServices() {
        return await Service.find();
}

    async getServiceById(id) {
        return await Service.findById(id);
}

    async createService(data) {
        const newService = new Service(data);
        return await newService.save();
}

    async updateService(id, update) {
        return await Service.findByIdAndUpdate(id, update, { new: true });
}

    async deleteService(id) {
        return await Service.findByIdAndDelete(id);
}
}
