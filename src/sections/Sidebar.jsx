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
      <div className="md:hidden flex items-center justify-between bg-gradient-to-r from-green-800 via-green-700 to-green-900 text-white p-4 shadow-md">
        <img
          src="/logo.png"
          alt="TransLytix Logo"
          className="w-28 h-auto object-contain"
        />
        <button onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu size={28} />
        </button>
      </div>

      {/* Sidebar for desktop + sliding drawer for mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-green-900 via-green-800 to-black text-white p-6 space-y-6 transform transition-transform duration-300 ease-in-out z-50
          ${open ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:relative md:block`}
      >
        {/* Header with logo */}
        <div className="flex items-center justify-between md:block mb-8">
          <img
            src="/logo.png"
            alt="TransLytix Logo"
            className="w-36 md:w-40 h-auto object-contain mx-auto"
          />
          {/* Close button (mobile only) */}
          <button
            className="md:hidden text-gray-400 hover:text-white absolute top-6 right-6"
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
              className={`cursor-pointer px-4 py-2 rounded-lg text-sm sm:text-base transition-all duration-300
                ${
                  activeSection === item.id
                    ? "bg-green-500 text-black font-semibold shadow-md"
                    : "hover:bg-green-700 hover:text-white"
                }`}
            >
              {item.label}
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="mt-auto text-center text-green-200 text-xs sm:text-sm">
          © 2025 TransLytix
        </div>
      </div>

      {/* Background overlay when sidebar is open on mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}
