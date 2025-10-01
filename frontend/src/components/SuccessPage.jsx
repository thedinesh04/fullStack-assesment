import React from 'react'
import {
    Card,
    CardContent,
    Button,
    Typography,
    Box,
    Divider,
} from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { format } from 'date-fns'

const SuccessPage = ({ bookingDetails, onStartNew }) => {
    return (
        <Card elevation={3}>
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <CheckCircleOutlineIcon
                    sx={{ fontSize: 80, color: 'success.main', mb: 2 }}
                />

                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{ fontWeight: 600, color: 'success.main' }}
                >
                    Booking Confirmed!
                </Typography>

                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 4 }}
                >
                    Your vehicle has been successfully booked.
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ textAlign: 'left', mb: 3 }}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: 600 }}
                    >
                        Booking Details
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                mb: 1.5,
                            }}
                        >
                            <Typography color="text.secondary">
                                Booking ID:
                            </Typography>
                            <Typography fontWeight={600}>
                                #{bookingDetails.id}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                mb: 1.5,
                            }}
                        >
                            <Typography color="text.secondary">
                                Name:
                            </Typography>
                            <Typography fontWeight={600}>
                                {bookingDetails.firstName}{' '}
                                {bookingDetails.lastName}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                mb: 1.5,
                            }}
                        >
                            <Typography color="text.secondary">
                                Vehicle:
                            </Typography>
                            <Typography fontWeight={600}>
                                {bookingDetails.vehicle.model}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                mb: 1.5,
                            }}
                        >
                            <Typography color="text.secondary">
                                Type:
                            </Typography>
                            <Typography fontWeight={600}>
                                {bookingDetails.vehicle.vehicleType.name}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                mb: 1.5,
                            }}
                        >
                            <Typography color="text.secondary">
                                Start Date:
                            </Typography>
                            <Typography fontWeight={600}>
                                {format(
                                    new Date(bookingDetails.startDate),
                                    'MMM dd, yyyy',
                                )}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                mb: 1.5,
                            }}
                        >
                            <Typography color="text.secondary">
                                End Date:
                            </Typography>
                            <Typography fontWeight={600}>
                                {format(
                                    new Date(bookingDetails.endDate),
                                    'MMM dd, yyyy',
                                )}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={onStartNew}
                    sx={{ py: 1.5 }}
                >
                    Make Another Booking
                </Button>
            </CardContent>
        </Card>
    )
}

export default SuccessPage
