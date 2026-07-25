import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, Sparkles } from 'lucide-react';

export default function ProtectedRoute({ children }) {
  const { user, loading, openAuthModal } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 glass-card rounded-3xl text-center space-y-4 border border-amber-500/30">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
          <Lock className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Authentication Required</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Please log in or register to access this protected solar report feature.
        </p>
        <button
          onClick={() => openAuthModal('login')}
          className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm rounded-xl shadow-md"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  return children;
}
