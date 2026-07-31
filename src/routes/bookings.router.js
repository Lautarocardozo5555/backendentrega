import { Router } from 'express';
import BookingManager from '../managers/BookingManager.js';
import ServiceManager from '../managers/ServiceManager.js';

const router = Router();
const bookingManager = new BookingManager();
const serviceManager = new ServiceManager();

// POST crear reserva
router.post('/', (req, res) => {
    const { clientName, clientEmail, date, time, status } = req.body;
    const missingFields = [];
        if (!clientName) missingFields.push('clientName');
        if (!clientEmail) missingFields.push('clientEmail');
        if (!date) missingFields.push('date');
        if (!time) missingFields.push('time');
        if (!status) missingFields.push('status');
    
    if (missingFields.length > 0) {
    return res.status(400).json({
        error: `Faltan campos obligatorios: ${missingFields.join(', ')}`
    });
}
    const newBooking = bookingManager.createBooking({ clientName, clientEmail, date, time, status });
    res.status(201).json(newBooking);
});

// GET reserva por id
router.get('/:bid', (req, res) => {
    const id = parseInt(req.params.bid);
    const booking = bookingManager.getBookingById(id);
    if (!booking) return res.status(404).json({ error: 'Reserva no encontrada' });
    res.json(booking);
});

// POST agregar servicio a reserva
router.post('/:bid/services/:sid', (req, res) => {
    const bid = parseInt(req.params.bid);
    const sid = parseInt(req.params.sid);

    const booking = bookingManager.getBookingById(bid);
    if (!booking) return res.status(404).json({ error: 'Reserva no encontrada' });

    const service = serviceManager.getServiceById(sid);
    if (!service) return res.status(404).json({ error: 'Servicio no encontrado' });

    const updatedBooking = bookingManager.addServiceToBooking(bid, sid);
    res.json(updatedBooking);
});

export default router;
