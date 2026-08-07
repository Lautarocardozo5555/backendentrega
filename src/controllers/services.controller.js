import ServiceManager from '../managers/ServiceManager.js';

const serviceManager = new ServiceManager();
//obtener todos los servicios
export const getServices = (req, res) => {
    res.json(serviceManager.getServices());
};
//obtener un servicio especifico por id
export const getServiceById = (req, res) => {
    const id = parseInt(req.params.sid);
    const service = serviceManager.getServiceById(id);
    if (!service) return res.status(404).json({ error: 'Servicio no encontrado' });
    res.json(service);
};
//Crear un nuevo servicio
export const createService = (req, res) => {
    const { name, description, duration, price, category, available } = req.body;
    const missingFields = [];
    if (!name) missingFields.push('name');
    if (!description) missingFields.push('description');
    if (!duration) missingFields.push('duration');
    if (!price) missingFields.push('price');
    if (!category) missingFields.push('category');
    if (available === undefined) missingFields.push('available');

    if (missingFields.length > 0) {
    return res.status(400).json({ error: `Faltan campos obligatorios: ${missingFields.join(', ')}` });
}

    const newService = serviceManager.addService({ name, description, duration, price, category, available });
    res.status(201).json(newService);
};
//actualizar un servicio existente
export const updateService = (req, res) => {
    const id = parseInt(req.params.sid);
    const updated = serviceManager.updateService(id, req.body);
    if (!updated) return res.status(404).json({ error: 'Servicio no encontrado' });
    res.json(updated);
};
//eliminar un servicio
export const deleteService = (req, res) => {
    const id = parseInt(req.params.sid);
    const deleted = serviceManager.deleteService(id);
    if (!deleted) return res.status(404).json({ error: 'Servicio no encontrado' });
    res.json(deleted);
};
