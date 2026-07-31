import fs from "fs";
import path from "path";

const serviceFile = path.resolve('src/data/services.json')

export default class ServiceManager {
    constructor() {
        this.file = serviceFile
        //si el archivo no existe, lo crea vacio
        if(!fs.existsSync(this.file)) {
            fs.writeFileSync(this.file, JSON.stringify([]))
        }

}
getServices() {
    const data = fs.readFileSync(this.file, 'utf-8');
    return JSON.parse(data);
}

getServiceById(id) {
    const services = this.getServices();
    return services.find(s => s.id === id);
}

addService(service) {
    const services = this.getServices();
    const newService = { id: services.length + 1, ...service };
    services.push(newService);
    fs.writeFileSync(this.file, JSON.stringify(services, null, 2));
    return newService;
}

updateService(id, update) {
    const services = this.getServices();
    const index = services.findIndex(s => s.id === id);
    if (index === -1) return null;
    services[index] = { ...services[index], ...update, id };
    fs.writeFileSync(this.file, JSON.stringify(services, null, 2));
    return services[index];
}

deleteService(id) {
    const services = this.getServices();
    const index = services.findIndex(s => s.id === id);
    if (index === -1) return null;
    const deleted = services.splice(index, 1)[0];
    fs.writeFileSync(this.file, JSON.stringify(services, null, 2));
    return deleted;
}
}
