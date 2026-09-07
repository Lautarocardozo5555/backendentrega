import { Router } from 'express';
import * as bookingsController from "../controllers/bookings.controller.js";

const router = Router();

router.get("/", bookingsController.getBookings)
router.get("/:bid", bookingsController.getBookingById)
router.post("/", bookingsController.createBooking)
router.post("/:bid/services/:sid", bookingsController.addServiceToBooking)
router.delete("/:bid", bookingsController.deleteBooking)

export default router;
