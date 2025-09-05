import React, { useState } from "react";
import { addReport, getSnapshot } from "../utils/liveStore";
import { COUNTRY_META } from "../utils/liveData";

function estimateCost(severity, unresolvedHours) {
  // simple formula: base * severityFactor * hoursFactor
  const base = 1200;
  const factor = severity === "Critical" ? 3 : severity === "High" ? 2 : severity === "Medium" ? 1.2 : 0.6;
  const hoursFactor = Math.min(1 + unresolvedHours / 72, 2.5);
  return Math.round(base * factor * hoursFactor);
}

export default function ReportForm() {
  const [form, setForm] = useState({ country: "Ghana", region: "", severity: "Medium", comment: "", image: "", source: "Citizen" });
  const [preview, setPreview] = useState(null);
  const [submitted, setSubmitted] = useState(null);
  const [downloadParams, setDownloadParams] = useState({ country: "All", severity: "All" });

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setForm((f) => ({ ...f, image: url }));
  };

  const submit = (e) => {
    e.preventDefault();
    const meta = COUNTRY_META[form.country] || { region: form.region || "" };
    const newR = {
      country: form.country,
      region: form.region || meta.region || "",
      severity: form.severity,
      status: "Pending",
      source: form.source,
      comment: form.comment || "User-submitted report",
      image: form.image || meta.sampleImage,
      coords: meta.coords || [0,0],
      intensity: form.severity === "Critical" ? 0.95 : form.severity === "High" ? 0.75 : form.severity === "Medium" ? 0.45 : 0.2,
      unresolvedHours: 0,
    };
    const r = addReport(newR);
    setSubmitted(r);
    setForm({ country: "Ghana", region: "", severity: "Medium", comment: "", image: "", source: "Citizen" });
    setPreview(null);
  };

  const handleDownload = () => {
    const all = getSnapshot();
    const filtered = all.filter(r => (downloadParams.country === "All" || r.country === downloadParams.country) && (downloadParams.severity === "All" || r.severity === downloadParams.severity));
    const rows = filtered.map(r => {
      const est = estimateCost(r.severity, r.unresolvedHours || 0);
      return {
        id: r.id,
        country: r.country,
        region: r.region,
        severity: r.severity,
        status: r.status,
        timestamp: r.timestamp,
        estimatedCostUSD: est,
      };
    });
    const csv = [
      ["id","country","region","severity","status","timestamp","estimatedCostUSD"],
      ...rows.map(r => [r.id,r.country,r.region,r.severity,r.status,r.timestamp,r.estimatedCostUSD])
    ].map(a => a.map(v => `"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `translytix_reports_${downloadParams.country}_${downloadParams.severity}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">📝 Submit Report (Form)</h2>
        <form onSubmit={submit} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <select className="border p-2 rounded" value={form.country} onChange={(e)=>setForm({...form, country:e.target.value})}>
              {Object.keys(COUNTRY_META).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select className="border p-2 rounded" value={form.severity} onChange={(e)=>setForm({...form, severity:e.target.value})}>
              <option>Low</option><option>Medium</option><option>High</option><option>Critical</option>
            </select>
          </div>

          <textarea className="w-full border p-2 rounded" placeholder="Describe the issue" value={form.comment} onChange={(e)=>setForm({...form, comment: e.target.value})} />

          <div className="flex items-center gap-3">
            <input type="file" accept="image/*" onChange={handleFile} />
            {preview && <img src={preview} alt="preview" className="w-28 h-20 object-cover rounded" />}
            <button type="submit" className="ml-auto px-3 py-2 bg-green-600 text-white rounded">Submit</button>
          </div>
        </form>
        {submitted && <div className="mt-2 text-sm text-green-700">Report submitted at {submitted.timestamp}</div>}
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">📥 Download Reports (generate CSV & estimated budgets)</h3>
        <div className="flex gap-2 items-center">
          <select value={downloadParams.country} onChange={(e)=>setDownloadParams(p=>({...p, country: e.target.value}))} className="border p-2 rounded">
            <option value="All">All Countries</option>
            {Object.keys(COUNTRY_META).map(c=> <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={downloadParams.severity} onChange={(e)=>setDownloadParams(p=>({...p, severity: e.target.value}))} className="border p-2 rounded">
            <option value="All">All Severities</option>
            <option>Low</option><option>Medium</option><option>High</option><option>Critical</option>
          </select>

          <button onClick={handleDownload} className="ml-auto px-3 py-2 bg-blue-600 text-white rounded">Download CSV</button>
        </div>
        <p className="mt-2 text-sm text-gray-600">CSV includes estimated repair cost per report (USD) using severity & unresolved time heuristic.</p>
      </div>
    </div>
  );
}
