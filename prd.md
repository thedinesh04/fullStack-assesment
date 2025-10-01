# Product Requirements Document (PRD)

## Vehicle Rental Booking System

### 1. Product Overview

**Product Name:** Vehicle Rental Booking System  
**Version:** 1.0.0  
**Product Type:** Full-Stack Web Application for Vehicle Rental Management

Vehicle Rental Booking System is a comprehensive web application designed to streamline the vehicle rental booking process. The system provides an intuitive multi-step form interface for customers to book vehicles (cars and bikes) with real-time availability checking, booking conflict prevention, and date range validation. Built with React frontend and Node.js backend with MySQL database, it ensures a seamless booking experience with robust data validation and error handling.

### 2. Target Users

-   **Vehicle Rental Customers:** Browse available vehicles, make bookings with specific date ranges, and receive booking confirmations

### 3. Core Features

#### 3.1 Multi-Step Booking Form

-   **Name Collection:** Capture customer's first and last name with validation
-   **Vehicle Category Selection:** Choose between 2-wheeler (bikes) or 4-wheeler (cars)
-   **Dynamic Vehicle Type Selection:** View vehicle types filtered by wheel selection
-   **Specific Model Selection:** Choose from available vehicle models based on type
-   **Date Range Picker:** Select rental start and end dates with validation
-   **Step-by-Step Navigation:** Progress through form with Next/Back buttons
-   **Validation at Each Step:** Prevent progression without completing current step
-   **Smart Data Clearing:** Auto-clear dependent fields when changing previous selections

#### 3.2 Vehicle Management

-   **Vehicle Type Categorization:** Organize vehicles by type (Hatchback, SUV, Sedan, Cruiser, Sports)
-   **Wheel-Based Filtering:** Separate 2-wheeler and 4-wheeler categories
-   **Dynamic Vehicle Loading:** Fetch vehicle data from database without hardcoding
-   **Vehicle Model Display:** Show specific models under each vehicle type

#### 3.3 Booking Management

-   **Booking Creation:** Create new bookings with customer and vehicle details
-   **Conflict Prevention:** Block overlapping date bookings for same vehicle
-   **Same-Day Blocking:** Prevent new booking start on existing booking end date
-   **Availability Checking:** Real-time verification of vehicle availability
-   **Booking Confirmation:** Display success page with complete booking details

#### 3.4 Date Validation

-   **Past Date Blocking:** Prevent bookings for past dates
-   **Advance Booking Limit:** Restrict bookings to maximum 6 months in advance
-   **Date Range Validation:** Ensure end date is after or equal to start date
-   **Date Conflict Detection:** Check for any overlapping existing bookings

#### 3.5 Data Validation

-   **Name Validation:**
    -   Minimum 2 characters required
    -   Only letters, spaces, hyphens, and apostrophes allowed
    -   At least 2 actual letters required
    -   No numbers or special characters
-   **Required Field Validation:** All form fields must be completed
-   **Frontend and Backend Validation:** Dual-layer validation for security
-   **User-Friendly Error Messages:** Clear feedback for validation failures

#### 3.6 User Experience

-   **Responsive Design:** Works on desktop, tablet, and mobile devices
-   **Material-UI Components:** Professional and consistent UI design
-   **Loading States:** Visual feedback during data fetching
-   **Error Handling:** Graceful error display with helpful messages
-   **Success Confirmation:** Detailed booking summary on completion
-   **Form State Management:** Maintain data across navigation

### 4. Technical Specifications

#### 4.1 API Endpoints Structure

**Vehicle Routes** (`/api/vehicles/`)

-   `GET /types?wheels={2|4}` - Get vehicle types by wheel count
-   `GET /?typeId={typeId}` - Get vehicles by type ID

**Booking Routes** (`/api/bookings/`)

-   `POST /` - Create new booking
    -   Request Body: `{firstName, lastName, vehicleId, startDate, endDate}`
-   `GET /check-availability?vehicleId={id}&startDate={date}&endDate={date}` - Check vehicle availability

**Health Check** (`/api/health/`)

-   `GET /` - System health status

#### 4.2 Frontend Routes

**Main Application Routes**

-   `/` - Booking form interface (multi-step)
    -   Step 1: Name input
    -   Step 2: Wheel selection (2 or 4)
    -   Step 3: Vehicle type selection
    -   Step 4: Vehicle model selection
    -   Step 5: Date range selection
-   Success Page - Booking confirmation (displayed after submission)

#### 4.3 Data Models

**VehicleType Schema:**

```javascript
{
  id: Integer (Primary Key, Auto Increment)
  name: String (Unique) // e.g., "Hatchback", "SUV", "Cruiser"
  wheels: Integer (2 or 4)
  vehicles: Vehicle[] (One-to-Many relationship)
  createdAt: DateTime
  updatedAt: DateTime
}
```

**Vehicle Schema:**

```javascript
{
  id: Integer (Primary Key, Auto Increment)
  model: String // e.g., "Honda City", "Royal Enfield Classic 350"
  vehicleTypeId: Integer (Foreign Key → VehicleType.id)
  vehicleType: VehicleType (Many-to-One relationship)
  bookings: Booking[] (One-to-Many relationship)
  createdAt: DateTime
  updatedAt: DateTime
}
```

**Booking Schema:**

```javascript
{
  id: Integer (Primary Key, Auto Increment)
  firstName: String
  lastName: String
  vehicleId: Integer (Foreign Key → Vehicle.id)
  vehicle: Vehicle (Many-to-One relationship)
  startDate: Date
  endDate: Date
  createdAt: DateTime
  updatedAt: DateTime
}
```

**Seeded Data:**

-   5 Vehicle Types (3 car types: Hatchback, SUV, Sedan | 2 bike types: Cruiser, Sports)
-   15 Vehicles (3 models per vehicle type)
-   Initial bookings: 0 (created by users)

#### 4.4 Booking Conflict Logic

**Overlap Detection Rules:**

-   New booking is blocked if:
    -   New start date falls within existing booking period
    -   New end date falls within existing booking period
    -   New booking completely contains existing booking
    -   **New booking starts on same day existing booking ends** (CRITICAL)
    -   New booking ends on same day existing booking starts

**Valid Booking Example:**

-   Existing Booking: Jan 1-5
-   Valid New Booking: Jan 6-10 ✓
-   Invalid New Booking: Jan 5-10 ✗ (same day overlap)
-   Invalid New Booking: Jan 4-8 ✗ (date overlap)

#### 4.5 Validation Rules Matrix

| Field      | Validation Rules                                       | Error Messages                           |
| ---------- | ------------------------------------------------------ | ---------------------------------------- |
| First Name | Required, Min 2 chars, Letters only, Min 2 letters     | "First name should contain only letters" |
| Last Name  | Required, Min 2 chars, Letters only, Min 2 letters     | "Last name should contain only letters"  |
| Wheels     | Required, Must be 2 or 4                               | "Please select number of wheels"         |
| Type       | Required, Must exist in database                       | "Please select a vehicle type"           |
| Model      | Required, Must exist in database                       | "Please select a specific vehicle model" |
| Start Date | Required, Not past, Within 6 months, Before end date   | "Start date cannot be in the past"       |
| End Date   | Required, Not past, After/equal start, Within 6 months | "End date must be after start date"      |

### 5. Technology Stack

#### 5.1 Backend Technologies

-   **Runtime:** Node.js (v18+)
-   **Framework:** Express.js
-   **Database:** MySQL (v8+)
-   **ORM:** Prisma
-   **Middleware:** CORS, express.json()
-   **Environment Management:** dotenv

#### 5.2 Frontend Technologies

-   **Framework:** React (Create React App)
-   **UI Library:** Material-UI (MUI)
-   **Styling:** Tailwind CSS (utility classes)
-   **HTTP Client:** Axios
-   **Date Handling:** date-fns
-   **State Management:** React useState hooks

#### 5.3 Development Tools

-   **Backend Dev Server:** Nodemon
-   **Database GUI:** Prisma Studio
-   **Version Control:** Git
-   **Package Manager:** npm

### 6. Security Features

-   **Input Validation:** Comprehensive validation on both frontend and backend
-   **SQL Injection Prevention:** Prisma ORM with parameterized queries
-   **XSS Protection:** React's built-in escaping
-   **CORS Configuration:** Controlled cross-origin resource sharing
-   **Data Sanitization:** Trim and validate user inputs
-   **Type Safety:** TypeScript-like validation with Prisma schema

### 7. User Flow

```
1. Customer opens application
   ↓
2. Enters first name and last name
   → Validation: Letters only, min 2 characters
   ↓
3. Selects number of wheels (2 or 4)
   → Clears: vehicle type, model, dates if changed
   ↓
4. Selects vehicle type (filtered by wheels)
   → Clears: vehicle model if changed
   ↓
5. Selects specific vehicle model
   ↓
6. Selects date range (start and end date)
   → Validation: Future dates, max 6 months, no conflicts
   ↓
7. Submits booking
   → Backend validates all data
   → Checks for booking conflicts
   → Creates booking in database
   ↓
8. Views success confirmation
   → Booking ID, customer name, vehicle details, dates
   → Option to make another booking
```

### 8. Error Handling

#### 8.1 Frontend Error Handling

-   Form validation errors displayed above input fields
-   API errors shown in alert components
-   Loading states during data fetching
-   Network error handling with user-friendly messages

#### 8.2 Backend Error Handling

-   HTTP status codes (400, 404, 409, 500)
-   Structured error responses with error field
-   Database connection error handling
-   Validation error messages
-   Booking conflict error messages

#### 8.3 Common Error Scenarios

| Scenario                | Status Code | Error Message                                         |
| ----------------------- | ----------- | ----------------------------------------------------- |
| Missing required fields | 400         | "All fields are required"                             |
| Invalid name format     | 400         | "First name should contain only letters"              |
| Past date selected      | 400         | "Start date cannot be in the past"                    |
| Booking beyond 6 months | 400         | "Bookings can only be made up to 6 months in advance" |
| Vehicle not found       | 404         | "Vehicle not found"                                   |
| Booking conflict        | 409         | "Vehicle is already booked for the selected dates"    |
| Server error            | 500         | "Failed to create booking"                            |

### 9. Database Schema Design

#### 9.1 Schema Relationships

```
VehicleType (1) ──────< (Many) Vehicle
                                  │
                                  │
                        (Many) >──┘
                                  │
                                  └──< (Many) Booking
```

#### 9.2 Indexes

**VehicleType Table:**

-   Primary Key: `id`
-   Index: `wheels` (for filtering by wheel count)

**Vehicle Table:**

-   Primary Key: `id`
-   Foreign Key: `vehicleTypeId` → VehicleType.id
-   Index: `vehicleTypeId` (for filtering by type)

**Booking Table:**

-   Primary Key: `id`
-   Foreign Key: `vehicleId` → Vehicle.id
-   Composite Index: `vehicleId`, `startDate`, `endDate` (for conflict checking)

#### 9.3 Database Migrations

-   Initial migration creates all tables with relationships
-   Seed script populates vehicle types and vehicles
-   Auto-generated timestamps for audit trail
-   Referential integrity maintained by foreign keys

### 10. Success Criteria

#### 10.1 Functional Requirements

-   ✓ Multi-step form completes successfully from start to finish
-   ✓ All validation rules enforced on frontend and backend
-   ✓ Booking conflicts prevented (no double bookings)
-   ✓ Same-day overlap blocked correctly
-   ✓ Past dates blocked from selection
-   ✓ 6-month advance booking limit enforced
-   ✓ Dynamic vehicle loading based on selections
-   ✓ Dependent fields cleared when changing previous selections
-   ✓ Success confirmation displays complete booking details

#### 10.2 Data Integrity

-   ✓ All bookings stored with complete information
-   ✓ No orphaned records in database
-   ✓ Foreign key relationships maintained
-   ✓ Date ranges validated and stored correctly
-   ✓ Name validation prevents invalid characters

#### 10.3 User Experience

-   ✓ Intuitive step-by-step progression
-   ✓ Clear error messages for validation failures
-   ✓ Responsive design works on all devices
-   ✓ Loading states provide feedback during operations
-   ✓ Back button maintains form state correctly
-   ✓ Form prevents progression without completing steps

#### 10.4 Performance

-   ✓ API response time under 500ms for standard queries
-   ✓ Frontend renders without blocking UI
-   ✓ Database queries optimized with indexes
-   ✓ No unnecessary re-renders in React components

#### 10.5 Security

-   ✓ SQL injection prevented through Prisma ORM
-   ✓ XSS attacks prevented through React escaping
-   ✓ Input validation on all user inputs
-   ✓ CORS properly configured
-   ✓ Environment variables secured in .env files

### 11. Future Enhancements

#### 11.1 User Authentication & Authorization

-   User registration and login system
-   Customer accounts with booking history
-   Admin dashboard for vehicle management
-   Role-based access control (Admin, Customer)

#### 11.2 Payment Integration

-   Online payment gateway integration
-   Multiple payment methods (card, UPI, wallet)
-   Payment confirmation and receipts
-   Booking cancellation with refunds

#### 11.3 Advanced Booking Features

-   Booking modification (change dates)
-   Booking cancellation
-   Booking history for customers
-   Favorite vehicles list
-   Email/SMS notifications for booking confirmations

#### 11.4 Vehicle Management

-   Admin panel for adding/editing vehicles
-   Vehicle images and detailed specifications
-   Vehicle availability calendar view
-   Pricing management (per day/hour)
-   Vehicle ratings and reviews

#### 11.5 Enhanced User Experience

-   Real-time availability calendar
-   Vehicle comparison feature
-   Filter and search functionality
-   Price calculator based on duration
-   Mobile app (iOS/Android)

#### 11.6 Reporting & Analytics

-   Booking reports and statistics
-   Revenue tracking
-   Popular vehicle analysis
-   Customer booking patterns
-   Occupancy rate tracking

#### 11.7 Additional Features

-   Multi-location support
-   Driver assignment option
-   Insurance add-ons
-   Additional equipment rental (GPS, child seat)
-   Loyalty points program
-   Promotional codes and discounts

### 12. Deployment Considerations

#### 12.1 Environment Setup

-   Development environment with local MySQL
-   Staging environment for testing
-   Production environment with cloud database
-   Environment-specific configuration files

#### 12.2 Hosting Recommendations

-   **Frontend:** Vercel, Netlify, AWS S3 + CloudFront
-   **Backend:** Railway, Heroku, AWS EC2, DigitalOcean
-   **Database:** AWS RDS, PlanetScale, Railway MySQL
-   **File Storage:** AWS S3 (for future vehicle images)

#### 12.3 CI/CD Pipeline

-   Automated testing on pull requests
-   Automated deployment on main branch merge
-   Database migration automation
-   Environment variable management

### 13. Testing Requirements

#### 13.1 Frontend Testing

-   Component unit tests with Jest
-   Integration tests for form flow
-   E2E tests with Cypress/Playwright
-   Accessibility testing (WCAG compliance)

#### 13.2 Backend Testing

-   API endpoint unit tests
-   Database integration tests
-   Validation logic tests
-   Booking conflict scenario tests

#### 13.3 Test Scenarios

-   Complete booking flow (happy path)
-   Name validation with various inputs
-   Date conflict detection
-   Back button navigation and data clearing
-   API error handling
-   Database constraint violations

### 14. Documentation Requirements

-   API documentation (endpoints, request/response formats)
-   Database schema documentation
-   Setup and installation guide
-   Deployment guide
-   User guide for booking process
-   Developer guide for contributing
-   Troubleshooting guide

### 15. Monitoring & Maintenance

#### 15.1 Monitoring

-   API endpoint response times
-   Database query performance
-   Error rate tracking
-   User booking completion rate
-   Server uptime monitoring

#### 15.2 Maintenance

-   Regular database backups
-   Log rotation and archival
-   Security patches and updates
-   Dependency updates
-   Performance optimization

### 16. Compliance & Legal

-   Privacy policy for customer data
-   Terms of service for vehicle rentals
-   Data retention policy
-   GDPR compliance (if applicable)
-   Payment gateway compliance (PCI DSS)

---

**Document Version:** 1.0.0  
**Last Updated:** October 2025  
**Status:** Active Development  
**Next Review Date:** December 2025
