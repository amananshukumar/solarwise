import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun,
  Search,
  Filter,
  Trash2,
  FileText,
  Download,
  Eye,
  Plus,
  TrendingUp,
  Award,
  IndianRupee,
  Sparkles,
  Calendar,
  MapPin,
  Layers,
  ArrowUpDown,
  CheckSquare,
  Square,
  X,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../context/AuthContext';
import { downloadPdfReport } from '../utils/pdfGenerator';

const API_URL = import.meta.env.VITE_API_URL || '';

export default function UserDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStateFilter, setSelectedStateFilter] = useState('All');
  const [selectedReportsForCompare, setSelectedReportsForCompare] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch Calculation History from Backend MongoDB & LocalStorage Sync
  const fetchHistory = async () => {
    try {
      setLoading(true);
      let apiHistory = [];
      try {
        const res = await axios.get(`${API_URL}/api/calculator/history`);
        if (res.data.success && Array.isArray(res.data.data)) {
          apiHistory = res.data.data;
        }
      } catch (err) {
        console.warn('Failed to fetch user history from API:', err);
      }

      // Read local history stored in browser
      let localHistory = [];
      try {
        localHistory = JSON.parse(localStorage.getItem('solarwise_user_history') || '[]');
      } catch (e) {
        localHistory = [];
      }

      // Combine and deduplicate
      const combinedMap = new Map();
      [...apiHistory, ...localHistory].forEach((item) => {
        if (!item) return;
        const key = item._id || (item.inputs ? `${item.inputs.city}_${item.inputs.monthlyBill}` : JSON.stringify(item));
        if (!combinedMap.has(key)) {
          combinedMap.set(key, item);
        }
      });

      setHistory(Array.from(combinedMap.values()));
    } catch (err) {
      console.warn('Error reading calculation history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Delete saved calculation record
  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to remove this saved solar calculation?')) return;

    try {
      setDeletingId(id);
      await axios.delete(`${API_URL}/api/calculator/history/${id}`).catch(() => {});

      // Remove from localStorage as well
      try {
        const local = JSON.parse(localStorage.getItem('solarwise_user_history') || '[]');
        const filtered = local.filter((item) => item._id !== id);
        localStorage.setItem('solarwise_user_history', JSON.stringify(filtered));
      } catch (e) {}

      setHistory((prev) => prev.filter((item) => item._id !== id));
      setSelectedReportsForCompare((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Failed to delete report:', err);
    } finally {
      setDeletingId(null);
    }
  };

  // Filtered & Searched Calculations
  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const inputs = item.inputs || {};
      const results = item.results || {};
      const resInputs = results.inputs || {};

      const city = (inputs.city || resInputs.city || '').toLowerCase();
      const state = (inputs.state || resInputs.state || '').toLowerCase();
      const query = searchQuery.toLowerCase();

      const matchesQuery = !query || city.includes(query) || state.includes(query);
      const matchesState =
        selectedStateFilter === 'All' || (inputs.state || resInputs.state) === selectedStateFilter;

      return matchesQuery && matchesState;
    });
  }, [history, searchQuery, selectedStateFilter]);

  // States List for Filter Dropdown
  const uniqueStates = useMemo(() => {
    const set = new Set();
    history.forEach((item) => {
      const st = item.inputs?.state || item.results?.inputs?.state;
      if (st) set.add(st);
    });
    return Array.from(set);
  }, [history]);

  // Comparison Toggle Helper
  const toggleCompareSelect = (item) => {
    const isSelected = selectedReportsForCompare.some((r) => r._id === item._id);
    if (isSelected) {
      setSelectedReportsForCompare((prev) => prev.filter((r) => r._id !== item._id));
    } else {
      if (selectedReportsForCompare.length >= 3) {
        alert('You can compare up to 3 calculations side-by-side.');
        return;
      }
      setSelectedReportsForCompare((prev) => [...prev, item]);
    }
  };

  // Chart Data for Historical Comparison
  const chartData = useMemo(() => {
    return filteredHistory.slice(0, 10).map((item, idx) => {
      const inputs = item.inputs || item.results?.inputs || {};
      const res = item.results?.results || item.results || {};

      const systemKw = Number(
        res.system?.recommendedKw ??
        res.recommendedKw ??
        res.systemKw ??
        item.results?.system?.recommendedKw ??
        3.0
      );

      const annualSavings = Number(
        res.generation?.annualSavingsRs ??
        res.annualSavingsRs ??
        res.annualSavings ??
        res.generation?.annualSavings ??
        item.results?.generation?.annualSavingsRs ??
        (systemKw * 1200 * Number(inputs.electricityRate || 8))
      );

      const netCost = Number(
        res.financial?.finalPayableAmount ??
        res.finalPayableAmount ??
        res.netCost ??
        item.results?.financial?.finalPayableAmount ??
        (systemKw * 55000 - 78000)
      );

      const cityName = inputs.city || res.inputs?.city || 'Kolkata';

      return {
        name: `${cityName} (${systemKw} kW)`,
        systemKw,
        annualSavings,
        netCost,
      };
    });
  }, [filteredHistory]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-emerald-500 selection:text-white">
        <Navbar />

        <main className="flex-1 py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            
            {/* Header Title Banner */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/30 bg-gradient-to-r from-emerald-950/20 via-slate-900 to-teal-950/20 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Phase 6 User Portal • MongoDB Calculation History</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                  Welcome Back, {user?.name || 'Solar User'}!
                </h1>
                <p className="text-sm text-slate-300">
                  Manage your saved solar feasibility reports, compare historical plant models, and download formatted PDF summaries.
                </p>
              </div>

              <button
                onClick={() => navigate('/calculator')}
                className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center gap-2 shrink-0"
              >
                <Plus className="w-5 h-5" />
                <span>New Solar Calculation</span>
              </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <span className="text-xs text-slate-700 dark:text-slate-300 font-extrabold uppercase">Saved Reports</span>
                <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                  {history.length} <span className="text-sm text-emerald-600 dark:text-emerald-400 font-bold">Calculations</span>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <span className="text-xs text-slate-700 dark:text-slate-300 font-extrabold uppercase">Cities Benchmarked</span>
                <div className="text-3xl font-black text-amber-600 dark:text-amber-400 mt-1">
                  {uniqueStates.length > 0 ? uniqueStates.length : 1} <span className="text-sm text-slate-500 dark:text-slate-400 font-bold">States</span>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <span className="text-xs text-slate-700 dark:text-slate-300 font-extrabold uppercase">PM Surya Ghar Qualified</span>
                <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                  ₹78,000 <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Max Subsidy</span>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <span className="text-xs text-slate-700 dark:text-slate-300 font-extrabold uppercase">Selected for Comparison</span>
                <div className="text-3xl font-black text-teal-600 dark:text-teal-400 mt-1">
                  {selectedReportsForCompare.length} <span className="text-sm text-slate-500 dark:text-slate-400 font-bold">/ 3 Reports</span>
                </div>
              </div>
            </div>

            {/* Search, Filter & Comparison Trigger Controls */}
            <div className="glass-card rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500 dark:text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by city or state..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none placeholder-slate-400 dark:placeholder-slate-500"
                />
              </div>

              {/* Filter & Compare Buttons */}
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <select
                    value={selectedStateFilter}
                    onChange={(e) => setSelectedStateFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white outline-none"
                  >
                    <option value="All">All States</option>
                    {uniqueStates.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedReportsForCompare.length > 0 && (
                  <button
                    onClick={() => setIsCompareModalOpen(true)}
                    className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md hover:scale-105 transition-all flex items-center gap-1.5"
                  >
                    <Layers className="w-4 h-4" />
                    <span>Compare ({selectedReportsForCompare.length}) Side-by-Side</span>
                  </button>
                )}
              </div>
            </div>

            {/* Historical Calculations Comparison Chart */}
            {chartData.length > 0 && (
              <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                      Historical System Size & Annual Savings Benchmark
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Comparing recommended kW plant capacity and estimated annual electricity savings across saved calculations.
                    </p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                </div>

                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                      <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                      <YAxis yAxisId="left" orientation="left" stroke="#10b981" tickFormatter={(v) => `${v} kW`} />
                      <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                      />
                      <Legend />
                      <Bar yAxisId="left" dataKey="systemKw" name="System Size (kW)" fill="#10b981" radius={[6, 6, 0, 0]} />
                      <Bar yAxisId="right" dataKey="annualSavings" name="Annual Savings (₹)" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Calculations History Cards Grid */}
            {loading ? (
              <div className="py-16 text-center space-y-3">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500 mx-auto" />
                <span className="text-xs text-slate-500 font-semibold block">Loading calculations history from MongoDB...</span>
              </div>
            ) : filteredHistory.length === 0 ? (
              <div className="glass-card rounded-3xl p-12 text-center space-y-4 border border-dashed border-slate-300 dark:border-slate-700">
                <Sun className="w-12 h-12 text-amber-500 mx-auto" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Calculation Records Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  You haven't saved any solar feasibility calculations matching your filter criteria yet.
                </p>
                <button
                  onClick={() => navigate('/calculator')}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Create First Calculation
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHistory.map((item) => {
                  const resData = item.results?.results || item.results || {};
                  const inputData = item.inputs || item.results?.inputs || {};
                  const isSelected = selectedReportsForCompare.some((r) => r._id === item._id);

                  return (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`glass-card p-6 rounded-3xl border transition-all duration-300 relative flex flex-col justify-between ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/10 dark:bg-amber-950/20 shadow-xl'
                          : 'border-slate-200 dark:border-slate-800 hover:border-emerald-500/40'
                      }`}
                    >
                      <div>
                        {/* Card Top Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleCompareSelect(item)}
                              className="text-amber-500 hover:scale-110 transition-transform"
                              title={isSelected ? 'Deselect from comparison' : 'Select for side-by-side comparison'}
                            >
                              {isSelected ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5 text-slate-400" />}
                            </button>
                            <span className="font-extrabold text-base text-slate-900 dark:text-white">
                              {inputData.city || 'Custom City'}, {inputData.state || 'India'}
                            </span>
                          </div>

                          <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(item.createdAt || Date.now()).toLocaleDateString('en-IN')}</span>
                          </span>
                        </div>

                        {/* System Specs */}
                        <div className="space-y-2 mb-6">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500 dark:text-slate-400 font-medium">Recommended System:</span>
                            <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                              {resData.recommendedKw || 3} kW ({resData.panelCount || Math.ceil((resData.recommendedKw || 3) * 1.8)} × 550W)
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500 dark:text-slate-400 font-semibold">Daily Energy Generation:</span>
                            <span className="font-black text-teal-600 dark:text-teal-400">
                              {resData.generation?.dailyGenerationKwh || (Number(resData.recommendedKw || 3) * 4.4).toFixed(1)} kWh / day
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500 dark:text-slate-400">PM Surya Ghar Subsidy:</span>
                            <span className="font-bold text-amber-500">
                              ₹{(resData.centralSubsidy || 78000).toLocaleString('en-IN')}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500 dark:text-slate-400">Net Out-of-Pocket Cost:</span>
                            <span className="font-bold text-slate-900 dark:text-white">
                              ₹{(resData.netSystemCost || resData.finalPayableAmount || 168840).toLocaleString('en-IN')}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500 dark:text-slate-400">25-Year Profit:</span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">
                              ₹{(resData.lifetimeSavings25Yr || resData.total25YearSavings || 2498686).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card Bottom Actions */}
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                        <button
                          onClick={() => navigate('/results', { state: { reportData: item.results || item } })}
                          className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Report</span>
                        </button>

                        <button
                          onClick={() => downloadPdfReport(item.results || item)}
                          className="px-3 py-2 rounded-xl border border-emerald-500/40 bg-emerald-50/40 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center gap-1 hover:bg-emerald-100 transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>PDF Report</span>
                        </button>

                        <button
                          onClick={(e) => handleDelete(item._id, e)}
                          disabled={deletingId === item._id}
                          className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Side-by-Side Comparison Modal */}
            <AnimatePresence>
              {isCompareModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  <div
                    onClick={() => setIsCompareModalOpen(false)}
                    className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
                  />

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 z-10 max-h-[90vh] overflow-y-auto"
                  >
                    <button
                      onClick={() => setIsCompareModalOpen(false)}
                      className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <div className="space-y-6">
                      <div className="flex items-center gap-2">
                        <Layers className="w-6 h-6 text-amber-500" />
                        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                          Side-by-Side Solar Calculation Comparison
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {selectedReportsForCompare.map((item, idx) => {
                          const resData = item.results?.results || item.results || {};
                          const inputData = item.inputs || item.results?.inputs || {};
                          return (
                            <div
                              key={item._id}
                              className="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4"
                            >
                              <div className="border-b border-slate-200 dark:border-slate-700 pb-3">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">Option {idx + 1}</span>
                                <h4 className="text-lg font-black text-slate-900 dark:text-white">
                                  {inputData.city}, {inputData.state}
                                </h4>
                              </div>

                              <div className="space-y-2 text-xs">
                                <div><strong>Terrace Area:</strong> {inputData.terraceLength || 30}ft × {inputData.terraceWidth || 20}ft</div>
                                <div><strong>System Size:</strong> <span className="text-emerald-500 font-bold">{resData.recommendedKw || 3} kW</span></div>
                                <div><strong>550W Panels:</strong> {resData.panelCount || 8} Panels</div>
                                <div><strong>Gross Cost:</strong> ₹{(resData.grossSystemCost || 246840).toLocaleString('en-IN')}</div>
                                <div><strong>PM Surya Ghar Subsidy:</strong> ₹{(resData.centralSubsidy || 78000).toLocaleString('en-IN')}</div>
                                <div><strong>Net Cost:</strong> ₹{(resData.netSystemCost || resData.finalPayableAmount || 168840).toLocaleString('en-IN')}</div>
                                <div><strong>Payback Period:</strong> {resData.paybackYears || 2.8} Years</div>
                                <div><strong>25-Yr Profit:</strong> ₹{(resData.lifetimeSavings25Yr || 2498686).toLocaleString('en-IN')}</div>
                              </div>

                              <button
                                onClick={() => downloadPdfReport(item.results || item)}
                                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>Download PDF</span>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}
