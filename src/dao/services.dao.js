import fs from "fs/promises";
const path = "./src/data/services.json";

export default class ServicesDAO {
    async getAll() {
        const data = await fs.readFile(path, "utf-8");
        return JSON.parse(data);
}

    async getById(id) {
        const services = await this.getAll();
        return services.find(s => s.id === id);
}

    async create(service) {
        const services = await this.getAll();
        service.id = services.length + 1;
        services.push(service);
        await fs.writeFile(path, JSON.stringify(services, null, 2));
        return service;
}

    async update(id, data) {
        const services = await this.getAll();
        const index = services.findIndex(s => s.id === id);
        if (index === -1) return null;
        services[index] = { ...services[index], ...data };
        await fs.writeFile(path, JSON.stringify(services, null, 2));
        return services[index];
}

    async delete(id) {
        const services = await this.getAll();
        const filtered = services.filter(s => s.id !== id);
        await fs.writeFile(path, JSON.stringify(filtered, null, 2));
        return true;
}
}
