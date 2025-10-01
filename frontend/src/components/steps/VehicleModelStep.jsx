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
import { getVehiclesByType } from '../../services/api'

const VehicleModelStep = ({
    formData,
    onNext,
    onBack,
    stepNumber,
    totalSteps,
}) => {
    const [vehicleId, setVehicleId] = useState(formData.vehicleId || null)
    const [vehicles, setVehicles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                setLoading(true)
                const vehicleList = await getVehiclesByType(
                    formData.vehicleTypeId,
                )
                setVehicles(vehicleList)
                setLoading(false)
            } catch (err) {
                setError('Failed to load vehicles. Please try again.')
                setLoading(false)
            }
        }

        if (formData.vehicleTypeId) {
            fetchVehicles()
        }
    }, [formData.vehicleTypeId])

    const handleNext = () => {
        setError('')

        if (vehicleId === null) {
            setError('Please select a specific vehicle model')
            return
        }

        onNext({ vehicleId })
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
                    Specific Model
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                {vehicles.length === 0 ? (
                    <Alert severity="warning" sx={{ mb: 3 }}>
                        No vehicles available for this type.
                    </Alert>
                ) : (
                    <RadioGroup
                        value={vehicleId}
                        onChange={(e) => setVehicleId(parseInt(e.target.value))}
                        sx={{ mb: 4 }}
                    >
                        {vehicles.map((vehicle) => (
                            <FormControlLabel
                                key={vehicle.id}
                                value={vehicle.id}
                                control={<Radio />}
                                label={
                                    <Typography variant="body1" sx={{ ml: 1 }}>
                                        {vehicle.model}
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
                                    ...(vehicleId === vehicle.id && {
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
                        disabled={vehicles.length === 0}
                    >
                        Next
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default VehicleModelStep
