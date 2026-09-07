import BookingsDAO from "../dao/bookings.dao.js";

const bookingsDAO = new BookingsDAO();

export const getBookings = async () => {
    return await bookingsDAO.getAll();}


export const getBookingById = async (id) => {
    return await bookingsDAO.getById(id);}


export const createBooking = async (data) =>{
    return await bookingsDAO.create(data);}


export const updateBooking = async (id, booking) => {
    return await bookingsDAO.update(id, booking);}

export const deleteBooking = async (id) => {
    return await bookingsDAO.deleteBooking(id);
};
