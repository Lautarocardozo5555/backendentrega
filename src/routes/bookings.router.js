import { Router } from "express";
import {
    createBooking,
    getBookingById,
    addServiceToBooking,
    deleteBooking,
    getAllBookings
} from "../controllers/bookings.controller.js";

const router = Router();

router.get("/", getAllBookings)
router.post("/", createBooking);
router.get("/:bid", getBookingById);
router.post("/:bid/services/:sid", addServiceToBooking);
router.delete("/:bid", deleteBooking);

export default router;
