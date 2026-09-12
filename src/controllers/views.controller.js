import ServicesService from "../services/services.service.js"
import BookingsService from "../services/bookings.service.js"
import MessagesService from "../services/messages.service.js"

const servicesService = new ServicesService()
const bookingsService = new BookingsService()
const messagesService = new MessagesService()

export const renderServices = async(req, res) => {
    const services = await servicesService.getAllServices()
    res.render('services', {services})
}

export const renderBookings = async(req,res) => {
    const bookings = await bookingsService.getAllBookings()
    res.render('bookings', {bookings})
}

export const renderServiceDetail = async (req, res) => {
    const { id } = req.params;
    const service = await servicesService.getServiceById(id);
    res.render("serviceDetail", { service });
};

export const renderBookingDetail = async (req, res) => {
    const { id } = req.params;
    const booking = await bookingsService.getBookingById(id);

  // Calcular total
    let totalPrice = 0;
    if (booking.services && booking.services.length > 0) {
    totalPrice = booking.services.reduce((acc, item) => {
      return acc + (item.service.price * item.quantity);
    }, 0);
}

res.render("bookingDetail", { booking: { ...booking, totalPrice } });
};

export const renderMessages = async (req, res) => {
    const messages = await messagesService.getAllMessages()
    res.render("messages", { messages })
}
