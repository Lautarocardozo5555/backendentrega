import BookingsService from "../services/bookings.service.js";

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

export const deleteBooking = async (req, res) => {
try {
    const { bid } = req.params;
    const deleted = await booking.deleteBooking(bid);
    res.status(200).json({ status: "success", payload: deleted });
} catch (error) {
    res.status(404).json({ status: "error", message: error.message });
}
};
