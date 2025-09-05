// src/utils/liveData.js 

// Fixed country metadata
export const COUNTRY_META = { 
  Ghana: { coords: [5.55, -0.2], color: "#16a34a", region: "Accra" }, 
  Nigeria: { coords: [6.45, 3.4], color: "#2563eb", region: "Lagos" }, 
  Sudan: { coords: [15.5007, 32.5599], color: "#b45309", region: "Khartoum" }, 
  Kenya: { coords: [-1.29, 36.82], color: "#f59e0b", region: "Nairobi" }, 
  Zimbabwe: { coords: [-17.8292, 31.0522], color: "#9f1239", region: "Harare" }, 
}; 

// ✅ Explicit fixed order — avoids missing names
export const COUNTRIES = ["Ghana", "Nigeria", "Sudan", "Kenya", "Zimbabwe"]; 

const severities = ["Low", "Medium", "High", "Critical"]; 
const statuses = ["Pending", "In Progress", "Resolved"]; 
const sources = ["Citizen", "Gov. Agency", "NGO"]; 

const sampleImages = [ 
  "https://images.unsplash.com/photo-1533560777802-2d87c3e76d9b?q=80&w=1200&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1560508170-57b1b9f0a0b0?q=80&w=1200&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1606668690483-62a7f6c62d78?q=80&w=1200&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1533709752211-c3d18a0d7f3f?q=80&w=1200&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1200&auto=format&fit=crop", 
]; 

const rand = (n) => Math.floor(Math.random() * n); 
const pick = (arr) => arr[rand(arr.length)]; 
const timeNow = () => new Date().toLocaleTimeString(); 

export function makeReport(overrides = {}) { 
  const country = overrides.country || pick(COUNTRIES); 
  const meta = COUNTRY_META[country]; 
  const jitter = () => (Math.random() - 0.5) * 0.6; 
  const lat = (meta.coords[0] || 0) + jitter(); 
  const lng = (meta.coords[1] || 0) + jitter(); 
  const severity = overrides.severity || pick(severities); 
  const intensity = 
    severity === "Critical" 
      ? 0.95 
      : severity === "High" 
      ? 0.75 
      : severity === "Medium" 
      ? 0.45 
      : 0.2; 

  return { 
    id: `${Date.now().toString(36)}-${Math.floor(Math.random() * 10000)}`, 
    country, 
    region: overrides.region || meta.region, 
    coords: overrides.coords || [lat, lng], 
    severity, 
    status: overrides.status || pick(statuses), 
    source: overrides.source || pick(sources), 
    image: overrides.image || pick(sampleImages), 
    comment: overrides.comment || "Auto-generated road issue", 
    intensity, 
    reports: 1 + rand(80), 
    unresolvedHours: [2, 6, 12, 24, 36, 48, 72][rand(7)], 
    timestamp: timeNow(), 
    color: meta.color, 
  }; 
}
