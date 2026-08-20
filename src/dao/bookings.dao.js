import fs from"fs/promises"
import path from "path"

const file = path.resolve("src/data/bookings.json")

export default class BookingsDAO {
    async getBookings() {
        const data = await fs.readFile(file, "utf-8")
        return JSON.parse(data)
    }
    
    async getBookingById(id) {
        const bookings = await this.getAll()
        return bookings.find(b => b.id === Number(id))
    }

    async createBooking(booking) {
        const bookings = await this.getAll()
        const newBooking = {id: bookings.length + 1, services:[], ...bookings}
        bookings.push(newBooking)
        await fs.writeFile(file, JSON.stringify(bookings, null, 2))
        return newBooking
    }
    async updateBooking(id, updatedBooking) {
        const bookings = await this.getBookings();
        const index = bookings.findIndex(b => b.id === Number(id));
        if (index === -1) return null;
        bookings[index] = updatedBooking;
        await fs.writeFile(file, JSON.stringify(bookings, null, 2));
        return bookings[index];
    }
}