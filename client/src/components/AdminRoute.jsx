import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, Lock, Sparkles } from 'lucide-react';

export default function AdminRoute({ children }) {
  const { user, loading, openAuthModal } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500" />
      </div>
    );
  }

  // Allow access if user is logged in (demo user counts as admin for testing)
  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 glass-card rounded-3xl text-center space-y-4 border border-amber-500/40 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 dark:text-white">Admin Privileges Required</h3>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Please log in as an administrator or use One-Click Demo Login to access the SolarWise Admin Panel.
        </p>
        <button
          onClick={() => openAuthModal('login')}
          className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs rounded-xl shadow-md"
        >
          Sign In As Admin
        </button>
      </div>
    );
  }

  return children;
}
