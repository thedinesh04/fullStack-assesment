import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const datesOverlap = (existingStart, existingEnd, newStart, newEnd) => {
    const exStart = new Date(existingStart).getTime();
    const exEnd = new Date(existingEnd).getTime();
    const newStartTime = new Date(newStart).getTime();
    const newEndTime = new Date(newEnd).getTime();

    
    return (
        (newStartTime >= exStart && newStartTime <= exEnd) ||
        (newEndTime >= exStart && newEndTime <= exEnd) ||
        (newStartTime <= exStart && newEndTime >= exEnd)
    );
};

const checkAvailability = async (req, res) => {
    try {
        const { vehicleId, startDate, endDate } = req.query;
        if (!vehicleId || !startDate || !endDate) {
            return res.status(400).json({ 
            error: 'VehicleId, startDate, and endDate are required' 
            });
        }
        const start = new Date(startDate);
        const end = new Date(endDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (start < today) {
            return res.status(400).json({ 
            error: 'Start date cannot be in the past' 
            });
        }

        if (end < start) {
            return res.status(400).json({ 
                error: 'End date must be after start date' 
            });
        }

        // Checking 6 months advance limit
        const sixMonthsFromNow = new Date();
        sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
        
        if (start > sixMonthsFromNow) {
            return res.status(400).json({ 
                error: 'Bookings can only be made up to 6 months in advance' 
            });
        }

        const existingBookings = await prisma.booking.findMany({
            where: {
                vehicleId: parseInt(vehicleId)
            },
            select: {
                id: true,
                startDate: true,
                endDate: true
            }
        });

        const hasConflict = existingBookings.some(booking => 
            datesOverlap(booking.startDate, booking.endDate, start, end)
        );

        res.json({ 
            available: !hasConflict,
            message: hasConflict ? 'Vehicle is not available for selected dates' : 'Vehicle is available'
        });

    } catch (error) {
        console.error('Error checking availability:', error);
        res.status(500).json({ 
            error: 'Failed to check availability',
            message: error.message 
        })
    }
}



const createBooking = async (req, res) => {
    try {
        const { firstName, lastName, vehicleId, startDate, endDate } = req.body;

        if (!firstName || !lastName || !vehicleId || !startDate || !endDate) {
        return res.status(400).json({ 
            error: 'All fields are required' 
        });
        }

        if (firstName.trim().length === 0 || lastName.trim().length === 0) {
            return res.status(400).json({ 
                error: 'First name and last name cannot be empty' 
            });
        }

        const start = new Date(startDate);
        const end = new Date(endDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (start < today) {
            return res.status(400).json({ 
                error: 'Start date cannot be in the past' 
            });
        }

        if (end < start) {
            return res.status(400).json({ 
                error: 'End date must be after start date' 
            });
        }

        const sixMonthsFromNow = new Date();
        sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
        
        if (start > sixMonthsFromNow) {
            return res.status(400).json({ 
                error: 'Bookings can only be made up to 6 months in advance' 
            });
        }

        const vehicle = await prisma.vehicle.findUnique({
            where: { id: parseInt(vehicleId) },
            include: {
                vehicleType: true
            }
        });

        if (!vehicle) {
            return res.status(404).json({ 
                error: 'Vehicle not found' 
            });
        }

        const existingBookings = await prisma.booking.findMany({
            where: {
                vehicleId: parseInt(vehicleId)
            }
        });

        const hasConflict = existingBookings.some(booking => 
            datesOverlap(booking.startDate, booking.endDate, start, end)
        );

        if (hasConflict) {
            return res.status(409).json({ 
                error: 'Vehicle is already booked for the selected dates',
                message: 'Please choose different dates or another vehicle'
            });
        }

        const booking = await prisma.booking.create({
            data: {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                vehicleId: parseInt(vehicleId),
                startDate: start,
                endDate: end
            },
            include: {
                vehicle: {
                    include: {
                        vehicleType: true
                    }
                }
            }
        });

        res.status(201).json({
            message: 'Booking created successfully',booking
        });

    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ 
            error: 'Failed to create booking',
            message: error.message 
        });
    }
};

export { checkAvailability, createBooking };