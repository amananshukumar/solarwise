import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, MapPin, Award, Zap, DollarSign, Leaf, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Features() {
  const { openAuthModal } = useAuth();
  
  // Quick Calculator state inside features
  const [monthlyBill, setMonthlyBill] = useState(4000);
  const [selectedState, setSelectedState] = useState('Maharashtra');

  // Calculation estimates
  const estimatedSystemKw = Math.max(1, (monthlyBill / 1200).toFixed(1));
  const estimatedSubsidy = estimatedSystemKw >= 3 ? 78000 : estimatedSystemKw >= 2 ? 60000 : 30000;
  const annualSavings = Math.round(monthlyBill * 12 * 0.85);

  const featuresList = [
    {
      icon: <Calculator className="w-6 h-6 text-amber-500" />,
      title: 'Precision ROI & Savings Calculator',
      description: 'Input your monthly electricity bill to calculate required kW capacity, rooftop area needed, payback period, and 25-year financial savings.',
      badge: 'Interactive',
    },
    {
      icon: <Award className="w-6 h-6 text-emerald-500" />,
      title: 'PM Surya Ghar Subsidy Calculator',
      description: 'Get automated calculation of Direct Benefit Transfer (DBT) subsidy eligibility up to ₹78,000 for residential homes.',
      badge: 'Government Scheme',
    },
    {
      icon: <MapPin className="w-6 h-6 text-teal-500" />,
      title: 'GIS Rooftop Solar Irradiance',
      description: 'Analyze solar radiation metrics and shadow-free roof area across Indian states with high accuracy.',
      badge: 'Satellite AI',
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: 'State DISCOM Net Metering Policy',
      description: 'Access state-by-state net metering regulations, application workflows, and bi-directional meter setup guidelines.',
      badge: 'State Policy',
    },
    {
      icon: <DollarSign className="w-6 h-6 text-emerald-600" />,
      title: 'Verified Local Installer Directory',
      description: 'Connect directly with MNRE-empanelled rooftop solar vendors in your city for zero-hassle turnkey installation.',
      badge: 'Empanelled Vendors',
    },
    {
      icon: <Leaf className="w-6 h-6 text-green-500" />,
      title: 'Ecological Impact Scorecard',
      description: 'Track how your clean solar energy production offsets CO2 emissions, coal burning, and saves trees over time.',
      badge: 'Eco Impact',
    },
  ];

  return (
    <section id="features" className="py-20 relative bg-slate-50/50 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1.5 rounded-full border border-emerald-500/20">
            Engineered For Indian Homes & Businesses
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Everything You Need To Go Solar With 100% Confidence
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            From subsidy calculations to net-metering clearance, SolarWise simplifies every step of your solar journey.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuresList.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-6 rounded-2xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {feat.icon}
                </div>
                <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                  {feat.badge}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-950 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {feat.title}
              </h3>
              <p className="text-sm text-slate-800 dark:text-slate-300 font-medium leading-relaxed">
                {feat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Interactive Solar Savings Preview Widget */}
        <div id="solar-calculator" className="glass-card rounded-3xl p-8 border border-emerald-500/30 shadow-2xl bg-gradient-to-br from-emerald-950/5 via-slate-900/5 to-amber-950/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Widget Left Inputs */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Live Interactive Calculator</span>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  Quick Solar Savings Estimator
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Adjust your monthly bill to see your system requirement & estimated government subsidy.
                </p>
              </div>

              {/* Monthly Bill Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">Monthly Electricity Bill:</span>
                  <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
                    ₹{monthlyBill.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="25000"
                  step="500"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>₹1,000 / mo</span>
                  <span>₹12,000 / mo</span>
                  <span>₹25,000 / mo</span>
                </div>
              </div>

              {/* State Dropdown */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Select State / DISCOM Region:
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="Maharashtra">Maharashtra (MSEDCL / Tata Power)</option>
                  <option value="Gujarat">Gujarat (UGVCL / DGVCL / Torrent)</option>
                  <option value="Karnataka">Karnataka (BESCOM / MESCOM)</option>
                  <option value="Delhi">Delhi (BSES Yamuna / Rajdhani / TPDDL)</option>
                  <option value="Uttar Pradesh">Uttar Pradesh (UPPCL)</option>
                  <option value="Tamil Nadu">Tamil Nadu (TANGEDCO)</option>
                  <option value="Rajasthan">Rajasthan (JVVNL / AVVNL)</option>
                </select>
              </div>
            </div>

            {/* Widget Right Calculated Output */}
            <div className="lg:col-span-6 bg-slate-900 rounded-2xl p-6 text-white space-y-6 shadow-xl border border-slate-800">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <span className="text-xs text-slate-400 font-medium">Recommended System</span>
                  <div className="text-2xl font-extrabold text-amber-400 mt-1">{estimatedSystemKw} kW</div>
                  <span className="text-[11px] text-slate-400">Needs ~{Math.round(estimatedSystemKw * 85)} sq.ft roof</span>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <span className="text-xs text-slate-400 font-medium">PM Surya Ghar Subsidy</span>
                  <div className="text-2xl font-extrabold text-emerald-400 mt-1">
                    ₹{estimatedSubsidy.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[11px] text-emerald-300">Direct Bank Transfer</span>
                </div>
              </div>

              <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-500/30 flex items-center justify-between">
                <div>
                  <span className="text-xs text-emerald-300 font-semibold uppercase tracking-wider">Estimated Annual Savings</span>
                  <div className="text-3xl font-black text-white">₹{annualSavings.toLocaleString('en-IN')}<span className="text-xs text-slate-400 font-normal"> / year</span></div>
                </div>
                <button
                  onClick={() => openAuthModal('register')}
                  className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center gap-1.5"
                >
                  <span>Full Report</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
