import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Helper function to validate name
const validateName = (name, fieldName) => {
    if (!name || !name.trim()) {
        return `${fieldName} is required`;
    }

    if (name.trim().length < 2) {
        return `${fieldName} must be at least 2 characters`;
    }

    // Check if contains only valid characters (letters, spaces, hyphens, apostrophes)
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    if (!nameRegex.test(name.trim())) {
        return `${fieldName} should contain only letters`;
    }

    // Check if contains at least 2 letters
    const letterCount = (name.match(/[a-zA-Z]/g) || []).length;
    if (letterCount < 2) {
        return `${fieldName} must contain at least 2 letters`;
    }

    return null;
};

// Helper function to check if dates overlap
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

export const checkAvailability = async (req, res) => {
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
        });
    }
};

export const createBooking = async (req, res) => {
    try {
        const { firstName, lastName, vehicleId, startDate, endDate } = req.body;

        // Check if all fields are provided
        if (!firstName || !lastName || !vehicleId || !startDate || !endDate) {
            return res.status(400).json({ 
                error: 'All fields are required' 
            });
        }

        // Validate first name
        const firstNameError = validateName(firstName, 'First name');
        if (firstNameError) {
            return res.status(400).json({ error: firstNameError });
        }

        // Validate last name
        const lastNameError = validateName(lastName, 'Last name');
        if (lastNameError) {
            return res.status(400).json({ error: lastNameError });
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
            message: 'Booking created successfully',
            booking
        });

    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ 
            error: 'Failed to create booking',
            message: error.message 
        });
    }
};