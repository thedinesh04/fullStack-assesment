import React, { useState } from 'react'
import {
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
} from '@mui/material'

const NameStep = ({ formData, onNext, stepNumber, totalSteps }) => {
    const [firstName, setFirstName] = useState(formData.firstName || '')
    const [lastName, setLastName] = useState(formData.lastName || '')
    const [error, setError] = useState('')

    const validateName = (name, fieldName) => {
        // Checking if empty
        if (!name.trim()) {
            return `Please enter your ${fieldName}`
        }

        // Checking minimum length
        if (name.trim().length < 2) {
            return `${fieldName} must be at least 2 characters`
        }

        // Checking if contains only valid characters (letters, spaces, hyphens, apostrophes)
        const nameRegex = /^[a-zA-Z\s'-]+$/
        if (!nameRegex.test(name.trim())) {
            return `${fieldName} should contain only letters`
        }

        // Checking if contains at least 2 letters
        const letterCount = (name.match(/[a-zA-Z]/g) || []).length
        if (letterCount < 2) {
            return `${fieldName} must contain at least 2 letters`
        }

        return null
    }

    const handleNext = () => {
        setError('')

        // Validate first name
        const firstNameError = validateName(firstName, 'First name')
        if (firstNameError) {
            setError(firstNameError)
            return
        }

        // Validate last name
        const lastNameError = validateName(lastName, 'Last name')
        if (lastNameError) {
            setError(lastNameError)
            return
        }

        onNext({ firstName: firstName.trim(), lastName: lastName.trim() })
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleNext()
        }
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
                    First, what's your name?
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
                        First Name
                    </Typography>
                    <TextField
                        fullWidth
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter your first name"
                        variant="outlined"
                        autoFocus
                    />
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="subtitle2"
                        gutterBottom
                        sx={{ mb: 1, fontWeight: 600 }}
                    >
                        Last Name
                    </Typography>
                    <TextField
                        fullWidth
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter your last name"
                        variant="outlined"
                    />
                </Box>

                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleNext}
                    sx={{ py: 1.5 }}
                >
                    Next
                </Button>
            </CardContent>
        </Card>
    )
}

export default NameStep
