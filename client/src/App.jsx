import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Benefits from './components/Benefits';
import SolarSavingsCTA from './components/SolarSavingsCTA';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import CalculatorPage from './pages/CalculatorPage';
import ResultsDashboard from './pages/ResultsDashboard';
import UserDashboard from './pages/UserDashboard';

function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col selection:bg-emerald-500 selection:text-white">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Benefits />
      <SolarSavingsCTA />
      <FAQ />
      <Footer />
      <AuthModal />
    </main>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/results" element={<ResultsDashboard />} />
            <Route path="/dashboard" element={<UserDashboard />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
