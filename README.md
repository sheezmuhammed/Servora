# Servora – Your Trusted Local Services

A hyperlocal marketplace built with the **MERN stack** where users can browse home services (electrician, plumber, tutor, cleaner, AC repair, carpenter), book a date and time, pay online with Razorpay (test mode), and write reviews. An admin dashboard manages services and bookings.

**Author:** Sheez Muhammed C

## Features
- Browse 6 service categories and filter services
- Register and login with JWT (valid email, 10-digit phone, strong password)
- Book a service with date, time and address
- Online payment with Razorpay (test mode) and a My Bookings page
- Star-rated reviews shown on the home page
- Admin dashboard: view and update bookings, add and delete services
- Responsive design with a mobile menu

## Tech Stack
- **Frontend:** React (Vite), React Router, Tailwind CSS, Axios
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Security and payments:** JWT, bcrypt, Razorpay

## Setup

### Prerequisites
Node.js, MongoDB (running locally), and a Razorpay test account.

### 1. Backend
```bash
cd backend
npm install
```
Create `backend/.env`:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/servora
JWT_SECRET=your_secret_here
RAZORPAY_KEY_ID=your_test_key_id
RAZORPAY_KEY_SECRET=your_test_key_secret
```
Add the starter data, then start the server:
```bash
node seed.js
node seedReviews.js
npm run dev
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:5173

## Demo admin login
Created by `seed.js`: `admin@servora.com` / `admin123`

## Razorpay test payment
Use UPI ID `success@razorpay`, or the test card `4111 1111 1111 1111` with any future expiry and any CVV.

## Folder structure
```
servora/
├── backend/    models, routes, middleware, server.js
└── frontend/   src/components, src/pages, src/context
```

## Future scope
Provider login, live location, SMS and email notifications, cancel and reschedule with refunds, and a mobile app.