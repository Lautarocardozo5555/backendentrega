import fs from 'fs';
import path from 'path';

const bookingsFile = path.resolve('src/data/bookings.json');

export default class BookingManager {
    constructor() {
    this.file = bookingsFile;
    // Si el archivo no existe, lo crea vacío
    if (!fs.existsSync(this.file)) {
        fs.writeFileSync(this.file, JSON.stringify([]));
    }
}

    getBookings() {
    const data = fs.readFileSync(this.file, 'utf-8');
    return JSON.parse(data);
}

    getBookingById(id) {
    const bookings = this.getBookings();
    return bookings.find(b => b.id === id);
}

    createBooking(booking) {
    const bookings = this.getBookings();
    const newBooking = { id: bookings.length + 1, services: [], ...booking };
    bookings.push(newBooking);
    fs.writeFileSync(this.file, JSON.stringify(bookings, null, 2));
    return newBooking;
}

    addServiceToBooking(bid, sid) {
    const bookings = this.getBookings();
    const index = bookings.findIndex(b => b.id === bid);
    if (index === -1) return null;

    const booking = bookings[index];
    const existingService = booking.services.find(s => s.service === sid);

    if (existingService) {
        existingService.quantity += 1;
    } else {
        booking.services.push({ service: sid, quantity: 1 });
    }

    bookings[index] = booking;
    fs.writeFileSync(this.file, JSON.stringify(bookings, null, 2));
    return booking;
}
}
