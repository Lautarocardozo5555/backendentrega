import fs from "fs";

export class ServiceManager {
    constructor(filePath) {
    this.filePath = filePath;
    this.services = this.loadServices();
    this.nextId = this.services.length > 0 ? Math.max(...this.services.map(s => s.id)) + 1 : 1;
}

    loadServices() {
    try {
        const data = fs.readFileSync(this.filePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error al cargar servicios:", error);
        return [];
    }
}

    saveServices() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.services, null, 2));
}

  // Devuelve todos los servicios
    getServices() {
    return this.services;
}

  // Devuelve un servicio por id
    getServiceById(id) {
    return this.services.find(s => s.id === id) || null;
}

  // Agrega un servicio nuevo
    addService(serviceData) {
    const requiredFields = ["name", "description", "duration", "price", "category", "available"];
    const missingFields = requiredFields.filter(f => serviceData[f] === undefined);

    if (missingFields.length > 0) {
        throw new Error(`Faltan campos obligatorios: ${missingFields.join(", ")}`);
    }

    const newService = {
        id: this.nextId++,
        ...serviceData
    };

    this.services.push(newService);
    this.saveServices();
    return newService;
}

  // Actualiza un servicio existente
    updateService(id, updatedData) {
    const index = this.services.findIndex(s => s.id === id);
    if (index === -1) {
    return null;
    }

    // No se permite modificar el id
    const { id: _, ...rest } = updatedData;
    this.services[index] = { ...this.services[index], ...rest };
    this.saveServices();
    return this.services[index];
}

  // Elimina un servicio por id
    deleteService(id) {
    const index = this.services.findIndex(s => s.id === id);
    if (index === -1) {
    return null;
    }

    const deleted = this.services.splice(index, 1)[0];
    this.saveServices();
    return deleted;
}
}
