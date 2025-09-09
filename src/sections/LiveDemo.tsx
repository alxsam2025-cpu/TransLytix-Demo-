import { useMemo, useState } from 'react'
import { useDataStore, selectors } from '../store/useDataStore'
import { GHANA_REGIONS } from '../data/sample'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, ResponsiveContainer } from 'recharts'

export default function LiveDemo(){
  const reports = useDataStore(s=>s.reports)
  const add = useDataStore(s=>s.addRandomReport)
  const health = selectors.roadHealthIndex(useDataStore.getState())

  const [selectedRegion, setSelectedRegion] = useState<string>('All')
  const [selectedConstituency, setSelectedConstituency] = useState<string>('All')

  const ghanaRegions = Object.keys(GHANA_REGIONS)
  const constituencies = selectedRegion === 'All' 
    ? [] 
    : GHANA_REGIONS[selectedRegion as keyof typeof GHANA_REGIONS].constituencies

  const latest = useMemo(()=> [...reports].sort((a,b)=>b.timestamp-a.timestamp).slice(0,15), [reports])

  const trendData = useMemo(()=>{
    const byDay: Record<string, number> = {}
    for (const r of reports){
      const d = new Date(r.timestamp)
      const key = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
      byDay[key] = (byDay[key]||0) + 1
    }
    return Object.entries(byDay).slice(-7).map(([name,value])=>({ name, value }))
  }, [reports])

  const barData = useMemo(()=>{
    return Object.entries(health).map(([name,score])=>({ name, score }))
  }, [health])

  const filteredLatest = useMemo(() => {
    let filtered = latest
    if (selectedRegion !== 'All') {
      filtered = filtered.filter(r => r.region === selectedRegion)
    }
    if (selectedConstituency !== 'All') {
      filtered = filtered.filter(r => r.constituency === selectedConstituency)
    }
    return filtered
  }, [latest, selectedRegion, selectedConstituency])

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="font-semibold mb-3 text-green-800">Ghana Road Monitoring Dashboard</h3>
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <button onClick={add} className="px-4 py-2 rounded-lg bg-green-600 text-white shadow hover:bg-green-700 flex-shrink-0">
            📊 Simulate Ghana Report
          </button>
          <select 
            value={selectedRegion} 
            onChange={e => {setSelectedRegion(e.target.value); setSelectedConstituency('All')}} 
            className="px-3 py-2 border rounded-md flex-1 min-w-0"
          >
            <option value="All">All Ghana Regions</option>
            {ghanaRegions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <select 
            value={selectedConstituency} 
            onChange={e => setSelectedConstituency(e.target.value)} 
            className="px-3 py-2 border rounded-md flex-1 min-w-0" 
            disabled={selectedRegion === 'All'}
          >
            <option value="All">All Constituencies</option>
            {constituencies.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="text-sm text-gray-600">
          Monitoring {Object.keys(GHANA_REGIONS).length} regions with 275+ constituencies across Ghana
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold mb-2">Reports (last 7 days)</h3>
          <div className="w-full h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <Line type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={2} />
                <CartesianGrid stroke="#eee" />
                <XAxis dataKey="name" hide/>
                <YAxis allowDecimals={false} />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold mb-2">Road Health by Region</h3>
          <div className="w-full h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" hide />
                <YAxis domain={[0,100]} />
                <Tooltip />
                <Bar dataKey="score" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="font-semibold mb-3 text-green-800">
          Latest Ghana Reports 
          {selectedRegion !== 'All' && `- ${selectedRegion}`}
          {selectedConstituency !== 'All' && ` / ${selectedConstituency}`}
          <span className="text-sm font-normal text-gray-600 ml-2">({filteredLatest.length} reports)</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 pr-4">Time</th>
                <th className="py-2 pr-4">Region</th>
                <th className="py-2 pr-4">Constituency</th>
                <th className="py-2 pr-4">Severity</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Est. Cost (GHS)</th>
              </tr>
            </thead>
            <tbody>
              {filteredLatest.map(r=> (
                <tr key={r.id} className="border-b last:border-0">
                  <td className="py-2 pr-4">{new Date(r.timestamp).toLocaleString()}</td>
                  <td className="py-2 pr-4">{r.region}</td>
                  <td className="py-2 pr-4">{r.constituency}</td>
                  <td className="py-2 pr-4">
                    <span className={`px-2 py-1 rounded text-white ${r.severity==='Critical'?'bg-red-600':r.severity==='High'?'bg-orange-500':r.severity==='Medium'?'bg-yellow-500':'bg-green-600'}`}>
                      {r.severity}
                    </span>
                  </td>
                  <td className="py-2 pr-4">{r.status}</td>
                  <td className="py-2 pr-4">{r.estimatedCost?.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

