import { useMemo, useState } from 'react'
import { useDataStore } from '../store/useDataStore'
import type { Report } from '../data/sample'

const severities: Report['severity'][] = ['Low','Medium','High','Critical']

export default function ReportsTable(){
  const reports = useDataStore(s=>s.reports)
  const [filter, setFilter] = useState<Report['severity'] | 'All'>('All')

  const rows = useMemo(()=> {
    return (filter==='All' ? reports : reports.filter(r=>r.severity===filter)).slice(0, 50)
  }, [reports, filter])

  return (
    <section className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Latest Reports</h3>
        <select className="border rounded-xl px-3 py-1.5" value={filter} onChange={e=>setFilter(e.target.value as any)}>
          <option>All</option>
          {severities.map(s=> <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-slate-600">
            <tr>
              <th className="p-2">Photo</th>
              <th className="p-2">Country</th>
              <th className="p-2">Region</th>
              <th className="p-2">Severity</th>
              <th className="p-2">Status</th>
              <th className="p-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r=> (
              <tr key={r.id} className="border-t">
                <td className="p-2"><img src={r.photoUrl} className="h-12 w-16 object-cover rounded-md"/></td>
                <td className="p-2">{r.country}</td>
                <td className="p-2">{r.region}</td>
                <td className="p-2">{r.severity}</td>
                <td className="p-2">{r.status}</td>
                <td className="p-2">{new Date(r.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500 mt-2">Live updates add a new row every few seconds.</p>
    </section>
  )
}
