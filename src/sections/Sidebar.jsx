export default function Sidebar({ activeSection, setActiveSection }) {
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
    <div className="w-64 h-screen bg-gray-900 text-white p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-8">🚦 TransLytix</h1>
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`cursor-pointer p-2 rounded ${
              activeSection === item.id
                ? "bg-green-600"
                : "hover:bg-gray-700"
            }`}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}