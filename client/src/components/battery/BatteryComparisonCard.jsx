import React from 'react';
import { BatteryCharging, ShieldCheck, Zap, Layers, Award } from 'lucide-react';

export default function BatteryComparisonCard({ recommendation }) {
  if (!recommendation) return null;

  return (
    <div className="glass-card p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-950/10 via-slate-900/40 to-emerald-950/10 space-y-6 shadow-xl relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
            <BatteryCharging className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-500">
              Recommended Model • {recommendation.chemistry}
            </span>
            <h4 className="text-xl font-black text-slate-900 dark:text-white">
              {recommendation.brand} {recommendation.model}
            </h4>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-xs text-slate-400 font-bold block">Estimated Turnkey Cost</span>
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            ₹{(recommendation.estimatedBatteryCostRs || 120000).toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold">
        <div className="bg-slate-100 dark:bg-slate-800/60 p-3.5 rounded-xl space-y-0.5">
          <span className="text-[10px] text-slate-400 uppercase">Total Capacity</span>
          <div className="font-extrabold text-slate-900 dark:text-white text-base">
            {recommendation.totalNominalCapacityKwh} kWh
          </div>
          <span className="text-[10px] text-slate-500">({recommendation.unitCount} × {recommendation.singleUnitCapacityKwh} kWh)</span>
        </div>

        <div className="bg-slate-100 dark:bg-slate-800/60 p-3.5 rounded-xl space-y-0.5">
          <span className="text-[10px] text-slate-400 uppercase">Usable Energy (DoD 85%)</span>
          <div className="font-extrabold text-emerald-500 text-base">
            {recommendation.totalUsableCapacityKwh} kWh
          </div>
          <span className="text-[10px] text-slate-500">Safe Discharge Cap</span>
        </div>

        <div className="bg-slate-100 dark:bg-slate-800/60 p-3.5 rounded-xl space-y-0.5">
          <span className="text-[10px] text-slate-400 uppercase">Round-Trip Efficiency</span>
          <div className="font-extrabold text-amber-500 text-base">
            {recommendation.roundTripEfficiency}%
          </div>
          <span className="text-[10px] text-slate-500">Low Internal Resistance</span>
        </div>

        <div className="bg-slate-100 dark:bg-slate-800/60 p-3.5 rounded-xl space-y-0.5">
          <span className="text-[10px] text-slate-400 uppercase">Warranty</span>
          <div className="font-extrabold text-indigo-400 text-base">
            {recommendation.warrantyYears} Years
          </div>
          <span className="text-[10px] text-slate-500">Full Replacement</span>
        </div>
      </div>
    </div>
  );
}
