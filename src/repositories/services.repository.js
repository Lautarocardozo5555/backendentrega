import ServicesDAO from "../dao/services.dao.js";

const serviceDAO = new ServicesDAO()

export const getAllServices = async () => {
    return await serviceDAO.getService()
}

export const getServiceById = async (id) => {
    return await serviceDAO.getServiceById(id)
} 

export const createService = async (data) => {
    return await serviceDAO.createService(data)
}

export const updateService = async (id, data) => {
    return await serviceDAO.updateService(id,data)
}

export const deleteService = async (id) => {
    return await serviceDAO.deleteService(id)
}