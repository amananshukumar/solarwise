import React from 'react';
import { Sun } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-3 text-xs">
      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-emerald-500 text-slate-950 flex items-center justify-center shrink-0 shadow-md">
        <Sun className="w-4 h-4 animate-spin-slow" />
      </div>
      <div className="p-3 bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '300ms' }} />
        <span className="text-[11px] text-slate-400 font-semibold ml-1">SolarWise AI is typing...</span>
      </div>
    </div>
  );
}
