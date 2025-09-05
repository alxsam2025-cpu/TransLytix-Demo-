import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart2,
  Map,
  HeartPulse,
  FileText,
  Edit3,
  TrendingUp,
  HelpCircle,
  Menu,
  X,
  Lightbulb,
} from "lucide-react";

import OurSolution from "./sections/OurSolution";
import LiveDemo from "./sections/LiveDemo";
import MapView from "./sections/MapView";
import RoadHealth from "./sections/RoadHealth";
import Reports from "./sections/Reports";
import ReportForm from "./sections/ReportForm";
import PredictiveAnalysis from "./sections/PredictiveAnalysis";
import Support from "./sections/Support";

export default function App() {
  const [activeSection, setActiveSection] = useState("ourSolution");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: "ourSolution", label: "Our Solution", icon: Lightbulb },
    { id: "liveDemo", label: "Live Demo", icon: BarChart2 },
    { id: "mapView", label: "Map View", icon: Map },
    { id: "roadHealth", label: "Road Health", icon: HeartPulse },
    { id: "reports", label: "Damage Reports", icon: FileText },
    { id: "reportForm", label: "Report Damage", icon: Edit3 },
    { id: "predictive", label: "Predictive Analysis", icon: TrendingUp },
    { id: "support", label: "Support", icon: HelpCircle },
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
            className="fixed md:static top-0 left-0 h-full w-72 
                       bg-gradient-to-b from-green-900 via-brown-700 to-black 
                       text-white shadow-2xl flex flex-col z-40 relative"
          >
            {/* Logo */}
            <div className="px-6 py-6 border-b border-green-600 flex items-center justify-between relative z-10">
              <h1 className="text-3xl font-extrabold tracking-wide">
                <span className="text-green-300">Trans</span>
                <span className="text-brown-200">Lytix</span>
              </h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="md:hidden p-1 rounded-lg hover:bg-green-800"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-3 overflow-y-auto relative z-10">
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
                  <motion.div
                    animate={
                      activeSection === id ? { rotate: [0, 360] } : { rotate: 0 }
                    }
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                  <span>{label}</span>
                </motion.button>
              ))}
            </nav>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-green-600 text-sm text-green-200 relative z-10">
              © 2025 TransLytix
            </div>

            {/* Vertical Divider - static glowing effect */}
            <div className="hidden md:block absolute top-0 right-0 h-full w-1 
                            bg-gradient-to-b from-green-400 via-brown-500 to-black" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto flex items-center justify-center md:pl-72">
        <div className="w-full max-w-6xl mx-auto px-6">
          <AnimatePresence mode="wait">
            {[
              { id: "ourSolution", Component: OurSolution },
              { id: "liveDemo", Component: LiveDemo },
              { id: "mapView", Component: MapView },
              { id: "roadHealth", Component: RoadHealth },
              { id: "reports", Component: Reports },
              { id: "reportForm", Component: ReportForm },
              { id: "predictive", Component: PredictiveAnalysis },
              { id: "support", Component: Support },
            ].map(
              ({ id, Component }) =>
                activeSection === id && (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -25 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl shadow-xl p-10 relative
                               border-4 border-transparent 
                               bg-clip-padding 
                               before:absolute before:inset-0 before:rounded-2xl before:p-[2px] 
                               before:bg-gradient-to-r before:from-green-600 before:via-brown-600 before:to-black 
                               before:opacity-60 before:blur-md before:-z-10"
                  >
                    <Component />
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}



