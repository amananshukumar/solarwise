# ☀️ SolarWise India — MERN Clean Energy & Rooftop Solar Platform

> **Production-Ready MERN Stack Application** engineered for Indian homeowners, commercial users, and clean energy enthusiasts to compute rooftop solar feasibility, calculate Direct Benefit Transfer (DBT) subsidies under **PM Surya Ghar Muft Bijli Yojana**, visualize 25-year financial ROI, and connect with DISCOM-approved installers.

---

## 🚀 Key Features across 8 Phases

1. **Authentication & MVC Backend (Phase 1)**:
   - Node.js + Express backend following strict MVC pattern.
   - JWT authentication (`register`, `login`, `getMe`, `protect` middleware) with bcrypt password hashing.
   - Eco-friendly design system with glassmorphism, solar gradients, and dark mode support.

2. **Backend Solar Calculation Engine (Phases 2 & 3)**:
   - 100% backend-enforced math logic (`calculateSolar.js`).
   - 80% usable roof area rule, shadow factor multipliers, and 550W High-Efficiency panel count calculations (`Math.ceil((kW * 1000) / 550)`).
   - Cost basis: ₹55,000 / kW standard installation pricing.
   - PM Surya Ghar DBT Subsidy calculation (1 kW = ₹30k, 2 kW = ₹60k, 3 kW+ = ₹78k max).
   - Environmental equivalencies ($CO_2$ reduced, trees planted, thermal coal avoided $kg$, passenger cars off road).
   - 0–100 Roof Suitability scoring system.

3. **Interactive Results Dashboard (Phase 4)**:
   - **4 Recharts Visualizations**:
     - 📈 **Savings Over Time (Line Chart)**: 25-Year compounding savings curve factoring 5% annual DISCOM tariff escalation.
     - 🥧 **Investment & Subsidy Breakdown (Pie Chart)**: PM Surya Ghar Subsidy vs Net Out-of-Pocket Cost.
     - ☀️ **12-Month Solar Power Generation Profile (Area Chart)**: Seasonal kWh power production profile.
     - 📊 **Environmental Impact Comparison (Bar Chart)**: Comparative metrics for $CO_2$ saved, trees planted, and coal avoided.
   - AI Smart Solar Recommendations Engine.

4. **Maps & Weather Integration (Phase 5)**:
   - **Leaflet.js + OpenStreetMap**: Interactive city map with custom solar marker (100% free, no Google Maps or paid API keys required).
   - **Open-Meteo Weather API Integration**: Live ambient temperature (°C), weather condition, wind speed, and daily sunshine duration.
   - **Backend 1-Hour TTL Caching**: Reduces external API calls and ensures sub-millisecond responses.

5. **Protected User Dashboard & PDF Exporter (Phase 6)**:
   - Saved calculation history stored in MongoDB.
   - Search & filtering controls (by city, state, system size).
   - Historical Comparison Bar Chart & Side-by-Side Calculation Matrix.
   - Formatted, downloadable PDF report generator (`pdfGenerator.js`).

6. **Role-Based Admin Management Panel (Phase 7)**:
   - Protected route `/admin` with `adminOnly` middleware.
   - CRUD management tables for Indian State DISCOM tariffs (₹/kWh), solar irradiance benchmarks, and city coordinates.
   - Global solar installation pricing & PM Surya Ghar subsidy rule configuration.

7. **Production Polish & Performance (Phase 8)**:
   - Route code-splitting with `React.lazy()` and `Suspense` spinners.
   - Reusable shimmer skeleton loaders and toast notification banners.
   - Eco-styled 404 Not Found page.

---

## 🛠️ Technology Stack

- **Frontend**: React (Vite), Tailwind CSS (v4), Framer Motion, Lucide Icons, Recharts, Leaflet.js, React-Leaflet, React Hook Form, Axios, React Router DOM.
- **Backend**: Node.js, Express.js (MVC Pattern), Mongoose ORM, MongoDB Atlas, JSON Web Token (JWT), bcryptjs, CORS, dotenv.
- **Third-Party Open APIs**: OpenStreetMap (Tiles), Open-Meteo API (Free Weather & Sunshine Duration).

---

## 📁 Directory Structure

```text
solarwise-india/
├── client/                     # Vite React Frontend
│   ├── src/
│   │   ├── components/         # Reusable UI (Navbar, Footer, Hero, Features, Maps, Weather, Toasts, Skeletons)
│   │   ├── context/            # AuthContext, ThemeContext
│   │   ├── pages/              # CalculatorPage, ResultsDashboard, UserDashboard, AdminPanel, NotFoundPage
│   │   ├── utils/              # pdfGenerator.js
│   │   ├── App.jsx             # React Router with React.lazy code-splitting
│   │   ├── main.jsx
│   │   └── index.css           # Eco-theme design tokens & glassmorphism
│   ├── vite.config.js
│   └── vercel.json             # Vercel SPA routing rewrite config
│
├── server/                     # Express Node.js Backend (MVC)
│   ├── src/
│   │   ├── config/             # db.js (Mongoose MongoDB connection)
│   │   ├── controllers/        # authController, calculatorController, weatherController, adminController
│   │   ├── middleware/         # authMiddleware, adminMiddleware
│   │   ├── models/             # User, StateData, CalculationResult
│   │   ├── routes/             # authRoutes, calculatorRoutes, weatherRoutes, adminRoutes
│   │   ├── seed/               # seedStateData.js (10 Indian states & city coordinates)
│   │   ├── services/           # calculateSolar.js, weatherService.js (Open-Meteo + 1-hr Cache)
│   │   └── index.js            # Main Express Server Entry
│   ├── render.yaml             # Render service deployment manifest
│   └── .env.example
│
├── package.json                # Monorepo root helper scripts
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (`server/.env`)
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/solarwise_india
JWT_SECRET=solarwise_super_secret_jwt_key_2026_india
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173
```

### Frontend (`client/.env`)
```env
VITE_API_URL=http://localhost:5000
```

---

## ⚡ Quick Start & Local Setup

### 1. Clone & Install Dependencies
From root directory:
```bash
# Install root, backend, and frontend packages concurrently
npm run install:all
```

Or manually:
```bash
cd server && npm install
cd ../client && npm install
```

### 2. Start Development Servers
From root directory:
```bash
# Terminal 1: Start Backend (Port 5000)
npm run server

# Terminal 2: Start Frontend (Port 5173)
npm run client
```

Open `http://localhost:5173` in your browser.

---

## 🔑 Demo Access Credentials

- **One-Click Demo Login**: Click "One-Click Instant Demo Login (Rajesh Sharma)" inside the Sign In modal.
- **Demo User Email**: `demo@solarwise.in`
- **Demo User Password**: `solar123`
- **Admin Access**: Logged in as `demo@solarwise.in` or `admin@solarwise.in` grants access to `/admin`.

---

## 📡 API Endpoints Documentation

### Authentication (`/api/auth`)
- `POST /api/auth/register` — Register new user (`name`, `email`, `password`, `state`, `monthlyBill`).
- `POST /api/auth/login` — Authenticate user and return JWT token.
- `GET /api/auth/me` — *(Protected)* Fetch authenticated user profile.

### Calculator & Solar Math (`/api/calculator`)
- `GET /api/calculator/location-data` — Get Indian states, cities, default tariff rates, and irradiance levels.
- `POST /api/calculator/calculate` — Submit terrace dimensions & bill to receive full backend-computed report.
- `GET /api/calculator/history` — *(Protected)* Get user's saved calculation history from MongoDB.
- `DELETE /api/calculator/history/:id` — *(Protected)* Delete a saved calculation record.

### Weather & Sunshine (`/api/weather`)
- `GET /api/weather?city=Mumbai&lat=19.076&lng=72.877` — Get live Open-Meteo weather & daily sunshine hours (1-hour cached).

### Admin Management (`/api/admin`)
- `GET /api/admin/stats` — *(Admin Only)* Get platform overview statistics.
- `GET /api/admin/states` — *(Admin Only)* Get all state DISCOM tariff records.
- `POST /api/admin/states` — *(Admin Only)* Create new state tariff record.
- `PUT /api/admin/states/:id` — *(Admin Only)* Update state DISCOM name, rate, irradiance, or city coordinates.
- `DELETE /api/admin/states/:id` — *(Admin Only)* Remove state tariff record.

---

## 🚀 Deployment Guide

### Deploying Frontend to Vercel
1. Connect your repository to [Vercel](https://vercel.com).
2. Set **Root Directory** to `client`.
3. Set **Build Command** to `npm run build` and **Output Directory** to `dist`.
4. Add Environment Variable `VITE_API_URL` pointing to your deployed Render API URL.
5. Deploy! (Single-page app rewrites are pre-configured in `client/vercel.json`).

### Deploying Backend to Render
1. Create a new **Web Service** on [Render](https://render.com).
2. Set **Root Directory** to `server`.
3. Set **Build Command** to `npm install`.
4. Set **Start Command** to `node src/index.js`.
5. Add Environment Variables:
   - `MONGO_URI`: Your MongoDB Atlas connection URI.
   - `JWT_SECRET`: Secret string for token signing.
   - `CLIENT_ORIGIN`: Your deployed Vercel frontend URL.
6. Deploy!

---

## 📜 License & Compliance

Developed for clean energy transition under India's **PM Surya Ghar Muft Bijli Yojana** guidelines. Released under the ISC License.
