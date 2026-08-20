import { Router } from 'express';
import { getBookings, getBookingById, createBooking, addServiceToBooking } from "../controllers/bookings.controller.js";

const router = Router();

router.get("/", getBookings)
router.get("/:bid", getBookingById)
router.post("/", createBooking)
router.post("/:bid/service/:sid", addServiceToBooking)

export default router;
