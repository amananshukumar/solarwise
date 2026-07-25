import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation, MapPin, X, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function LocationPermissionModal({ isOpen, onClose, onRequestGPS, gpsError }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-300 dark:border-slate-800 z-10 overflow-hidden text-slate-900 dark:text-white"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 p-0.5 shadow-xl flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                <Navigation className="w-8 h-8 text-emerald-400 animate-bounce" />
              </div>
            </div>

            <h3 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
              Locate Your Rooftop via GPS
            </h3>

            <p className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
              SolarWise uses your browser’s location to center satellite maps directly on your home for precise rooftop solar AI analysis.
            </p>

            {gpsError && (
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs font-semibold flex items-center gap-2 text-left">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500" />
                <span>{gpsError}</span>
              </div>
            )}

            <div className="flex flex-col gap-3 pt-2">
              <button
                type="button"
                onClick={onRequestGPS}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                <span>Allow GPS Location Access</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              >
                Cancel / Manual Input
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-medium pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Location data is strictly confidential & temporary</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
