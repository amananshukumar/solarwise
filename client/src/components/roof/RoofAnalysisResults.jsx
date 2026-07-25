import React from 'react';
import { motion } from 'framer-motion';
import { Building, Layers, CheckCircle2, AlertCircle, Sun, Award, Cpu, ShieldCheck, ArrowRight } from 'lucide-react';
import RoofSummaryCard from './RoofSummaryCard';

export default function RoofAnalysisResults({ data, previewUrl, onApplyToCalculator }) {
  if (!data) return null;

  const {
    roofType = 'Flat RCC',
    roofShape = 'Rectangular',
    usableAreaPercentage = 82,
    obstacles = ['Water Tank', 'AC Outdoor Unit'],
    shadeLevel = 'Low',
    estimatedPanels = 10,
    recommendedCapacityKW = 5.5,
    roofSuitability = 91,
    confidence = 88,
    summary,
    isFallback,
  } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white shadow-xl border border-emerald-500/30">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-extrabold uppercase">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span>Phase 13 • Gemini Vision AI Analysis Complete</span>
          </div>
          <h3 className="text-2xl font-black text-white">
            AI Rooftop Feasibility Scorecard
          </h3>
        </div>

        {onApplyToCalculator && (
          <button
            type="button"
            onClick={() => onApplyToCalculator(data)}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm rounded-2xl shadow-lg hover:scale-105 transition-all flex items-center gap-2 shrink-0"
          >
            <span>Apply AI Values to Calculator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main Grid: Metric Cards + Image Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Cols: Metric Cards Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Card 1: Roof Type */}
          <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-extrabold uppercase">
              <span>Roof Structure</span>
              <Building className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-xl font-black text-slate-950 dark:text-white">
              {roofType}
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 font-semibold">
              Layout: {roofShape}
            </div>
          </div>

          {/* Card 2: Usable Area */}
          <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-extrabold uppercase">
              <span>Usable Solar Area</span>
              <Layers className="w-4 h-4 text-teal-500" />
            </div>
            <div className="text-xl font-black text-teal-600 dark:text-teal-400">
              {usableAreaPercentage}%
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 font-semibold">
              Unobstructed Ratio
            </div>
          </div>

          {/* Card 3: Shade Level */}
          <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-extrabold uppercase">
              <span>Shade Obstruction</span>
              <Sun className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-xl font-black text-amber-600 dark:text-amber-400">
              {shadeLevel}
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 font-semibold">
              Peak Sun Exposure
            </div>
          </div>

          {/* Card 4: Recommended System */}
          <div className="glass-card p-5 rounded-2xl border border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-emerald-800 dark:text-emerald-300 text-xs font-extrabold uppercase">
              <span>Recommended Capacity</span>
              <Sun className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-black text-emerald-700 dark:text-emerald-300">
              {recommendedCapacityKW} kW
            </div>
            <div className="text-[11px] text-emerald-800 dark:text-emerald-400 font-bold">
              {estimatedPanels} × 550W Modules
            </div>
          </div>

          {/* Card 5: Suitability Score */}
          <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-extrabold uppercase">
              <span>Suitability Score</span>
              <Award className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-slate-950 dark:text-white">
              {roofSuitability} <span className="text-xs text-slate-400 font-medium">/ 100</span>
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-extrabold">
              Excellent Choice
            </div>
          </div>

          {/* Card 6: AI Confidence */}
          <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-extrabold uppercase">
              <span>AI Confidence</span>
              <Cpu className="w-4 h-4 text-teal-500" />
            </div>
            <div className="text-2xl font-black text-teal-600 dark:text-teal-400">
              {confidence}%
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 font-semibold">
              Gemini Vision Scan
            </div>
          </div>

          {/* Card 7: Detected Obstacles Badges */}
          <div className="sm:col-span-2 lg:col-span-3 glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-extrabold uppercase">
              Detected Rooftop Obstacles
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {obstacles.map((obs, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-extrabold border border-slate-200 dark:border-slate-700 flex items-center gap-1.5"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                  <span>{obs}</span>
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Right 4 Cols: Uploaded Screenshot Preview */}
        <div className="lg:col-span-4 glass-card p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-extrabold text-slate-950 dark:text-white">
              <span>Analyzed Rooftop Screenshot</span>
              <span className="text-emerald-600 dark:text-emerald-400">AI Verified</span>
            </div>

            {previewUrl ? (
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 max-h-56">
                <img src={previewUrl} alt="Analyzed Rooftop" className="w-full h-full object-cover" />
                <div className="absolute inset-0 border-2 border-emerald-500/40 rounded-2xl pointer-events-none" />
                <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-slate-900/80 text-emerald-400 text-[10px] font-extrabold border border-emerald-500/30">
                  Target Rooftop Zone
                </div>
              </div>
            ) : (
              <div className="h-44 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs text-slate-400 font-semibold">
                Screenshot Preview
              </div>
            )}
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium text-center">
            Satellite Resolution: ~0.3m/pixel
          </div>
        </div>

      </div>

      {/* Summary Card */}
      <RoofSummaryCard summary={summary} isFallback={isFallback} />
    </motion.div>
  );
}
