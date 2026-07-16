import { config } from "./config/env.config.js";
import { ServiceManager } from "./managers/ServiceManager.js";

const manager = new ServiceManager("./src/data/services.json");

console.log("La app está corriendo en puerto", config.port, "modo", config.nodeEnv);

// Agregar servicio
const nuevo = manager.addService({
    name: "Consulta médica",
    description: "Turno con especialista",
    duration: 30,
    price: 2000,
    category: "Salud",
    available: true
});
console.log("Servicio agregado:", nuevo);

// Obtener todos
console.log("Servicios actuales:", manager.getServices());

// Buscar por id
console.log("Servicio con id 1:", manager.getServiceById(1));

// Actualizar
manager.updateService(1, { price: 2500, available: false });
console.log("Servicio actualizado:", manager.getServiceById(1));

// Eliminar
manager.deleteService(1);
console.log("Servicios tras eliminar:", manager.getServices());

