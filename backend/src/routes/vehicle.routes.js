import express from 'express';
import { bookingController } from '../controllers/booking.controller.js';

const router = express.Router();

// GET /api/vehicles/types?wheels=2 or ?wheels=4
router.get('/types', vehicleController.getVehicleTypes);

// GET /api/vehicles?typeId=1
router.get('/', vehicleController.getVehiclesByType)

export default router;