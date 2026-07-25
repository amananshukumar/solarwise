import React from 'react';
import { BatteryCharging, ShieldCheck, IndianRupee, Leaf, Clock, Zap } from 'lucide-react';

export default function BatteryBenefits({ recommendation }) {
  if (!recommendation) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Metric 1: Backup Hours */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1">
        <div className="flex items-center justify-between text-amber-500">
          <Clock className="w-4 h-4" />
          <span className="text-[10px] font-extrabold uppercase">Uninterrupted Power</span>
        </div>
        <div className="text-2xl font-black text-slate-900 dark:text-white">
          {recommendation.estimatedBackupTimeHours || 6} <span className="text-sm font-bold text-amber-500">Hours</span>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">Essential load backup during grid power cuts.</p>
      </div>

      {/* Metric 2: Additional Annual Savings */}
      <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
        <div className="flex items-center justify-between text-emerald-500">
          <IndianRupee className="w-4 h-4" />
          <span className="text-[10px] font-extrabold uppercase">Peak Shaving Savings</span>
        </div>
        <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
          +₹{(recommendation.additionalAnnualSavingsRs || 12000).toLocaleString('en-IN')}
          <span className="text-xs font-bold text-slate-400"> / yr</span>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">Extra savings by avoiding high DISCOM peak tariffs.</p>
      </div>

      {/* Metric 3: Self-Consumption Boost */}
      <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 space-y-1">
        <div className="flex items-center justify-between text-teal-500">
          <Zap className="w-4 h-4" />
          <span className="text-[10px] font-extrabold uppercase">Self-Consumption</span>
        </div>
        <div className="text-2xl font-black text-slate-900 dark:text-white">
          ~85% <span className="text-xs font-bold text-teal-500">Solar Utilization</span>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">Store daytime solar energy for night household use.</p>
      </div>

      {/* Metric 4: Lifespan & Warranty */}
      <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 space-y-1">
        <div className="flex items-center justify-between text-indigo-500">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-[10px] font-extrabold uppercase">LFP Lifespan</span>
        </div>
        <div className="text-2xl font-black text-slate-900 dark:text-white">
          {recommendation.estimatedLifespanYears || 15} <span className="text-xs font-bold text-indigo-400">Years</span>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">Replacement expected in ~{recommendation.estimatedReplacementYear || 2041}.</p>
      </div>
    </div>
  );
}
