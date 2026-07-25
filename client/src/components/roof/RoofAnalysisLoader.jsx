import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Sparkles, Layers, ShieldCheck } from 'lucide-react';

export default function RoofAnalysisLoader() {
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    'Scanning satellite rooftop geometry...',
    'Detecting water tanks, AC units & obstacles...',
    'Calculating shadow-free usable roof area...',
    'Estimating optimal 550W panel count & kW size...',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % steps.length);
    }, 1200);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="p-8 rounded-3xl glass-card border border-emerald-500/40 bg-white dark:bg-slate-900 text-center space-y-6 shadow-2xl relative overflow-hidden">
      {/* Laser Scanning Beam Line */}
      <motion.div
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] z-20"
      />

      <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-amber-500 p-0.5 shadow-2xl flex items-center justify-center">
        <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
          <Cpu className="w-10 h-10 text-emerald-400 animate-pulse" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500/30 text-emerald-900 dark:text-emerald-300 text-xs font-black uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
          <span>Gemini Vision AI Engine Processing</span>
        </div>

        <h4 className="text-2xl font-black text-slate-950 dark:text-white">
          Analyzing Rooftop Satellite Screenshot
        </h4>

        <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 min-h-[24px]">
          {steps[stepIndex]}
        </p>
      </div>

      <div className="max-w-md mx-auto h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          className="h-full w-1/2 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full"
        />
      </div>

      <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-semibold">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>Precision GIS AI Model • 90%+ Accuracy</span>
      </div>
    </div>
  );
}
