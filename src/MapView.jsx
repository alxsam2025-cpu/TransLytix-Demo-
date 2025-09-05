import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, LayersControl, LayerGroup, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import { subscribe, getSnapshot } from "../utils/liveStore";
import { COUNTRIES, COUNTRY_META } from "../utils/liveData";
import { COUNTRY_BORDERS } from "../utils/countryGeo"; // ✅ we’ll create this file

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function MapView() {
  const [stream, setStream] = useState(() => getSnapshot());
  const [showHeat, setShowHeat] = useState(true);

  useEffect(() => subscribe((buf) => setStream(buf)), []);

  const heatPoints = useMemo(() => stream.map((s) => [...s.coords, s.intensity || 0.4]), [stream]);

  // group by country
  const grouped = useMemo(() => {
    const g = {};
    COUNTRIES.forEach((c) => (g[c] = []));
    stream.forEach((s) => {
      if (!g[s.country]) g[s.country] = [];
      g[s.country].push(s);
    });
    return g;
  }, [stream]);

  // style function for GeoJSON
  const geoStyle = (feature) => ({
    color: COUNTRY_META[feature.properties.name]?.color || "blue",
    weight: 2,
    fillOpacity: 0.1,
  });

  const onEachCountry = (feature, layer) => {
    layer.on("click", () => {
      alert(`📍 ${feature.properties.name} - Showing live reports`);
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">🌍 Live Map View</h2>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={showHeat} onChange={(e) => setShowHeat(e.target.checked)} />
          Show Heatmap
        </label>
      </div>

      <div className="h-[70vh] rounded-lg overflow-hidden shadow-md">
        <MapContainer center={[5.5, 10]} zoom={4} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {showHeat && <HeatLayer points={heatPoints} />}

          {/* ✅ Add country borders */}
          {COUNTRY_BORDERS.features.map((f, idx) => (
            <GeoJSON key={idx} data={f} style={geoStyle} onEachFeature={onEachCountry} />
          ))}

          <LayersControl position="topright">
            {COUNTRIES.map((c) => (
              <LayersControl.Overlay key={c} name={c} checked>
                <LayerGroup>
                  {grouped[c].map((p) => (
                    <CircleMarker
                      key={p.id}
                      center={p.coords}
                      pathOptions={{ color: p.color, fillColor: p.color, fillOpacity: 0.8 }}
                      radius={p.severity === "Critical" ? 12 : p.severity === "High" ? 9 : p.severity === "Medium" ? 7 : 5}
                    >
                      <Popup>
                        <div style={{ width: 260 }}>
                          <img src={p.image} alt="road" style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 6 }} />
                          <div style={{ fontSize: 13, marginTop: 6 }}>
                            <b>{p.country}</b> · {p.region}<br />
                            Severity: <b>{p.severity}</b><br />
                            Status: {p.status}<br />
                            {p.timestamp}
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
    </div>
  );
}

// ✅ HeatLayer wrapper
function HeatLayer({ points }) {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    if (!map._translytix_heat) {
      map._translytix_heat = L.heatLayer(points, { radius: 22, blur: 18, minOpacity: 0.25 }).addTo(map);
    } else {
      map._translytix_heat.setLatLngs(points);
    }
    return () => {};
  }, [map, points]);
  return null;
}
