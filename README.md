# Sistema de Turnos y Reservas (entrega final)
Proyecto desarrollado en Node.js con Express y persistencia en MongoDB Atlas. La aplicación permite administrar **servicios**, **reservas** y **mensajes**, organizada bajo una **arquitectura en capas** con actualización en tiempo real mediante **Socket.IO**.

## Instalacion

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
    js/
       services.js
       bookings.js
       utils.js
       messages.js
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

MongoDB Atlas: almacena los documentos en colecciones (services, bookings,messages)

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

## Ejemplo body para crear un mensaje:
{
  "user": "Lauti",
  "text": "Hola, este es un mensaje en tiempo real"
}

## Parámetros de consulta avanzada

Los endpoints soportan filtros, ordenamiento y paginación mediante query params:

|Parámetro| Tipo|descripcion 
`category`|string|Filtra por categoría   
`available`|boolean|Filtra por disponibilidad (`true` o `false`)
`minPrice`|number|Precio mínimo
`maxprice`|number| Precio máximo     
`minDuration`|number|Duración mínima en minutos    
`maxDuration`|number|Duración máxima en minutos  
`sortBy`|string| Campo de ordenamiento (`price`, `duration`, `name`)
`order`|string|Dirección de orden (`asc` o `desc`) 
`page`|number|Número de página para paginación
`limit`|number|Cantidad de resultados por página  

**Ejemplo de consulta avanzada:**
GET /api/services?category=Estética&available=true&minPrice=500&maxPrice=2000&sortBy=price&order=asc&page=1&limit=5


Esto devuelve los servicios de la categoría **Estética**, disponibles, con precio entre 500 y 2000, ordenados por precio ascendente, mostrando la primera página con 5 resultados.

## Vistas con handlebars
/views/services.handlebars ===> Lista de servicios con filtros y CRUD.
/views/bookings.handlebars ===> Lista de reservas con CRUD y detalle.
/views/messages.handlebars ===> Chat en tiempo real.

## Tiempo real con Socket.IO
Servicios: Creación, actualización y eliminaciión en vivo.
Reservas: Actualización y eliminación en vivo.
Mensajes: Chat en tiempo real con alertas.

## Persistencia
Los datos se guardan en MongoDB Atlas con las colecciones: services, bookings y messages
Esto asegura que la información no se pierda al reiniciar el servidor.

## Autor
Cardozo Lautaro Gabriel
