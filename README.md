# ☀️ SolarWise India — MERN Clean Energy & Rooftop Solar Platform

> **Production-Ready MERN Stack Application** engineered for Indian homeowners, commercial users, and clean energy enthusiasts to compute rooftop solar feasibility, calculate Direct Benefit Transfer (DBT) subsidies under **PM Surya Ghar Muft Bijli Yojana**, visualize 25-year financial ROI, chat with **SolarWise AI Assistant** (powered by Google Gemini API), and connect with DISCOM-approved installers.

---

## 🚀 Key Features across 9 Phases

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
     - 📈 **Savings Over Time (Line Chart)**: 25-Year compounding savings curve.
     - 🥧 **Investment & Subsidy Breakdown (Pie Chart)**: PM Surya Ghar Subsidy vs Net Cost.
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

8. **AI Solar Assistant — Google Gemini API (Phase 9)**:
   - Floating chatbot drawer at the bottom-right corner of every page (`ChatBot.jsx`).
   - Powered by official `@google/genai` SDK and `gemini-3.6-flash` model.
   - **Context Awareness**: Automatically attaches user calculation metrics (*terrace area, plant capacity kW, city, state, annual savings, subsidy*) for personalized recommendations.

9. **AI Battery Storage Recommendation System (Phase 10)**:
   - Evaluates system capacity, required backup hours (2h, 4h, 6h, 8h, full night), DoD %, and budget.
   - Recommends Tier-1 LiFePO₄ (LFP) / NMC battery storage units (Luminous, Exide, Microtek, Livguard, Tesla).
   - Computes replacement year, round-trip efficiency (95%), extra peak shaving savings ₹, and AI recommendation text.

10. **Solar Panel Brand Comparison System (Phase 11)**:
    - Multi-criteria scoring engine ranking Tier-1 Indian and global solar panel manufacturers (Tata Power Solar, Waaree, Adani, Vikram, LONGi, JinkoSolar).
    - Side-by-side comparison table matrix, cost per watt (₹/W), efficiency %, temperature coefficient, and 25–30 year performance warranties.

---

## 🛠️ Technology Stack

- **Frontend**: React (Vite), Tailwind CSS (v4), Framer Motion, Lucide Icons, Recharts, Leaflet.js, React-Leaflet, React Markdown, React Hook Form, Axios, React Router DOM.
- **Backend**: Node.js, Express.js (MVC Pattern), `@google/genai` SDK, Mongoose ORM, MongoDB Atlas, JSON Web Token (JWT), bcryptjs, CORS, dotenv.
- **Third-Party Open APIs**: Google Gemini API (`gemini-2.5-flash`), OpenStreetMap (Tiles), Open-Meteo API (Free Weather & Sunshine Duration).

---

## ⚙️ Environment Variables

### Backend (`server/.env`)
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/solarwise_india
JWT_SECRET=solarwise_super_secret_jwt_key_2026_india
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173
GEMINI_API_KEY=your_google_gemini_api_key_here
```

### Frontend (`client/.env`)
```env
VITE_API_URL=http://localhost:5000
```

---

## 📡 API Endpoints Documentation

### AI Chatbot (`/api/chat`)
- `POST /api/chat` — Submit query (`message`) with optional `calculationContext` object. Returns AI response powered by Gemini API.

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

## ⚡ Quick Start & Local Setup

```bash
# 1. Install root, backend, and frontend dependencies
npm run install:all

# 2. Start Backend & Frontend servers concurrently
npm run server  # Terminal 1 (Port 5000)
npm run client  # Terminal 2 (Port 5173)
```

Open `http://localhost:5173` in your browser.

---

## 📜 License & Compliance

Developed for clean energy transition under India's **PM Surya Ghar Muft Bijli Yojana** guidelines. Released under the ISC License.
