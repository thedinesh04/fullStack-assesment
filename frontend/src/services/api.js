import axios from 'axios';


const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

    // Vehicle API calls
    export const getVehicleTypes = async (wheels) => {
        const response = await api.get(`/vehicles/types?wheels=${wheels}`);
        return response.data;
    };

    export const getVehiclesByType = async (typeId) => {
        const response = await api.get(`/vehicles?typeId=${typeId}`);
        return response.data;
    };

    // Booking API calls
    export const checkAvailability = async (vehicleId, startDate, endDate) => {
        const response = await api.get('/bookings/check-availability', {
            params: { vehicleId, startDate, endDate }
        });
        return response.data;
    };

    export const createBooking = async (bookingData) => {
        const response = await api.post('/bookings', bookingData);
        return response.data;
    };

export default api;