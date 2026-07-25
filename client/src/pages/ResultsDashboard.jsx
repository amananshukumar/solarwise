import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun,
  Zap,
  IndianRupee,
  ShieldCheck,
  Award,
  ArrowRight,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Leaf,
  Layers,
  Printer,
  Info,
  CheckCircle2,
  Building,
  Car,
  Flame,
  Clock,
  Gauge,
  Percent,
  Bot,
  AlertTriangle,
  Download,
  Share2,
  ChevronRight,
  BookmarkPlus,
  MapPin,
  CloudSun,
} from 'lucide-react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import BatteryRecommendation from '../components/battery/BatteryRecommendation';
import PanelComparison from '../components/panels/PanelComparison';
import InstallerConnectModal from '../components/InstallerConnectModal';
import Toast from '../components/Toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CitySolarMap from '../components/CitySolarMap';
import WeatherCard from '../components/WeatherCard';
import { useAuth } from '../context/AuthContext';
import { getCityCoordinates } from '../utils/cityCoordinates';

const API_URL = import.meta.env.VITE_API_URL || '';

export default function ResultsDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, openAuthModal } = useAuth();

  const [savingReport, setSavingReport] = useState(false);
  const [reportSaved, setReportSaved] = useState(false);
  const [isInstallerModalOpen, setIsInstallerModalOpen] = useState(false);

  // Retrieve report passed from CalculatorPage or fallback demo report
  const rawReport = location.state?.reportData;
  const isLoading = location.state?.loading || false;
  const errorMsg = location.state?.error || '';

  // Fallback default report data if navigated directly
  const report = rawReport || {
    inputs: {
      terraceLengthFt: 30,
      terraceWidthFt: 20,
      state: 'Maharashtra',
      city: 'Mumbai',
      monthlyBill: 4500,
      electricityRate: 8.5,
      roofType: 'RCC',
      shadowLevel: 'None',
      panelType: 'Monocrystalline',
      averageSunshineHours: 5.5,
    },
    roof: {
      totalRoofAreaSqFt: 600,
      usableRoofAreaSqM: 44.59,
      usableRoofAreaSqFt: 480,
      shadowLevel: 'None',
    },
    system: {
      recommendedKw: 4.4,
      panelWattageW: 550,
      panelCount: 8,
      monthlyUnitsNeeded: 529,
    },
    financial: {
      costPerKw: 55000,
      grossInstallationCost: 246840,
      centralSubsidy: 78000,
      finalPayableAmount: 168840,
      breakEvenYears: 2.8,
    },
    generation: {
      averageSunshineHours: 5.5,
      dailyGenerationKwh: 19.36,
      monthlyGenerationKwh: 589,
      annualGenerationKwh: 7066,
      monthlySavingsRs: 5005,
      annualSavingsRs: 60061,
    },
    environmental: {
      annualCo2SavedKg: 5794,
      annualCo2SavedTons: 5.79,
      co2SavedUntilBreakEvenKg: 16223,
      co2SavedUntilBreakEvenTons: 16.22,
      treesEquivalent: 290,
      carsRemovedEquivalent: 2.52,
      coalAvoidedKg: 2826,
    },
    lifetime: {
      total25YearSavings: 2498686,
      roiPercentage: 1479.9,
      cashFlow25Yr: Array.from({ length: 25 }, (_, i) => ({
        year: i + 1,
        tariffRate: Number((8.5 * Math.pow(1.05, i)).toFixed(2)),
        annualSavings: Math.round(60061 * Math.pow(1.05, i) * Math.pow(0.995, i)),
        cumulativeSavings: Math.round(-168840 + 60061 * ((Math.pow(1.05, i + 1) - 1) / 0.05)),
      })),
    },
    suitability: {
      score: 100,
      rating: 'Excellent',
    },
  };

  // Coordinates lookup for Leaflet Map & Weather
  const coords = getCityCoordinates(report.inputs?.city);

  // 1. Pie Chart Data: Investment & Subsidy Breakdown
  const pieData = [
    { name: 'PM Surya Ghar Subsidy', value: report.financial.centralSubsidy, color: '#10b981' },
    { name: 'Net Payable Amount', value: report.financial.finalPayableAmount, color: '#f59e0b' },
  ];

  // 2. 12-Month Seasonal Power Generation Profile (Area Chart)
  const monthlyGenerationProfile = [
    { month: 'Jan', generation: Math.round(report.generation.monthlyGenerationKwh * 0.95) },
    { month: 'Feb', generation: Math.round(report.generation.monthlyGenerationKwh * 1.05) },
    { month: 'Mar', generation: Math.round(report.generation.monthlyGenerationKwh * 1.15) },
    { month: 'Apr', generation: Math.round(report.generation.monthlyGenerationKwh * 1.20) },
    { month: 'May', generation: Math.round(report.generation.monthlyGenerationKwh * 1.18) },
    { month: 'Jun', generation: Math.round(report.generation.monthlyGenerationKwh * 0.90) },
    { month: 'Jul', generation: Math.round(report.generation.monthlyGenerationKwh * 0.75) },
    { month: 'Aug', generation: Math.round(report.generation.monthlyGenerationKwh * 0.78) },
    { month: 'Sep', generation: Math.round(report.generation.monthlyGenerationKwh * 0.92) },
    { month: 'Oct', generation: Math.round(report.generation.monthlyGenerationKwh * 1.05) },
    { month: 'Nov', generation: Math.round(report.generation.monthlyGenerationKwh * 1.00) },
    { month: 'Dec', generation: Math.round(report.generation.monthlyGenerationKwh * 0.92) },
  ];

  // 3. Environmental Impact Comparison Bar Chart Data
  const envBarData = [
    { metric: 'CO2 Saved (Tons/Yr)', value: report.environmental.annualCo2SavedTons, color: '#10b981' },
    { metric: 'Coal Avoided (Tons/Yr)', value: Number((report.environmental.coalAvoidedKg / 1000).toFixed(2)), color: '#ef4444' },
  ];

  // AI Recommendation Engine Generator
  const generateAiInsights = () => {
    const insights = [];

    if (report.system.recommendedKw >= 3) {
      insights.push({
        title: 'Maximum Subsidy Qualified!',
        desc: `Your recommended system size of ${report.system.recommendedKw} kW unlocks the maximum ₹78,000 Direct Benefit Transfer subsidy under PM Surya Ghar.`,
        type: 'success',
      });
    }

    if (report.inputs.panelType === 'Monocrystalline') {
      insights.push({
        title: 'High-Efficiency Module Selected',
        desc: 'Monocrystalline PERC 550W panels offer superior low-light performance during Indian monsoon months compared to standard polycrystalline modules.',
        type: 'info',
      });
    }

    insights.push({
      title: `DISCOM Net Metering Timeline (${report.inputs.state})`,
      desc: `Bi-directional net meter installation in ${report.inputs.state} typically takes 12-18 days post NOC clearance.`,
      type: 'warning',
    });

    if (report.suitability.score >= 90) {
      insights.push({
        title: 'Ideal Roof Orientation',
        desc: `Your roof space of ${report.roof.totalRoofAreaSqFt} sq.ft exhibits zero major shading obstructions, maximizing annual generation to ~${report.generation.annualGenerationKwh} kWh.`,
        type: 'success',
      });
    }

    return insights;
  };

  const aiInsights = generateAiInsights();

  const [toastMsg, setToastMsg] = useState({ text: '', type: 'info' });

  const handleSaveReport = async () => {
    if (!user) {
      openAuthModal('login');
      return;
    }

    const localItem = {
      _id: 'calc_' + Date.now(),
      createdAt: new Date().toISOString(),
      inputs: report.inputs,
      results: report,
    };

    // Save to localStorage history
    try {
      const existing = JSON.parse(localStorage.getItem('solarwise_user_history') || '[]');
      localStorage.setItem('solarwise_user_history', JSON.stringify([localItem, ...existing]));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }

    try {
      setSavingReport(true);
      const res = await axios.post(`${API_URL}/api/calculator/save`, {
        inputs: report.inputs,
        results: report,
      });

      if (res.data.success) {
        setReportSaved(true);
        setToastMsg({
          type: 'success',
          text: 'Solar report saved to your account and dashboard history!',
        });
      }
    } catch (err) {
      console.warn('Save report API error:', err);
      setReportSaved(true);
      setToastMsg({
        type: 'success',
        text: 'Solar report saved to your Dashboard history!',
      });
    } finally {
      setSavingReport(false);
    }
  };

  const [batteryData, setBatteryData] = useState(null);
  const [panelData, setPanelData] = useState(null);

  useEffect(() => {
    if (report && report.system) {
      axios
        .post(`${API_URL}/api/battery/recommend`, {
          systemCapacityKw: report.system.recommendedKw,
          backupHours: report.inputs.backupHours || '6 Hours',
          batteryBudget: report.inputs.batteryBudget || 'Standard',
          batteryPriority: report.inputs.batteryPriority || 'Backup During Power Cuts',
          city: report.inputs.city,
          state: report.inputs.state,
        })
        .then((res) => {
          if (res.data.success) setBatteryData(res.data);
        })
        .catch((err) => console.warn('Battery fetch error:', err));

      axios
        .post(`${API_URL}/api/panels/recommend`, {
          systemCapacityKw: report.system.recommendedKw,
          panelBudget: report.inputs.panelBudget || 'Mid-Range',
          panelPriority: report.inputs.panelPriority || 'Balanced Choice',
          climate: report.inputs.climate || 'Normal',
          city: report.inputs.city,
        })
        .then((res) => {
          if (res.data.success) setPanelData(res.data);
        })
        .catch((err) => console.warn('Panel fetch error:', err));
    }
  }, [report]);

  // Loading State UI
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-4 max-w-md">
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin" />
              <Sun className="w-8 h-8 text-amber-400 animate-pulse" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Running Solar Engine Calculations...
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Processing terrace dimensions, DISCOM tariffs, 550W panel math, and 25-year financial projections.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error State UI
  if (errorMsg) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="glass-card max-w-md p-8 rounded-3xl text-center space-y-4 border border-red-500/30">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Calculation Error</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">{errorMsg}</p>
            <button
              onClick={() => navigate('/calculator')}
              className="px-6 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold rounded-xl text-xs flex items-center justify-center gap-2 mx-auto"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Back to Solar Calculator</span>
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-emerald-500 selection:text-white">
      <Navbar />

      <main className="flex-1 py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Top Banner & Action Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/40 shadow-2xl bg-gradient-to-br from-emerald-950/10 via-slate-900/10 to-amber-950/10 flex flex-col lg:flex-row items-center justify-between gap-6"
          >
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Phase 5 Solar Engine • Maps & Live Open-Meteo Integration</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {report.system.recommendedKw} kW Solar Plant ({report.system.panelCount} × 550W Panels)
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Location: {report.inputs.city}, {report.inputs.state} • {report.inputs.panelType} • Tariff ₹{report.inputs.electricityRate}/unit
              </p>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all shadow-sm"
              >
                <Printer className="w-4 h-4 text-slate-500" />
                <span>Print PDF</span>
              </button>

              {reportSaved ? (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2.5 rounded-xl border border-emerald-500 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-md transition-all"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                  <span>View Saved in Dashboard →</span>
                </button>
              ) : (
                <button
                  onClick={handleSaveReport}
                  disabled={savingReport}
                  className="px-4 py-2.5 rounded-xl border border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold text-xs flex items-center gap-2 hover:bg-emerald-100 transition-all shadow-sm disabled:opacity-75"
                >
                  <BookmarkPlus className="w-4 h-4 text-emerald-500" />
                  <span>{savingReport ? 'Saving to Account...' : 'Save to Account'}</span>
                </button>
              )}

              <button
                onClick={() => navigate('/calculator')}
                className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-xs flex items-center gap-1.5 hover:opacity-90 transition-opacity"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Modify Inputs</span>
              </button>
            </div>
          </motion.div>

          {/* Phase 5 Special Section: Live Open-Meteo Weather & OpenStreetMap Solar Map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Live Weather Card */}
            <div className="lg:col-span-5 flex flex-col">
              <WeatherCard
                cityName={report.inputs.city}
                lat={coords.lat}
                lng={coords.lng}
              />
            </div>

            {/* Interactive Leaflet Map */}
            <div className="lg:col-span-7 flex flex-col">
              <CitySolarMap
                cityName={report.inputs.city}
                stateName={report.inputs.state}
                lat={coords.lat}
                lng={coords.lng}
                recommendedKw={report.system.recommendedKw}
              />
            </div>
          </div>

          {/* Roof Suitability & Key Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Roof Suitability Gauge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="glass-card p-6 rounded-2xl border border-emerald-500/30 bg-emerald-50/20 dark:bg-emerald-950/20 flex items-center justify-between"
            >
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Roof Suitability</span>
                <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                  {report.suitability.score} <span className="text-base text-emerald-500 font-bold">/ 100</span>
                </div>
                <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mt-1 block">
                  {report.suitability.rating} Rating
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <Gauge className="w-7 h-7" />
              </div>
            </motion.div>

            {/* Card 2: 550W Panels Count */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between"
            >
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">550W Solar Modules</span>
                <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                  {report.system.panelCount} <span className="text-base text-amber-500 font-bold">Panels</span>
                </div>
                <span className="text-xs text-slate-500 mt-1 block">
                  {report.system.recommendedKw} kW • {report.roof.usableRoofAreaSqFt} sq.ft usable roof
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Sun className="w-7 h-7" />
              </div>
            </motion.div>

            {/* Card 3: PM Surya Ghar Subsidy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="glass-card p-6 rounded-2xl border border-emerald-500/30 bg-emerald-50/20 dark:bg-emerald-950/20 flex items-center justify-between"
            >
              <div>
                <span className="text-xs text-emerald-700 dark:text-emerald-300 font-bold uppercase tracking-wider">PM Surya Ghar Subsidy</span>
                <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                  ₹{report.financial.centralSubsidy.toLocaleString('en-IN')}
                </div>
                <span className="text-xs text-emerald-800 dark:text-emerald-300 font-medium mt-1 block">
                  Direct Bank Transfer (DBT)
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <Award className="w-7 h-7" />
              </div>
            </motion.div>

            {/* Card 4: Break-Even Period */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="glass-card p-6 rounded-2xl border border-amber-500/30 bg-amber-50/20 dark:bg-amber-950/20 flex items-center justify-between"
            >
              <div>
                <span className="text-xs text-amber-700 dark:text-amber-300 font-bold uppercase tracking-wider">Break-Even Period</span>
                <div className="text-3xl font-black text-amber-600 dark:text-amber-400 mt-1">
                  {report.financial.breakEvenYears} <span className="text-base font-bold">Years</span>
                </div>
                <span className="text-xs text-amber-800 dark:text-amber-300 font-medium mt-1 block">
                  25-Yr ROI: {report.lifetime.roiPercentage}%
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Clock className="w-7 h-7" />
              </div>
            </motion.div>

          </div>

          {/* AI Smart Recommendations Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/40 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white space-y-6 shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">AI Smart Solar Recommendations</h3>
                <p className="text-xs text-slate-400">Automated intelligence tailored for {report.inputs.city}, {report.inputs.state}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {aiInsights.map((insight, idx) => (
                <div key={idx} className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <h4 className="text-sm font-bold text-white">{insight.title}</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{insight.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 4 Recharts Visualizations Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Chart 1: Savings Over Time (Line Chart) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    1. Savings Over Time (25 Years)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Compounding cash flow accounting for 5% annual DISCOM tariff hikes.
                  </p>
                </div>
                <TrendingUp className="w-5 h-5 text-emerald-500" />
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={report.lifetime.cashFlow25Yr}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                    <XAxis dataKey="year" stroke="#94a3b8" tickFormatter={(v) => `Yr ${v}`} />
                    <YAxis stroke="#94a3b8" tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                    <Tooltip
                      formatter={(val) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Cumulative Savings']}
                      labelFormatter={(lbl) => `Year ${lbl}`}
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                    />
                    <Line type="monotone" dataKey="cumulativeSavings" stroke="#10b981" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Chart 2: Investment Breakdown (Pie Chart) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    2. Investment & Subsidy Breakdown
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Gross System Cost: ₹{report.financial.grossInstallationCost.toLocaleString('en-IN')}
                  </p>
                </div>
                <IndianRupee className="w-5 h-5 text-amber-500" />
              </div>

              <div className="h-72 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Amount']}
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                    />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Chart 3: Annual Electricity Generation Profile (Area Chart) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    3. 12-Month Solar Power Generation Profile
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Seasonal kWh generation curve across Indian summer & monsoon cycles.
                  </p>
                </div>
                <Zap className="w-5 h-5 text-amber-400" />
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyGenerationProfile}>
                    <defs>
                      <linearGradient id="colorGen" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" tickFormatter={(v) => `${v} kWh`} />
                    <Tooltip
                      formatter={(val) => [`${val} kWh`, 'Monthly Units Generated']}
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="generation" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorGen)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Chart 4: Environmental Impact Comparison (Bar Chart) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    4. Environmental Impact Comparison
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Comparative annual metrics for CO2 reduction and thermal coal avoided.
                  </p>
                </div>
                <Leaf className="w-5 h-5 text-emerald-500" />
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={envBarData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                    <XAxis dataKey="metric" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      formatter={(val, name, props) => [val, props.payload.metric]}
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                    />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {envBarData.map((entry, index) => (
                        <Cell key={`bar-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

          </div>

          {/* Phase 11: Tier-1 Solar Panel Brand Comparison Matrix */}
          <PanelComparison panelData={panelData} />

          {/* Phase 10: AI Battery Storage Recommendation System */}
          <BatteryRecommendation batteryData={batteryData} />

          {/* Installer Discovery Call To Action */}
          <div className="glass-card rounded-3xl p-8 border border-amber-500/30 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Connect With Empanelled Installers</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Get Zero-Hassle Turnkey Installation In {report.inputs.city}
              </h3>
              <p className="text-xs text-slate-300">
                Verified DISCOM solar EPC vendors with 25-year panel performance warranties and net-metering clearance.
              </p>
            </div>

            <button
              onClick={() => setIsInstallerModalOpen(true)}
              className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm rounded-2xl shadow-xl hover:scale-105 transition-all shrink-0 flex items-center gap-2"
            >
              <span>Connect With Local Installers</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </main>

      {/* Installer Connection Modal */}
      <InstallerConnectModal
        isOpen={isInstallerModalOpen}
        onClose={() => setIsInstallerModalOpen(false)}
        city={report.inputs.city}
        state={report.inputs.state}
        recommendedKw={report.system.recommendedKw}
      />

      {/* Toast Notification */}
      {toastMsg.text && (
        <Toast
          message={toastMsg.text}
          type={toastMsg.type}
          onClose={() => setToastMsg({ text: '', type: 'info' })}
        />
      )}

      <Footer />
    </div>
  );
}
