// src/sections/RecentReports.jsx
import React, { useEffect, useState } from "react";
import { generateLiveBatch } from "../utils/liveData";

export default function RecentReports() {
  const [feed, setFeed] = useState(generateLiveBatch(5));

  useEffect(() => {
    const t = setInterval(() => {
      setFeed((prev) => [generateLiveBatch(1)[0], ...prev].slice(0, 12));
    }, 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="space-y-3">
      {feed.map((r) => (
        <div key={r.id} className="bg-white rounded-xl shadow flex gap-3 p-3">
          <img src={r.image} alt="road" className="w-28 h-20 object-cover rounded" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded" style={{ background: r.color }} />
              <div className="font-semibold">{r.country} · {r.region}</div>
              <span className={`ml-auto text-xs px-2 py-0.5 rounded
                ${r.severity==="Critical"?"bg-red-100 text-red-700":
                  r.severity==="High"?"bg-orange-100 text-orange-700":
                  r.severity==="Medium"?"bg-yellow-100 text-yellow-700":
                  "bg-green-100 text-green-700"}`}>
                {r.severity}
              </span>
            </div>
            <div className="text-sm text-gray-700 mt-0.5">{r.comment}</div>
            <div className="text-xs text-gray-500">{r.timestamp} · {r.source} · {r.status}</div>
          </div>
        </div>
      ))}
    </div>
  );
}