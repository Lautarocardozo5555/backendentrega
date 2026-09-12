import Booking from "../models/booking.model.js";

export default class BookingsDAO {
    async getBookings() {
        return await Booking.find().populate("services.service").lean();
}

    async createBooking(data) {
        const newBooking = new Booking(data);
        return await newBooking.save();
}

    async getBookingById(id) {
        return await Booking.findById(id).populate("services.service").lean();
}

    async addServiceToBooking(bid, sid, quantity = 1) {
        const booking = await Booking.findById(bid);
        if (!booking) return null;

    booking.services.push({ service: sid, quantity });
    return await booking.save();
}
    async deleteBooking(id) {
        return await Booking.findByIdAndDelete(id).lean();
}
}
