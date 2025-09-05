import React, { useEffect, useMemo, useState } from "react";
import { subscribe, getSnapshot } from "../utils/liveStore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { COUNTRIES, COUNTRY_META } from "../utils/liveData";

export default function PredictiveAnalysis() {
  const [stream, setStream] = useState(() => getSnapshot());
  const [kpi, setKpi] = useState({
    total: 230,
    critical: 45,
    inProgress: 67,
    alerts: 12,
  });
  const [trend, setTrend] = useState([]);

  useEffect(() => {
    const unsub = subscribe((buf) => setStream(buf));
    const t = setInterval(() => {
      setKpi((prev) => ({
        total: prev.total + Math.floor(Math.random() * 4),
        critical: prev.critical + (Math.random() > 0.8 ? 1 : 0),
        inProgress: prev.inProgress + (Math.random() > 0.6 ? 1 : 0),
        alerts: prev.alerts + (Math.random() > 0.9 ? 1 : 0),
      }));
      setTrend((prev) => {
        const pt = {
          name: new Date().toLocaleTimeString(),
          total:
            (prev.length ? prev[prev.length - 1].total : kpi.total) +
            Math.floor(Math.random() * 4),
        };
        return [...prev.slice(-18), pt];
      });
    }, 2500);
    return () => {
      unsub();
      clearInterval(t);
    };
  }, []);

  const avgHealth = useMemo(() => {
    if (!stream.length) return 80;
    const map = {};
    stream.forEach((r) => {
      map[r.country] = map[r.country] || { sum: 0, n: 0 };
      map[r.country].sum += r.intensity || 0.45;
      map[r.country].n++;
    });
    const vals = Object.values(map).map((m) =>
      Math.round((1 - m.sum / m.n) * 100)
    );
    return vals.length
      ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length)
      : 80;
  }, [stream]);

  const latest = stream.slice(0, 6);

  const perCountry = useMemo(() => {
    const map = {};
    COUNTRIES.forEach((c) => (map[c] = { sum: 0, n: 0 }));
    stream.forEach((r) => {
      map[r.country] = map[r.country] || { sum: 0, n: 0 };
      map[r.country].sum += r.intensity || 0.45;
      map[r.country].n++;
    });
    return Object.keys(map).map((k) => {
      const m = map[k];
      const val = m.n ? Math.round((1 - m.sum / m.n) * 100) : 80;
      return {
        country: k,
        health: val,
        color: COUNTRY_META[k]?.color || "#666",
      };
    });
  }, [stream]);

  // Severity distribution for donut chart
  const severityData = [
    { name: "Critical", value: kpi.critical, color: "#dc2626" },
    { name: "In Progress", value: kpi.inProgress, color: "#2563eb" },
    { name: "Alerts", value: kpi.alerts, color: "#9333ea" },
    { name: "Resolved", value: kpi.total - (kpi.critical + kpi.inProgress + kpi.alerts), color: "#16a34a" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-4 p-4">
      <h2 className="text-xl sm:text-2xl font-bold text-center">
        🔮 Predictive Analysis — Live Insights
      </h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3 rounded shadow text-center">
          <div className="text-xs sm:text-sm text-gray-500">Total Reports</div>
          <div className="text-lg sm:text-2xl font-bold">{kpi.total}</div>
        </div>
        <div className="bg-white p-3 rounded shadow text-center">
          <div className="text-xs sm:text-sm text-gray-500">Critical</div>
          <div className="text-lg sm:text-2xl font-bold text-red-600">
            {kpi.critical}
          </div>
        </div>
        <div className="bg-white p-3 rounded shadow text-center">
          <div className="text-xs sm:text-sm text-gray-500">In Progress</div>
          <div className="text-lg sm:text-2xl font-bold text-blue-600">
            {kpi.inProgress}
          </div>
        </div>
        <div className="bg-white p-3 rounded shadow text-center">
          <div className="text-xs sm:text-sm text-gray-500">Predictive Alerts</div>
          <div className="text-lg sm:text-2xl font-bold text-purple-600">
            {kpi.alerts}
          </div>
        </div>
      </div>

      {/* Avg Health Index */}
      <div className="bg-white p-3 rounded shadow flex items-center justify-between">
        <div className="text-sm sm:text-base">Avg Health Index</div>
        <div
          className={`text-lg sm:text-xl font-bold ${
            avgHealth > 70
              ? "text-green-600"
              : avgHealth > 50
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >
          {avgHealth}/100
        </div>
      </div>

      {/* Trend + Per-country + Donut */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-3 rounded shadow">
          <h4 className="font-semibold mb-2 text-sm sm:text-base">
            Reports Trend
          </h4>
          <div className="h-40 sm:h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" hide />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#16a34a"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-3 rounded shadow">
          <h4 className="font-semibold mb-2 text-sm sm:text-base">
            Health by Country
          </h4>
          <div className="grid gap-2 text-sm">
            {perCountry.map((p) => (
              <div
                key={p.country}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: p.color,
                    }}
                  />
                  <div>{p.country}</div>
                </div>
                <div
                  className={`font-semibold ${
                    p.health > 70
                      ? "text-green-600"
                      : p.health > 50
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {p.health}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-3 rounded shadow">
          <h4 className="font-semibold mb-2 text-sm sm:text-base">
            Severity Distribution
          </h4>
          <div className="h-40 sm:h-52 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityData}
                  innerRadius={30}
                  outerRadius={60}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-2 text-xs sm:text-sm">
            {severityData.map((s) => (
              <div key={s.name} className="flex items-center gap-1">
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: s.color,
                  }}
                />
                {s.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Reports */}
      <div className="bg-white p-3 rounded shadow">
        <h4 className="font-semibold mb-2 text-sm sm:text-base">
          Live Latest Reports
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {latest.map((r) => (
            <div
              key={r.id}
              className="border rounded overflow-hidden bg-gray-50"
            >
              <img
                src={r.image}
                alt=""
                className="w-full h-20 sm:h-24 object-cover"
              />
              <div className="p-1.5 sm:p-2 text-xs sm:text-sm">
                <div className="font-medium truncate">
                  {r.country} · {r.region}
                </div>
                <div className="text-gray-500 truncate">
                  {r.severity} • {r.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}