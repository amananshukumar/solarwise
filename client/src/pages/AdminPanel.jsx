import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Plus,
  Edit2,
  Trash2,
  Search,
  RefreshCw,
  Sparkles,
  MapPin,
  Zap,
  IndianRupee,
  Sun,
  Users,
  Calculator,
  Save,
  X,
  Layers,
  Award,
  CheckCircle2,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdminRoute from '../components/AdminRoute';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || '';

export default function AdminPanel() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    totalStates: 10,
    totalCities: 70,
    totalUsers: 12,
    totalCalculations: 48,
    defaultCostPerKw: 55000,
    maxSubsidyCap: 78000,
  });

  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('tariffs'); // 'tariffs' | 'cities' | 'settings'

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingState, setEditingState] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    stateName: '',
    discomName: '',
    defaultRatePerKwh: 7.5,
    solarIrradiance: 5.2,
    citiesStr: '',
  });

  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  // Fetch Stats & States List
  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const [statsRes, statesRes] = await Promise.all([
        axios.get(`${API_URL}/api/admin/stats`),
        axios.get(`${API_URL}/api/admin/states`),
      ]);

      if (statsRes.data.success) {
        setStats(statsRes.data.data);
      }
      if (statesRes.data.success) {
        setStates(statesRes.data.data);
      }
    } catch (err) {
      console.warn('Failed to fetch admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const openAddModal = () => {
    setEditingState(null);
    setFormData({
      stateName: '',
      discomName: 'State Electricity Distribution Co.',
      defaultRatePerKwh: 7.5,
      solarIrradiance: 5.2,
      citiesStr: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (st) => {
    setEditingState(st);
    setFormData({
      stateName: st.stateName,
      discomName: st.discomName || '',
      defaultRatePerKwh: st.defaultRatePerKwh || 7.5,
      solarIrradiance: st.solarIrradiance || 5.2,
      citiesStr: Array.isArray(st.cities) ? st.cities.join(', ') : '',
    });
    setIsModalOpen(true);
  };

  const handleSaveState = async (e) => {
    e.preventDefault();
    setStatusMsg({ type: '', text: '' });

    const payload = {
      stateName: formData.stateName,
      discomName: formData.discomName,
      defaultRatePerKwh: Number(formData.defaultRatePerKwh),
      solarIrradiance: Number(formData.solarIrradiance),
      cities: formData.citiesStr.split(',').map((c) => c.trim()).filter(Boolean),
    };

    try {
      if (editingState) {
        const res = await axios.put(`${API_URL}/api/admin/states/${editingState._id}`, payload);
        if (res.data.success) {
          setStates((prev) =>
            prev.map((s) => (s._id === editingState._id ? res.data.data : s))
          );
          setStatusMsg({ type: 'success', text: 'State tariff record updated successfully!' });
        }
      } else {
        const res = await axios.post(`${API_URL}/api/admin/states`, payload);
        if (res.data.success) {
          setStates((prev) => [...prev, res.data.data]);
          setStatusMsg({ type: 'success', text: 'New State tariff record added successfully!' });
        }
      }
      setIsModalOpen(false);
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to save state record';
      setStatusMsg({ type: 'error', text: msg });
    }
  };

  const handleDeleteState = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete the record for ${name}?`)) return;

    try {
      await axios.delete(`${API_URL}/api/admin/states/${id}`);
      setStates((prev) => prev.filter((s) => s._id !== id));
      setStatusMsg({ type: 'success', text: `Deleted record for ${name}` });
    } catch (err) {
      console.error('Delete state error:', err);
    }
  };

  const filteredStates = states.filter(
    (st) =>
      st.stateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (st.discomName && st.discomName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <AdminRoute>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-emerald-500 selection:text-white">
        <Navbar />

        <main className="flex-1 py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            
            {/* Admin Banner */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-amber-500/40 bg-gradient-to-r from-amber-950/20 via-slate-900 to-emerald-950/20 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Phase 7 Administration • Tariff & Subsidy Manager</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  SolarWise Admin Management Panel
                </h1>
                <p className="text-sm text-slate-300">
                  Logged in as <strong className="text-amber-400">{user?.name}</strong> ({user?.email}). Manage state DISCOM electricity tariffs, irradiance levels, and subsidy caps.
                </p>
              </div>

              <button
                onClick={openAddModal}
                className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center gap-2 shrink-0"
              >
                <Plus className="w-5 h-5" />
                <span>Add New State Tariff</span>
              </button>
            </div>

            {/* Status Notifications */}
            {statusMsg.text && (
              <div
                className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 ${
                  statusMsg.type === 'success'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300'
                    : 'bg-red-50 dark:bg-red-950/60 border border-red-500/40 text-red-700 dark:text-red-300'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{statusMsg.text}</span>
              </div>
            )}

            {/* Overview Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-bold uppercase">Active States</span>
                  <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                    {stats.totalStates} <span className="text-sm text-emerald-500 font-bold">States</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-bold uppercase">Cities Mapped</span>
                  <div className="text-3xl font-black text-amber-500 mt-1">
                    {stats.totalCities} <span className="text-sm text-slate-400 font-bold">Cities</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <Sun className="w-6 h-6" />
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-bold uppercase">Base Installation Price</span>
                  <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                    ₹55,000 <span className="text-xs text-slate-400 font-normal">/ kW</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-500 flex items-center justify-center">
                  <IndianRupee className="w-6 h-6" />
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-bold uppercase">Max PM Surya Ghar DBT</span>
                  <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                    ₹78,000 <span className="text-xs text-slate-400 font-normal">Cap</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Admin Tabs & Search */}
            <div className="glass-card rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 w-full md:w-auto">
                <button
                  onClick={() => setActiveTab('tariffs')}
                  className={`px-5 py-2 text-xs font-bold rounded-xl transition-all ${
                    activeTab === 'tariffs'
                      ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  State Tariffs & Irradiance (CRUD)
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-5 py-2 text-xs font-bold rounded-xl transition-all ${
                    activeTab === 'settings'
                      ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Subsidy & Base Cost Rules
                </button>
              </div>

              {/* Search input */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter states or DISCOMs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            {/* TAB 1: State & Tariff Management Table */}
            {activeTab === 'tariffs' && (
              <div className="glass-card rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                      Indian State DISCOM Tariff & Solar Irradiance Records
                    </h3>
                    <p className="text-xs text-slate-500">
                      Manage electricity rates (₹/kWh) and solar radiation benchmarks used by the backend engine.
                    </p>
                  </div>
                  <button
                    onClick={fetchAdminData}
                    className="p-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-500 hover:text-emerald-500"
                    title="Refresh Data"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 text-xs uppercase font-extrabold border-b border-slate-200 dark:border-slate-800">
                        <th className="p-4">State Name</th>
                        <th className="p-4">DISCOM Name</th>
                        <th className="p-4">Default Rate (₹/kWh)</th>
                        <th className="p-4">Solar Irradiance (kWh/m²/day)</th>
                        <th className="p-4">Cities Covered</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-semibold">
                      {loading ? (
                        <tr>
                          <td colSpan="6" className="p-8 text-center text-slate-500 font-bold">
                            Loading state records from database...
                          </td>
                        </tr>
                      ) : filteredStates.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="p-8 text-center text-slate-500">
                            No state records found matching "{searchQuery}"
                          </td>
                        </tr>
                      ) : (
                        filteredStates.map((st) => (
                          <tr key={st._id || st.stateName} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="p-4 font-black text-slate-900 dark:text-white flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-emerald-500" />
                              <span>{st.stateName}</span>
                            </td>
                            <td className="p-4 text-slate-600 dark:text-slate-300">{st.discomName || 'State DISCOM'}</td>
                            <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400">₹{st.defaultRatePerKwh} / kWh</td>
                            <td className="p-4 font-bold text-amber-500">{st.solarIrradiance} kWh/m²</td>
                            <td className="p-4 text-slate-500 max-w-xs truncate">
                              {Array.isArray(st.cities) ? st.cities.join(', ') : st.cities}
                            </td>
                            <td className="p-4 text-right space-x-2">
                              <button
                                onClick={() => openEditModal(st)}
                                className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 hover:bg-emerald-100 transition-colors"
                                title="Edit State Record"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteState(st._id, st.stateName)}
                                className="p-2 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 hover:bg-red-100 transition-colors"
                                title="Delete State Record"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 2: Subsidy & Base Cost Rules Settings */}
            {activeTab === 'settings' && (
              <div className="glass-card rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-6">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    PM Surya Ghar Subsidy & Hardware Pricing Configuration
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    System parameters governing backend calculation logic across all user reports.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Parameter 1: Base Solar Cost */}
                  <div className="bg-slate-100 dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">Base Installation Price</span>
                    <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                      ₹55,000 <span className="text-sm text-slate-400 font-bold">/ kW</span>
                    </div>
                    <p className="text-xs text-slate-500 pt-1">
                      Includes 550W Monocrystalline PERC modules, solar inverter, mounting structures, and DISCOM net-metering wiring.
                    </p>
                  </div>

                  {/* Parameter 2: PM Surya Ghar Subsidy Tiers */}
                  <div className="bg-slate-100 dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">PM Surya Ghar Subsidy Tiers</span>
                    <ul className="text-xs space-y-1 font-bold text-slate-700 dark:text-slate-200">
                      <li>• 1 kW System: <span className="text-amber-500">₹30,000 DBT</span></li>
                      <li>• 2 kW System: <span className="text-amber-500">₹60,000 DBT</span></li>
                      <li>• 3 kW+ Systems: <span className="text-emerald-500">₹78,000 Max DBT</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Add / Edit State Modal */}
            <AnimatePresence>
              {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  <div
                    onClick={() => setIsModalOpen(false)}
                    className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
                  />

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 z-10 space-y-6"
                  >
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <div>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                        {editingState ? 'Edit State Tariff' : 'Add New State Tariff'}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Configure default DISCOM rates and solar irradiance benchmarks.
                      </p>
                    </div>

                    <form onSubmit={handleSaveState} className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">State Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Goa"
                          value={formData.stateName}
                          onChange={(e) => setFormData({ ...formData, stateName: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white font-semibold outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">DISCOM Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Electricity Department of Goa"
                          value={formData.discomName}
                          onChange={(e) => setFormData({ ...formData, discomName: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white font-semibold outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Default Rate (₹/kWh)</label>
                          <input
                            type="number"
                            step="0.1"
                            required
                            placeholder="7.5"
                            value={formData.defaultRatePerKwh}
                            onChange={(e) => setFormData({ ...formData, defaultRatePerKwh: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Irradiance (kWh/m²)</label>
                          <input
                            type="number"
                            step="0.1"
                            required
                            placeholder="5.2"
                            value={formData.solarIrradiance}
                            onChange={(e) => setFormData({ ...formData, solarIrradiance: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Cities (Comma Separated)</label>
                        <input
                          type="text"
                          placeholder="Panaji, Margao, Vasco"
                          value={formData.citiesStr}
                          onChange={(e) => setFormData({ ...formData, citiesStr: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white font-medium outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>{editingState ? 'Update State Record' : 'Create State Record'}</span>
                      </button>
                    </form>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

          </div>
        </main>

        <Footer />
      </div>
    </AdminRoute>
  );
}
