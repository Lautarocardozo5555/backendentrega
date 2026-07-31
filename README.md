# Sistema de Turnos y Reservas (entrega 3)
Proyecto Node.js con Express y FileSystem para administrar **servicios** y **reservas** con persistencia en archivos JSON.

## Instalacion
npm install

## Ejecución
npm start

## Variables de entorno
Crear un archivo .env con 
PORT=
NODE_ENV=
El repo incluye .env.example como referencia.

## Estructura
src/
  config/env.config.js
  managers/
    ServiceManager.js
    BookingManager.js
  routes/
    services.router.js
    bookings.router.js
  data/
    services.json
    bookings.json
  app.js
  server.js
.env
.env.example
.gitignore
package.json
README.md

## Endpoints
Services
GET /api/services → devuelve todos los servicios.

GET /api/services/:sid → devuelve un servicio por id.

POST /api/services → crea un servicio nuevo (valida campos).

PUT /api/services/:sid → actualiza un servicio existente.

DELETE /api/services/:sid → elimina un servicio.

Ejemplo:
{
  "name": "Consulta médica",
  "description": "Chequeo general",
  "duration": 30,
  "price": 1000,
  "category": "salud",
  "available": true
}

Bookings
POST /api/bookings → crea una reserva.

GET /api/bookings/:bid → devuelve una reserva por id.

POST /api/bookings/:bid/services/:sid → agrega un servicio a una reserva existente.

Ejemplo:
{
  "clientName": "Juan Pérez",
  "clientEmail": "juan@example.com",
  "date": "2026-08-01",
  "time": "10:00",
  "status": "pendiente"
}

## Persistencia
Los datos se guardan en: services.json y bookings.json
Esto asegura que la información no se pierda al reiniciar el servidor.

## Autor
Cardozo Lautaro Gabriel