// src/utils/downloadCSV.js
export function downloadCSV(filename, rows) {
  const processRow = (row) =>
    row.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(",");
  const csv = [Object.keys(rows[0]).join(",")].concat(
    rows.map((row) => processRow(Object.values(row)))
  ).join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}