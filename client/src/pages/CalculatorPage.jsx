import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Calculator,
  Zap,
  ArrowRight,
  Sparkles,
  Layers,
  Info,
  Building,
  BatteryCharging,
  Sun,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = import.meta.env.VITE_API_URL || '';

export default function CalculatorPage() {
  const navigate = useNavigate();
  const [locationData, setLocationData] = useState([]);
  const [selectedState, setSelectedState] = useState('Maharashtra');
  const [citiesList, setCitiesList] = useState(['Mumbai', 'Pune', 'Nagpur', 'Nashik']);
  const [calculating, setCalculating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      terraceLength: 30,
      terraceWidth: 20,
      roofType: 'RCC',
      shadowLevel: 'None',
      state: 'Maharashtra',
      city: 'Mumbai',
      monthlyBill: 4500,
      electricityRate: 8.5,
      panelType: 'Monocrystalline',
      wantBattery: 'No',
      backupHours: '6 Hours',
      batteryBudget: 'Standard',
      batteryPriority: 'Backup During Power Cuts',
      panelBudget: 'Mid-Range',
      panelPriority: 'Balanced Choice',
      climate: 'Normal',
    },
  });

  const stateWatch = watch('state');

  // Fetch Location Data (States & DISCOM Tariffs) from Backend
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/calculator/location-data`);
        if (res.data.success && Array.isArray(res.data.data)) {
          setLocationData(res.data.data);
        }
      } catch (err) {
        console.warn('Location data fetch failed:', err);
      }
    };
    fetchLocations();
  }, []);

  // Update Cities list & default tariff whenever State changes
  useEffect(() => {
    if (stateWatch) {
      setSelectedState(stateWatch);
      const found = locationData.find((s) => s.stateName === stateWatch);
      if (found) {
        setCitiesList(found.cities || []);
        if (found.cities && found.cities.length > 0) {
          setValue('city', found.cities[0]);
        }
        if (found.defaultRatePerKwh) {
          setValue('electricityRate', found.defaultRatePerKwh);
        }
      } else if (stateWatch === 'Bihar') {
        setCitiesList(['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Darbhanga', 'Purnia']);
        setValue('city', 'Patna');
        setValue('electricityRate', 7.4);
      }
    }
  }, [stateWatch, locationData, setValue]);

  // Form Submit Handler -> Sends inputs to backend & navigates to /results
  const onSubmit = async (data) => {
    try {
      setCalculating(true);
      setErrorMsg('');
      const res = await axios.post(`${API_URL}/api/calculator/calculate`, data);
      if (res.data.success) {
        navigate('/results', { state: { reportData: res.data.data } });
      } else {
        setErrorMsg(res.data.message || 'Calculation failed');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Server error during calculation');
    } finally {
      setCalculating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Phase 4 Solar Engine • Interactive Dashboard Generator</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Solar Feasibility & ROI Calculator
            </h1>
            <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
              Enter your terrace dimensions and monthly electricity bill below. Our calculation engine will compute system size, PM Surya Ghar subsidy, 25-year financial projections, and Tier-1 brand options.
            </p>
          </div>

          {/* Form Card */}
          <div className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-300 dark:border-slate-800 shadow-2xl relative overflow-hidden bg-white dark:bg-slate-900">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-to-br from-amber-500/10 to-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
              
              {/* Section 1: Roof & Terrace Dimensions */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                  <Building className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    1. Terrace & Roof Dimensions
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Terrace Length */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                      <span>Terrace Length (ft)</span>
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Feet</span>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 30"
                      {...register('terraceLength', {
                        required: 'Length is required',
                        min: { value: 5, message: 'Min 5 ft' },
                        max: { value: 500, message: 'Max 500 ft' },
                      })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-emerald-500 outline-none placeholder-slate-400 dark:placeholder-slate-500"
                    />
                    {errors.terraceLength && (
                      <span className="text-[11px] text-red-500 font-medium">{errors.terraceLength.message}</span>
                    )}
                  </div>

                  {/* Terrace Width */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                      <span>Terrace Width (ft)</span>
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Feet</span>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 20"
                      {...register('terraceWidth', {
                        required: 'Width is required',
                        min: { value: 5, message: 'Min 5 ft' },
                        max: { value: 500, message: 'Max 500 ft' },
                      })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-emerald-500 outline-none placeholder-slate-400 dark:placeholder-slate-500"
                    />
                    {errors.terraceWidth && (
                      <span className="text-[11px] text-red-500 font-medium">{errors.terraceWidth.message}</span>
                    )}
                  </div>

                  {/* Roof Type */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Roof Structure Type
                    </label>
                    <select
                      {...register('roofType')}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      <option value="RCC">RCC Concrete Flat Roof</option>
                      <option value="Metal">Shed / Metal Sheet</option>
                      <option value="Tile">Slanted Tile Roof</option>
                    </select>
                  </div>

                  {/* Shadow Level */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Surrounding Shadow Level
                    </label>
                    <select
                      {...register('shadowLevel')}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      <option value="None">None (Unobstructed Sunshine)</option>
                      <option value="Low">Low (Subtle Tree/Wall Shadow)</option>
                      <option value="Medium">Medium (Partial Parapet/Building)</option>
                      <option value="High">High (Significant Obstruction)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Monthly Electricity & Tariff */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                  <Zap className="w-5 h-5 text-amber-500" />
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    2. Electricity Consumption & State Tariff
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* State Select */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      State / UT Region
                    </label>
                    <select
                      {...register('state', { required: 'State is required' })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      {locationData.length > 0 ? (
                        locationData.map((s) => (
                          <option key={s._id || s.stateName} value={s.stateName}>
                            {s.stateName}
                          </option>
                        ))
                      ) : (
                        <>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="West Bengal">West Bengal</option>
                          <option value="Bihar">Bihar</option>
                        </>
                      )}
                    </select>
                  </div>

                  {/* City Select */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      City / District
                    </label>
                    <select
                      {...register('city', { required: 'City is required' })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      {citiesList.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Monthly Bill */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                      <span>Avg Monthly Electricity Bill</span>
                      <span className="text-slate-500 dark:text-slate-400 font-medium">₹ / Month</span>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 4500"
                      {...register('monthlyBill', {
                        required: 'Monthly bill is required',
                        min: { value: 500, message: 'Min ₹500' },
                      })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-emerald-500 outline-none placeholder-slate-400 dark:placeholder-slate-500"
                    />
                    {errors.monthlyBill && (
                      <span className="text-[11px] text-red-500 font-medium">{errors.monthlyBill.message}</span>
                    )}
                  </div>

                  {/* Tariff Rate */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                      <span>Tariff Rate (Auto-filled)</span>
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">Editable</span>
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="e.g. 8.5"
                      {...register('electricityRate', {
                        required: 'Tariff rate is required',
                        min: { value: 1, message: 'Min ₹1/unit' },
                        max: { value: 25, message: 'Max ₹25/unit' },
                      })}
                      className="w-full px-4 py-3 rounded-xl border border-emerald-500/60 dark:border-emerald-500/50 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 font-bold text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                    {errors.electricityRate && (
                      <span className="text-[11px] text-red-500 font-medium">{errors.electricityRate.message}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 3: Solar Equipment Preference */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                  <Layers className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    3. Solar Module Technology
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Panel Type */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Solar PV Module Specification
                    </label>
                    <select
                      {...register('panelType')}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      <option value="Monocrystalline">Monocrystalline PERC (550W High Efficiency)</option>
                      <option value="Polycrystalline">Polycrystalline (550W Standard Efficiency)</option>
                    </select>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50 dark:bg-slate-800/60 border border-amber-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 font-semibold flex items-center gap-3">
                    <Info className="w-5 h-5 text-amber-500 shrink-0" />
                    <span>
                      Submitting this form executes the calculation engine, battery recommendation, and panel brand comparison matrices.
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 4: Battery Storage & Panel Brand Preferences */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                  <BatteryCharging className="w-5 h-5 text-amber-500" />
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    4. Battery Storage & Panel Preferences (Optional)
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Want Battery Toggle */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Include Battery Backup?
                    </label>
                    <select
                      {...register('wantBattery')}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      <option value="No">No (Grid-Tied Net Metered Only)</option>
                      <option value="Yes">Yes (Hybrid Battery Backup)</option>
                    </select>
                  </div>

                  {/* Backup Required */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Desired Backup Duration
                    </label>
                    <select
                      {...register('backupHours')}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      <option value="2 Hours">2 Hours Essential Backup</option>
                      <option value="4 Hours">4 Hours Standard Backup</option>
                      <option value="6 Hours">6 Hours Extended Backup</option>
                      <option value="8 Hours">8 Hours Night Backup</option>
                      <option value="Full Night">Full Night (10+ Hours)</option>
                    </select>
                  </div>

                  {/* Panel Brand Priority */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Panel Selection Priority
                    </label>
                    <select
                      {...register('panelPriority')}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      <option value="Balanced Choice">Balanced Best Overall</option>
                      <option value="Lowest Cost">Lowest Upfront Cost</option>
                      <option value="Highest Efficiency">Highest Efficiency (%)</option>
                      <option value="Longest Warranty">Longest 30-Yr Warranty</option>
                    </select>
                  </div>

                  {/* Climate Zone */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Local Climate Environment
                    </label>
                    <select
                      {...register('climate')}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      <option value="Normal">Normal Inland Climate</option>
                      <option value="Hot Climate">Hot Summer Climate (&gt;40°C)</option>
                      <option value="Coastal">Coastal / High Salt Spray</option>
                      <option value="Humid">Humid Monsoon Zone</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Error Alert */}
              {errorMsg && (
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm font-semibold">
                  {errorMsg}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={calculating}
                  className="w-full py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-lg rounded-2xl shadow-xl shadow-emerald-500/30 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {calculating ? (
                    <span>Generating Results Dashboard...</span>
                  ) : (
                    <>
                      <Calculator className="w-6 h-6 text-amber-400" />
                      <span>Generate Full Results Dashboard (4 Charts & AI Insights)</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
