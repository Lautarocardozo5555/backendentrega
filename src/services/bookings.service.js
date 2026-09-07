import * as bookingsRepo from "../repositories/bookings.repository.js";
import * as servicesRepo from "../repositories/services.repository.js";

export const getBookings = async () => {
    return await bookingsRepo.getBookings();
};

export const getBookingById = async (id) => {
    return await bookingsRepo.getBookingById(id);
};

export const createBooking = async (data) => {
    const { clientName, clientEmail, date, time, status } = data;
    if (!clientName || !clientEmail || !date || !time || !status) {
    throw new Error("Todos los campos son obligatorios");
}
const booking = {
    ...data, services: []
}
    return await bookingsRepo.createBooking(booking);
};

export const deleteBooking = async (id) => {
    const booking = await bookingsRepo.getBookingById(id);
    if (!booking) throw new Error("Reserva no encontrada");
    return await bookingsRepo.deleteBooking(id);
};

export const addServiceToBooking = async (bid, sid) => {
    const booking = await bookingsRepo.getBookingById(bid);
    if (!booking) throw new Error("Reserva no encontrada");

    if (!booking.services) booking.services = [];

    const service = await servicesRepo.getServiceById(sid);
    if (!service) throw new Error("Servicio no encontrado");

    const existingService = booking.services.find(s => s.service === sid);
    if (existingService) {
    existingService.quantity += 1;
} else {
    booking.services.push({ service: sid, quantity: 1 });
}

    return await bookingsRepo.updateBooking(bid, booking);
};
