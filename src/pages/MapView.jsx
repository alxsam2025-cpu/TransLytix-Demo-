// src/pages/MapView.jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const countries = [
  {
    name: "Ghana",
    coords: [5.6037, -0.1870],
    reports: 128,
    critical: 32,
    lastReport: "Accra – Pothole near Ring Road",
  },
  {
    name: "Nigeria",
    coords: [9.0820, 8.6753],
    reports: 245,
    critical: 58,
    lastReport: "Lagos – Flooded road at Lekki",
  },
  {
    name: "Kenya",
    coords: [-1.2921, 36.8219],
    reports: 167,
    critical: 41,
    lastReport: "Nairobi – Damage on Thika Highway",
  },
  {
    name: "Sudan",
    coords: [12.8628, 30.2176],
    reports: 89,
    critical: 20,
    lastReport: "Khartoum – Cracked bridge surface",
  },
  {
    name: "Zimbabwe",
    coords: [-17.8292, 31.0522],
    reports: 76,
    critical: 18,
    lastReport: "Harare – Erosion damage on Mbare road",
  },
];

export default function MapView() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Live Road Map View</h1>

      <MapContainer
        center={[7.5, 20]}
        zoom={4}
        style={{ height: "70vh", width: "100%", borderRadius: "12px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {countries.map((c, idx) => (
          <Marker key={idx} position={c.coords}>
            <Popup>
              <h2 className="font-bold text-lg">{c.name}</h2>
              <p>Total Reports: {c.reports}</p>
              <p className="text-red-600">Critical Cases: {c.critical}</p>
              <p className="text-gray-600 italic">Latest: {c.lastReport}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}