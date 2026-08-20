import BookingsDAO from "../dao/bookings.dao.js";

const bookingsDAO = new BookingsDAO();

export const getBookings = async () => {
    return await bookingsDAO.getBookings();}


export const getBookingById = async (id) => {
    return await bookingsDAO.getBookingById(id);}


export const createBooking = async (data) =>{
    return await bookingsDAO.createBooking(data);}


export const updateBooking = async (id, booking) => {
    return await bookingsDAO.updateBooking(id, booking);}
