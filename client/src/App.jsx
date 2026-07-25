import React, { Suspense, lazy } from 'react';
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
import ChatBot from './components/chat/ChatBot';
import { PageSpinner } from './components/SkeletonLoader';

// Lazy Loaded Page Components for Code-Splitting & Performance
const CalculatorPage = lazy(() => import('./pages/CalculatorPage'));
const ResultsDashboard = lazy(() => import('./pages/ResultsDashboard'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

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
          <Suspense fallback={<PageSpinner />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/calculator" element={<CalculatorPage />} />
              <Route path="/results" element={<ResultsDashboard />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
          {/* Floating AI Solar Assistant Chatbot */}
          <ChatBot />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
