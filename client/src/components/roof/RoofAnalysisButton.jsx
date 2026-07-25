import React from 'react';
import { Camera, Sparkles } from 'lucide-react';

export default function RoofAnalysisButton({ onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="relative group w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-amber-500 via-emerald-600 to-teal-600 hover:from-amber-400 hover:to-teal-500 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2.5 disabled:opacity-50"
    >
      <div className="p-1 rounded-lg bg-white/20">
        <Camera className="w-4 h-4 text-amber-300 animate-pulse" />
      </div>
      <span>Analyze My Roof with AI (GPS + Satellite)</span>
      <Sparkles className="w-4 h-4 text-amber-300" />
    </button>
  );
}
