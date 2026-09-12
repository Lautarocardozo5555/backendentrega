# Sistema de Turnos y Reservas (entrega 7)
Proyecto desarrollado en Node.js con Express y persistencia en MongoDB Atlas. La aplicación permite administrar **servicios**, **reservas** y **mensajes**, organizada bajo una **arquitectura en capas** con actualización en tiempo real mediante **Socket.IO**.

## Instalacion
```bash
npm install

## Ejecución
npm start

## Variables de entorno
Crear un archivo .env con las siguientes variables:
PORT=
NODE_ENV=
MONGO_URI=
El repo incluye .env.example como referencia.

## Estructura
src/
  config/
    env.config.js
    db.config.js
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
  models/
    service.model.js
    booking.model.js
  public/
    css/style.css
    js/socket.js
  validators/
    addServiceToBooking.validator.js
    booking.validator.js
    service.validator.js
  middlewares/
    validate.js
  app.js
  server.js
.env
.env.example
.gitignore
package.json
README.md


## Arquitectura en capas
El flujo de la apliación sigue este orden:
Router → Controller → Service → Repository → DAO → MongoDB Atlas

Router: define los endpoints y conecta con el controller.

Controller: recibe la request (req), llama al service y responde con res.

Service: contiene reglas de negocio (ejemplo: validación de campos, incremento de quantity en reservas).

Repository: expone métodos de acceso a datos sin lógica de negocio.

DAO: accede directamente a la base de datos.

MongoDB Atlas: almacena los documentos en colecciones (services, bookings,. messages)

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

## Messages
GET /api/messages → lista todos los mensajes.

POST /api/messages → crea un mensaje nuevo y lo emite en tiempo real vía Socket.IO.

##Ejemplo body para crear un mensaje:
{
  "user": "Lauti",
  "text": "Hola, este es un mensaje en tiempo real"
}

## Persistencia
Los datos se guardan en MongoDB Atlas con las colecciones: services, bookings y messages
Esto asegura que la información no se pierda al reiniciar el servidor.

## Autor
Cardozo Lautaro Gabriel
