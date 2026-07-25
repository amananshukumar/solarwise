import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Home, Calculator, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-6 py-20">
        <div className="glass-card max-w-lg w-full p-8 sm:p-12 rounded-3xl text-center space-y-6 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-emerald-500 p-0.5 mx-auto flex items-center justify-center shadow-xl">
            <div className="w-full h-full bg-slate-900 rounded-[22px] flex items-center justify-center">
              <Sun className="w-10 h-10 text-amber-400 animate-spin-slow" />
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/20">
              404 Page Not Found
            </span>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Rooftop Out of Range
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              The solar page or endpoint you are trying to reach does not exist or has been relocated.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/"
              className="w-full sm:w-auto px-6 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Home className="w-4 h-4" />
              <span>Back To Home</span>
            </Link>

            <Link
              to="/calculator"
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 hover:scale-105 transition-all"
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>Solar Calculator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
