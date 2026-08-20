# Sistema de Turnos y Reservas (entrega 4)
Proyecto Node.js con Express y FileSystem para administrar **servicios** y **reservas**, reorganizado en tres capas: **routers**, **controllers** y **managers**.

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
  controllers/
    services.controller.js
    bookings.controller.js
  services/
    services.service.js
    bookings.service.js
  repositories/
    services.repository.js
    bookings.repository.js
  dao/
    services.dao.js
    bookings.dao.js
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

## Arquitectura en capas
El flujo de la apliación sigue este orden:
Router → Controller → Service → Repository → DAO → JSON

Router: define los endpoints y conecta con el controller.

Controller: recibe la request (req), llama al service y responde con res.

Service: contiene reglas de negocio (ejemplo: validación de campos, incremento de quantity en reservas).

Repository: expone métodos de acceso a datos (getBookings, getBookingById, createBooking, updateBooking) sin lógica de negocio.

DAO: accede directamente a los archivos JSON para leer y escribir datos.

## Endpoints
GET /api/services ====> Lista todos los servicios
GET /api/services/:sid ====> Obtiene un servicio por ID
POST /api/services ====> Crea un servicio nuevo
PUT /api/services/:sid ====> Actualiza un servicio existente
DELETE /api/service/:sid ====> Elimina un servicio

## Ejemplo body para crear un servicio
{
  "name": "Consulta médica",
  "description": "Chequeo general",
  "duration": 30,
  "price": 1000,
  "category": "salud",
  "available": true
}

## Bookings
GET /api/bookings ===> Lista todas las reservas
GET /api/bookings/:bid ====> Obtiene una reserva por id
POST /api/bookings ====> Crea una reserva
POST /api/bookings/:bid/services/:sid ====> Agrega un servicio a una reserva

## Ejemplo body para crear una reserva
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