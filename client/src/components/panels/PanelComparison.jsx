import React from 'react';
import { Layers, Award } from 'lucide-react';
import RecommendationBanner from './RecommendationBanner';
import PanelCard from './PanelCard';
import ComparisonTable from './ComparisonTable';

export default function PanelComparison({ panelData }) {
  if (!panelData || !panelData.recommendations) return null;

  const top3 = panelData.recommendations || [];
  const allPanels = panelData.allPanels || top3;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-6 h-6 text-emerald-500" />
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Phase 11 — Tier-1 Solar Panel Brand Comparison
            </h3>
            <p className="text-xs text-slate-500">
              Ranked options for your {panelData.systemKw || 4.4} kW system based on efficiency, degradation, cost per watt, and warranties.
            </p>
          </div>
        </div>
      </div>

      {/* AI Recommendation Banner */}
      <RecommendationBanner text={panelData.aiRecommendation} />

      {/* Top 3 Ranked Panel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {top3.map((panel, idx) => (
          <PanelCard key={panel._id || idx} panel={panel} rank={idx + 1} />
        ))}
      </div>

      {/* Full Comparison Table */}
      <ComparisonTable panels={allPanels} />
    </div>
  );
}
