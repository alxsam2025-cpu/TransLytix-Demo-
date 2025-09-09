import { useMemo } from 'react'
import { useDataStore, selectors } from '../store/useDataStore'
import { GHANA_REGIONS } from '../data/sample'
import { AlertTriangle, TrendingUp, TrendingDown, Clock } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function PredictiveAnalysis(){
  const reports = useDataStore(s=>s.reports)
  const alerts = selectors.predictiveAlerts(useDataStore.getState())

  const recentReports = useMemo(() => {
    return [...reports]
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 20)
  }, [reports])

  const trendData = useMemo(() => {
    const last14Days = []
    const now = new Date()
    
    for (let i = 13; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      const dayKey = date.toISOString().split('T')[0]
      
      const dayReports = reports.filter(r => {
        const reportDate = new Date(r.timestamp).toISOString().split('T')[0]
        return reportDate === dayKey
      })
      
      const criticalCount = dayReports.filter(r => r.severity === 'Critical' || r.severity === 'High').length
      const totalCount = dayReports.length
      
      last14Days.push({
        date: dayKey,
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        critical: criticalCount,
        total: totalCount,
        healthScore: totalCount > 0 ? Math.round((1 - criticalCount / totalCount) * 100) : 100
      })
    }
    
    return last14Days
  }, [reports])

  const regionalTrends = useMemo(() => {
    const regionMap: Record<string, { total: number, critical: number, trend: string }> = {}
    
    const recentCutoff = Date.now() - (7 * 24 * 60 * 60 * 1000) // 7 days ago
    const olderCutoff = Date.now() - (14 * 24 * 60 * 60 * 1000) // 14 days ago
    
    reports.forEach(r => {
      if (!regionMap[r.region]) {
        regionMap[r.region] = { total: 0, critical: 0, trend: 'stable' }
      }
      
      regionMap[r.region].total++
      if (r.severity === 'Critical' || r.severity === 'High') {
        regionMap[r.region].critical++
      }
    })
    
    // Calculate trends
    Object.keys(regionMap).forEach(region => {
      const recentCritical = reports.filter(r => 
        r.region === region && 
        r.timestamp > recentCutoff && 
        (r.severity === 'Critical' || r.severity === 'High')
      ).length
      
      const olderCritical = reports.filter(r => 
        r.region === region && 
        r.timestamp > olderCutoff && 
        r.timestamp <= recentCutoff &&
        (r.severity === 'Critical' || r.severity === 'High')
      ).length
      
      if (recentCritical > olderCritical * 1.2) {
        regionMap[region].trend = 'worsening'
      } else if (recentCritical < olderCritical * 0.8) {
        regionMap[region].trend = 'improving'
      }
    })
    
    return Object.entries(regionMap).map(([region, data]) => ({
      region,
      ...data,
      healthScore: Math.round((1 - data.critical / data.total) * 100)
    })).sort((a, b) => a.healthScore - b.healthScore)
  }, [reports])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
        <h2 className="text-xl font-bold text-green-800 mb-2">🇬🇭 Ghana Predictive Analysis</h2>
        <p className="text-sm text-green-700">
          Live insights and health trends across Ghana's road network. Monitoring deterioration patterns and maintenance needs.
        </p>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-red-800">Ghana Predictive Maintenance Alerts</h3>
          </div>
          <div className="space-y-2">
            {alerts.map((alert, idx) => (
              <div key={idx} className="bg-white p-3 rounded-lg border border-red-100">
                <p className="text-sm text-red-700">{alert.message}</p>
                <p className="text-xs text-red-600 mt-1">{alert.count} high-severity reports detected</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Health Trend Chart */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Road Health Trend (Last 14 Days)</h3>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  name === 'healthScore' ? `${value}%` : value,
                  name === 'healthScore' ? 'Health Score' : 
                  name === 'critical' ? 'Critical Reports' : 'Total Reports'
                ]}
              />
              <Line type="monotone" dataKey="healthScore" stroke="#16a34a" strokeWidth={2} name="healthScore" />
              <Line type="monotone" dataKey="critical" stroke="#dc2626" strokeWidth={2} name="critical" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Regional Health Trends */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Ghana Regional Health Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {regionalTrends.map(region => (
            <div key={region.region} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-sm">{region.region}</h4>
                {region.trend === 'worsening' ? (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                ) : region.trend === 'improving' ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                )}
              </div>
              <div className="text-2xl font-bold mb-1">{region.healthScore}%</div>
              <div className="text-xs text-gray-600">
                {region.critical}/{region.total} critical reports
              </div>
              <div className={`text-xs mt-1 ${
                region.trend === 'worsening' ? 'text-red-600' :
                region.trend === 'improving' ? 'text-green-600' : 'text-gray-600'
              }`}>
                {region.trend === 'worsening' ? 'Deteriorating' :
                 region.trend === 'improving' ? 'Improving' : 'Stable'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Reports */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-gray-600" />
          <h3 className="text-xl font-semibold">Live Reports from Ghana Constituencies</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Real-time citizen reports from constituencies across all {Object.keys(GHANA_REGIONS).length} Ghana regions
        </p>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {recentReports.map(report => (
            <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{report.region}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-sm text-gray-600">{report.constituency}</span>
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(report.timestamp).toLocaleString()}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  report.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                  report.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                  report.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {report.severity}
                </span>
                {report.estimatedCost && (
                  <span className="text-sm text-gray-600">
                    GHS {report.estimatedCost.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
