import * as repositories from "../repositories/services.repository.js"

export const getAllService = async () => {
    return await repositories.getAllServices()
}

export const getServiceById = async (id) => {
    return await repositories.getServiceById(id)
}

export const createService = async (data) => {
    const {
        name,
        description,
        price,
        category,
        duration,
        available
    } = data
    if(!name || !description || !price || !category || !duration || available === undefined) {
        throw new Error("Todos los campos son obligatorios")
    }
    return await repositories.createService(data)
}

export const updateService = async(id, data) => {
    const service = await repositories.getServiceById(id)
    if(!service) {
        throw new Error("Servicio no encontrado")
    }
    delete data.id
    return await repositories.updateService(id, data)
}

export const deleteService = async (id) => {
    const service = await repositories.getServiceById(id)
        if(!service) {
        throw new Error("Servicio no encontrado")
    }
    return await repositories.deleteService(id)
}
