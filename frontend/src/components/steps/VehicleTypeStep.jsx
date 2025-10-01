import React, { useState, useEffect } from 'react'
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
    CircularProgress,
} from '@mui/material'
import { getVehicleTypes } from '../../services/api'

const VehicleTypeStep = ({
    formData,
    onNext,
    onBack,
    stepNumber,
    totalSteps,
}) => {
    const [vehicleTypeId, setVehicleTypeId] = useState(
        formData.vehicleTypeId || null,
    )
    const [vehicleTypes, setVehicleTypes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchVehicleTypes = async () => {
            try {
                setLoading(true)
                const types = await getVehicleTypes(formData.wheels)
                setVehicleTypes(types)
                setLoading(false)
            } catch (err) {
                setError('Failed to load vehicle types. Please try again.')
                setLoading(false)
            }
        }

        if (formData.wheels) {
            fetchVehicleTypes()
        }
    }, [formData.wheels])

    // Reset vehicleTypeId if it doesn't match current wheel selection
    useEffect(() => {
        if (formData.vehicleTypeId && vehicleTypes.length > 0) {
            const isValidType = vehicleTypes.some(
                (type) => type.id === formData.vehicleTypeId,
            )
            if (!isValidType) {
                setVehicleTypeId(null)
            }
        }
    }, [vehicleTypes, formData.vehicleTypeId])

    const handleNext = () => {
        setError('')

        if (vehicleTypeId === null) {
            setError('Please select a vehicle type')
            return
        }

        onNext({ vehicleTypeId })
    }

    if (loading) {
        return (
            <Card elevation={3}>
                <CardContent sx={{ p: 4 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '300px',
                        }}
                    >
                        <CircularProgress />
                    </Box>
                </CardContent>
            </Card>
        )
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
                    Type of vehicle
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                {vehicleTypes.length === 0 ? (
                    <Alert severity="warning" sx={{ mb: 3 }}>
                        No vehicle types available for {formData.wheels} wheels.
                    </Alert>
                ) : (
                    <RadioGroup
                        value={vehicleTypeId}
                        onChange={(e) =>
                            setVehicleTypeId(parseInt(e.target.value))
                        }
                        sx={{ mb: 4 }}
                    >
                        {vehicleTypes.map((type) => (
                            <FormControlLabel
                                key={type.id}
                                value={type.id}
                                control={<Radio />}
                                label={
                                    <Typography variant="body1" sx={{ ml: 1 }}>
                                        {type.name}
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
                                    ...(vehicleTypeId === type.id && {
                                        borderColor: '#1976d2',
                                        backgroundColor: '#e3f2fd',
                                    }),
                                }}
                            />
                        ))}
                    </RadioGroup>
                )}

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
                        disabled={vehicleTypes.length === 0}
                    >
                        Next
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default VehicleTypeStep
