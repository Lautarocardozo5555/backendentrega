import BookingsService from "../services/bookings.service.js";
import { io } from "../server.js"

const booking = new BookingsService();

export const getBookings = async (req, res) => {
try {
    const bookings = await booking.getAllBookings(); 

    res.status(200).json({ status: "success", payload: bookings });
} catch (error) {
    res.status(500).json({ status: "error", message: "Error al obtener las reservas" });
}
};

export const createBooking = async (req, res) => {
try {
    const newBooking = await booking.createBooking(req.body);
    io.emit("bookingUpdated", { action: "created", booking: newBooking }); // 👈 evento socket
    res.status(201).json({ status: "success", payload: newBooking });
} catch (error) {
    res.status(400).json({ status: "error", message: error.message });
}
};

export const getBookingById = async (req, res) => {
try {
    const { bid } = req.params;
    const bookingFound = await booking.getBookingById(bid);
    res.status(200).json({ status: "success", payload: bookingFound });
} catch (error) {
    res.status(404).json({ status: "error", message: error.message });
}
};

export const addServiceToBooking = async (req, res) => {
try {
    const { bid, sid } = req.params;
    const updatedBooking = await booking.addServiceToBooking(bid, sid, req.body.quantity);
    res.status(200).json({ status: "success", payload: updatedBooking });
} catch (error) {
    res.status(400).json({ status: "error", message: error.message });
}
};

export const updateBooking = async (req, res) => {
try {
    const { bid } = req.params;
    const updated = await booking.updateBooking(bid, req.body);
    io.emit("bookingUpdated", { action: "updated", booking: updated }); // evento socket
    res.status(200).json({ status: "success", payload: updated });
} catch (error) {
    res.status(400).json({ status: "error", message: error.message });
}
};

export const deleteBooking = async (req, res) => {
try {
    const { bid } = req.params;
    await booking.deleteBooking(bid);
    io.emit("bookingDeleted", { id: bid }); 
    res.status(200).json({ status: "success", message: "Reserva eliminada" });
} catch (error) {
    res.status(404).json({ status: "error", message: error.message });
}
};
