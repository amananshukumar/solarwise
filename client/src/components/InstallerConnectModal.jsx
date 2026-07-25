import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShieldCheck,
  Star,
  Phone,
  CheckCircle2,
  Send,
  Building2,
  Award,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function InstallerConnectModal({ isOpen, onClose, city = 'Kolkata', state = 'West Bengal', recommendedKw = 4.4 }) {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: '',
    email: user?.email || '',
    notes: 'Please share quotes for a ' + recommendedKw + ' kW rooftop solar installation under PM Surya Ghar.',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const installersList = [
    {
      id: 1,
      name: 'Tata Power Solar Authorized EPC',
      city,
      rating: 4.9,
      reviews: 340,
      installations: '450+ Rooftops',
      badge: 'DISCOM Top Empanelled',
      warranty: '25-Yr Performance + 5-Yr Free AMC',
    },
    {
      id: 2,
      name: 'Waaree Energies Certified EPC',
      city,
      rating: 4.8,
      reviews: 280,
      installations: '380+ Rooftops',
      badge: 'PM Surya Ghar Fast-Track',
      warranty: '30-Yr TOPCon Warranty',
    },
    {
      id: 3,
      name: 'Adani Solar Partner EPC',
      city,
      rating: 4.9,
      reviews: 410,
      installations: '520+ Rooftops',
      badge: 'Turnkey DISCOM Clearance',
      warranty: '25-Yr Performance Warranty',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                Request Submitted Successfully!
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                Your survey request for a <strong>{recommendedKw} kW system</strong> has been dispatched to top verified DISCOM solar vendors in <strong>{city}, {state}</strong>.
              </p>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-500/30 text-xs font-semibold text-emerald-700 dark:text-emerald-300 max-w-md mx-auto">
                An empanelled installer will contact you at <strong>{formData.phone || 'your phone number'}</strong> within 24 business hours to conduct your free rooftop site assessment.
              </div>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-xs rounded-xl shadow-md"
              >
                Close & Return To Results
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>DISCOM Empanelled Vendor Network</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  Connect With Empanelled Installers In {city}
                </h3>
                <p className="text-xs text-slate-500">
                  Select a pre-verified solar EPC partner for turnkey installation, PM Surya Ghar subsidy filing, and DISCOM net-metering.
                </p>
              </div>

              {/* Installers Cards */}
              <div className="space-y-3">
                {installersList.map((inst) => (
                  <div
                    key={inst.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                          {inst.name}
                        </span>
                        <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-500/20">
                          {inst.badge}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{inst.rating} ({inst.reviews} reviews)</span>
                        </span>
                        <span>•</span>
                        <span>{inst.installations}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">{inst.warranty}</div>
                    </div>

                    <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-xl shrink-0">
                      Verified EPC
                    </span>
                  </div>
                ))}
              </div>

              {/* Free Survey Request Form */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-slate-200 dark:border-slate-800">
                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Request Free Site Survey & Custom Quote
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Phone Number (For Site Visit)</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm rounded-xl shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Free Site Visit & Quotes in {city}</span>
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
