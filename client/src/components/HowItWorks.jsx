import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Cpu, Banknote, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: <FileText className="w-6 h-6 text-amber-500" />,
      title: 'Input Your Bill & Location',
      description: 'Enter your average monthly electricity bill and state/DISCOM to instantly benchmark your power usage.',
    },
    {
      number: '02',
      icon: <Cpu className="w-6 h-6 text-emerald-500" />,
      title: 'AI Rooftop Simulation',
      description: 'Our system analyzes solar irradiation patterns to calculate optimal kW capacity, roof area needed, and total cost.',
    },
    {
      number: '03',
      icon: <Banknote className="w-6 h-6 text-teal-500" />,
      title: 'Claim Government Subsidy',
      description: 'Get step-by-step assistance for National Portal registration under PM Surya Ghar Yojana to secure up to ₹78,000 subsidy.',
    },
    {
      number: '04',
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-400" />,
      title: 'Installer & Net Meter Activation',
      description: 'Connect with MNRE-empanelled local solar vendors, complete grid net-metering setup, and start saving money!',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-3 py-1.5 rounded-full border border-amber-500/20">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            How SolarWise Guides Your Solar Journey
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Zero ambiguity. From bill analysis to net meter commissioning in less than 30 days.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="text-3xl font-black text-slate-300 dark:text-slate-700">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Step</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
