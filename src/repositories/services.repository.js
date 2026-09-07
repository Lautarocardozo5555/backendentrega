import ServicesDAO from "../dao/services.dao.js";

const serviceDAO = new ServicesDAO()

export const getAllServices = async () => {
    return await serviceDAO.getAll()
}

export const getServiceById = async (id) => {
    return await serviceDAO.getById(id)
} 

export const createService = async (data) => {
    return await serviceDAO.create(data)
}

export const updateService = async (id, data) => {
    return await serviceDAO.update(id,data)
}

export const deleteService = async (id) => {
    return await serviceDAO.delete(id)
}