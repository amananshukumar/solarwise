import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, MessageSquare, X, Sparkles } from 'lucide-react';
import ChatWindow from './ChatWindow';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [calculationContext, setCalculationContext] = useState(null);

  // Retrieve any recent user calculation context stored in localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('solarwise_last_result');
      if (saved) {
        const parsed = JSON.parse(saved);
        const results = parsed.results || parsed;
        const inputs = parsed.inputs || results.inputs || {};

        setCalculationContext({
          roofArea: inputs.terraceLengthFt ? inputs.terraceLengthFt * inputs.terraceWidthFt * 0.092903 : 60,
          roofAreaSqFt: (inputs.terraceLengthFt || 30) * (inputs.terraceWidthFt || 20),
          capacity: results.recommendedKw || results.systemCapacityKw || 4.4,
          city: inputs.city || 'Mumbai',
          state: inputs.state || 'Maharashtra',
          annualSavings: results.annualSavingsRs || results.annualBillSavings || 60000,
          breakEven: results.breakEvenYears || results.paybackPeriodYears || 2.8,
          suitabilityScore: results.roofSuitabilityScore || 100,
        });
      }
    } catch (e) {
      console.warn('Could not parse calculation context:', e);
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Chat Window Popup Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4"
          >
            <ChatWindow
              onClose={() => setIsOpen(false)}
              calculationContext={calculationContext}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className={`relative p-4 rounded-full shadow-2xl border flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? 'bg-slate-900 border-slate-700 text-white'
            : 'bg-gradient-to-tr from-amber-500 via-emerald-500 to-teal-500 border-emerald-400 text-slate-950 shadow-emerald-500/30'
        }`}
        aria-label="Toggle SolarWise AI Chatbot"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative flex items-center justify-center">
            <Sun className="w-7 h-7 text-slate-950 animate-spin-slow" />
            <Sparkles className="w-3 h-3 text-amber-300 absolute -top-1 -right-1" />
          </div>
        )}

        {/* Pulse Ring Indicator */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          </span>
        )}
      </motion.button>
    </div>
  );
}
