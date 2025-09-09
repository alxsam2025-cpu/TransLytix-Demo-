import { useMemo, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polygon } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useDataStore } from '../store/useDataStore'
import { GHANA_REGIONS } from '../data/sample'

// Fix Leaflet icon in Vite
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

export default function MapViewSection(){
  const reports = useDataStore(s=>s.reports)
  const [region, setRegion] = useState<string>('All')
  const [constituency, setConstituency] = useState<string>('All')

  const center: [number, number] = [7.9465, -1.0232] // Ghana centroid

  const regions = Object.keys(GHANA_REGIONS)
  const constituencies = region==='All' ? [] : GHANA_REGIONS[region as keyof typeof GHANA_REGIONS].constituencies

  const filtered = reports.filter(r => {
    if (region!=='All' && r.region!==region) return false
    if (constituency!=='All' && r.constituency!==constituency) return false
    return true
  })

  // Interactive click: when user clicks map, clear filters to show nearby markers in Ghana
  function ClickHandler(){
    useMapEvents({
      click(){
        // Optional: could compute nearest region by lat/lng
        setRegion('All')
        setConstituency('All')
      }
    })
    return null
  }

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-green-800 mb-2">Interactive Ghana Road Map</h2>
        <p className="text-sm text-gray-600 mb-4">
          Showing {filtered.length} reports across Ghana. Click on markers for details or select filters below.
        </p>
        <div className="flex flex-col md:flex-row gap-3">
          <select value={region} onChange={e=>{setRegion(e.target.value); setConstituency('All')}} className="px-3 py-2 border rounded-md">
            <option value="All">All Ghana Regions</option>
            {regions.map(r=> <option key={r} value={r}>{r}</option>)}
          </select>
          <select value={constituency} onChange={e=>setConstituency(e.target.value)} className="px-3 py-2 border rounded-md" disabled={region==='All'}>
            <option value="All">All Constituencies</option>
            {constituencies.map(c=> <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="w-full h-[480px] rounded-xl overflow-hidden">
        <MapContainer center={center} zoom={6} style={{width:'100%', height:'100%'}}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
          <ClickHandler />
          {filtered.map(r=> (
            <Marker position={[r.lat, r.lng]} key={r.id}>
              <Popup>
                <div className="text-sm">
                  <div className="font-semibold">{r.region} / {r.constituency}</div>
                  <div>Severity: <b>{r.severity}</b></div>
                  <div>Status: {r.status}</div>
                  {r.estimatedCost && <div>Est. Cost: GHS {r.estimatedCost.toLocaleString()}</div>}
                  <div className="text-xs text-gray-600 mt-1">{new Date(r.timestamp).toLocaleString()}</div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}

