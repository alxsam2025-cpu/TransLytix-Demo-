// src/pages/Home.jsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 px-8 py-12">
      <div className="max-w-6xl text-left">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          ROAD INTELLIGENCE IN REAL TIME
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          <Link to="/report-damage" className="p-6 bg-white shadow rounded-xl hover:shadow-md transition">
            <h2 className="font-semibold text-lg">Report Damage</h2>
            <p className="text-sm text-gray-600">Submit road issues with photo uploads and details.</p>
          </Link>

          <Link to="/map-view" className="p-6 bg-white shadow rounded-xl hover:shadow-md transition">
            <h2 className="font-semibold text-lg">Map View</h2>
            <p className="text-sm text-gray-600">Interactive live map for road conditions across countries.</p>
          </Link>

          <Link to="/road-damage-report" className="p-6 bg-white shadow rounded-xl hover:shadow-md transition">
            <h2 className="font-semibold text-lg">Road Damage Report</h2>
            <p className="text-sm text-gray-600">View organized reports from live submissions.</p>
          </Link>

          <Link to="/road-health-scores" className="p-6 bg-white shadow rounded-xl hover:shadow-md transition">
            <h2 className="font-semibold text-lg">Road Health Scores</h2>
            <p className="text-sm text-gray-600">Heatmap of road impact on citizens & economy.</p>
          </Link>

          <Link to="/predictive-analysis" className="p-6 bg-white shadow rounded-xl hover:shadow-md transition">
            <h2 className="font-semibold text-lg">Predictive Analysis</h2>
            <p className="text-sm text-gray-600">Live metrics, alerts & forecasts for Africa’s roads.</p>
          </Link>

          <Link to="/support" className="p-6 bg-white shadow rounded-xl hover:shadow-md transition">
            <h2 className="font-semibold text-lg">Support</h2>
            <p className="text-sm text-gray-600">Get help, FAQs & contact our team.</p>
          </Link>

          <Link to="/our-solution" className="p-6 bg-white shadow rounded-xl hover:shadow-md transition col-span-full">
            <h2 className="font-semibold text-lg">Our Solution</h2>
            <p className="text-sm text-gray-600">
              Empowering citizens & governments with real-time road intelligence.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}