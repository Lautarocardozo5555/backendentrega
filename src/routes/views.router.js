import { Router } from "express"
import { renderBookingDetail, renderBookings, renderMessages, renderServiceDetail, renderServices } from "../controllers/views.controller.js"

const router = Router()

router.get("/services", renderServices)
router.get("/services/:id", renderServiceDetail)   
router.get("/bookings", renderBookings)
router.get("/bookings/:id", renderBookingDetail)   
router.get("/messages", renderMessages)
export default router
