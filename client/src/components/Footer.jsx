import React from 'react';
import { Sun, Heart, ExternalLink, ShieldCheck, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main 4-Column Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-emerald-500 to-teal-500 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sun className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <span className="font-extrabold text-2xl text-white tracking-tight">
                SolarWise<span className="text-amber-400">.in</span>
              </span>
            </div>
            
            <p className="text-sm leading-relaxed max-w-sm text-slate-400">
              India’s premier AI-powered rooftop solar intelligence platform. Empowering households to harness clean solar energy, compute ROI, and claim PM Surya Ghar subsidies effortlessly.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Aligned with MNRE & National Solar Portal Guidelines</span>
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">SolarWise Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#solar-calculator" className="hover:text-emerald-400 transition-colors">ROI Calculator</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Solar Irradiance AI</a></li>
              <li><a href="#how-it-works" className="hover:text-emerald-400 transition-colors">4-Step Workflow</a></li>
              <li><a href="#benefits" className="hover:text-emerald-400 transition-colors">Financial Benefits</a></li>
              <li><a href="#faq" className="hover:text-emerald-400 transition-colors">FAQ & Guidelines</a></li>
            </ul>
          </div>

          {/* Column 3: Official Govt Portals */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Government Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://pmsuryaghar.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <span>PM Surya Ghar Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://mnre.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <span>MNRE Ministry Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">State DISCOM Portals</a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">Empanelled Solar Vendors</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Solar Newsletter</h4>
            <p className="text-xs text-slate-400">
              Get monthly policy updates on state net-metering & solar tariff changes.
            </p>
            <div className="flex flex-col gap-2">
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:ring-1 focus:ring-emerald-500 outline-none"
                />
              </div>
              <button className="w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl transition-all">
                Subscribe Updates
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} SolarWise India. All rights reserved. Built for clean energy transition across India.
          </div>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for a Green & Sustainable India</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
