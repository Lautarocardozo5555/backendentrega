import ServicesService from "../services/services.service.js"
import BookingsService from "../services/bookings.service.js"
import MessagesService from "../services/messages.service.js"

const servicesService = new ServicesService()
const bookingsService = new BookingsService()
const messagesService = new MessagesService()

export const renderServices = async (req, res) => {
    const query = req.query;
    const { page = 1, limit = 5 } = query;

    const result = await servicesService.getAdvancedServices({ ...query, page, limit });

res.render("services", {
    services: result.payload,
    page: result.page,
    totalPages: result.totalPages,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevPage: result.page - 1,
    nextPage: result.page + 1,
    ...query
});
};

export const renderBookings = async (req, res) => {
    const query = req.query;
    const { sortBy = "date", order = "asc", page = 1, limit = 5 } = query;

    const result = await bookingsService.getAdvancedBookings({ sortBy, order, page, limit });

res.render("bookings", {
    bookings: result.payload,
    page: result.page,
    totalPages: result.totalPages,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevPage: result.page - 1,
    nextPage: result.page + 1,
    sortBy,
    order
});
};


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
    const { order = "desc" } = req.query;
    const messages = await messagesService.getAllMessages(order);

res.render("messages", {
    messages,
    order,
    orderIsAsc: order === "asc",
    orderIsDesc: order === "desc"
});
};