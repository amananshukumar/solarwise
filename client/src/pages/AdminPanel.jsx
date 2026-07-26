import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Shield,
  Plus,
  Edit,
  Trash2,
  Search,
  CheckCircle2,
  RefreshCw,
  Award,
  IndianRupee,
  MapPin,
  Sun,
  X,
  AlertTriangle,
  Lock,
  UserCheck,
  UserX,
  ShieldAlert,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || '';

export default function AdminPanel() {
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [stats, setStats] = useState({
    totalStates: 13,
    totalCities: 72,
    totalUsers: 12,
    totalCalculations: 48,
  });

  const [states, setStates] = useState([]);
  const [pendingAdminRequests, setPendingAdminRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('tariffs'); // tariffs | adminRequests | settings

  // Modal State
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

  // Configure axios auth header
  const authConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // Fetch Stats & States List & Pending Requests
  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const [statsRes, statesRes] = await Promise.all([
        axios.get(`${API_URL}/api/admin/stats`, authConfig),
        axios.get(`${API_URL}/api/admin/states`, authConfig),
      ]);

      if (statsRes.data.success) {
        setStats(statsRes.data.data);
      }
      if (statesRes.data.success) {
        setStates(statesRes.data.data);
      }

      // Fetch pending admin requests
      fetchPendingRequests();
    } catch (err) {
      console.warn('Failed to fetch admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingRequests = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/pending-requests`, authConfig);
      if (res.data.success) {
        setPendingAdminRequests(res.data.data);
      }
    } catch (err) {
      console.warn('Failed to fetch pending admin requests:', err);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleApproveAdmin = async (userId) => {
    try {
      const res = await axios.put(`${API_URL}/api/admin/approve-request/${userId}`, {}, authConfig);
      if (res.data.success) {
        setStatusMsg({ type: 'success', text: res.data.message });
        fetchPendingRequests();
        fetchAdminData();
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.response?.data?.message || 'Failed to approve request' });
    }
  };

  const handleRejectAdmin = async (userId) => {
    try {
      const res = await axios.put(`${API_URL}/api/admin/reject-request/${userId}`, {}, authConfig);
      if (res.data.success) {
        setStatusMsg({ type: 'success', text: res.data.message });
        fetchPendingRequests();
        fetchAdminData();
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.response?.data?.message || 'Failed to reject request' });
    }
  };

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
        const res = await axios.put(`${API_URL}/api/admin/states/${editingState._id}`, payload, authConfig);
        if (res.data.success) {
          setStatusMsg({ type: 'success', text: `Updated ${formData.stateName} state record!` });
        }
      } else {
        const res = await axios.post(`${API_URL}/api/admin/states`, payload, authConfig);
        if (res.data.success) {
          setStatusMsg({ type: 'success', text: `Added new state ${formData.stateName}!` });
        }
      }
      setIsModalOpen(false);
      fetchAdminData();
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.response?.data?.message || 'Error saving state record' });
    }
  };

  const handleDeleteState = async (id, stateName) => {
    if (window.confirm(`Are you sure you want to delete state record for ${stateName}?`)) {
      try {
        await axios.delete(`${API_URL}/api/admin/states/${id}`, authConfig);
        setStatusMsg({ type: 'success', text: `Deleted ${stateName} record!` });
        fetchAdminData();
      } catch (err) {
        setStatusMsg({ type: 'error', text: 'Failed to delete state record' });
      }
    }
  };

  const filteredStates = states.filter((st) => {
    const query = searchQuery.toLowerCase();
    return (
      st.stateName.toLowerCase().includes(query) ||
      (st.discomName && st.discomName.toLowerCase().includes(query))
    );
  });

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="glass-card max-w-md p-8 rounded-3xl text-center space-y-4 border border-red-500/30">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Admin Privileges Required</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              You must be logged in as an Administrator to access the SolarWise India Tariff & Settings Admin Panel.
            </p>
            <button
              onClick={() => navigate('/calculator')}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm rounded-xl"
            >
              Return to Solar Calculator
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/40 bg-white dark:bg-slate-900 shadow-2xl">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span>SolarWise Platform Administration</span>
              </div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Tariff & System Control Panel
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                Manage DISCOM electricity tariff rates (₹/kWh), regional solar radiation values, and approve new Admin access requests.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={fetchAdminData}
                className="p-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all shadow-sm"
                title="Refresh Database Stats"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>

              <button
                onClick={openAddModal}
                className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-emerald-500/20 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add State Record</span>
              </button>
            </div>
          </div>

          {/* Status Message Alert */}
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
            <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between shadow-sm">
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

            <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between shadow-sm">
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

            <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between shadow-sm">
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

            <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between shadow-sm">
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
          <div className="glass-card rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
            <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 w-full md:w-auto">
              <button
                onClick={() => {
                  setActiveTab('tariffs');
                  fetchAdminData();
                }}
                className={`px-5 py-2 text-xs font-bold rounded-xl transition-all ${
                  activeTab === 'tariffs'
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                State Tariffs & Irradiance (CRUD)
              </button>

              <button
                onClick={() => {
                  setActiveTab('adminRequests');
                  fetchPendingRequests();
                }}
                className={`px-5 py-2 text-xs font-bold rounded-xl transition-all relative flex items-center gap-1.5 ${
                  activeTab === 'adminRequests'
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>Admin Access Requests</span>
                {pendingAdminRequests.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-black animate-pulse">
                    {pendingAdminRequests.length}
                  </span>
                )}
              </button>
            </div>

            {/* Search input */}
            {activeTab === 'tariffs' && (
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
            )}
          </div>

          {/* TAB 1: State & Tariff Management Table */}
          {activeTab === 'tariffs' && (
            <div className="glass-card rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xl">
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    Indian State DISCOM Tariff & Solar Irradiance Records
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                    Manage electricity rates (₹/kWh) and solar radiation benchmarks used by the backend engine.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 uppercase text-[11px] font-black">
                    <tr>
                      <th className="py-3.5 px-6">State / Region</th>
                      <th className="py-3.5 px-6">State DISCOM Name</th>
                      <th className="py-3.5 px-6">Cities Covered</th>
                      <th className="py-3.5 px-6">Tariff (₹/kWh)</th>
                      <th className="py-3.5 px-6">Irradiance (kWh/m²/day)</th>
                      <th className="py-3.5 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-800 dark:text-slate-200 font-medium">
                    {filteredStates.map((st) => (
                      <tr key={st._id || st.stateName} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="py-4 px-6 font-extrabold text-slate-950 dark:text-white">{st.stateName}</td>
                        <td className="py-4 px-6 text-xs text-slate-600 dark:text-slate-400">{st.discomName || 'State DISCOM'}</td>
                        <td className="py-4 px-6">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {Array.isArray(st.cities)
                              ? st.cities.slice(0, 4).map((c) => (
                                  <span key={c} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold">
                                    {c}
                                  </span>
                                ))
                              : null}
                            {st.cities && st.cities.length > 4 && (
                              <span className="text-[10px] text-slate-400 font-semibold">+{st.cities.length - 4} more</span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6 font-black text-emerald-700 dark:text-emerald-400">₹{st.defaultRatePerKwh} / kWh</td>
                        <td className="py-4 px-6 font-bold text-amber-500">{st.solarIrradiance} kWh/m²</td>
                        <td className="py-4 px-6 text-right space-x-2">
                          <button
                            onClick={() => openEditModal(st)}
                            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors"
                            title="Edit State Record"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteState(st._id, st.stateName)}
                            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-950 text-slate-600 dark:text-slate-300 hover:text-red-600 transition-colors"
                            title="Delete State Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: Pending Admin Access Requests */}
          {activeTab === 'adminRequests' && (
            <div className="glass-card rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xl space-y-6 p-6">
              <div>
                <h3 className="text-xl font-black text-slate-950 dark:text-white flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-amber-500" />
                  <span>Pending Administrator Access Requests</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  Review and approve or reject user requests for platform administrator privileges.
                </p>
              </div>

              {pendingAdminRequests.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm font-semibold">
                  No pending admin requests found.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 uppercase text-[11px] font-black">
                      <tr>
                        <th className="py-3.5 px-6">User Name</th>
                        <th className="py-3.5 px-6">Email Address</th>
                        <th className="py-3.5 px-6">State / Region</th>
                        <th className="py-3.5 px-6">Current Role</th>
                        <th className="py-3.5 px-6">Status</th>
                        <th className="py-3.5 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-800 dark:text-slate-200 font-medium">
                      {pendingAdminRequests.map((reqUser) => (
                        <tr key={reqUser._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                          <td className="py-4 px-6 font-extrabold text-slate-950 dark:text-white">{reqUser.name}</td>
                          <td className="py-4 px-6 text-xs text-slate-600 dark:text-slate-400">{reqUser.email}</td>
                          <td className="py-4 px-6 font-semibold">{reqUser.state || 'Maharashtra'}</td>
                          <td className="py-4 px-6">
                            <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-700">
                              {reqUser.role}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            {reqUser.adminRequested ? (
                              <span className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-black border border-amber-500/30">
                                ✨ Admin Requested (Pending)
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold border border-slate-200 dark:border-slate-700">
                                Registered User
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-right space-x-2">
                            <button
                              onClick={() => handleApproveAdmin(reqUser._id)}
                              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all inline-flex items-center gap-1"
                            >
                              <UserCheck className="w-4 h-4" />
                              <span>Promote to Admin</span>
                            </button>
                            {reqUser.adminRequested && (
                              <button
                                onClick={() => handleRejectAdmin(reqUser._id)}
                                className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs shadow-md transition-all inline-flex items-center gap-1"
                              >
                                <UserX className="w-4 h-4" />
                                <span>Reject Request</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      {/* Add / Edit State Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 z-10 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                {editingState ? `Edit ${editingState.stateName} Record` : 'Add New Indian State Record'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveState} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">State / Region Name</label>
                <input
                  type="text"
                  placeholder="e.g. Haryana"
                  value={formData.stateName}
                  onChange={(e) => setFormData({ ...formData, stateName: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">DISCOM Company Name</label>
                <input
                  type="text"
                  placeholder="e.g. DHBVN / UHBVN"
                  value={formData.discomName}
                  onChange={(e) => setFormData({ ...formData, discomName: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Tariff Rate (₹/kWh)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.defaultRatePerKwh}
                    onChange={(e) => setFormData({ ...formData, defaultRatePerKwh: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Solar Irradiance (kWh/m²)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.solarIrradiance}
                    onChange={(e) => setFormData({ ...formData, solarIrradiance: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Covered Cities (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="Gurugram, Faridabad, Panipat, Ambala"
                  value={formData.citiesStr}
                  onChange={(e) => setFormData({ ...formData, citiesStr: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-md"
                >
                  {editingState ? 'Save Changes' : 'Add State Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
