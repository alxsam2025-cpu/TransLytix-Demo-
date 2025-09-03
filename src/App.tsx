import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

function App() {
  // Example chart data
  const data = [
    { name: "Ghana", value: 400 },
    { name: "Kenya", value: 300 },
    { name: "Zimbabwe", value: 200 },
    { name: "Nigeria", value: 500 },
    { name: "Sudan", value: 150 },
    { name: "Zambia", value: 250 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <img
          src="/new-logo.png"
          alt="TransLytix Logo"
          className="h-24 w-auto mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold text-gray-900">Welcome to TransLytix</h1>
        <p className="mt-2 text-lg text-gray-700">
          🚀 Data-driven insights for Africa’s transportation networks
        </p>
        <p className="mt-4 text-md text-gray-600 max-w-2xl mx-auto">
          Explore interactive maps, insightful charts, and predictive analytics across
          Ghana, Kenya, Zimbabwe, Nigeria, Sudan, and Zambia.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Map Section */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-3">🌍 Interactive Map</h2>
          <MapContainer
            center={[7.9465, -1.0232]} // Ghana’s coordinates
            zoom={5}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <Marker position={[7.9465, -1.0232]}>
              <Popup>Ghana</Popup>
            </Marker>
            <Marker position={[-1.2921, 36.8219]}>
              <Popup>Kenya</Popup>
            </Marker>
            <Marker position={[-17.8292, 31.0522]}>
              <Popup>Zimbabwe</Popup>
            </Marker>
            <Marker position={[9.082, 8.6753]}>
              <Popup>Nigeria</Popup>
            </Marker>
            <Marker position={[12.8628, 30.2176]}>
              <Popup>Sudan</Popup>
            </Marker>
            <Marker position={[-13.1339, 27.8493]}>
              <Popup>Zambia</Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Chart Section */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-3">📊 Analytics</h2>
          <LineChart
            width={400}
            height={300}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#2563eb" activeDot={{ r: 8 }} />
          </LineChart>
        </div>
      </div>
    </div>
  );
}

export default App;
