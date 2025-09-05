// src/pages/ReportDamage.jsx
import { useState } from "react";

export default function ReportDamage() {
  const [file, setFile] = useState(null);
  const [reports, setReports] = useState([
    { id: 1, country: "Ghana", location: "Accra - Ring Road", severity: "High", photo: "/demo/road1.jpg" },
    { id: 2, country: "Kenya", location: "Nairobi - Thika Rd", severity: "Medium", photo: "/demo/road2.jpg" },
  ]);

  const handleUpload = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Report Road Damage</h1>

      <form className="bg-white p-6 rounded-xl shadow mb-8">
        <label className="block mb-2 font-semibold">Upload Photo</label>
        <input type="file" accept="image/*" onChange={handleUpload} className="mb-4" />
        {file && <img src={file} alt="preview" className="w-64 h-40 object-cover rounded mb-4" />}

        <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Submit Report
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Recent Reports</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {reports.map((r) => (
          <div key={r.id} className="bg-white p-4 rounded shadow">
            <img src={r.photo} alt="road" className="w-full h-40 object-cover rounded mb-2" />
            <p className="font-semibold">{r.country} – {r.location}</p>
            <p className="text-sm text-red-600">Severity: {r.severity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}