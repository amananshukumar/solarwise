import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'What is the central government subsidy under PM Surya Ghar Muft Bijli Yojana?',
      a: 'Under the PM Surya Ghar scheme, residential households receive a Direct Benefit Transfer (DBT) subsidy of ₹30,000 for 1 kW capacity, ₹60,000 for 2 kW capacity, and a maximum of ₹78,000 for 3 kW and higher system capacities.',
    },
    {
      q: 'How long does it take for a rooftop solar system to pay for itself?',
      a: 'For most Indian residential consumers with monthly bills above ₹2,500, the typical payback period is between 2.5 to 3.5 years. After payback, your rooftop solar generates free electricity for the remaining 20+ years of module lifespan.',
    },
    {
      q: 'What is Net Metering and how does it work with my local DISCOM?',
      a: 'A bi-directional Net Meter records both the energy consumed from the grid during nighttime and excess solar power exported back to the DISCOM during daytime. Your monthly bill is generated only for the net difference.',
    },
    {
      q: 'How much shadow-free roof area is needed for solar installation?',
      a: 'As a rule of thumb in India, approximately 80 to 100 square feet of unobstructed, shadow-free south-facing roof area is required for every 1 kW of solar PV capacity.',
    },
    {
      q: 'What maintenance is required for residential solar panels?',
      a: 'Solar panels have no moving parts and require minimal maintenance. Dusting off panels with clean water once every 2-3 weeks in dry Indian climates is sufficient to keep efficiency optimal.',
    },
    {
      q: 'Can group housing societies (RWA) or apartment flats apply for solar subsidies?',
      a: 'Yes! Group Housing Societies (GHS) and Residential Welfare Associations (RWA) can claim subsidies up to ₹18,000 per kW for common facility power usage (EV charging, lifts, lighting) up to a cap of 500 kW capacity.',
    },
  ];

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="py-20 relative bg-slate-50/50 dark:bg-slate-900/40 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1.5 rounded-full border border-emerald-500/20">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Everything About PM Surya Ghar & Solar Subsidies
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base">
            Got questions about installation, net metering, or subsidies? We’ve got answers.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-extrabold text-slate-950 dark:text-white text-base sm:text-lg focus:outline-none"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-amber-500 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-emerald-600 dark:text-emerald-400' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-0 text-sm text-slate-800 dark:text-slate-300 font-medium leading-relaxed border-t border-slate-200 dark:border-slate-800/60 mt-2 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
