// src/sections/RoadHealth.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { subscribe, getSnapshot } from "../utils/liveStore";
import { COUNTRIES, COUNTRY_META } from "../utils/liveData";

// Custom Tooltip for extra info
function CustomTooltip({ active, payload, label, snapshot }) {
  if (active && payload && payload.length) {
    const countryData = snapshot.find((s) => s.country === label);
    return (
      <div className="bg-white p-3 rounded shadow text-sm">
        <p className="font-bold">{label}</p>
        <p>Health Index: {countryData?.healthIndex}</p>
        <p>Reports: {countryData?.reports}</p>
      </div>
    );
  }
  return null;
}

export default function RoadHealth() {
  const [stream, setStream] = useState(() => getSnapshot());
  const [latestReports, setLatestReports] = useState([]);

  // subscribe to live rolling feed
  useEffect(() => {
    return subscribe((buf) => {
      setStream(buf);
      // pick last 5 reports for ticker
      setLatestReports([...buf.slice(-5)]);
    });
  }, []);

  // compute rolling health per country
  const snapshot = useMemo(() => {
    const map = {};
    // Ensure ALL 5 countries always exist
    COUNTRIES.forEach((c) => {
      map[c] = { country: c, sum: 0, count: 0 };
    });

    stream.forEach((r) => {
      map[r.country].sum += r.intensity || 0.45;
      map[r.country].count += 1;
    });

    return Object.values(map).map((m) => {
      const avgIntensity = m.count ? m.sum / m.count : 0.35;
      const healthIndex = Math.max(
        0,
        Math.min(100, Math.round((1 - avgIntensity) * 100))
      );
      return {
        country: m.country,
        healthIndex,
        reports: m.count,
        color: COUNTRY_META[m.country]?.color || "#666",
      };
    });
  }, [stream]);

  // format data for chart
  const barData = snapshot.map((s) => ({
    name: s.country,
    health: s.healthIndex,
    color: s.color,
  }));

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-center">
        🚦 Road Health Scores — Live
      </h2>
      <p className="text-center text-gray-600">
        This chart updates in real time as new citizen road reports arrive.
      </p>

      {/* Chart */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div style={{ width: "100%", height: 360 }}>
          <ResponsiveContainer>
            <BarChart
              data={barData}
              margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip content={<CustomTooltip snapshot={snapshot} />} />
              <Bar
                dataKey="health"
                animationDuration={800}
                radius={[10, 10, 0, 0]}
              >
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Live ticker feed */}
      <div className="bg-black text-white py-2 px-4 rounded-lg overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          {latestReports.map((r, i) => (
            <span key={i} className="mx-6 text-sm">
              📍 {r.country} — Severity:{" "}
              <span className="font-semibold">{r.intensity.toFixed(2)}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Country cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {snapshot.map((s) => (
          <div
            key={s.country}
            className="bg-white p-4 rounded-xl shadow flex items-center justify-between"
          >
            <div>
              <div className="flex items-center gap-3">
                <span
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 6,
                    background: s.color,
                  }}
                />
                <div>
                  <div className="font-semibold">{s.country}</div>
                  <div className="text-sm text-gray-500">
                    {s.reports} reports (rolling)
                  </div>
                </div>
              </div>
            </div>
            <div
              className="text-2xl font-bold"
              style={{
                color:
                  s.healthIndex > 70
                    ? "#16a34a"
                    : s.healthIndex > 50
                    ? "#f59e0b"
                    : "#ef4444",
              }}
            >
              {s.healthIndex}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
