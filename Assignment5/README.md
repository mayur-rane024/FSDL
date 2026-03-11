# SafeLife Insurance Portal

SafeLife Insurance Portal is a complete full-stack insurance management application with JWT auth, role-based access, policy lifecycle, claims, payment simulation, document upload, admin analytics, and report export.

## Tech Stack

- Frontend: React (Vite), Tailwind CSS, React Router DOM, Axios, Context API, Chart.js
- Backend: Node.js, Express, MongoDB Atlas, Mongoose, JWT, bcrypt, dotenv, Multer, Nodemailer

## Folder Structure

```text
Assignment5/
  server/
    config/
      db.js
    controllers/
    models/
    routes/
    middleware/
    utils/
    uploads/
    seed.js
    server.js
    .env.example
  client/
    src/
    .env.example
```

## Features

### User

- Register
- Login
- View policies
- Apply for policy
- Upload documents
- Pay premium (simulation)
- Submit claims
- Track claim status
- Edit profile

### Admin

- Analytics dashboard
- CRUD policies
- Approve/reject applications
- Manage claims
- View users
- Export CSV report

## MongoDB Atlas Setup

1. Create a MongoDB Atlas cluster.
2. Create a DB user and password.
3. Whitelist your IP in Network Access.
4. Copy the Atlas connection string.
5. Create `server/.env` from `server/.env.example`.
6. Paste connection string into `MONGO_URI`.

## Environment Variables

### Backend (`server/.env.example`)

```env
PORT=5000
MONGO_URI=mongodb+srv://yourusername:yourpassword@cluster.mongodb.net/safelife
JWT_SECRET=supersecretkey
EMAIL_USER=test@example.com
EMAIL_PASS=password
CLIENT_URL=http://localhost:5173
```

### Frontend (`client/.env.example`)

```env
VITE_API_URL=http://localhost:5000/api
```

## Database Behavior

- Auto-connect to MongoDB at server startup
- Connection success/failure logging
- Retry mechanism on startup failure
- Handles disconnect and reconnect attempts
- Graceful DB shutdown on `SIGINT`

## Required Indexes Implemented

- `User.email` unique index
- `Policy.category` index
- `Application.userId` index
- `Claim.status` index

## Seed Script

Run:

```bash
cd server
npm run seed
```

This script:

- Connects to MongoDB
- Deletes existing data
- Inserts admin user:
  - email: `admin@safelife.com`
  - password: `admin123`
- Inserts 5 sample policies
- Exits automatically

## Installation Flow

### Backend

```bash
cd server
npm install
npm run seed
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## API Highlights

- `GET /api/admin/stats` returns:
  - `totalUsers`
  - `totalPolicies`
  - `totalApplications`
  - `totalClaims`
  - `totalRevenue`
  - `monthlyRegistrations`
  - `policiesByCategory`
  - `claimsByStatus`

## Payment Simulation

When user pays:

- application `paymentStatus` -> `Paid`
- application `status` -> `Approved`
- revenue entry created
- success message returned

## Document Upload

- Multer storage: `server/uploads`
- Allowed file types: JPG, JPEG, PNG, PDF
- Max file size: 5MB
- Stored file path saved in DB

## Screenshots Placeholder

- `docs/login.png`
- `docs/user-dashboard.png`
- `docs/admin-dashboard.png`

## Deployment Guide

### Render

1. Deploy backend from `server` directory.
2. Build command: `npm install`
3. Start command: `npm start`
4. Add environment variables from `.env.example`.

### EC2

1. Launch EC2 instance and install Node.js + Nginx.
2. Run backend with PM2.
3. Build frontend (`npm run build`) and serve with Nginx.
4. Reverse proxy `/api` to backend service.
5. Configure SSL with Let's Encrypt.
