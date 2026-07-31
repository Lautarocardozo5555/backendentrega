import { Router } from 'express';
import ServiceManager from '../managers/ServiceManager.js';

const router = Router();
const serviceManager = new ServiceManager();

// GET todos los servicios
router.get('/', (req, res) => {
    res.json(serviceManager.getServices());
});

// GET servicio por id
router.get('/:sid', (req, res) => {
    const id = parseInt(req.params.sid);
    const service = serviceManager.getServiceById(id);
    if (!service) return res.status(404).json({ error: 'Servicio no encontrado' });
    res.json(service);
});

// POST crear servicio
router.post('/', (req, res) => {
    const { name, description, duration, price, category, available } = req.body;
    // Array para guardar los campos faltantes
    const missingFields = [];
        if (!name) missingFields.push('name');
        if (!description) missingFields.push('description');
        if (!duration) missingFields.push('duration');
        if (!price) missingFields.push('price');
        if (!category) missingFields.push('category');
        if (available === undefined) missingFields.push('available');
    // Si hay campos faltantes, devolvemos error con detalle
    if(missingFields.length > 0) {
        return res.status(400).json({
            error: `Faltan campos obligatorios: ${missingFields.join(', ')}`
        })
    }
     // Si está todo bien, creamos el servicio
    const newService = serviceManager.addService({ name, description, duration, price, category, available });
    res.status(201).json(newService);
});

// PUT actualizar servicio
router.put('/:sid', (req, res) => {
    const id = parseInt(req.params.sid);
    const updated = serviceManager.updateService(id, req.body);
    if (!updated) return res.status(404).json({ error: 'Servicio no encontrado' });
    res.json(updated);
});

// DELETE eliminar servicio
router.delete('/:sid', (req, res) => {
    const id = parseInt(req.params.sid);
    const deleted = serviceManager.deleteService(id);
    if (!deleted) return res.status(404).json({ error: 'Servicio no encontrado' });
    res.json(deleted);
});

export default router;
