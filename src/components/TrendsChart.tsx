import { useMemo } from 'react'
import { useDataStore } from '../store/useDataStore'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function TrendsChart(){
  const reports = useDataStore(s=>s.reports)

  const data = useMemo(()=> {
    const days = Array.from({length:7}, (_,i)=> {
      const d = new Date(); d.setDate(d.getDate()- (6-i)); d.setHours(0,0,0,0)
      return d
    })
    return days.map(d=>{
      const row: any = { day: d.toLocaleDateString() }
      for (const c of ['Ghana','Kenya','Zimbabwe'] as const){
        row[c] = reports.filter(r=> r.country===c && new Date(r.timestamp) >= d && new Date(r.timestamp) < new Date(+d+86400000)).length
      }
      return row
    })
  }, [reports])

  return (
    <section className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border">
      <h3 className="font-semibold mb-2">Trends • Reports per day</h3>
      <div style={{height: 320}}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Ghana" strokeWidth={2} />
            <Line type="monotone" dataKey="Kenya" strokeWidth={2} />
            <Line type="monotone" dataKey="Zimbabwe" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
