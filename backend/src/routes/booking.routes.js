import express from 'express';

import { bookingController } from '../controllers/booking.controller.js';

const router = express.Router();

// POST /api/bookings
router.post('/', bookingController.createBooking);

router.get('/check-availability', bookingController.checkAvailability);

export default router;