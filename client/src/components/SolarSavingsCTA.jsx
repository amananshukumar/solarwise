import React from 'react';
import { motion } from 'framer-motion';
import { Sun, ArrowRight, Shield, Zap, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SolarSavingsCTA() {
  const { user, openAuthModal } = useAuth();

  const handleCTAClick = () => {
    if (!user) {
      openAuthModal('register');
    } else {
      const calc = document.getElementById('solar-calculator');
      if (calc) calc.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl border border-emerald-500/30">
          
          {/* Background Decorative Circles */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Claim Your Free Solar Audit Today</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Ready to Zero Your Power Bills & Claim Up to ₹78,000 Subsidy?
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              Join thousands of Indian homeowners taking advantage of PM Surya Ghar Muft Bijli Yojana. Calculate exact savings in under 60 seconds.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={handleCTAClick}
                className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-base rounded-2xl shadow-xl shadow-amber-500/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                <Sun className="w-5 h-5 text-slate-950 fill-slate-950" />
                <span>Calculate My Solar Savings</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => openAuthModal('login')}
                className="px-6 py-4 border border-slate-700 hover:border-slate-500 bg-slate-800/60 text-slate-200 font-semibold rounded-2xl transition-all"
              >
                Already Have Account? Sign In
              </button>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>100% Free & No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Instant DISCOM Tariff Benchmark</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
