import { useMemo } from 'react'
import { useDataStore, selectors } from '../store/useDataStore'

function Stat({label, value}:{label:string, value:string|number}){
  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border">
      <div className="text-slate-500 text-sm">{label}</div>
      <div className="text-2xl md:text-3xl font-semibold">{value}</div>
    </div>
  )
}

export default function DashboardCards(){
  const reports = useDataStore(s=>s.reports)
  const rhi = useMemo(()=> selectors.roadHealthIndex({reports, lastUpdate:0, addRandomReport:()=>{}} as any), [reports])
  const alerts = useMemo(()=> selectors.predictiveAlerts({reports, lastUpdate:0, addRandomReport:()=>{}} as any), [reports])

  const totals = {
    reports: reports.length,
    critical: reports.filter(r=>r.severity==='Critical').length,
    inProgress: reports.filter(r=>r.status==='In Progress').length
  }

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Stat label="Total Reports" value={totals.reports} />
      <Stat label="Critical" value={totals.critical} />
      <Stat label="In Progress" value={totals.inProgress} />
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border">
        <div className="text-slate-500 text-sm">Predictive Alerts</div>
        <div className="text-sm mt-2 max-h-20 overflow-auto">
          {alerts.length ? alerts.map(a=> (
            <div key={a.key} className="py-0.5">• {a.message}</div>
          )) : <span className="text-slate-400">No alerts yet</span>}
        </div>
      </div>
      <div className="col-span-2 md:col-span-4 bg-white p-4 md:p-6 rounded-2xl shadow-sm border">
        <h3 className="font-semibold mb-2">Road Health Index (0-100): higher is better</h3>
        <div className="flex gap-3">
          {Object.entries(rhi).map(([country,score])=> (
            <div key={country} className="flex-1">
              <div className="text-sm text-slate-500">{country}</div>
              <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-brand-500" style={{width: `${score}%`}}/>
              </div>
              <div className="text-xs text-slate-500 mt-1">{score}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
