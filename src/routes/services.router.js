import { Router } from "express";
import { ServiceManager } from "../managers/ServiceManager.js";

const router = Router();
const manager = new ServiceManager("./src/data/services.json");

// GET /api/services?category=salud&available=true
router.get("/", (req, res) => {
    let services = manager.getServices();
    const { category, available } = req.query;

if (category) {
    services = services.filter(s => s.category.toLowerCase() === category.toLowerCase());
}
if (available) {
    const boolAvailable = available === "true";
    services = services.filter(s => s.available === boolAvailable);
}

    res.status(200).json(services);
});

// GET /api/services/:sid
router.get("/:sid", (req, res) => {
    const id = parseInt(req.params.sid);
    const service = manager.getServiceById(id);
    if (!service) return res.status(404).json({ error: "Servicio no encontrado" });
    res.status(200).json(service);
});

// POST /api/services
router.post("/", (req, res) => {
try {
    const newService = manager.addService(req.body);
    res.status(201).json(newService);
} catch (error) {
    res.status(400).json({ error: error.message });
}
});

// PUT /api/services/:sid
router.put("/:sid", (req, res) => {
    const id = parseInt(req.params.sid);
    const updated = manager.updateService(id, req.body);
    if (!updated) return res.status(404).json({ error: "Servicio no encontrado" });
    res.status(200).json(updated);
});

// DELETE /api/services/:sid
router.delete("/:sid", (req, res) => {
    const id = parseInt(req.params.sid);
    const deleted = manager.deleteService(id);
    if (!deleted) return res.status(404).json({ error: "Servicio no encontrado" });
    res.status(200).json(deleted);
});

export default router;
