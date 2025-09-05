import React, { useEffect, useMemo, useState } from "react";
import { subscribe, getSnapshot } from "../utils/liveStore";
import { COUNTRIES } from "../utils/liveData";

const SEVERITIES = ["All", "Low", "Medium", "High", "Critical"];

export default function Reports() {
  const [stream, setStream] = useState(() => getSnapshot());
  const [filter, setFilter] = useState("All");
  const [countryFilter, setCountryFilter] = useState("All");
  const [query, setQuery] = useState("");

  useEffect(() => subscribe((buf) => setStream(buf)), []);

  const totals = useMemo(() => {
    const acc = { total: stream.length, Low:0, Medium:0, High:0, Critical:0 };
    stream.forEach((r) => acc[r.severity] ? acc[r.severity]++ : null);
    return acc;
  }, [stream]);

  const filtered = useMemo(() => {
    return stream.filter(r => {
      if (filter !== "All" && r.severity !== filter) return false;
      if (countryFilter !== "All" && r.country !== countryFilter) return false;
      if (query && !(`${r.country} ${r.region} ${r.comment}`.toLowerCase().includes(query.toLowerCase()))) return false;
      return true;
    }).slice(0, 300);
  }, [stream, filter, countryFilter, query]);

  // summary live score per severity
  const summaryScores = useMemo(() => {
    const byCountry = {};
    COUNTRIES.forEach(c => byCountry[c] = { Low:0, Medium:0, High:0, Critical:0, total:0 });
    stream.forEach(r => {
      if (!byCountry[r.country]) byCountry[r.country] = { Low:0, Medium:0, High:0, Critical:0, total:0 };
      byCountry[r.country][r.severity] = (byCountry[r.country][r.severity]||0) + 1;
      byCountry[r.country].total++;
    });
    return byCountry;
  }, [stream]);

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">📑 Road Damage Reports</h2>
        <div className="text-sm text-gray-600">
          Total: <b>{totals.total}</b> — Critical: <b className="text-red-600">{totals.Critical}</b>
        </div>
      </div>

      <div className="bg-white rounded shadow p-4">
        <div className="flex gap-3 flex-wrap">
          {SEVERITIES.map(s => (
            <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1 rounded ${filter===s ? "bg-green-600 text-white" : "bg-gray-200"}`}>{s}</button>
          ))}
          <select value={countryFilter} onChange={(e)=>setCountryFilter(e.target.value)} className="ml-3 border px-2 py-1 rounded">
            <option value="All">All countries</option>
            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input placeholder="Search country/region/comment" value={query} onChange={(e)=>setQuery(e.target.value)} className="ml-auto border px-3 py-1 rounded w-64" />
        </div>
      </div>

      {/* Summary per country */}
      <div className="grid md:grid-cols-2 gap-4">
        {Object.entries(summaryScores).map(([country, stats]) => (
          <div key={country} className="bg-white rounded shadow p-3">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{country}</div>
              <div className="text-sm text-gray-500">{stats.total} reports</div>
            </div>
            <div className="mt-2 text-sm flex gap-2">
              <div className="px-2 py-1 bg-green-50 rounded">Low: {stats.Low}</div>
              <div className="px-2 py-1 bg-yellow-50 rounded">Medium: {stats.Medium}</div>
              <div className="px-2 py-1 bg-orange-50 rounded">High: {stats.High}</div>
              <div className="px-2 py-1 bg-red-50 rounded">Critical: {stats.Critical}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Report cards (compact) */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(r => (
          <div key={r.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="flex gap-3 p-3">
              <img src={r.image} alt="road" className="w-20 h-14 object-cover rounded-sm" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-sm">{r.country} · {r.region}</div>
                  <div className={`text-xs px-2 py-0.5 rounded-full ${r.severity==="Critical"?"bg-red-100 text-red-700":r.severity==="High"?"bg-orange-100 text-orange-700":r.severity==="Medium"?"bg-yellow-100 text-yellow-700":"bg-green-100 text-green-700"}`}>{r.severity}</div>
                </div>
                <div className="text-xs text-gray-500">{r.timestamp} · {r.source}</div>
                <p className="mt-2 text-sm text-gray-700">{r.comment}</p>
                <div className="mt-2 text-xs text-gray-600 flex gap-2">
                  <div className="bg-gray-50 rounded p-1">Status: {r.status}</div>
                  <div className="bg-gray-50 rounded p-1">Reports: {r.reports}</div>
                  <div className="bg-gray-50 rounded p-1">Unresolved: {r.unresolvedHours ?? 0} hrs</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
