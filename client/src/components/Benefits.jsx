import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ShieldCheck, Zap, Home, Award, DollarSign } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    {
      icon: <DollarSign className="w-6 h-6 text-emerald-500" />,
      title: 'Massive Financial Returns',
      tagline: 'Up to 28% Annual ROI',
      desc: 'Rooftop solar outperforms traditional fixed deposits and equity mutual funds with guaranteed lifetime electricity savings.',
      color: 'from-emerald-500/10 to-teal-500/5',
    },
    {
      icon: <Award className="w-6 h-6 text-amber-500" />,
      title: 'Direct Government Subsidies',
      tagline: '₹30,000 to ₹78,000 DBT',
      desc: 'Claim Direct Benefit Transfer subsidies directly credited into your bank account under the PM Surya Ghar scheme.',
      color: 'from-amber-500/10 to-yellow-500/5',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-teal-500" />,
      title: 'Hedge Against Tariff Hikes',
      tagline: 'Lock In Electricity Tariff',
      desc: 'Indian DISCOM power tariffs rise 4-7% every year. Solar protects your household from future price spikes.',
      color: 'from-teal-500/10 to-emerald-500/5',
    },
    {
      icon: <Home className="w-6 h-6 text-blue-500" />,
      title: 'Appreciate Property Value',
      tagline: 'Higher Real Estate Demand',
      desc: 'Homes with installed rooftop solar systems command higher resale value and attract premium buyers.',
      color: 'from-blue-500/10 to-cyan-500/5',
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: 'Reliable 25-Year Lifespan',
      tagline: 'Tier-1 Module Warranties',
      desc: 'Modern solar panels retain 80%+ efficiency after 25 years with minimal maintenance required.',
      color: 'from-yellow-500/10 to-amber-500/5',
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-500" />,
      title: 'Earn From Excess Power',
      tagline: 'Bi-Directional Net Metering',
      desc: 'Export surplus energy generated during peak sunshine back to your DISCOM grid and earn energy credits.',
      color: 'from-green-500/10 to-emerald-500/5',
    },
  ];

  return (
    <section id="benefits" className="py-20 relative bg-slate-50/50 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-teal-600 dark:text-teal-400 bg-teal-100 dark:bg-teal-950/60 px-3 py-1.5 rounded-full border border-teal-500/20">
            Why Indian Households Choose Solar
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Unbeatable Financial & Eco Advantages
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Rooftop solar isn’t just an expense — it’s a high-yield green asset for your home.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 transition-all duration-300 bg-gradient-to-br ${item.color}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full">
                  {item.tagline}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
