import React from 'react';
import { Award, Sparkles } from 'lucide-react';

export default function RecommendationBanner({ text }) {
  if (!text) return null;

  return (
    <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/30 text-emerald-900 dark:text-emerald-200 text-xs font-semibold leading-relaxed flex items-start gap-3 shadow-md">
      <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
      <div>
        <span className="font-extrabold uppercase text-[10px] tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
          AI Tier-1 Brand Recommendation Engine
        </span>
        <p>{text}</p>
      </div>
    </div>
  );
}
