import { useState, useEffect } from "react";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  // Track window size for sidebar responsiveness
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <div className="flex min-h-screen bg-gray-100 relative overflow-hidden">
      {/* Mobile toggle button */}
      {!isDesktop && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-4 left-4 z-50 p-2 bg-green-700 text-white rounded-lg shadow-md"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      )}

      {/* Sidebar with animations */}
      <AnimatePresence>
        {(sidebarOpen || isDesktop) && (
          <motion.div
            key="sidebar"
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className={`fixed md:static top-0 left-0 h-full w-64 
                       bg-gradient-to-b from-green-900 via-green-800 to-black 
                       text-white shadow-2xl flex flex-col z-40`}
          >
            {/* Logo */}
            <div className="px-5 py-5 border-b border-green-700 flex items-center justify-between">
              <h1 className="text-2xl font-extrabold tracking-wide">
                <span className="text-green-300">Trans</span>
                <span className="text-gray-300">Lytix</span>
              </h1>
              {!isDesktop && (
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 rounded-lg hover:bg-green-800"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-5 space-y-2 overflow-y-auto">
              {menuItems.map(({ id, label, icon: Icon }) => (
                <motion.button
                  key={id}
                  onClick={() => {
                    setActiveSection(id);
                    if (!isDesktop) setSidebarOpen(false);
                  }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg transition-all duration-300 text-sm sm:text-base 
                    ${
                      activeSection === id
                        ? "bg-green-500 text-black font-semibold shadow-md ring-1 ring-white"
                        : "hover:bg-green-800"
                    }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{label}</span>
                </motion.button>
              ))}
            </nav>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-green-700 text-xs sm:text-sm text-green-200">
              © 2025 TransLytix
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay when sidebar is open on mobile */}
      {sidebarOpen && !isDesktop && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div
        className={`flex-1 p-3 sm:p-5 md:p-8 overflow-y-auto transition-all duration-300 
          ${isDesktop ? "md:ml-64" : ""}`}
      >
        <div className="w-full max-w-5xl mx-auto">
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg 
                               p-4 sm:p-6 md:p-8 relative text-sm sm:text-base md:text-lg leading-relaxed
                               border border-gray-200"
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
