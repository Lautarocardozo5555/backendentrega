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

## Ejemplo de uso
Ver src/app.js para ejemplos de agregar, listar, actualizar y eliminar servicios.

## Autor
Cardozo Lautaro Gabriel