import React from 'react';
import { BatteryCharging, Sparkles } from 'lucide-react';
import BatteryComparisonCard from './BatteryComparisonCard';
import BatteryBenefits from './BatteryBenefits';

export default function BatteryRecommendation({ batteryData }) {
  if (!batteryData || !batteryData.recommendation) return null;

  const rec = batteryData.recommendation;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BatteryCharging className="w-6 h-6 text-amber-500" />
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Phase 10 — AI Battery Storage Recommendation
            </h3>
            <p className="text-xs text-slate-500">
              Sized for your {batteryData.inputs?.systemKw || 4.4} kW solar plant with {batteryData.inputs?.backupHours || '6 Hours'} backup preference.
            </p>
          </div>
        </div>
      </div>

      {/* AI Recommendation Quote Box */}
      <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs font-semibold leading-relaxed flex items-start gap-3 shadow-md">
        <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <p>{rec.aiRecommendation}</p>
      </div>

      {/* Battery Comparison Card */}
      <BatteryComparisonCard recommendation={rec} />

      {/* Battery Benefits Grid */}
      <BatteryBenefits recommendation={rec} />
    </div>
  );
}
