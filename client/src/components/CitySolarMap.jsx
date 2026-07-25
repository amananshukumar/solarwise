import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Sun, MapPin, Zap, ShieldCheck } from 'lucide-react';

// Custom Solar Marker Icon
const solarIcon = new L.DivIcon({
  className: 'custom-solar-marker',
  html: `
    <div style="
      background: linear-gradient(135deg, #f59e0b, #10b981);
      width: 38px;
      height: 38px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 15px rgba(245, 158, 11, 0.5);
      border: 2.5px solid white;
    ">
      <span style="font-size: 18px;">☀️</span>
    </div>
  `,
  iconSize: [38, 38],
  iconAnchor: [19, 19],
  popupAnchor: [0, -20],
});

// Component to dynamically re-center map when coordinates change
function RecenterMap({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], 11, { animate: true });
    }
  }, [lat, lng, map]);
  return null;
}

export default function CitySolarMap({
  cityName = 'Mumbai',
  stateName = 'Maharashtra',
  lat = 19.0760,
  lng = 72.8777,
  recommendedKw = 4.4,
  weatherInfo = null,
}) {
  const position = [lat, lng];

  return (
    <div className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border border-emerald-500/30 glass-card">
      <MapContainer
        center={position}
        zoom={11}
        scrollWheelZoom={false}
        className="w-full h-full z-0"
        style={{ height: '100%', width: '100%' }}
      >
        <RecenterMap lat={lat} lng={lng} />

        {/* Free OpenStreetMap Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position} icon={solarIcon}>
          <Popup className="custom-solar-popup">
            <div className="p-2 space-y-1.5 text-slate-900 font-sans">
              <div className="flex items-center gap-1.5 font-black text-sm text-emerald-700">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>{cityName}, {stateName}</span>
              </div>

              <div className="text-xs text-slate-600 border-t border-slate-200 pt-1">
                <div><strong>Coordinates:</strong> {lat.toFixed(4)}° N, {lng.toFixed(4)}° E</div>
                <div><strong>Solar Plant:</strong> {recommendedKw} kW System</div>
                {weatherInfo && (
                  <div>
                    <strong>Live Weather:</strong> {weatherInfo.icon} {weatherInfo.condition} ({weatherInfo.temperatureC}°C)
                  </div>
                )}
              </div>

              <div className="text-[10px] text-emerald-800 font-bold bg-emerald-50 p-1.5 rounded-lg border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>DISCOM Net-Metering Compatible Zone</span>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Floating City & Irradiance Badge */}
      <div className="absolute top-4 left-4 z-10 bg-slate-900/90 text-white backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-700 shadow-lg flex items-center gap-2.5 text-xs font-semibold">
        <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
        <div>
          <span className="font-extrabold text-white">{cityName} Solar Zone</span>
          <span className="text-[10px] text-slate-400 block">{lat.toFixed(2)}°N, {lng.toFixed(2)}°E</span>
        </div>
      </div>
    </div>
  );
}
