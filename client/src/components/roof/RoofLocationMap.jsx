import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Locate, Check, Edit3, ExternalLink } from 'lucide-react';

// Custom Map Marker Icon
const defaultMarkerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function RecenterMap({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 18);
  }, [lat, lng, map]);
  return null;
}

function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  return (
    <Marker
      position={[position.lat, position.lng]}
      icon={defaultMarkerIcon}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target;
          const pos = marker.getLatLng();
          setPosition({ lat: pos.lat, lng: pos.lng });
        },
      }}
    />
  );
}

export default function RoofLocationMap({ lat, lng, onConfirmPosition }) {
  const [position, setPosition] = useState({ lat, lng });
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    setPosition({ lat, lng });
  }, [lat, lng]);

  const handleRecenter = () => {
    setPosition({ lat, lng });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-base font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-500" />
            <span>Confirm Your House Location</span>
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
            Drag the pin or click on the map to position it directly on your roof.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRecenter}
          className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all flex items-center gap-1.5 shadow-sm"
        >
          <Locate className="w-4 h-4 text-amber-500" />
          <span>Recenter GPS</span>
        </button>
      </div>

      {/* Leaflet Map Box */}
      <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-lg z-10">
        <MapContainer
          center={[position.lat, position.lng]}
          zoom={18}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <RecenterMap lat={position.lat} lng={position.lng} />
          <LocationMarker position={position} setPosition={setPosition} />
        </MapContainer>

        <div className="absolute bottom-3 left-3 z-[1000] bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-[11px] font-bold border border-slate-700 shadow-md">
          Lat: {position.lat.toFixed(5)} • Lng: {position.lng.toFixed(5)}
        </div>
      </div>

      {/* Confirmation Dialog Box */}
      <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-slate-900 border border-emerald-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-black text-slate-950 dark:text-white">
            Is this your rooftop?
          </span>
          <span className="text-xs text-emerald-800 dark:text-emerald-300 font-bold">
            Zoom 18x Resolution
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => {
              setConfirmed(true);
              onConfirmPosition(position.lat, position.lng);
            }}
            className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Yes, Open Satellite View</span>
          </button>

          <button
            type="button"
            onClick={() => setConfirmed(false)}
            className="px-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-1.5"
          >
            <Edit3 className="w-4 h-4 text-amber-500" />
            <span>Move Marker</span>
          </button>
        </div>
      </div>
    </div>
  );
}
