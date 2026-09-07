import * as bookingsService from "../services/bookings.service.js";

export const getBookings = async (req, res) => {
    try {
        const bookings = await bookingsService.getBookings();
        res.status(200).json({ status: "success", payload: bookings });
    } catch (error) {
    res.status(500).json({ status: "error", message: "Error al obtener las reservas" });
    }
};

export const getBookingById = async (req, res) => {
    try {
        const { bid } = req.params;
        const booking = await bookingsService.getBookingById(Number(bid));
        if (!booking) return res.status(404).json({ status: "error", message: "Reserva no encontrada" });
    res.status(200).json({ status: "success", payload: booking });
    } catch (error) {
    res.status(500).json({ status: "error", message: "Error al obtener la reserva" });
    }
};

export const createBooking = async (req, res) => {
    try {
        const booking = await bookingsService.createBooking(req.body);
        res.status(201).json({ status: "success", payload: booking });
    } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
    }
};

export const addServiceToBooking = async (req, res) => {
    try {
        const { bid, sid } = req.params;
        const updatedBooking = await bookingsService.addServiceToBooking(Number(bid), Number(sid));
    res.status(200).json({ status: "success", payload: updatedBooking });
    } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
    }
}
export const deleteBooking = async (req, res) => {
    try {
    const { bid } = req.params;
    const deleted = await bookingsService.deleteBooking(Number(bid));
    res.json({ status: "success", payload: deleted });
} catch (error) {
    res.status(500).json({ status: "error", message: error.message });
}
};
