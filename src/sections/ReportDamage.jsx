import React, { useState } from "react";

const ReportDamage = () => {
  const [reports, setReports] = useState([]);
  const [photo, setPhoto] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReport = {
      id: reports.length + 1,
      description: e.target.description.value,
      photo,
      date: new Date().toLocaleString(),
    };
    setReports([newReport, ...reports]);
    e.target.reset();
    setPhoto(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Report Road Damage</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          name="description"
          placeholder="Describe the road damage..."
          className="w-full border rounded p-2"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))}
          className="w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Report
        </button>
      </form>

      <div className="mt-6 space-y-4">
        {reports.map((r) => (
          <div
            key={r.id}
            className="border p-3 rounded shadow bg-white flex gap-3"
          >
            {r.photo && (
              <img
                src={r.photo}
                alt="damage"
                className="w-32 h-32 object-cover rounded"
              />
            )}
            <div>
              <p className="font-semibold">{r.description}</p>
              <p className="text-gray-500 text-sm">{r.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportDamage;