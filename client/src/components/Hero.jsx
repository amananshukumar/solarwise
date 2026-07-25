import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sun, Zap, TrendingUp, IndianRupee, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-20 md:py-24">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/20 via-amber-500/20 to-teal-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-12 right-10 w-72 h-72 bg-amber-400/15 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Government Scheme Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500/40 text-emerald-900 dark:text-emerald-300 text-xs sm:text-sm font-extrabold shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>PM Surya Ghar Muft Bijli Yojana — Up to ₹78,000 Subsidy</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-slate-950 dark:text-white">
              Switch to Solar. <br />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 dark:from-emerald-400 dark:via-teal-300 dark:to-amber-400 bg-clip-text text-transparent">
                Slash Electricity Bills by 90%
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-800 dark:text-slate-200 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Discover your rooftop’s solar power generation potential, claim Central & State subsidies, calculate accurate 25-year financial ROI, and connect with top DISCOM-verified installers across India.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/calculator"
                className="w-full sm:w-auto px-8 py-4 text-base font-extrabold text-white rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 group"
              >
                <span>Calculate My Solar Savings</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#faq"
                className="w-full sm:w-auto px-7 py-4 text-base font-extrabold text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Subsidy Guide</span>
              </a>
            </div>

            {/* Trust highlights */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>MNRE Approved Standards</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>28+ State DISCOM Compatible</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-500" />
                <span>25 Year Module Warranty</span>
              </div>
            </div>
          </motion.div>

          {/* Right Interactive Graphic & Floating Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Visual Glass Box */}
            <div className="relative rounded-3xl p-6 glass-card border border-emerald-500/20 shadow-2xl overflow-hidden">
              {/* Solar Panel Card Mock visual */}
              <div className="relative h-72 sm:h-80 w-full rounded-2xl bg-slate-950 overflow-hidden flex flex-col justify-between p-6 text-white">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Header inside graphic */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <span className="font-bold text-sm text-emerald-400">Rooftop Solar AI Sim</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live System Active
                  </span>
                </div>

                {/* Center Visual Metering */}
                <div className="relative z-10 my-auto text-center space-y-2">
                  <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Estimated Monthly Generation</span>
                  <div className="text-4xl font-extrabold text-white tracking-tight flex items-center justify-center gap-1">
                    <span>480</span> <span className="text-xl text-amber-400 font-bold">kWh / Units</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-emerald-400 font-medium">
                    <TrendingUp className="w-4 h-4" />
                    <span>Replaces ₹4,320 Grid Bill with Clean Power</span>
                  </div>
                </div>

                {/* Footer bar */}
                <div className="relative z-10 grid grid-cols-3 gap-2 pt-4 border-t border-slate-800 text-center text-xs">
                  <div>
                    <div className="text-slate-400">Recommended</div>
                    <div className="font-bold text-white">3.5 kW System</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Govt Subsidy</div>
                    <div className="font-bold text-amber-400">₹78,000</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Payback Period</div>
                    <div className="font-bold text-emerald-400">2.6 Years</div>
                  </div>
                </div>
              </div>

              {/* Floating Stat Badge 1 */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-4 -left-4 bg-white dark:bg-slate-900 border border-emerald-500/30 rounded-2xl p-4 shadow-xl flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <IndianRupee className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">25-Yr Lifetime Savings</div>
                  <div className="text-sm font-extrabold text-slate-900 dark:text-white">₹14.2 Lakhs+</div>
                </div>
              </motion.div>

              {/* Floating Stat Badge 2 */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-900 border border-emerald-500/30 rounded-2xl p-4 shadow-xl flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <Sun className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">CO2 Reduction</div>
                  <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">112 Trees / Year</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
