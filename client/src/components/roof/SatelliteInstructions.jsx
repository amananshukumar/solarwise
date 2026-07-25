import React from 'react';
import { ExternalLink, Camera, Eye, ArrowRight, ShieldCheck } from 'lucide-react';

export default function SatelliteInstructions({ lat, lng }) {
  const googleMapsUrl = `https://www.google.com/maps/@${lat},${lng},20z/data=!3m1!1e3`;

  return (
    <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-6 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs text-amber-400 font-extrabold uppercase tracking-wider">
            Step 1 of 2 • Google Maps Satellite Capture
          </span>
          <h4 className="text-xl font-black text-white mt-1 flex items-center gap-2">
            <Eye className="w-5 h-5 text-emerald-400" />
            <span>Open Google Maps Satellite View</span>
          </h4>
        </div>

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm rounded-xl shadow-lg hover:scale-105 transition-all flex items-center gap-2 shrink-0"
        >
          <span>Open Satellite View</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Instructions list */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-1">
          <div className="text-xs font-bold text-amber-400">1. Click Link</div>
          <p className="text-xs text-slate-300">Click "Open Satellite View" to launch Google Maps at coordinates ({lat.toFixed(4)}, {lng.toFixed(4)}).</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-1">
          <div className="text-xs font-bold text-emerald-400">2. Toggle Satellite</div>
          <p className="text-xs text-slate-300">Switch Google Maps to Satellite view mode using layer toggle at bottom left.</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-1">
          <div className="text-xs font-bold text-teal-400">3. Zoom & Center</div>
          <p className="text-xs text-slate-300">Zoom in until your rooftop & water tank/obstacles are clearly centered.</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-1">
          <div className="text-xs font-bold text-amber-400">4. Take Screenshot</div>
          <p className="text-xs text-slate-300">Use Snipping Tool (Win + Shift + S) or PrtScn to capture your rooftop.</p>
        </div>
      </div>
    </div>
  );
}
