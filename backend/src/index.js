import express from 'express';
import dotenv from 'dotenv';
import { vehicleRoutes } from './routes/vehicle.routes.js';
import { bookingRoutes } from './routes/booking.routes.js';

dotenv.config();
const app = express()

const port = process.env.PORT || 3000;

app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Routes
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/bookings', bookingRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Something went wrong!',
        message: err.message 
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port : ${port}`);
});