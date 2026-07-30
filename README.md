# Service Manager

Proyecto Node.js para administrar servicios de un sistema de turnos y reservas.

## Instalacion
npm install

## Ejecución
npm start

## Variables de entorno
Crear un archivo .env con 
PORT=
NODE_ENV=development
El repo incluye .env.example como referencia.

## Estructura
src/
  config/env.config.js
  managers/ServiceManager.js
  data/services.json
  app.js
package.json
.env.example
.gitignore
README.md

## ServiceManager
Cada servicio tiene la forma: 
{ id, name, description, duration, price, category, available }

## Métodos
getServices() = devuelve todos los servicios

getServiceById(id) = devuelve un servicio por id

addService(serviceData) = agrega un servicio nuevo

updateService(id, updatedData) = actualiza un servicio existente

deleteService(id) = elimina un servicio por id

### Ejemplos de uso

- Listar servicios:
  GET http://localhost:8080/api/services

- Filtrar por categoría:
  GET http://localhost:8080/api/services?category=salud

- Filtrar por disponibilidad:
  GET http://localhost:8080/api/services?available=true

- Obtener servicio por id:
  GET http://localhost:8080/api/services/1

- Crear servicio:
  POST http://localhost:8080/api/services
  Body (JSON):
  {
    "name": "Consulta médica",
    "description": "Atención clínica general",
    "duration": 30,
    "price": 1000,
    "category": "salud",
    "available": true
  }

- Actualizar servicio:
  PUT http://localhost:8080/api/services/1
  Body (JSON):
  {
    "price": 1200,
    "available": false
  }

- Eliminar servicio:
  DELETE http://localhost:8080/api/services/1

## Autor
Cardozo Lautaro Gabriel