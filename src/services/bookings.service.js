import BookingsRepository from "../repositories/bookings.repository.js";

export default class BookingsService {
    constructor() {
        this.repository = new BookingsRepository();
}

    async getAllBookings() {
        return await this.repository.getAllBookings();
}

    async createBooking(data) {
        const { clientName, clientEmail, date, time, status } = data;

    if (!clientName || !clientEmail || !date || !time || !status) {
        throw new Error("Todos los campos de la reserva son obligatorios");
    }

    return await this.repository.createBooking(data);
}

    async getBookingById(id) {
        const booking = await this.repository.getBookingById(id);
    if (!booking) {
    throw new Error("Reserva no encontrada");
    }
    return booking;
}

    async addServiceToBooking(bid, sid, quantity) {
        const booking = await this.repository.getBookingById(bid);
    if (!booking) {
    throw new Error("Reserva no encontrada");
    }
    return await this.repository.addServiceToBooking(bid, sid, quantity);
}

    async deleteBooking(id) {
        const booking = await this.repository.getBookingById(id);
    if (!booking) {
        throw new Error("Reserva no encontrada");
    }
    return await this.repository.deleteBooking(id);
}

async getAdvancedBookings({ order = "desc", page = 1, limit = 3 }) {
    const sort = { createdAt: order === "desc" ? -1 : 1 };
   const skip = (page - 1) * limit;

    const [docs, totalDocs] = await Promise.all([
    this.repository.getFiltered({}, sort, skip, limit),
    this.repository.countDocuments({})
]);

    const totalPages = Math.ceil(totalDocs / limit);

return {
    payload: docs,
    page: Number(page),
    limit: Number(limit),
    totalDocs,
    totalPages,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages
};
}

}
