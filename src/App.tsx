import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lightbulb, 
  Menu, 
  X, 
  Play, 
  Map, 
  BarChart3, 
  FileText, 
  TrendingUp 
} from "lucide-react";
import OurSolution from "./sections/OurSolution";
import LiveDemo from "./sections/LiveDemo";
import MapViewSection from "./sections/MapViewSection";
import RoadHealthScore from "./sections/RoadHealthScore";
import DamageReport from "./sections/DamageReport";
import PredictiveAnalysis from "./sections/PredictiveAnalysis";

export default function App() {
  const [activeSection, setActiveSection] = useState("ourSolution");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: "ourSolution", label: "Our Solution", icon: Lightbulb },
    { id: "liveDemo", label: "Live Demo", icon: Play },
    { id: "mapView", label: "Map View", icon: Map },
    { id: "roadHealthScore", label: "Road Health Score", icon: BarChart3 },
    { id: "damageReport", label: "Damage Report", icon: FileText },
    { id: "predictiveAnalysis", label: "Predictive Analysis", icon: TrendingUp },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Mobile toggle button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-4 left-4 z-50 p-2 bg-green-700 text-white rounded-lg shadow-lg md:hidden"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            key="sidebar"
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="fixed md:static top-0 left-0 h-full w-72 bg-gradient-to-b from-green-900 via-brown-700 to-black text-white shadow-2xl flex flex-col z-40 relative"
          >
            <div className="px-6 py-6 border-b border-green-600 flex items-center justify-between">
              <h1 className="text-3xl font-extrabold tracking-wide">
                <span className="text-green-300">ROAD PULSE</span>
                <span className="text-brown-200"> GHANA</span>
              </h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="md:hidden p-1 rounded-lg hover:bg-green-800"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-3 overflow-y-auto">
              {menuItems.map(({ id, label, icon: Icon }) => (
                <motion.button
                  key={id}
                  onClick={() => {
                    setActiveSection(id);
                    if (window.innerWidth < 768) setSidebarOpen(false);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all duration-300 shadow-md ${
                    activeSection === id
                      ? "bg-green-500 text-black font-semibold shadow-lg ring-2 ring-white ring-opacity-60"
                      : "hover:bg-green-800"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 p-3 md:p-6 overflow-y-auto flex items-center justify-center md:pl-0">
        <div className="w-full max-w-6xl mx-auto px-2 md:px-6">
          <AnimatePresence mode="wait">
            {activeSection === "ourSolution" && (
              <motion.div
                key="ourSolution"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl p-6 md:p-10"
              >
                <OurSolution />
              </motion.div>
            )}
            {activeSection === "liveDemo" && (
              <motion.div
                key="liveDemo"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <LiveDemo />
              </motion.div>
            )}
            {activeSection === "mapView" && (
              <motion.div
                key="mapView"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl p-4 md:p-6"
              >
                <MapViewSection />
              </motion.div>
            )}
            {activeSection === "roadHealthScore" && (
              <motion.div
                key="roadHealthScore"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl p-4 md:p-6"
              >
                <RoadHealthScore />
              </motion.div>
            )}
            {activeSection === "damageReport" && (
              <motion.div
                key="damageReport"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl p-4 md:p-6"
              >
                <DamageReport />
              </motion.div>
            )}
            {activeSection === "predictiveAnalysis" && (
              <motion.div
                key="predictiveAnalysis"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl p-4 md:p-6"
              >
                <PredictiveAnalysis />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}


