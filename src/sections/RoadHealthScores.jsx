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

  // Simulate live updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setScores((prevScores) =>
        prevScores.map((item) => {
          let change = Math.floor(Math.random() * 7) - 3; // -3 to +3 random shift
          let newHealth = Math.max(30, Math.min(95, item.healthIndex + change));
          return { ...item, healthIndex: newHealth };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        🚦 Road Health Scores (Live)
      </h2>
      <p className="text-gray-600 mb-6">
        Explore how road conditions impact citizens’ safety and economic growth.
        The chart below updates in real-time to reflect rolling reports.
      </p>

      {/* Chart Section */}
      <div className="w-full h-80 mb-8 bg-white shadow-lg rounded-xl p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={scores}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="country" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar
              dataKey="healthIndex"
              fill="#16a34a"
              animationDuration={800}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white text-left">
              <th className="px-4 py-2">Country</th>
              <th className="px-4 py-2">Health Index (0-100)</th>
              <th className="px-4 py-2">Citizen Impact</th>
              <th className="px-4 py-2">Economic Impact</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((item, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="px-4 py-2 font-semibold">{item.country}</td>
                <td
                  className={`px-4 py-2 font-bold ${
                    item.healthIndex < 50
                      ? "bg-red-200 text-red-700"
                      : item.healthIndex < 70
                      ? "bg-yellow-200 text-yellow-700"
                      : "bg-green-200 text-green-700"
                  }`}
                >
                  {item.healthIndex}
                </td>
                <td className="px-4 py-2">{item.citizenImpact}</td>
                <td className="px-4 py-2">{item.economicImpact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
