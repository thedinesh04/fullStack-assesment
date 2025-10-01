import React, { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import BookingForm from './components/BookingForm'
import SuccessPage from './components/SuccessPage'

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
})

function App() {
    const [bookingComplete, setBookingComplete] = useState(false)
    const [bookingDetails, setBookingDetails] = useState(null)

    const handleBookingSuccess = (details) => {
        setBookingDetails(details)
        setBookingComplete(true)
    }

    const handleStartNew = () => {
        setBookingComplete(false)
        setBookingDetails(null)
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    minHeight: '100vh',
                    backgroundColor: '#f5f5f5',
                    py: 4,
                }}
            >
                <Container maxWidth="md">
                    {!bookingComplete ? (
                        <BookingForm onSuccess={handleBookingSuccess} />
                    ) : (
                        <SuccessPage
                            bookingDetails={bookingDetails}
                            onStartNew={handleStartNew}
                        />
                    )}
                </Container>
            </Box>
        </ThemeProvider>
    )
}

export default App
