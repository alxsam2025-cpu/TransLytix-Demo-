import { useState } from "react";
import { Menu, X } from "lucide-react"; // hamburger + close icons

export default function Sidebar({ activeSection, setActiveSection }) {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { id: "liveDemo", label: "📊 Live Demo" },
    { id: "mapView", label: "🗺️ Map View" },
    { id: "roadHealth", label: "💚 Road Health Scores" },
    { id: "reports", label: "📑 Road Damage Report" },
    { id: "reportForm", label: "📝 Report Road Damage" },
    { id: "predictive", label: "📈 Predictive Analysis" },
    { id: "support", label: "🤝 Support" },
  ];

  return (
    <div>
      {/* Mobile top bar with hamburger */}
      <div className="md:hidden flex items-center justify-between bg-gray-900 text-white p-4 shadow-md">
        <h1 className="text-lg font-bold sm:text-xl">🚦 TransLytix</h1>
        <button onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu size={28} />
        </button>
      </div>

      {/* Sidebar for desktop + sliding drawer for mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-6 space-y-6 transform transition-transform duration-300 ease-in-out z-50
          ${open ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:relative md:block`}
      >
        {/* Header */}
        <div className="flex items-center justify-between md:block">
          <h1 className="text-xl md:text-2xl font-bold mb-8">🚦 TransLytix</h1>
          {/* Close button (mobile only) */}
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
        </div>

        {/* Menu */}
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setOpen(false); // close sidebar on mobile click
              }}
              className={`cursor-pointer px-3 py-2 rounded-lg text-sm sm:text-base transition-colors
                ${
                  activeSection === item.id
                    ? "bg-green-600 text-white font-semibold"
                    : "hover:bg-gray-700"
                }`}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Background overlay when sidebar is open on mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}
