import React from "react";

const Sidebar = () => {
  return (
    <div className="w-60 h-screen bg-gray-800 text-white p-5 sticky top-0">
      <h2 className="text-lg font-bold mb-6">TransLytix</h2>
      <ul className="space-y-4">
        <li><a href="#home" className="hover:text-blue-400">Home</a></li>
        <li><a href="#demo" className="hover:text-blue-400">Live Demo</a></li>
        <li><a href="#map" className="hover:text-blue-400">Map View</a></li>
        <li><a href="#health" className="hover:text-blue-400">Road Health Scores</a></li>
        <li><a href="#reports" className="hover:text-blue-400">Damage Reports</a></li>
        <li><a href="#analysis" className="hover:text-blue-400">Predictive Analysis</a></li>
        <li><a href="#support" className="hover:text-blue-400">Support</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;