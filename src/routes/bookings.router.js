import { Router } from "express";
import {
    createBooking,
    getBookingById,
    addServiceToBooking,
    deleteBooking,
    getBookings
} from "../controllers/bookings.controller.js";
import { validate } from "../middlewares/validate.js";
import { bookingSchema } from "../validators/booking.validator.js";
import { addServiceToBookingSchema } from "../validators/addServiceToBooking.validator.js";

const router = Router();

router.get("/", getBookings)
router.post("/", validate(bookingSchema), createBooking);
router.get("/:bid", getBookingById);
router.post("/:bid/services/:sid", validate(addServiceToBookingSchema), addServiceToBooking);
router.delete("/:bid", deleteBooking);

export default router;
