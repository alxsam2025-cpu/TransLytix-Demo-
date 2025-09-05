// src/sections/MapView.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  LayersControl,
  LayerGroup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import { subscribe, getSnapshot } from "../utils/liveStore";
import { COUNTRIES, COUNTRY_META } from "../utils/liveData";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// ✅ Custom hook for heat layer
function useHeatLayer(points) {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    if (!map._translytix_heat) {
      map._translytix_heat = L.heatLayer(points, {
        radius: 18,
        blur: 15,
        maxZoom: 10,
        minOpacity: 0.25,
      }).addTo(map);
    } else {
      map._translytix_heat.setLatLngs(points);
    }
  }, [map, points]);
  return null;
}

export default function MapView() {
  const [stream, setStream] = useState(() => getSnapshot());
  const [showHeat, setShowHeat] = useState(true);

  useEffect(() => subscribe((buf) => setStream(buf)), []);

  const heatPoints = useMemo(
    () =>
      stream.map((s) => [...s.coords, s.intensity || 0.4]),
    [stream]
  );

  const grouped = useMemo(() => {
    const g = {};
    COUNTRIES.forEach((c) => (g[c] = []));
    stream.forEach((s) => {
      if (!g[s.country]) g[s.country] = [];
      g[s.country].push(s);
    });
    return g;
  }, [stream]);

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-xl sm:text-2xl font-bold">
          🌍 Live Map View
        </h2>
        <label className="flex items-center gap-2 text-sm bg-gray-100 px-3 py-1 rounded-lg shadow-sm">
          <input
            type="checkbox"
            checked={showHeat}
            onChange={(e) => setShowHeat(e.target.checked)}
          />
          Show Heatmap
        </label>
      </div>

      {/* Map container - ✅ responsive height */}
      <div className="h-[60vh] sm:h-[70vh] rounded-lg overflow-hidden shadow-md">
        <MapContainer
          center={[5.5, 10]}
          zoom={3}
          style={{ height: "100%", width: "100%" }}
          className="rounded-lg"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {showHeat && <HeatLayer points={heatPoints} />}
          <LayersControl position="topright">
            {COUNTRIES.map((c) => (
              <LayersControl.Overlay key={c} name={c} checked>
                <LayerGroup>
                  {grouped[c].map((p) => (
                    <CircleMarker
                      key={p.id}
                      center={p.coords}
                      pathOptions={{
                        color: p.color,
                        fillColor: p.color,
                        fillOpacity: 0.8,
                      }}
                      radius={
                        p.severity === "Critical"
                          ? 12
                          : p.severity === "High"
                          ? 9
                          : p.severity === "Medium"
                          ? 7
                          : 5
                      }
                    >
                      {/* ✅ Mobile-friendly popup */}
                      <Popup>
                        <div className="w-56 sm:w-64">
                          <img
                            src={p.image}
                            alt="road"
                            className="w-full h-28 object-cover rounded-md"
                          />
                          <div className="text-xs sm:text-sm mt-2 space-y-1">
                            <p>
                              <b>{p.country}</b> · {p.region}
                            </p>
                            <p>
                              Severity: <b>{p.severity}</b>
                            </p>
                            <p>Status: {p.status}</p>
                            <p className="text-gray-500">
                              {p.timestamp}
                            </p>
                          </div>
                        </div>
                      </Popup>
                    </CircleMarker>
                  ))}
                </LayerGroup>
              </LayersControl.Overlay>
            ))}
          </LayersControl>
        </MapContainer>
      </div>

      {/* Legend - ✅ stacked on mobile */}
      <div className="flex flex-wrap gap-3 mt-2">
        {COUNTRIES.map((c) => (
          <div
            key={c}
            className="flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-md shadow-sm text-xs sm:text-sm"
          >
            <span
              className="w-3 h-3 rounded-full"
              style={{ background: COUNTRY_META[c].color }}
            ></span>
            <span>{c}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ✅ HeatLayer wrapper
function HeatLayer({ points }) {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    if (!map._translytix_heat) {
      map._translytix_heat = L.heatLayer(points, {
        radius: 18,
        blur: 15,
        minOpacity: 0.25,
      }).addTo(map);
    } else {
      map._translytix_heat.setLatLngs(points);
    }
  }, [map, points]);
  return null;
}
