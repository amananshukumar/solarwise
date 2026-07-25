import React from 'react';
import { Award, Zap, ShieldCheck, Sun, CheckCircle2 } from 'lucide-react';

export default function PanelCard({ panel, rank }) {
  if (!panel) return null;

  const badgeColors = {
    'Best Value': 'bg-emerald-500 text-slate-950',
    'Highest Efficiency': 'bg-amber-400 text-slate-950',
    'Longest Warranty': 'bg-indigo-500 text-white',
    'Lowest Cost': 'bg-teal-500 text-slate-950',
  };

  return (
    <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 hover:border-emerald-500/50 transition-all relative overflow-hidden">
      {/* Badge Banner */}
      {panel.badge && (
        <span
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md ${
            badgeColors[panel.badge] || 'bg-emerald-500 text-slate-950'
          }`}
        >
          {panel.badge}
        </span>
      )}

      <div>
        <div className="space-y-1 mb-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Rank #{rank} Option</span>
          <h4 className="text-xl font-black text-slate-900 dark:text-white">
            {panel.brand}
          </h4>
          <p className="text-xs text-slate-500 font-medium">{panel.model} ({panel.cellTechnology})</p>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-800/60 font-semibold">
            <span className="text-slate-500">Power Rating:</span>
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{panel.power} Watts</span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-800/60 font-semibold">
            <span className="text-slate-500">Efficiency:</span>
            <span className="font-extrabold text-amber-500">{panel.efficiency}%</span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-800/60 font-semibold">
            <span className="text-slate-500">Cost Per Watt:</span>
            <span className="font-bold text-slate-900 dark:text-white">₹{panel.costPerWatt} / W</span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-800/60 font-semibold">
            <span className="text-slate-500">Panels Needed:</span>
            <span className="font-bold text-slate-900 dark:text-white">{panel.panelsRequired} Modules</span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-800/60 font-semibold">
            <span className="text-slate-500">Warranty:</span>
            <span className="font-bold text-indigo-400">{panel.warrantyProduct}Yr Product / {panel.warrantyPerformance}Yr Perf</span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <span className="text-xs text-slate-400 font-bold">Total Equipment Cost</span>
        <span className="text-lg font-black text-slate-900 dark:text-white">
          ₹{(panel.totalCost || 0).toLocaleString('en-IN')}
        </span>
      </div>
    </div>
  );
}
