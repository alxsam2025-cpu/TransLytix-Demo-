# TransLytix — Road Health & Citizen Reports

A lightweight React + Vite dashboard with:
- 📄 README explaining app, features, setup
- 🖼 Screenshots for GitHub (`/screenshots`)
- 🎨 Branding (logo + brand color)
- 📊 Preloaded sample data for Ghana, Kenya, Zimbabwe
- 🔔 Predictive maintenance alerts
- 🛰 GPS coordinates per report (Leaflet map)
- 🔁 Simulated live updates every few seconds
- 📱 Fully mobile + web responsive layout (Tailwind)
- 🌐 Local IP access for phone testing
- 🚀 Deploy-ready for Netlify & Vercel

## Tech
React 18, Vite 5, TailwindCSS 3, Recharts 2, Leaflet 1 + React-Leaflet 4, Zustand

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

## Features
- **Road Reports** — photo, country, region, severity, status, timestamp.
- **Road Health Index** per country (0–100). Higher is better.
- **Predictive Alerts** — highlights regions trending with High/Critical issues in recent submissions.
- **Map View** — shows recent reports with popups.
- **Trends** — line chart of last 7 days by country.
- **Live Updates** — a new synthetic report appears every few seconds to simulate field activity.

## Configuration
- Brand colors live in `tailwind.config.js` (palette `brand`).
- Live update interval is set in `src/App.tsx` (`setInterval(..., 4000)`).
- Sample data generator in `src/data/sample.ts`.

## License
MIT (sample project).
