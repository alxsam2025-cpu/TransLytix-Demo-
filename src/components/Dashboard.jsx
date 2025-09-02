import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const data = [
  { name: "Ghana", value: 400 },
  { name: "Kenya", value: 300 },
  { name: "Nigeria", value: 500 },
  { name: "Sudan", value: 200 },
  { name: "Zambia", value: 350 },
  { name: "Zimbabwe", value: 250 },
];

const positions = {
  Ghana: [7.9465, -1.0232],
  Kenya: [-0.0236, 37.9062],
  Nigeria: [9.082, 8.6753],
  Sudan: [12.8628, 30.2176],
  Zambia: [-13.1339, 27.8493],
  Zimbabwe: [-19.0154, 29.1549],
};

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white shadow rounded-2xl p-4">
        <h2 className="text-xl font-semibold mb-4">Country Data</h2>
        <LineChart width={400} height={250} data={data}>
          <Line type="monotone" dataKey="value" stroke="#2563eb" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>

      <div className="bg-white shadow rounded-2xl p-4">
        <h2 className="text-xl font-semibold mb-4">Country Map</h2>
        <MapContainer center={[7.9465, -1.0232]} zoom={3} style={{ height: "250px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {Object.entries(positions).map(([country, coords]) => (
            <Marker key={country} position={coords}>
              <Popup>{country}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
