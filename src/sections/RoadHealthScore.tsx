import { useMemo, useState, useRef } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useDataStore, selectors } from '../store/useDataStore'
import { GHANA_REGIONS } from '../data/sample'
import SeverityImpactReport from '../components/SeverityImpactReport'

export default function RoadHealthScore(){
  const reports = useDataStore(s=>s.reports)
  const health = selectors.roadHealthIndex(useDataStore.getState()) // already Ghana-only
  const [selectedRegionForReport, setSelectedRegionForReport] = useState<string | null>(null)
  const severityReportRef = useRef<HTMLDivElement>(null)

  const chartData = useMemo(() => {
    return Object.entries(health).map(([region, score]) => ({
      region,
      score,
      count: reports.filter(r => r.region === region).length
    })).sort((a, b) => b.score - a.score)
  }, [health, reports])

  const overallScore = useMemo(() => {
    const scores = Object.values(health)
    return scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0
  }, [health])

  const severityCounts = useMemo(() => {
    const counts = { Low: 0, Medium: 0, High: 0, Critical: 0 }
    reports.forEach(r => counts[r.severity]++)
    return counts
  }, [reports])

  const trendData = useMemo(()=>{
    const byDay: Record<string, number> = {}
    for (const r of reports){
      const d = new Date(r.timestamp)
      const key = `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`
      byDay[key] = (byDay[key]||0) + 1
    }
    return Object.entries(byDay).slice(-7).map(([name,value])=>({ name: name.slice(5), value }))
  }, [reports])

  const handleRegionClick = (data: any) => {
    if (data && data.activePayload && data.activePayload[0]?.payload?.region) {
      const clickedRegion = data.activePayload[0].payload.region
      setSelectedRegionForReport(clickedRegion)
      
      // Scroll to the severity report section
      setTimeout(() => {
        if (severityReportRef.current) {
          severityReportRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          })
        }
      }, 100)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
        <h2 className="text-lg font-bold text-green-800 mb-2">Ghana Road Health Monitor</h2>
        <p className="text-sm text-green-700">
          Live health scores for all {Object.keys(GHANA_REGIONS).length} Ghana regions. Updates automatically as new citizen reports arrive.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-xl">
          <h3 className="font-semibold text-green-800">Overall Health Score</h3>
          <div className="text-2xl font-bold text-green-600">{overallScore}/100</div>
          <p className="text-sm text-green-700">Ghana Road Network</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl">
          <h3 className="font-semibold text-blue-800">Total Reports</h3>
          <div className="text-2xl font-bold text-blue-600">{reports.length}</div>
          <p className="text-sm text-blue-700">Across all regions</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-xl">
          <h3 className="font-semibold text-orange-800">Critical Issues</h3>
          <div className="text-2xl font-bold text-orange-600">{severityCounts.Critical + severityCounts.High}</div>
          <p className="text-sm text-orange-700">Requiring immediate attention</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Reports (Last 7 Days)</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <Line type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={3} />
                <CartesianGrid stroke="#f0f0f0" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis allowDecimals={false} fontSize={12} />
                <Tooltip formatter={(value) => [value, 'Reports']} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Road Health by Region</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" hide />
                <YAxis domain={[0,100]} fontSize={12} />
                <Tooltip 
                  formatter={(value: number, name: string, props: any) => [
                    `${value}/100`, 
                    'Health Score'
                  ]}
                  labelFormatter={(label) => `Region: ${label}`}
                />
                <Bar dataKey="score" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Detailed Regional Health Scores</h3>
          {selectedRegionForReport && (
            <button
              onClick={() => setSelectedRegionForReport(null)}
              className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-md hover:bg-red-200 transition-colors"
            >
              ✖ Clear Selection
            </button>
          )}
        </div>
        <p className="text-sm text-gray-600 mb-2">💡 Click on any region bar to view detailed severity analysis report</p>
        {selectedRegionForReport && (
          <div className="bg-blue-50 border border-blue-200 p-2 rounded-md mb-4">
            <p className="text-sm text-blue-800">
              🎯 <strong>Selected:</strong> {selectedRegionForReport} region - Check detailed analysis below
            </p>
          </div>
        )}
        <div className="w-full h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData} 
              margin={{ left: 20, right: 20, top: 20, bottom: 60 }}
              onClick={handleRegionClick}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="region" 
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
                fontSize={12}
              />
              <YAxis domain={[0, 100]} />
              <Tooltip 
                formatter={(value: number, name: string, props: any) => [
                  `${value}/100`, 
                  'Health Score',
                  `Reports: ${props.payload.count}`
                ]}
                labelFormatter={(label) => `${label} - Click to view detailed report`}
              />
              <Bar 
                dataKey="score" 
                radius={[4, 4, 0, 0]}
                style={{ cursor: 'pointer' }}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.region === selectedRegionForReport ? '#3b82f6' : '#16a34a'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-green-100 p-4 rounded-xl text-center">
          <div className="text-lg font-bold text-green-800">{severityCounts.Low}</div>
          <div className="text-sm text-green-600">Low Severity</div>
        </div>
        <div className="bg-yellow-100 p-4 rounded-xl text-center">
          <div className="text-lg font-bold text-yellow-800">{severityCounts.Medium}</div>
          <div className="text-sm text-yellow-600">Medium Severity</div>
        </div>
        <div className="bg-orange-100 p-4 rounded-xl text-center">
          <div className="text-lg font-bold text-orange-800">{severityCounts.High}</div>
          <div className="text-sm text-orange-600">High Severity</div>
        </div>
        <div className="bg-red-100 p-4 rounded-xl text-center">
          <div className="text-lg font-bold text-red-800">{severityCounts.Critical}</div>
          <div className="text-sm text-red-600">Critical Severity</div>
        </div>
      </div>
      
      {/* Interactive Generative Impact Severity Report */}
      <div className="mt-8" ref={severityReportRef}>
        <SeverityImpactReport 
          initialRegion={selectedRegionForReport || undefined}
          initialReportType={selectedRegionForReport ? 'constituency' : 'overview'}
        />
      </div>
    </div>
  )
}
