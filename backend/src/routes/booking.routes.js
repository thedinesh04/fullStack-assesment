import express from 'express';

import  {createBooking}  from '../controllers/booking.controller.js';
import {checkAvailability} from '../controllers/booking.controller.js';

const router = express.Router();

// POST /api/bookings
router.post('/', createBooking);

router.get('/check-availability', checkAvailability);

export default router;