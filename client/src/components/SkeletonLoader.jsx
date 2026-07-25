import React from 'react';

export function CardSkeleton() {
  return (
    <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 animate-pulse space-y-3">
      <div className="flex items-center justify-between">
        <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded-md" />
        <div className="h-6 w-6 bg-slate-200 dark:bg-slate-800 rounded-full" />
      </div>
      <div className="h-8 w-36 bg-slate-200 dark:bg-slate-800 rounded-lg" />
      <div className="h-3 w-48 bg-slate-200 dark:bg-slate-800 rounded-md" />
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="glass-card rounded-3xl border border-slate-200 dark:border-slate-800 p-6 animate-pulse space-y-4">
      <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg" />
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-10 w-full bg-slate-100 dark:bg-slate-800/60 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export function PageSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="text-center space-y-3">
        <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin" />
          <span className="text-2xl animate-pulse">☀️</span>
        </div>
        <div className="text-xs font-extrabold text-slate-600 dark:text-slate-300 uppercase tracking-widest">
          Loading SolarWise India...
        </div>
      </div>
    </div>
  );
}
