import ServicesService from "../services/services.service.js";

const service = new ServicesService();

export const getServices = async (req, res) => {
try {
    const result = await service.getAdvancedServices(req.query);
    res.status(200).json(result);
} catch (error) {
    res.status(500).json({ status: "error", message: error.message });
}
};

export const getServiceById = async (req, res) => {
try {
    const { sid } = req.params;
    const serviceFound = await service.getServiceById(sid);
    res.status(200).json({ status: "success", payload: serviceFound });
} catch (error) {
    res.status(404).json({ status: "error", message: error.message });
}
};

export const createService = async (req, res) => {
try {
    const newService = await service.createService(req.body);
    res.status(201).json({ status: "success", payload: newService });
} catch (error) {
    res.status(400).json({ status: "error", message: error.message });
}
};

export const updateService = async (req, res) => {
try {
    const { sid } = req.params;
    const updated = await service.updateService(sid, req.body);
    res.status(200).json({ status: "success", payload: updated });
} catch (error) {
    res.status(404).json({ status: "error", message: error.message });
}
};

export const deleteService = async (req, res) => {
try {
    const { sid } = req.params;
    await service.deleteService(sid);
    res.status(200).json({ status: "success", message: "Servicio eliminado" });
} catch (error) {
    res.status(404).json({ status: "error", message: error.message });
}
};
