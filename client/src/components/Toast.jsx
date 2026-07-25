import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'info', onClose, duration = 4000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const bgColors = {
    success: 'bg-emerald-600 text-white border-emerald-500 shadow-emerald-500/25',
    error: 'bg-red-600 text-white border-red-500 shadow-red-500/25',
    warning: 'bg-amber-500 text-slate-950 border-amber-400 shadow-amber-500/25',
    info: 'bg-slate-900 text-white border-slate-700 shadow-slate-900/25',
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 shrink-0" />,
    info: <Info className="w-5 h-5 shrink-0 text-amber-400" />,
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl border shadow-xl flex items-center gap-3 font-semibold text-xs ${
          bgColors[type] || bgColors.info
        }`}
      >
        {icons[type] || icons.info}
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-2 p-1 hover:opacity-75 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
