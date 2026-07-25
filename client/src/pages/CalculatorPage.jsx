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
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = import.meta.env.VITE_API_URL || '';

export default function CalculatorPage() {
  const navigate = useNavigate();
  const [locationData, setLocationData] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState(true);
  const [calculating, setCalculating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      terraceLength: 30,
      terraceWidth: 20,
      state: 'Maharashtra',
      city: 'Mumbai',
      monthlyBill: 4500,
      electricityRate: 8.5,
      roofType: 'RCC',
      shadowLevel: 'None',
      panelType: 'Monocrystalline',
    },
  });

  const selectedState = watch('state');

  // Fetch Location Data (States, Cities, Tariff rates)
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoadingLocations(true);
        const res = await axios.get(`${API_URL}/api/calculator/location-data`);
        if (res.data.success && res.data.data.length > 0) {
          setLocationData(res.data.data);
          const mh = res.data.data.find((item) => item.stateName === 'Maharashtra') || res.data.data[0];
          if (mh) {
            setCitiesList(mh.cities);
            setValue('city', mh.cities[0]);
            setValue('electricityRate', mh.defaultRatePerKwh);
          }
        }
      } catch (err) {
        console.warn('Failed to fetch location data:', err);
      } finally {
        setLoadingLocations(false);
      }
    };
    fetchLocations();
  }, [setValue]);

  // Handle State selection change -> auto-populate cities and DISCOM tariff rate
  useEffect(() => {
    if (locationData.length > 0 && selectedState) {
      const found = locationData.find((s) => s.stateName === selectedState);
      if (found) {
        setCitiesList(found.cities);
        setValue('city', found.cities[0]);
        setValue('electricityRate', found.defaultRatePerKwh);
      }
    }
  }, [selectedState, locationData, setValue]);

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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Phase 4 Solar Engine • Interactive Dashboard Generator</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Solar Feasibility & ROI Calculator
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              Enter your terrace dimensions and monthly bill below. Our backend calculation engine will generate your interactive Results Dashboard with 4 Recharts visualizations, AI recommendations, and PM Surya Ghar subsidy report.
            </p>
          </div>

          {/* Form Card */}
          <div className="glass-card rounded-3xl p-6 sm:p-10 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-to-br from-amber-500/10 to-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
              
              {/* Section 1: Roof & Terrace Dimensions */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                  <Building className="w-5 h-5 text-emerald-500" />
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    1. Terrace & Roof Dimensions
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Terrace Length */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <span>Terrace Length (ft)</span>
                      <span className="text-slate-400 font-normal">Feet</span>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 30"
                      {...register('terraceLength', {
                        required: 'Length is required',
                        min: { value: 5, message: 'Min 5 ft' },
                        max: { value: 500, message: 'Max 500 ft' },
                      })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                    {errors.terraceLength && (
                      <span className="text-[11px] text-red-500 font-medium">{errors.terraceLength.message}</span>
                    )}
                  </div>

                  {/* Terrace Width */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <span>Terrace Width (ft)</span>
                      <span className="text-slate-400 font-normal">Feet</span>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 20"
                      {...register('terraceWidth', {
                        required: 'Width is required',
                        min: { value: 5, message: 'Min 5 ft' },
                        max: { value: 500, message: 'Max 500 ft' },
                      })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                    {errors.terraceWidth && (
                      <span className="text-[11px] text-red-500 font-medium">{errors.terraceWidth.message}</span>
                    )}
                  </div>

                  {/* Roof Type */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Roof Structure Type
                    </label>
                    <select
                      {...register('roofType')}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      <option value="RCC">RCC Concrete Flat Roof</option>
                      <option value="Metal">Shed / Metal Sheet</option>
                      <option value="Tile">Slanted Tile Roof</option>
                    </select>
                  </div>

                  {/* Shadow Level */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Shadow / Obstruction Level
                    </label>
                    <select
                      {...register('shadowLevel')}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      <option value="None">None (Unobstructed Sunlight)</option>
                      <option value="Low">Low (&lt; 15% Shadow)</option>
                      <option value="Medium">Medium (15% - 30% Shadow)</option>
                      <option value="High">High (&gt; 30% Shadow)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Location & Electricity Tariff */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                  <Zap className="w-5 h-5 text-amber-500" />
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    2. Location & Electricity Tariff
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* State Selection */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      State / Region
                    </label>
                    <select
                      {...register('state', { required: 'State is required' })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      {loadingLocations ? (
                        <option>Loading states...</option>
                      ) : (
                        locationData.map((st) => (
                          <option key={st.stateName} value={st.stateName}>
                            {st.stateName}
                          </option>
                        ))
                      )}
                    </select>
                  </div>

                  {/* City Selection */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      City (Filtered by State)
                    </label>
                    <select
                      {...register('city', { required: 'City is required' })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
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
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <span>Avg Monthly Electricity Bill</span>
                      <span className="text-slate-400 font-normal">₹ / Month</span>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 4500"
                      {...register('monthlyBill', {
                        required: 'Monthly bill is required',
                        min: { value: 500, message: 'Min ₹500' },
                      })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                    {errors.monthlyBill && (
                      <span className="text-[11px] text-red-500 font-medium">{errors.monthlyBill.message}</span>
                    )}
                  </div>

                  {/* Tariff Rate */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <span>Tariff Rate (Auto-filled)</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Editable</span>
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
                      className="w-full px-4 py-3 rounded-xl border border-emerald-500/50 dark:border-emerald-500/50 bg-emerald-50/30 dark:bg-emerald-950/20 text-slate-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
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
                  <Layers className="w-5 h-5 text-teal-500" />
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    3. Solar Module Technology
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Panel Type */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Solar PV Module Specification
                    </label>
                    <select
                      {...register('panelType')}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      <option value="Monocrystalline">Monocrystalline PERC (550W High Efficiency)</option>
                      <option value="Polycrystalline">Polycrystalline (550W Standard Efficiency)</option>
                    </select>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-center gap-3">
                    <Info className="w-5 h-5 text-amber-500 shrink-0" />
                    <span>
                      Submitting this form executes the backend calculation engine, battery recommendation, and panel brand comparison matrices.
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 4: Battery Storage & Panel Brand Preferences (Phases 10 & 11) */}
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
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Include Battery Backup?
                    </label>
                    <select
                      {...register('wantBattery')}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      <option value="No">No (Grid-Tied Net Metered Only)</option>
                      <option value="Yes">Yes (Hybrid Battery Backup)</option>
                    </select>
                  </div>

                  {/* Backup Required */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Desired Backup Duration
                    </label>
                    <select
                      {...register('backupHours')}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
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
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Panel Selection Priority
                    </label>
                    <select
                      {...register('panelPriority')}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      <option value="Balanced Choice">Balanced Best Overall</option>
                      <option value="Lowest Cost">Lowest Upfront Cost</option>
                      <option value="Highest Efficiency">Highest Efficiency (%)</option>
                      <option value="Longest Warranty">Longest 30-Yr Warranty</option>
                    </select>
                  </div>

                  {/* Climate Zone */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Local Climate Environment
                    </label>
                    <select
                      {...register('climate')}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
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
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 text-sm font-semibold">
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
