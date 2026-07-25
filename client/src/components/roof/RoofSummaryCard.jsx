import React from 'react';
import { Sparkles, Info, ShieldCheck, AlertCircle } from 'lucide-react';

export default function RoofSummaryCard({ summary, isFallback }) {
  return (
    <div className="glass-card p-6 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/5 via-slate-900/5 to-emerald-500/5 space-y-4 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="text-lg font-black text-slate-950 dark:text-white">
            AI Rooftop Recommendation Summary
          </h4>
        </div>

        {isFallback && (
          <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-500/30">
            Heuristic Estimation Engine
          </span>
        )}
      </div>

      <p className="text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed bg-white/70 dark:bg-slate-900/70 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        {summary || 'Your rooftop exhibits favorable solar irradiance and minimal structural shading. A 5.5 kW system is recommended for optimal power generation.'}
      </p>

      {/* On-Site Verification Disclaimer */}
      <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 font-medium flex items-start gap-2.5">
        <Info className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />
        <div>
          <strong>Disclaimer:</strong> This analysis is generated using AI from a user-provided satellite screenshot. Results are estimates and should be verified through an on-site physical inspection by a DISCOM-empanelled vendor before installation.
        </div>
      </div>
    </div>
  );
}
