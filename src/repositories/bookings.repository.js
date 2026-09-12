import BookingsDAO from "../dao/bookings.dao.js";
import Booking from "../models/booking.model.js"

export default class BookingsRepository {
    constructor() {
        this.dao = new BookingsDAO();
    }

    async getAllBookings() {
        return await this.dao.getBookings();
}

    async createBooking(data) {
        return await this.dao.createBooking(data);
}

    async getBookingById(id) {
        return await this.dao.getBookingById(id);
}

    async addServiceToBooking(bid, sid, quantity) {
        return await this.dao.addServiceToBooking(bid, sid, quantity);
}
    async deleteBooking(id) {
        return await this.dao.deleteBooking(id);
}

    async getFiltered(filter, sort, skip, limit) {
        return await Booking.find(filter).sort(sort).skip(skip).limit(limit).lean();
}

    async countDocuments(filter) {
    return await Booking.countDocuments(filter);
}

}
