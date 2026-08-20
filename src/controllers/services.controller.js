import * as serviceServices from "../services/services.service.js";


export const getServices = async (req, res) => {
    try{
        const services = await serviceServices.getAllService()
        res.status(200).json({status:"success", payload:services})
    } catch(error) {
        res.status(500).json({status:"error", message: "Error al obtener los servicios"})
    }
}

export const getServiceById = async (req, res) => {
    try{
        const { sid } = req.params
        const service = await serviceServices.getServiceById(Number(sid))

        res.status(200).json({status:"success", payload:service})
    } catch(error) {
        res.status(500).json({status:"errora", message: "Error al obtener el servicio"})
    }
}

export const createService = async (req, res) => {
    try{
        const service = await serviceServices.createService(req.body)
        res.status(201).json({status:"success", payload: service})
    } catch(error) {
        res.status(400).json({status:"error", message: error.message})
    }
}

export const updateService = async (req, res) => {
    try{
        const { sid } = req.params
        const service = await serviceServices.updateService(Number(sid), req.body)
        res.status(200).json({status:"success", payload:service})
    } catch (error) {
        res.status(400).json({status:"error", message: error.message})
    }
}

export const deleteService = async (req, res) => {
    try{
        const { sid } = req.params
        const service = await serviceServices.deleteService(Number(sid))
        res.status(200).json({status:"success", message:"Servicio eliminado"})
    } catch(error){
        res.status(500).json ({status:"error", message:"Error al eliminar el servicio"})
    }
}