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

    const handleNext = () => {
        setError('')

        if (!firstName.trim()) {
            setError('Please enter your first name')
            return
        }

        if (!lastName.trim()) {
            setError('Please enter your last name')
            return
        }

        if (firstName.trim().length < 2) {
            setError('First name must be at least 2 characters')
            return
        }

        if (lastName.trim().length < 2) {
            setError('Last name must be at least 2 characters')
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
