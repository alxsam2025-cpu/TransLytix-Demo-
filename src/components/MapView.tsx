import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useDataStore } from '../store/useDataStore'

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

export default function MapView(){
  const reports = useDataStore(s=>s.reports)
  const center = [5.6037, -0.1870] as [number, number]

  return (
    <section className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border">
      <h3 className="font-semibold mb-2">Map • Citizen Reports</h3>
      <MapContainer center={center} zoom={5} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {reports.slice(0, 200).map(r=> (
          <Marker position={[r.lat, r.lng]} key={r.id}>
            <Popup>
              <div className="w-56">
                <img src={r.photoUrl} className="rounded-lg mb-2" />
                <div className="text-sm font-semibold">{r.country} • {r.region}</div>
                <div className="text-xs text-slate-600">Severity: {r.severity} — Status: {r.status}</div>
                <div className="text-xs text-slate-500">{new Date(r.timestamp).toLocaleString()}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  )
}
