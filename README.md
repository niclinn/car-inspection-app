# Car Inspection App

This is a full-stack web application that allows car inspectors to view a list of cars and submit inspection results for each car based on a shared set of criteria. The app tracks whether a car has passed all checks, is in the process of being inspected, or hasn't passed at all.

---

## Overview

This app was developed as part of a Full Stack Engineer internship homework assignment for Vucar. It is built using the **MERN stack**:

- **MongoDB**: document database to store cars, criteria, and inspection results
- **Express.js**: REST API backend using Node.js
- **React.js**: client-side UI for managing inspections
- **Node.js**: JavaScript runtime on the backend

### Key Features

- View a list of cars with their inspection status
- Inspect a car using a shared 5-criteria checklist
- Automatically update car inspection status based on results:
  - `0`: Not inspected (0/5 criteria passed)
  - `1`: Inspecting (1–4/5 criteria passed)
  - `2`: Inspected (all 5 criteria passed)
- Require a note if a criterion is marked as failed
- Minimal, clean UI with intuitive controls

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (LTS version)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)
  - Must be running locally on default port 27017

---

### Installation & Setup

#### 1. Clone the repository

```bash
git clone https://github.com/your-username/car-inspection-app.git
cd car-inspection-app
```

---

#### 2. Backend Setup

```bash
cd backend
npm install
```

**Seed the database** with test data (4 cars and 5 criteria):

```bash
node seed.js
```

**Start the backend server**:

```bash
node server.js
```

- Runs at: `http://localhost:4000`
- Endpoints:
  - `GET /api/cars` – list of cars
  - `GET /api/criteria` – list of criteria
  - `POST /api/inspection/:carId` – submit inspection for a car

---

#### 3. Frontend Setup

In a **new terminal window**:

```bash
cd frontend
npm install
npm start
```

- Opens at: `http://localhost:3000`

---

## How It Works

### Inspection Workflow

1. Visit the homepage (`/`) to see all cars and their statuses
2. Click **“Inspect”** next to any car
3. A form shows 5 criteria, each with:
   - A checkbox (passed or not)
   - A note field if it is failed
4. Submit the inspection:
   - Results are sent to the backend
   - Backend updates the `status` of the car based on how many passed
5. Return to homepage and see updated car status

---

## Project Structure

```
car-inspection-app/
├── backend/
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── models/
│   │   ├── Car.js              # Car schema
│   │   ├── Criteria.js         # Criteria schema
│   │   └── InspectionResult.js # Inspection result schema
│   ├── routes/
│   │   ├── cars.js             # GET /api/cars
│   │   ├── criteria.js         # GET /api/criteria
│   │   └── inspection.js       # POST /api/inspection/:carId
│   ├── seed.js                 # Script to seed DB with dummy data
│   └── server.js               # Main backend server
├── frontend/
│   ├── public/
│   └── src/
│       ├── pages/
│       │   ├── Home.jsx        # Car list view
│       │   └── Inspect.jsx     # Inspection form
│       ├── App.js              # Routing setup
│       ├── index.js            # React entry point
│       └── index.css           # Basic styling
└── README.md
```

---

## Assumptions & Trade-offs

- Each car uses the same fixed set of 5 inspection criteria.
- The criteria list is seeded once and not editable through the UI.
- Re-inspecting a car overrides its previous results.
- A note is only required for failed criteria.
- No user login/authentication system included.
- Minimal styling for simplicity and time management.

---

## API Endpoints

| Method | Endpoint                  | Description                         |
|--------|---------------------------|-------------------------------------|
| GET    | `/api/cars`               | Get list of all cars                |
| GET    | `/api/criteria`           | Get list of all criteria            |
| POST   | `/api/inspection/:carId`  | Submit inspection results for a car|

Payload format for inspection submission:
```json
[
  {
    "criteriaId": "abc123",
    "is_good": true
  },
  {
    "criteriaId": "def456",
    "is_good": false,
    "note": "Brakes not working"
  }
]
```