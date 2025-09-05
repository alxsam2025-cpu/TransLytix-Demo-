import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Countries and dummy data
const countries = ["Ghana", "Nigeria", "Kenya", "Sudan", "Zimbabwe"];
const severities = ["Low", "Medium", "High", "Critical"];
const statuses = ["Pending", "In Progress", "Resolved"];

// Dummy road images
const roadImages = [
  "https://upload.wikimedia.org/wikipedia/commons/6/62/Pothole.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/1/15/Cracked_asphalt.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/3/31/Flooded_road_in_Kenya.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/4/4b/Road_damage.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/2/26/Road_construction_warning_sign.jpg",
];

// Dummy GPS coords for each country
const gpsLocations = {
  Ghana: [5.6037, -0.187],
  Nigeria: [9.082, 8.6753],
  Kenya: [1.2921, 36.8219],
  Sudan: [15.5007, 32.5599],
  Zimbabwe: [-17.8292, 31.0522],
};

function Demo() {
  const [reports, setReports] = useState([]);
  const [latestReport, setLatestReport] = useState(null);

  // New state for form submission
  const [formData, setFormData] = useState({
    country: "Ghana",
    severity: "Medium",
    comment: "",
    contact: "",
    gps: "",
    image: null,
  });

  // Dummy chart data
  const chartData = [
    { day: "Mon", Ghana: 12, Nigeria: 18, Kenya: 7, Sudan: 10, Zimbabwe: 5 },
    { day: "Tue", Ghana: 22, Nigeria: 28, Kenya: 15, Sudan: 13, Zimbabwe: 9 },
    { day: "Wed", Ghana: 30, Nigeria: 35, Kenya: 20, Sudan: 18, Zimbabwe: 14 },
    { day: "Thu", Ghana: 25, Nigeria: 40, Kenya: 22, Sudan: 15, Zimbabwe: 11 },
    { day: "Fri", Ghana: 40, Nigeria: 50, Kenya: 28, Sudan: 20, Zimbabwe: 18 },
  ];

  // Generate dummy report
  const generateReport = () => {
    const country = countries[Math.floor(Math.random() * countries.length)];
    const report = {
      id: Date.now(),
      country,
      severity: severities[Math.floor(Math.random() * severities.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      time: new Date().toLocaleTimeString(),
      image: roadImages[Math.floor(Math.random() * roadImages.length)],
      gps: gpsLocations[country],
      comment: "Road damage reported by system simulation",
      contact: "Anonymous",
    };
    setReports((prev) => [report, ...prev.slice(0, 4)]);
    setLatestReport(report);
  };

  // Auto-generate reports
  useEffect(() => {
    generateReport();
    const interval = setInterval(generateReport, 7000);
    return () => clearInterval(interval);
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.comment || !formData.contact) {
      alert("Please fill in your comment and contact info!");
      return;
    }
    const newReport = {
      id: Date.now(),
      country: formData.country,
      severity: formData.severity,
      status: "Pending",
      time: new Date().toLocaleTimeString(),
      image:
        formData.image ||
        roadImages[Math.floor(Math.random() * roadImages.length)],
      gps: formData.gps
        ? formData.gps.split(",").map((v) => parseFloat(v.trim()))
        : gpsLocations[formData.country],
      comment: formData.comment,
      contact: formData.contact,
    };
    setReports((prev) => [newReport, ...prev.slice(0, 4)]);
    setLatestReport(newReport);
    setFormData({
      country: "Ghana",
      severity: "Medium",
      comment: "",
      contact: "",
      gps: "",
      image: null,
    });
  };

  return (
    <div className="p-8 text-left space-y-10">
      <h1 className="text-3xl font-bold mb-4">Live Demo Dashboard</h1>

      {/* Report Submission Form */}
      <div className="p-6 border rounded-lg shadow bg-white">
        <h2 className="text-2xl font-semibold mb-4">📢 Submit a Road Damage Report</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium">Country</label>
            <select
              value={formData.country}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
              className="border p-2 rounded w-full"
            >
              {countries.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium">Severity</label>
            <select
              value={formData.severity}
              onChange={(e) =>
                setFormData({ ...formData, severity: e.target.value })
              }
              className="border p-2 rounded w-full"
            >
              {severities.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium">Comment</label>
            <textarea
              value={formData.comment}
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
              placeholder="Describe the road damage..."
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-medium">GPS Location (lat,lng)</label>
            <input
              type="text"
              value={formData.gps}
              onChange={(e) =>
                setFormData({ ...formData, gps: e.target.value })
              }
              placeholder="e.g. 5.6037, -0.187"
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block font-medium">Contact (phone/email)</label>
            <input
              type="text"
              value={formData.contact}
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
              placeholder="Your contact info"
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Upload Image (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  image: e.target.files[0]
                    ? URL.createObjectURL(e.target.files[0])
                    : null,
                })
              }
              className="border p-2 rounded w-full"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Submit Report
          </button>
        </form>
      </div>

      {/* Reports + Charts (same as before) */}
      {/* ... keep the rest of your code from before for Health Index, Chart, Feed, Latest Report */}
    </div>
  );
}

export default Demo;