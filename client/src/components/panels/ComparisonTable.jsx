import React, { useState } from 'react';
import { Layers, ArrowUpDown, CheckCircle2 } from 'lucide-react';

export default function ComparisonTable({ panels }) {
  const [sortField, setSortField] = useState('suitabilityScore');
  const [sortAsc, setSortAsc] = useState(false);

  if (!panels || panels.length === 0) return null;

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const sortedPanels = [...panels].sort((a, b) => {
    const valA = a[sortField] || 0;
    const valB = b[sortField] || 0;
    return sortAsc ? valA - valB : valB - valA;
  });

  return (
    <div className="glass-card rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
            Full Tier-1 Solar Panel Brand Comparison Matrix
          </h4>
          <p className="text-xs text-slate-500">
            Compare wattage, efficiency %, degradation rates, and warranties side-by-side. Click headers to sort.
          </p>
        </div>
        <Layers className="w-5 h-5 text-emerald-500" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 text-xs uppercase font-extrabold border-b border-slate-200 dark:border-slate-800 cursor-pointer">
              <th className="p-4" onClick={() => handleSort('brand')}>Brand & Model</th>
              <th className="p-4" onClick={() => handleSort('power')}>Power (W)</th>
              <th className="p-4" onClick={() => handleSort('efficiency')}>Efficiency (%)</th>
              <th className="p-4" onClick={() => handleSort('costPerWatt')}>Cost / Watt (₹)</th>
              <th className="p-4" onClick={() => handleSort('warrantyPerformance')}>Perf. Warranty</th>
              <th className="p-4" onClick={() => handleSort('degradationRate')}>Degradation</th>
              <th className="p-4" onClick={() => handleSort('panelsRequired')}>Modules Needed</th>
              <th className="p-4 text-right" onClick={() => handleSort('totalCost')}>Est. Total Cost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-semibold">
            {sortedPanels.map((p) => (
              <tr key={p._id || p.brand} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="p-4 font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div>
                    <div>{p.brand} {p.model}</div>
                    <span className="text-[10px] font-normal text-slate-400">{p.cellTechnology} ({p.country})</span>
                  </div>
                </td>
                <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400">{p.power}W</td>
                <td className="p-4 font-bold text-amber-500">{p.efficiency}%</td>
                <td className="p-4 font-bold text-slate-900 dark:text-white">₹{p.costPerWatt}/W</td>
                <td className="p-4 text-indigo-400 font-bold">{p.warrantyPerformance} Years</td>
                <td className="p-4 text-slate-500">{p.degradationRate}% / yr</td>
                <td className="p-4 font-bold text-slate-900 dark:text-white">{p.panelsRequired} Modules</td>
                <td className="p-4 text-right font-black text-slate-900 dark:text-white">
                  ₹{(p.totalCost || 0).toLocaleString('en-IN')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
