import fs from "fs/promises";
const path = "./src/data/bookings.json";

export default class BookingsDAO {
    async getAll() {
        const data = await fs.readFile(path, "utf-8");
        return JSON.parse(data);
}

    async getById(id) {
        const bookings = await this.getAll();
        return bookings.find(b => b.id === id);
}

    async create(booking) {
        const bookings = await this.getAll();
        booking.id = bookings.length + 1;
        bookings.push(booking);
        await fs.writeFile(path, JSON.stringify(bookings, null, 2));
        return booking;
}

    async update(id, data) {
        const bookings = await this.getAll();
        const index = bookings.findIndex(b => b.id === id);
        if (index === -1) return null;
        bookings[index] = { ...bookings[index], ...data };
        await fs.writeFile(path, JSON.stringify(bookings, null, 2));
        return bookings[index];
}

async deleteBooking(id) {
    const bookings = await this.getAll();
    const index = bookings.findIndex(b => b.id ===Number(id));
    if (index === -1) return null;

    const deleted = bookings.splice(index, 1)[0];
    await fs.writeFile(path, JSON.stringify(bookings, null, 2));
    return deleted;
}

}
