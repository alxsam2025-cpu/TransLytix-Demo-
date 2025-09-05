// src/sections/RoadDamageReport.jsx
import React from "react";

export default function RoadDamageReport() {
  const reports = [
    {
      id: 1,
      country: "Ghana",
      region: "Accra",
      severity: "High",
      status: "Pending Repair",
      source: "Citizen Report",
      details: "Potholes along Spintex Road causing traffic delays.",
      date: "2025-09-01",
      image:
        "https://images.unsplash.com/photo-1605379399642-870262d3d6a5?ixlib=rb-4.0.3&q=80&w=600&auto=format&fit=crop", // potholes
    },
    {
      id: 2,
      country: "Nigeria",
      region: "Lagos",
      severity: "Critical",
      status: "In Progress",
      source: "Government Survey",
      details:
        "Severe flooding washed away road sections near Lekki Expressway.",
      date: "2025-09-02",
      image:
        "https://images.unsplash.com/photo-1617033809046-ef9c7ff7f6ed?ixlib=rb-4.0.3&q=80&w=600&auto=format&fit=crop", // washed away road
    },
    {
      id: 3,
      country: "Kenya",
      region: "Nairobi",
      severity: "Medium",
      status: "Under Review",
      source: "NGO Report",
      details:
        "Cracks forming along Mombasa Road, potential hazard if ignored.",
      date: "2025-08-29",
      image:
        "https://images.unsplash.com/photo-1581092160607-4c4b66a17d44?ixlib=rb-4.0.3&q=80&w=600&auto=format&fit=crop", // cracked asphalt
    },
    {
      id: 4,
      country: "Sudan",
      region: "Khartoum",
      severity: "High",
      status: "Pending Repair",
      source: "Citizen Report",
      details: "Worn-out asphalt on main city highway, frequent accidents.",
      date: "2025-08-31",
      image:
        "https://images.unsplash.com/photo-1581090700227-4c9bfcfb7b2b?ixlib=rb-4.0.3&q=80&w=600&auto=format&fit=crop", // eroded highway
    },
    {
      id: 5,
      country: "Zimbabwe",
      region: "Harare",
      severity: "Low",
      status: "Repaired",
      source: "Government Survey",
      details:
        "Minor potholes in residential areas fixed by city authorities.",
      date: "2025-08-25",
      image:
        "https://images.unsplash.com/photo-1526404968743-f1d6df46fa3d?ixlib=rb-4.0.3&q=80&w=600&auto=format&fit=crop", // small potholes
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Road Damage Reports
      </h2>
      <p className="text-gray-600 mb-6">
        Explore professional reports collected from citizens, government
        agencies, and NGOs.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white text-left">
              <th className="px-4 py-2">Photo</th>
              <th className="px-4 py-2">Country</th>
              <th className="px-4 py-2">Region</th>
              <th className="px-4 py-2">Severity</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Source</th>
              <th className="px-4 py-2">Details</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr
                key={report.id}
                className="border-b hover:bg-gray-100 transition"
              >
                {/* Image column */}
                <td className="px-4 py-2">
                  <img
                    src={report.image}
                    alt={`${report.country} road damage`}
                    className="w-24 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 font-semibold">{report.country}</td>
                <td className="px-4 py-2">{report.region}</td>
                <td
                  className={`px-4 py-2 font-bold ${
                    report.severity === "Critical"
                      ? "text-red-600"
                      : report.severity === "High"
                      ? "text-orange-500"
                      : "text-green-600"
                  }`}
                >
                  {report.severity}
                </td>
                <td className="px-4 py-2">{report.status}</td>
                <td className="px-4 py-2">{report.source}</td>
                <td className="px-4 py-2">{report.details}</td>
                <td className="px-4 py-2">{report.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
