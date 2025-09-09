# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Essential Commands
```bash
# Install dependencies
npm install

# Start development server (includes LAN access for mobile testing)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

### Environment Setup
```bash
# Copy environment template and configure (optional)
cp .env.example .env
# Edit .env and add VITE_MAPBOX_TOKEN if using Mapbox features
```

### Development Server Notes
- Development server runs on `http://localhost:5173` by default
- LAN access is enabled for mobile testing - check terminal output for network URL (e.g., `http://192.168.x.x:5173`)
- Live reload is automatic for all file changes

## Architecture Overview

### Core Technology Stack
- **Frontend**: React 18 + TypeScript + Vite 7
- **Styling**: TailwindCSS with custom color palette (green/brown theme)
- **State Management**: Zustand for global state
- **Animations**: Framer Motion for smooth transitions
- **Maps**: Leaflet + React-Leaflet for road condition mapping
- **Charts**: Recharts for data visualization
- **Routing**: React Router DOM for navigation

### Key Architectural Patterns

#### State Management with Zustand
The app uses a centralized store (`src/store/useDataStore.ts`) that:
- Manages road condition reports as the single source of truth
- Provides computed selectors for road health indices and predictive alerts
- Handles live data simulation with automatic report generation

#### Component Architecture
- **Main App** (`src/App.tsx`): Single-page app with sidebar navigation and animated section transitions
- **Sections**: Modular content sections in `src/sections/` (currently focused on "Our Solution")
- **Components**: Reusable UI components in `src/components/` for dashboards, charts, and tables
- **Live Data**: Real-time simulation via `src/live/LiveFeedProvider.tsx` with WebSocket fallback

#### Data Flow
1. **Sample Data Generation** (`src/data/sample.ts`): Creates realistic road reports for Ghana, Kenya, Zimbabwe
2. **Live Updates**: New reports added every 4 seconds via interval or WebSocket connection
3. **Computed Metrics**: Road health indices and predictive alerts calculated in real-time
4. **Visual Display**: Data rendered through Leaflet maps, Recharts visualizations, and responsive tables

### File Organization
```
src/
├── components/         # Reusable UI components (Dashboard, Charts, Tables)
├── data/              # Data models and sample data generators
├── live/              # Live data providers and WebSocket handling  
├── pages/             # Full page components
├── sections/          # Main content sections (Our Solution, etc.)
├── store/             # Zustand state management
└── utils/             # Helper functions (CSV export, geo data, etc.)
```

### Styling System
- **TailwindCSS** with custom theme in `tailwind.config.js`
- **Brand Colors**: Green (`#16a34a`) and brown (`#78350f`) palette
- **Responsive Design**: Mobile-first approach with `md:` breakpoints
- **Custom Components**: Consistent spacing, shadows, and hover effects

### Development Workflow
- **Hot Reload**: Vite provides instant updates during development  
- **TypeScript**: Strict mode enabled for type safety
- **Asset Handling**: Vite handles static assets, images loaded from Picsum for demos
- **Build Optimization**: Chunking disabled for simpler deployment, 2MB warning limit set

### Data Models
The core `Report` type represents road condition reports with:
- Geographic data (country, region, lat/lng coordinates)  
- Condition assessment (severity: Low/Medium/High/Critical)
- Status tracking (New/In Progress/Resolved)
- Metadata (photos, timestamps, notes)

### Live Data Simulation
- Attempts WebSocket connection to `ws://localhost:5050/ws` in development
- Falls back to 4-second interval timer for report generation
- Maintains maximum 250 reports in memory for performance
- Realistic geographic distribution across target African countries
