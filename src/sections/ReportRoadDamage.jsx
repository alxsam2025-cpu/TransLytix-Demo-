// src/sections/ReportRoadDamage.jsx
import React, { useState } from "react";

export default function ReportRoadDamage() {
  const [reports, setReports] = useState([
    {
      id: 1,
      location: "Accra, Ghana",
      contact: "+233 241 567 890",
      description: "Large potholes causing traffic near Tema motorway",
      photo: "https://via.placeholder.com/200x120.png?text=Pothole",
      time: "2 mins ago",
    },
    {
      id: 2,
      location: "Nairobi, Kenya",
      contact: "citizen@mail.com",
      description: "Erosion along Nairobi-Mombasa road",
      photo: "https://via.placeholder.com/200x120.png?text=Erosion",
      time: "10 mins ago",
    },
    {
      id: 3,
      location: "Lagos, Nigeria",
      contact: "+234 802 345 6789",
      description: "Collapsed drainage damaging road",
      photo: "https://via.placeholder.com/200x120.png?text=Drainage+Issue",
      time: "25 mins ago",
    },
  ]);

  const [formData, setFormData] = useState({
    location: "",
    contact: "",
    description: "",
    photo: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.contact) {
      alert("Please provide a valid Mobile number or Email address.");
      return;
    }

    const newReport = {
      id: reports.length + 1,
      location: formData.location || "GPS-tagged location",
      contact: formData.contact,
      description: formData.description,
      photo: formData.photo || "https://via.placeholder.com/200x120.png?text=Road+Issue",
      time: "Just now",
    };

    setReports([newReport, ...reports]);
    setFormData({ location: "", contact: "", description: "", photo: "" });
  };

  return (
    <div className="p-6 flex gap-8">
      {/* Left: Form */}
      <div className="w-1/2">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Report Road Damage</h2>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md p-4 rounded-xl">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">GPS Location</label>
            <input
              type="text"
              placeholder="Enter or auto-tag GPS location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Mobile / Email *</label>
            <input
              type="text"
              placeholder="Enter mobile number or email"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Description</label>
            <textarea
              placeholder="Describe the road damage..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Upload Photo</label>
            <input
              type="text"
              placeholder="Paste image URL (for demo)"
              value={formData.photo}
              onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Submit Report
          </button>
        </form>
      </div>

      {/* Right: Live Feed */}
      <div className="w-1/2">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Recent Reports</h3>
        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {reports.map((r) => (
            <div key={r.id} className="p-4 border rounded-xl bg-white shadow-sm">
              <div className="flex gap-4">
                <img
                  src={r.photo}
                  alt="Road damage"
                  className="w-32 h-20 object-cover rounded-lg"
                />
                <div>
                  <p className="text-gray-700"><strong>Location:</strong> {r.location}</p>
                  <p className="text-gray-700"><strong>Contact:</strong> {r.contact}</p>
                  <p className="text-gray-700"><strong>Description:</strong> {r.description}</p>
                  <p className="text-sm text-gray-500"><em>{r.time}</em></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}