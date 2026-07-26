import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sun, Mail, Lock, User, MapPin, IndianRupee, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authModalTab, setAuthModalTab, login, register: registerAuth } = useAuth();
  const [serverError, setServerError] = useState('');
  const [serverSuccess, setServerSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm();

  if (!isAuthModalOpen) return null;

  const handleTabSwitch = (tab) => {
    setAuthModalTab(tab);
    setServerError('');
    setServerSuccess('');
    clearErrors();
    reset();
  };

  const onSubmit = async (data) => {
    setServerError('');
    setServerSuccess('');
    setLoading(true);

    if (authModalTab === 'login') {
      const res = await login(data.email, data.password);
      if (!res.success) {
        setServerError(res.message);
      } else {
        setServerSuccess('Login successful!');
      }
    } else {
      const res = await registerAuth({
        name: data.name,
        email: data.email,
        password: data.password,
        state: data.state || 'Maharashtra',
        monthlyBill: Number(data.monthlyBill) || 4000,
        requestAdmin: Boolean(data.requestAdmin),
      });
      if (!res.success) {
        setServerError(res.message);
      } else {
        setServerSuccess(
          data.requestAdmin
            ? 'Registration successful! Your Admin privilege request has been submitted for administrator review.'
            : 'Registration successful! Welcome to SolarWise India.'
        );
      }
    }
    setLoading(false);
  };

  const handleDemoLogin = async () => {
    setServerError('');
    setLoading(true);
    const res = await login('demo@solarwise.in', 'solar123');
    if (!res.success) {
      setServerError(res.message);
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 z-10 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="text-center space-y-2 mb-6">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-500 p-0.5 flex items-center justify-center shadow-md">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                <Sun className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {authModalTab === 'login' ? 'Welcome Back' : 'Create SolarWise Account'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {authModalTab === 'login'
                ? 'Sign in to access your saved rooftop solar reports & subsidy tracker'
                : 'Join India’s premier clean energy platform in seconds'}
            </p>
          </div>

          {/* Tab Selection */}
          <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl mb-6 border border-slate-200/50 dark:border-slate-700/50">
            <button
              onClick={() => handleTabSwitch('login')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                authModalTab === 'login'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => handleTabSwitch('register')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                authModalTab === 'register'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Register
            </button>
          </div>

          {/* Error / Success Notifications */}
          {serverError && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{serverError}</span>
            </div>
          )}
          {serverSuccess && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{serverSuccess}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {authModalTab === 'register' && (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-500 dark:text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Rajesh Sharma"
                      {...register('name', { required: authModalTab === 'register' ? 'Name is required' : false })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none placeholder-slate-400 dark:placeholder-slate-500"
                    />
                  </div>
                  {errors.name && <span className="text-[11px] text-red-500">{errors.name.message}</span>}
                </div>
              </>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-500 dark:text-slate-400" />
                <input
                  type="email"
                  placeholder="name@domain.com"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
                  })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none placeholder-slate-400 dark:placeholder-slate-500"
                />
              </div>
              {errors.email && <span className="text-[11px] text-red-500">{errors.email.message}</span>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-500 dark:text-slate-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Minimum 6 characters' },
                  })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none placeholder-slate-400 dark:placeholder-slate-500"
                />
              </div>
              {errors.password && <span className="text-[11px] text-red-500">{errors.password.message}</span>}
            </div>

            {authModalTab === 'register' && (
              <>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">State</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-500 dark:text-slate-400" />
                      <select
                        {...register('state')}
                        className="w-full pl-8 pr-2 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                      >
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Bihar">Bihar</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Monthly Bill (₹)</label>
                    <div className="relative">
                      <IndianRupee className="w-4 h-4 absolute left-3 top-3 text-slate-500 dark:text-slate-400" />
                      <input
                        type="number"
                        placeholder="4000"
                        {...register('monthlyBill')}
                        className="w-full pl-8 pr-2 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none placeholder-slate-400 dark:placeholder-slate-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <input
                    type="checkbox"
                    id="requestAdmin"
                    {...register('requestAdmin')}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-slate-300 dark:border-slate-700 accent-emerald-600 cursor-pointer"
                  />
                  <label htmlFor="requestAdmin" className="cursor-pointer">
                    Request Admin Privileges <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">(Requires existing Admin review)</span>
                  </label>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50"
            >
              {loading
                ? 'Processing...'
                : authModalTab === 'login'
                ? 'Sign In To Account'
                : 'Create Free Account'}
            </button>
          </form>

          {/* Quick Demo Login Option */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <button
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full py-2.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>One-Click Instant Demo Login (Rajesh Sharma)</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
