// src/sections/LiveDemo.jsx
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

export default function LiveDemo() {
  const [form, setForm] = useState({
    phone: "",
    email: "",
    region: "",
    town: "",
    area: "",
    latitude: "",
    longitude: "",
    severity: "Low",
    comment: "",
    file: null,
    preview: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [locating, setLocating] = useState(false);

  const regions = {
    Ghana: ["Accra", "Kumasi", "Tamale"],
    Nigeria: ["Lagos", "Abuja", "Port Harcourt"],
    Kenya: ["Nairobi", "Mombasa", "Kisumu"],
    Sudan: ["Khartoum", "Omdurman"],
    Zimbabwe: ["Harare", "Bulawayo"],
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file" && files.length > 0) {
      setForm({
        ...form,
        file: files[0],
        preview: URL.createObjectURL(files[0]),
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleLocation = () => {
    if (!navigator.geolocation) {
      alert("❌ Geolocation is not supported by your browser.");
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm({
          ...form,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocating(false);
      },
      (error) => {
        alert("⚠️ Unable to fetch location. Please allow location access.");
        setLocating(false);
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-green-700">✅ Thank You!</h2>
        <p className="text-gray-700">
          Your road damage report has been submitted successfully.
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md md:max-w-2xl bg-white shadow-lg rounded-2xl p-6 space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-green-700 mb-2">
          📱 Report Road Damage
        </h2>
        <p className="text-sm text-gray-600 text-center mb-4">
          Help improve roads by reporting issues in your community.
        </p>

        {/* Contact Info */}
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address (optional)"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
        />

        {/* Region + Town */}
        <select
          name="region"
          value={form.region}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
          required
        >
          <option value="">Select Region</option>
          {Object.keys(regions).map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        {form.region && (
          <select
            name="town"
            value={form.town}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="">Select Town</option>
            {regions[form.region].map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        )}

        {/* Area */}
        <input
          type="text"
          name="area"
          placeholder="Specific Area"
          value={form.area}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
        />

        {/* GPS Location */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleLocation}
            disabled={locating}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            {locating ? "📍 Locating..." : "📍 Use My GPS Location"}
          </button>
          {form.latitude && form.longitude && (
            <div className="space-y-2">
              <p className="text-sm text-gray-700 text-center">
                ✅ Location Tagged: Lat: {form.latitude}, Lng: {form.longitude}
              </p>
              {/* Map Preview */}
              <MapContainer
                center={[form.latitude, form.longitude]}
                zoom={15}
                className="h-40 md:h-64 w-full rounded-lg shadow-md"
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[form.latitude, form.longitude]}>
                  <Popup>📍 Reported Location</Popup>
                </Marker>
              </MapContainer>
            </div>
          )}
        </div>

        {/* Upload */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Upload Image/Video
          </label>
          <input
            type="file"
            name="file"
            accept="image/*,video/*"
            onChange={handleChange}
            className="w-full text-sm"
          />
          {form.preview && (
            <div className="mt-3">
              {form.file?.type.startsWith("video/") ? (
                <video
                  src={form.preview}
                  controls
                  className="w-full h-48 md:h-64 rounded-lg object-cover"
                />
              ) : (
                <img
                  src={form.preview}
                  alt="preview"
                  className="w-full h-48 md:h-64 object-cover rounded-lg"
                />
              )}
            </div>
          )}
        </div>

        {/* Severity */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Impact Severity
          </label>
          <select
            name="severity"
            value={form.severity}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </div>

        {/* Comments */}
        <textarea
          name="comment"
          placeholder="Additional Comments"
          value={form.comment}
          onChange={handleChange}
          rows={3}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium"
        >
          🚀 Submit Report
        </button>
      </form>
    </div>
  );
}
