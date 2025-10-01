# 🚗 Vehicle Rental Booking System

A full-stack vehicle rental booking application built with React, Node.js, Express, Prisma, and MySQL. The system provides an intuitive multi-step form interface for customers to book vehicles with real-time availability checking, booking conflict prevention, and comprehensive date validation.

This project was built **without using any prebuilt form/booking plugins** — all logic is implemented manually.

---

## 🚀 Features

- **Multi-Step Form Interface**
  - Step 1: **Name Collection** → First Name & Last Name with validation.
  - Step 2: **Wheel Selection** → Choose between 2-wheeler (Bike) or 4-wheeler (Car).
  - Step 3: **Vehicle Type** → Dynamic loading based on wheel selection.
  - Step 4: **Vehicle Model** → Specific models filtered by vehicle type.
  - Step 5: **Date Range Picker** → Select start and end dates with validation.

- **Smart Form Management**
  - 🔄 **Dynamic Data Loading** → No hardcoded data, everything from database.
  - ✅ **Step Validation** → Cannot proceed without completing current step.
  - ⬅️ **Back Navigation** → Maintains form state while navigating.
  - 🧹 **Smart Field Clearing** → Auto-clears dependent fields when changing selections.

- **Booking System**
  - 🚫 **Conflict Prevention** → Blocks overlapping bookings for same vehicle.
  - 📅 **Date Validation** → Past dates blocked, 6-month advance limit.
  - 🔒 **Same-Day Blocking** → New booking cannot start on existing booking end date.
  - ✨ **Real-time Availability** → Instant feedback on vehicle availability.

- **Data Validation**
  - 📝 **Name Validation** → Letters only, min 2 characters, no numbers.
  - 🛡️ **Dual-Layer Validation** → Both frontend and backend validation.
  - ⚠️ **User-Friendly Errors** → Clear error messages for all validation failures.

- **Database Management**
  - 🗄️ **Prisma ORM** → Type-safe database queries with MySQL.
  - 🌱 **Seeded Data** → 5 vehicle types, 15 vehicles pre-populated.
  - 🔗 **Relational Schema** → Proper foreign key relationships.

- **UI/UX**
  - Responsive design (works on desktop, tablet & mobile).
  - Clean & modern UI using **Material-UI + Tailwind CSS**.
  - Loading states and error handling.
  - Success confirmation page with complete booking details.

---

## 🖼️ Demo Screenshot

![Vehicle Rental Booking System](./screenshot.png)

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **MySQL** (v8 or higher)
- **npm** or **yarn**

### 1. Install MySQL

**Windows:**
```bash
# Download MySQL Installer from https://dev.mysql.com/downloads/installer/
# Run installer and set root password
```

**Mac:**
```bash
brew install mysql
brew services start mysql
mysql_secure_installation
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
sudo mysql_secure_installation
```

### 2. Create Database

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE vehicle_rental;
exit;
```

### 3. Clone the repository

```bash
git clone https://github.com/thedinesh04/fullStack-assesment.git
cd fullStack-assesment
```

### 4. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
# Create .env file with:
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/vehicle_rental"
PORT=3000
FRONTEND_URL=http://localhost:5173

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed database
npm run seed

# Start backend server
npm run dev
```

Backend runs on: `http://localhost:3000`

### 5. Frontend Setup

```bash
# Open new terminal
cd frontend

# Install dependencies
npm install

# Start frontend server
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## 📊 Database Schema

### VehicleType
- **Fields:** id, name, wheels, createdAt, updatedAt
- **Seeded Data:** Hatchback, SUV, Sedan (4-wheels) | Cruiser, Sports (2-wheels)

### Vehicle
- **Fields:** id, model, vehicleTypeId, createdAt, updatedAt
- **Seeded Data:** 15 vehicles (3 per type)
- **Examples:** Honda City, Maruti Swift, Royal Enfield Classic 350

### Booking
- **Fields:** id, firstName, lastName, vehicleId, startDate, endDate, createdAt, updatedAt
- **Relationships:** Each booking linked to one vehicle

---

## 🔧 API Endpoints

### Vehicle Routes
- `GET /api/vehicles/types?wheels={2|4}` → Get vehicle types by wheel count
- `GET /api/vehicles?typeId={id}` → Get vehicles by type

### Booking Routes
- `POST /api/bookings` → Create new booking
- `GET /api/bookings/check-availability` → Check vehicle availability

### Health Check
- `GET /api/health` → Server status

---

## ✅ Validation Rules

| Field      | Rules                                    |
|------------|------------------------------------------|
| First Name | Letters only, min 2 chars, no numbers    |
| Last Name  | Letters only, min 2 chars, no numbers    |
| Wheels     | Required, must be 2 or 4                 |
| Type       | Required, must exist in database         |
| Model      | Required, must exist in database         |
| Start Date | Future date, within 6 months             |
| End Date   | After/equal start date, within 6 months  |

---

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL
- **ORM:** Prisma
- **Dev Tools:** Nodemon

### Frontend
- **Framework:** React.js
- **UI Library:** Material-UI (MUI)
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Date Handling:** date-fns

---

## 📁 Project Structure

```
fullStack-assesment/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── index.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
└── README.md
```

---

## 🎯 Key Features Explained

### 1. Smart Data Clearing
When you change wheel selection from 4 to 2, all dependent fields (vehicle type, model, dates) are automatically cleared.

### 2. Booking Conflict Prevention
If Vehicle A is booked from Jan 1-5, you cannot book it for:
- Jan 3-7 ❌ (overlaps)
- Jan 5-10 ❌ (same day start)
- Jan 1-3 ❌ (overlaps)
  
But you can book it from Jan 6 onwards ✅

### 3. Name Validation
- ✅ Accepts: "John", "Mary Jane", "O'Brien", "Anne-Marie"
- ❌ Rejects: "John123", "123", "@#$", "J"

---

## 🔍 Testing the Application

1. Complete a booking flow with valid data
2. Try booking the same vehicle with overlapping dates → Should fail
3. Enter numbers in name field → Should show error
4. Select past dates → Should be blocked
5. Try booking 7 months in advance → Should show error
6. Use Back button and change selections → Dependent fields should clear

---

## 🚧 Future Enhancements

- User authentication & authorization
- Payment gateway integration
- Booking history and management
- Admin dashboard for vehicle management
- Email/SMS notifications
- Vehicle images and ratings
- Price calculation
- Booking cancellation/modification

---

## 🙌 Author

Built with ❤️ by [Dinesh](https://github.com/thedinesh04)

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
