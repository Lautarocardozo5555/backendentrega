import BookingsDAO from "../dao/bookings.dao.js";

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
}
