import React, { useState } from 'react'
import NameStep from './steps/NameStep'
import WheelsStep from './steps/WheelsStep'
import VehicleTypeStep from './steps/VehicleTypeStep'
import VehicleModelStep from './steps/VehicleModelStep'
import DateRangeStep from './steps/DateRangeStep'
import { createBooking } from '../services/api'
import { Alert, CircularProgress, Box } from '@mui/material'

const BookingForm = ({ onSuccess }) => {
    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        wheels: null,
        vehicleTypeId: null,
        vehicleId: null,
        startDate: null,
        endDate: null,
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const steps = [
        { component: NameStep, title: 'Name' },
        { component: WheelsStep, title: 'Wheels' },
        { component: VehicleTypeStep, title: 'Vehicle Type' },
        { component: VehicleModelStep, title: 'Vehicle Model' },
        { component: DateRangeStep, title: 'Date Range' },
    ]

    const handleNext = async (stepData) => {
        setError('')

        let updatedData = { ...formData, ...stepData }

        // Clear dependent fields when wheels selection changes
        if (
            stepData.wheels !== undefined &&
            stepData.wheels !== formData.wheels
        ) {
            updatedData = {
                ...updatedData,
                vehicleTypeId: null,
                vehicleId: null,
                startDate: null,
                endDate: null,
            }
        }

        // Clear dependent fields when vehicle type changes
        if (
            stepData.vehicleTypeId !== undefined &&
            stepData.vehicleTypeId !== formData.vehicleTypeId
        ) {
            updatedData = {
                ...updatedData,
                vehicleId: null,
            }
        }

        setFormData(updatedData)

        // If this is the last step, submit the booking
        if (currentStep === steps.length - 1) {
            setLoading(true)
            try {
                const bookingPayload = {
                    firstName: updatedData.firstName,
                    lastName: updatedData.lastName,
                    vehicleId: updatedData.vehicleId,
                    startDate: updatedData.startDate,
                    endDate: updatedData.endDate,
                }

                const response = await createBooking(bookingPayload)
                onSuccess(response.booking)
            } catch (err) {
                setError(
                    err.response?.data?.error ||
                        'Failed to create booking. Please try again.',
                )
                setLoading(false)
            }
        } else {
            setCurrentStep(currentStep + 1)
        }
    }

    const handleBack = () => {
        if (currentStep > 0) {
            setError('')
            setCurrentStep(currentStep - 1)
        }
    }

    const CurrentStepComponent = steps[currentStep].component

    return (
        <Box>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {loading ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '400px',
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                <CurrentStepComponent
                    formData={formData}
                    onNext={handleNext}
                    onBack={currentStep > 0 ? handleBack : null}
                    stepNumber={currentStep + 1}
                    totalSteps={steps.length}
                />
            )}
        </Box>
    )
}

export default BookingForm
