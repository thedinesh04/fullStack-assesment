import React, { useState } from 'react'
import {
    Card,
    CardContent,
    Button,
    Typography,
    Box,
    Alert,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material'

const WheelsStep = ({ formData, onNext, onBack, stepNumber, totalSteps }) => {
    const [wheels, setWheels] = useState(formData.wheels || null)
    const [error, setError] = useState('')

    const handleNext = () => {
        setError('')

        if (wheels === null) {
            setError('Please select number of wheels')
            return
        }

        onNext({ wheels })
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
                    Number of wheels
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <RadioGroup
                    value={wheels}
                    onChange={(e) => setWheels(parseInt(e.target.value))}
                    sx={{ mb: 4 }}
                >
                    <FormControlLabel
                        value={2}
                        control={<Radio />}
                        label={
                            <Typography variant="body1" sx={{ ml: 1 }}>
                                2 Wheels (Bike)
                            </Typography>
                        }
                        sx={{
                            border: '1px solid #e0e0e0',
                            borderRadius: 1,
                            mb: 2,
                            ml: 0,
                            p: 2,
                            '&:hover': {
                                backgroundColor: '#f5f5f5',
                            },
                            ...(wheels === 2 && {
                                borderColor: '#1976d2',
                                backgroundColor: '#e3f2fd',
                            }),
                        }}
                    />
                    <FormControlLabel
                        value={4}
                        control={<Radio />}
                        label={
                            <Typography variant="body1" sx={{ ml: 1 }}>
                                4 Wheels (Car)
                            </Typography>
                        }
                        sx={{
                            border: '1px solid #e0e0e0',
                            borderRadius: 1,
                            ml: 0,
                            p: 2,
                            '&:hover': {
                                backgroundColor: '#f5f5f5',
                            },
                            ...(wheels === 4 && {
                                borderColor: '#1976d2',
                                backgroundColor: '#e3f2fd',
                            }),
                        }}
                    />
                </RadioGroup>

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
                        Next
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default WheelsStep
