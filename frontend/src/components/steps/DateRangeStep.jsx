import React, { useState } from 'react'
import {
    Card,
    CardContent,
    Button,
    Typography,
    Box,
    Alert,
    TextField,
} from '@mui/material'
import { format, addMonths, startOfDay } from 'date-fns'

const DateRangeStep = ({
    formData,
    onNext,
    onBack,
    stepNumber,
    totalSteps,
}) => {
    const [startDate, setStartDate] = useState(
        formData.startDate
            ? format(new Date(formData.startDate), 'yyyy-MM-dd')
            : '',
    )
    const [endDate, setEndDate] = useState(
        formData.endDate
            ? format(new Date(formData.endDate), 'yyyy-MM-dd')
            : '',
    )
    const [error, setError] = useState('')

    const today = format(startOfDay(new Date()), 'yyyy-MM-dd')
    const maxDate = format(addMonths(new Date(), 6), 'yyyy-MM-dd')

    const handleNext = () => {
        setError('')

        if (!startDate) {
            setError('Please select a start date')
            return
        }

        if (!endDate) {
            setError('Please select an end date')
            return
        }

        const start = new Date(startDate)
        const end = new Date(endDate)
        const todayDate = startOfDay(new Date())

        if (start < todayDate) {
            setError('Start date cannot be in the past')
            return
        }

        if (end < start) {
            setError('End date must be after or equal to start date')
            return
        }

        const sixMonthsFromNow = addMonths(new Date(), 6)
        if (start > sixMonthsFromNow) {
            setError('Bookings can only be made up to 6 months in advance')
            return
        }

        onNext({
            startDate: format(start, 'yyyy-MM-dd'),
            endDate: format(end, 'yyyy-MM-dd'),
        })
    }

    return (
        <Card elevation={3}>
            <CardContent sx={{ p: 4 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Question {stepNumber} of {totalSteps}
                </Typography>

                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{ mb: 4, fontWeight: 500 }}
                >
                    Date range picker
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Box sx={{ mb: 3 }}>
                    <Typography
                        variant="subtitle2"
                        gutterBottom
                        sx={{ mb: 1, fontWeight: 600 }}
                    >
                        Start Date
                    </Typography>
                    <TextField
                        fullWidth
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            min: today,
                            max: maxDate,
                        }}
                    />
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="subtitle2"
                        gutterBottom
                        sx={{ mb: 1, fontWeight: 600 }}
                    >
                        End Date
                    </Typography>
                    <TextField
                        fullWidth
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            min: startDate || today,
                            max: maxDate,
                        }}
                    />
                </Box>

                <Alert severity="info" sx={{ mb: 3 }}>
                    You can book vehicles up to 6 months in advance. Past dates
                    are not allowed.
                </Alert>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        size="large"
                        onClick={onBack}
                        sx={{ py: 1.5 }}
                    >
                        Back
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={handleNext}
                        sx={{ py: 1.5 }}
                    >
                        Submit Booking
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default DateRangeStep
