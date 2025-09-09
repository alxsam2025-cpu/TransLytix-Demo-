# ROAD PULSE GHANA — Road Health & Citizen Reports

A comprehensive React + Vite dashboard specifically designed for Ghana's road infrastructure monitoring:
- 🇬🇭 **Ghana-focused**: All 10 regions with 275+ constituencies
- 📊 **Live Demo**: Real-time dashboard with Ghana road reports
- 🗺️ **Interactive Map**: Clickable regions and constituencies across Ghana
- 📈 **Road Health Score**: Regional health analysis with real-time updates
- 📋 **Damage Reports**: Searchable by constituency with CSV export
- 🔮 **Predictive Analysis**: Health trends and maintenance alerts
- 💰 **Cost Estimation**: Budget estimates in Ghana Cedis (GHS)
- 📱 **Mobile Optimized**: Responsive design for mobile-first usage
- 🚀 **Vercel Ready**: Optimized for cloud deployment

## Tech Stack
React 18 + TypeScript, Vite 7, TailwindCSS 3, Recharts 2, Leaflet + React-Leaflet, Zustand, Framer Motion

## Quickstart
```bash
# 1) Install
npm install

# 2) Run locally (LAN enabled)
npm run dev
# Find your LAN URL in the terminal (e.g., http://192.168.x.x:5173) and open it on your phone.

# 3) Build for production
npm run build
npm run preview  # also LAN enabled
```

> If you see CORS errors on the map markers in some corporate environments, it's typically a network filter. Try a different network.

## Deploy (Vercel)
1. Push this folder to a new GitHub repo.
2. On Vercel, **New Project** → import the repo.
3. Framework preset: **Vite**; Build Command: `npm run build`; Output: `dist`.
4. Deploy. Done!

## Deploy (Netlify)
1. New Site → Import from Git/GitHub.
2. Build Command: `npm run build`.
3. Publish Directory: `dist`.

## Core Features

### Our Solution
- Mission and vision for Ghana's road infrastructure
- Comprehensive approach to citizen-driven reporting

### Live Demo
- Real-time Ghana road condition dashboard
- Interactive charts showing report trends
- Regional filtering and live report simulation

### Map View
- Interactive Ghana map with all 10 regions
- Constituency-level detail and filtering
- Report markers with severity indicators and cost estimates

### Road Health Score
- Real-time health scores for all Ghana regions
- Bar chart visualization with trend analysis
- Overall health metrics and critical issue tracking

### Damage Report
- Comprehensive report management with advanced filtering
- Search by constituency across all Ghana regions
- CSV export with cost estimates in Ghana Cedis
- Status tracking (New, In Progress, Resolved)

### Predictive Analysis
- 14-day health trend analysis
- Regional deterioration and improvement tracking
- Latest reports feed from across Ghana
- Maintenance alerts for critical areas

## Ghana-Specific Configuration
- **Regions & Constituencies**: Complete data in `src/data/sample.ts` with 275+ constituencies
- **Cost Estimates**: Ghana Cedis currency with realistic repair cost estimates
- **Geographic Coordinates**: Accurate lat/lng for all regions and constituencies
- **Live Updates**: 4-second interval for simulated citizen reports
- **Brand Colors**: Green/brown theme reflecting Ghana's identity
- **Health Scoring**: Algorithm considers severity distribution across regions

## License
MIT (sample project).
