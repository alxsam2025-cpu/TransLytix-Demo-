// src/sections/RoadHealthScores.jsx
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function RoadHealthScores() {
  const initialScores = [
    {
      country: "Ghana",
      healthIndex: 62,
      citizenImpact: "Moderate increase in road accidents",
      economicImpact: "Delays in goods transport affecting trade",
    },
    {
      country: "Nigeria",
      healthIndex: 48,
      citizenImpact: "High number of reported accidents in Lagos",
      economicImpact: "Severe congestion impacting business logistics",
    },
    {
      country: "Kenya",
      healthIndex: 75,
      citizenImpact: "Improved safety on Nairobi highways",
      economicImpact: "Better movement of agricultural produce",
    },
    {
      country: "Sudan",
      healthIndex: 54,
      citizenImpact: "Unsafe rural roads affecting healthcare access",
      economicImpact: "Hindrance in regional market connectivity",
    },
    {
      country: "Zimbabwe",
      healthIndex: 68,
      citizenImpact: "Reduced pothole-related vehicle damage",
      economicImpact: "Lower maintenance costs for transporters",
    },
  ];

  const [scores, setScores] = useState(initialScores);
  const [reports, setReports] = useState([]);

  // 🔄 Live updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setScores((prevScores) => {
        const updated = prevScores.map((item) => {
          let change = Math.floor(Math.random() * 7) - 3; // -3 to +3
          let newHealth = Math.max(30, Math.min(95, item.healthIndex + change));
          return { ...item, healthIndex: newHealth };
        });

        // Pick a random country to log a new "citizen report"
        const randomCountry =
          updated[Math.floor(Math.random() * updated.length)];
        setReports((prev) => [
          {
            time: new Date().toLocaleTimeString(),
            message: `New citizen report received from ${randomCountry.country}. Health Index now ${randomCountry.healthIndex}.`,
          },
          ...prev.slice(0, 4), // keep only latest 5 reports
        ]);

        return updated;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
        🚦 Road Health Scores (Live)
      </h2>
      <p className="text-gray-600 mb-5 text-sm sm:text-base">
        Explore how road conditions impact citizens’ safety and economic
        growth. The chart updates in real-time as new reports arrive.
      </p>

      {/* 📊 Chart Section */}
      <div className="w-full h-64 sm:h-80 mb-6 bg-white shadow-lg rounded-xl p-3 sm:p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={scores}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="country" tick={{ fontSize: 12 }} interval={0} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                fontSize: "12px",
                borderRadius: "8px",
              }}
            />
            <Bar
              dataKey="healthIndex"
              fill="#16a34a"
              animationDuration={800}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 📋 Table Section */}
      <div className="overflow-x-auto rounded-lg shadow-md mb-6">
        <table className="w-full text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-3 sm:px-4 py-2 text-left">Country</th>
              <th className="px-3 sm:px-4 py-2 text-left">
                Health Index (0-100)
              </th>
              <th className="px-3 sm:px-4 py-2 text-left hidden sm:table-cell">
                Citizen Impact
              </th>
              <th className="px-3 sm:px-4 py-2 text-left hidden sm:table-cell">
                Economic Impact
              </th>
            </tr>
          </thead>
          <tbody>
            {scores.map((item, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="px-3 sm:px-4 py-2 font-semibold">
                  {item.country}
                </td>
                <td
                  className={`px-3 sm:px-4 py-2 font-bold rounded-md ${
                    item.healthIndex < 50
                      ? "bg-red-200 text-red-700"
                      : item.healthIndex < 70
                      ? "bg-yellow-200 text-yellow-700"
                      : "bg-green-200 text-green-700"
                  }`}
                >
                  {item.healthIndex}
                </td>

                {/* ✅ On mobile, impacts show stacked below */}
                <td className="px-3 sm:px-4 py-2 hidden sm:table-cell">
                  {item.citizenImpact}
                </td>
                <td className="px-3 sm:px-4 py-2 hidden sm:table-cell">
                  {item.economicImpact}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Mobile-only Impact Cards */}
      <div className="sm:hidden mt-4 space-y-3 mb-6">
        {scores.map((item, i) => (
          <div
            key={i}
            className="p-3 bg-white rounded-lg shadow-sm border"
          >
            <p className="font-semibold">{item.country}</p>
            <p className="text-xs text-gray-500">
              Health Index:{" "}
              <span
                className={`font-bold ${
                  item.healthIndex < 50
                    ? "text-red-600"
                    : item.healthIndex < 70
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {item.healthIndex}
              </span>
            </p>
            <p className="text-xs mt-1">👥 {item.citizenImpact}</p>
            <p className="text-xs">💼 {item.economicImpact}</p>
          </div>
        ))}
      </div>

      {/* 📰 Live Reports Feed */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
        <h3 className="font-bold mb-2">📢 Latest Citizen Reports</h3>
        {reports.length === 0 ? (
          <p className="text-gray-500 text-sm">
            Waiting for first report...
          </p>
        ) : (
          <ul className="space-y-2 text-sm">
            {reports.map((r, idx) => (
              <li key={idx} className="border-b pb-1">
                <span className="text-gray-500">[{r.time}]</span> {r.message}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
