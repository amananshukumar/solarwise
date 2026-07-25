import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, User, LogOut, ChevronRight, Calculator, LayoutDashboard, ShieldCheck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, logout, openAuthModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = user && (user.role === 'admin' || user.email === 'demo@solarwise.in' || user.email === 'admin@solarwise.in');

  const handleLogout = () => {
    logout();
    navigate('/');
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  const pathname = location.pathname;
  const hash = location.hash;

  // Active Link Helpers
  const isHomeActive = pathname === '/' && (!hash || hash === '' || hash === '#top');
  const isCalculatorActive = pathname === '/calculator' || pathname === '/results';
  const isDashboardActive = pathname === '/dashboard';
  const isAdminActive = pathname === '/admin';
  const isFeaturesActive = (pathname === '/' || pathname === '') && hash === '#features';
  const isFaqActive = (pathname === '/' || pathname === '') && hash === '#faq';

  const linkClass = (isActive) =>
    isActive
      ? 'text-emerald-600 dark:text-emerald-400 font-extrabold border-b-2 border-emerald-500 pb-1 shadow-sm transition-all flex items-center gap-1.5'
      : 'text-slate-700 dark:text-slate-200 font-semibold border-b-2 border-transparent pb-1 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-400/50 transition-all flex items-center gap-1.5';

  return (
    <header className="sticky top-0 z-40 w-full glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-emerald-500 to-teal-500 p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
              <Sun className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 dark:from-emerald-400 dark:via-teal-300 dark:to-amber-400 bg-clip-text text-transparent">
              SolarWise<span className="text-amber-500 dark:text-amber-400">.in</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest -mt-1">
              India Solar Intelligence
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 font-medium text-sm">
          <Link to="/" className={linkClass(isHomeActive)}>
            <span>Home</span>
          </Link>

          <Link to="/calculator" className={linkClass(isCalculatorActive)}>
            <Calculator className="w-4 h-4 text-amber-500" />
            <span>Solar Calculator</span>
          </Link>

          {user && (
            <Link to="/dashboard" className={linkClass(isDashboardActive)}>
              <LayoutDashboard className="w-4 h-4 text-emerald-500" />
              <span>Dashboard</span>
            </Link>
          )}

          {isAdmin && (
            <Link to="/admin" className={linkClass(isAdminActive)}>
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>Admin Panel</span>
            </Link>
          )}

          <a href="/#features" className={linkClass(isFeaturesActive)}>
            <span>Features</span>
          </a>

          <a href="/#faq" className={linkClass(isFaqActive)}>
            <span>PM Surya Ghar FAQ</span>
          </a>
        </nav>

        {/* Right Actions: Theme Toggle & Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:scale-105 transition-all shadow-sm"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {user ? (
            <div className="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-slate-700">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 px-3 py-1.5 rounded-xl hover:scale-105 transition-transform"
              >
                <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-900 dark:text-emerald-200 max-w-[120px] truncate">
                  {user.name}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 rounded-xl text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => openAuthModal('login')}
                className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                Sign In
              </button>
              <Link
                to="/calculator"
                className="relative group px-5 py-2.5 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-1.5"
              >
                <span>Calculate Savings</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 dark:text-slate-200"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card border-t border-slate-200 dark:border-slate-800 px-6 py-6 space-y-4">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block ${isHomeActive ? 'text-emerald-600 dark:text-emerald-400 font-extrabold border-b-2 border-emerald-500 pb-1' : 'text-slate-700 dark:text-slate-200 font-semibold'}`}
          >
            Home
          </Link>
          <Link
            to="/calculator"
            onClick={() => setMobileMenuOpen(false)}
            className={`block ${isCalculatorActive ? 'text-emerald-600 dark:text-emerald-400 font-extrabold border-b-2 border-emerald-500 pb-1' : 'text-slate-700 dark:text-slate-200 font-semibold'}`}
          >
            Solar Calculator
          </Link>
          {user && (
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className={`block ${isDashboardActive ? 'text-emerald-600 dark:text-emerald-400 font-extrabold border-b-2 border-emerald-500 pb-1' : 'text-slate-700 dark:text-slate-200 font-semibold'}`}
            >
              My Dashboard
            </Link>
          )}
          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className={`block ${isAdminActive ? 'text-amber-600 dark:text-amber-400 font-extrabold border-b-2 border-amber-500 pb-1' : 'text-amber-600 font-semibold'}`}
            >
              Admin Panel
            </Link>
          )}
          <a
            href="/#features"
            onClick={() => setMobileMenuOpen(false)}
            className={`block ${isFeaturesActive ? 'text-emerald-600 dark:text-emerald-400 font-extrabold border-b-2 border-emerald-500 pb-1' : 'text-slate-700 dark:text-slate-200 font-semibold'}`}
          >
            Features
          </a>
          <a
            href="/#faq"
            onClick={() => setMobileMenuOpen(false)}
            className={`block ${isFaqActive ? 'text-emerald-600 dark:text-emerald-400 font-extrabold border-b-2 border-emerald-500 pb-1' : 'text-slate-700 dark:text-slate-200 font-semibold'}`}
          >
            PM Surya Ghar FAQ
          </a>
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
            {user ? (
              <div className="flex items-center justify-between">
                <span className="font-semibold text-emerald-600">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-100 dark:bg-red-950/40 text-red-600 rounded-lg text-sm font-semibold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => {
                    openAuthModal('login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl font-semibold text-slate-800 dark:text-slate-200"
                >
                  Sign In
                </button>
                <Link
                  to="/calculator"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl text-center block"
                >
                  Solar Calculator
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
