import fs from "fs/promises"

export default class ServicesDAO {
    constructor(){
        this.path = "./src/data/services.json"
    }

    async getServices() {
        const data = await fs.readFile(file, "utf-8")
        return JSON.parse(data)
    }

    async getServiceById(id) {
        const services = await this.getServices()
        return services.find(s => s.id === Number(id))
    }

    async createService(service) {
        const services = await this.getServices()
        const newService = {id:services.length + 1, ...service }
        services.push(newService)
        await fs.writeFile(this.path, JSON.stringify(services, null, 2))
        return newService
    }
    async updateService (id, data) {
        const services = await this.getServices()
        const index = services.findIndex(s => s.id === Number(id))
        if(index === -1) return null 
        services[index] = {...services[index], ...data, id}
        await fs.writeFile(this.path, JSON.stringify(services, null, 2))
        return services[index]
    }
    async deleteService (id) {
        const services = await this.getServices()
        const index = services.findIndex(s => s.id === id)
        if(index === -1 ) return null 
        const deleted = services.splice(index, 1)[0]
        await fs.writeFile(this.path, JSON.stringify(services, null, 2))
        return deleted
    }
}