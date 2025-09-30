import express from 'express';
import  { getVehiclesByType, getVehicleTypes }  from '../controllers/vehicle.controller.js';

const router = express.Router();

// GET /api/vehicles/types?wheels=2 or ?wheels=4
router.get('/types', getVehicleTypes);

// GET /api/vehicles?typeId=1
router.get('/', getVehiclesByType)

export default router;