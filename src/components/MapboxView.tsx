import React from 'react'
import Map, { Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useDataStore } from '../store/useDataStore'

export default function MapboxView(){
  const reports = useDataStore(s=>s.reports)
  const token = import.meta.env.VITE_MAPBOX_TOKEN || ''

  if(!token){
    return <div className="bg-white p-4 rounded-2xl border">Set VITE_MAPBOX_TOKEN in .env to enable Mapbox.</div>
  }

  return (
    <section className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border">
      <h3 className="font-semibold mb-2">Map • Mapbox</h3>
      <Map
        initialViewState={{ latitude: 5.6037, longitude: -0.1870, zoom: 9 }}
        style={{ width: '100%', height: 420 }}
        mapboxAccessToken={token}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        {reports.slice(0, 50).map((r:any)=>(
          <Marker key={r.id} longitude={r.coords.lng} latitude={r.coords.lat} anchor="bottom">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
          </Marker>
        ))}
      </Map>
    </section>
  )
}
