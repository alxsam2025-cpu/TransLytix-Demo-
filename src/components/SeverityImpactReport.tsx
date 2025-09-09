import { useState, useMemo, useEffect } from 'react'
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useDataStore } from '../store/useDataStore'
import { GHANA_REGIONS } from '../data/sample'

const SEVERITY_COLORS = {
  Low: '#22c55e',
  Medium: '#eab308', 
  High: '#f97316',
  Critical: '#ef4444'
}

const SEVERITY_PRIORITY = { Low: 1, Medium: 2, High: 3, Critical: 4 }

interface SeverityData {
  severity: string
  count: number
  percentage: number
  totalCost: number
  avgCost: number
}

interface RegionSeverityData {
  region: string
  Low: number
  Medium: number
  High: number
  Critical: number
  total: number
  riskScore: number
}

interface SeverityImpactReportProps {
  initialRegion?: string
  initialReportType?: 'overview' | 'regional' | 'constituency' | 'trends'
}

export default function SeverityImpactReport({ initialRegion, initialReportType }: SeverityImpactReportProps = {}) {
  const reports = useDataStore(s => s.reports)
  const [selectedRegion, setSelectedRegion] = useState<string>(initialRegion || 'All Regions')
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All Severities')
  const [reportType, setReportType] = useState<'overview' | 'regional' | 'constituency' | 'trends'>(initialReportType || 'overview')

  // Sync with external props
  useEffect(() => {
    if (initialRegion && initialRegion !== selectedRegion) {
      setSelectedRegion(initialRegion)
    }
  }, [initialRegion])

  useEffect(() => {
    if (initialReportType && initialReportType !== reportType) {
      setReportType(initialReportType)
    }
  }, [initialReportType])

  // Filter reports based on selection
  const filteredReports = useMemo(() => {
    let filtered = reports
    if (selectedRegion !== 'All Regions') {
      filtered = filtered.filter(r => r.region === selectedRegion)
    }
    if (selectedSeverity !== 'All Severities') {
      filtered = filtered.filter(r => r.severity === selectedSeverity)
    }
    return filtered
  }, [reports, selectedRegion, selectedSeverity])

  // Severity overview data
  const severityData: SeverityData[] = useMemo(() => {
    const severityCounts = { Low: 0, Medium: 0, High: 0, Critical: 0 }
    const severityCosts = { Low: 0, Medium: 0, High: 0, Critical: 0 }
    
    filteredReports.forEach(report => {
      severityCounts[report.severity]++
      severityCosts[report.severity] += report.estimatedCost || 0
    })

    const total = Object.values(severityCounts).reduce((a, b) => a + b, 0)

    return (['Low', 'Medium', 'High', 'Critical'] as const).map(severity => ({
      severity,
      count: severityCounts[severity],
      percentage: total > 0 ? Math.round((severityCounts[severity] / total) * 100) : 0,
      totalCost: severityCosts[severity],
      avgCost: severityCounts[severity] > 0 ? Math.round(severityCosts[severity] / severityCounts[severity]) : 0
    }))
  }, [filteredReports])

  // Regional severity breakdown
  const regionalData: RegionSeverityData[] = useMemo(() => {
    const regionSeverity: Record<string, { Low: number, Medium: number, High: number, Critical: number }> = {}
    
    Object.keys(GHANA_REGIONS).forEach(region => {
      regionSeverity[region] = { Low: 0, Medium: 0, High: 0, Critical: 0 }
    })

    reports.forEach(report => {
      if (regionSeverity[report.region]) {
        regionSeverity[report.region][report.severity]++
      }
    })

    return Object.entries(regionSeverity).map(([region, counts]) => {
      const total = counts.Low + counts.Medium + counts.High + counts.Critical
      const riskScore = total > 0 
        ? Math.round(((counts.High * 3 + counts.Critical * 4) / total) * 25)
        : 0

      return {
        region,
        ...counts,
        total,
        riskScore
      }
    }).sort((a, b) => b.riskScore - a.riskScore)
  }, [reports])

  // Constituency data for selected region
  const constituencyData = useMemo(() => {
    if (selectedRegion === 'All Regions') return []
    
    const regionInfo = GHANA_REGIONS[selectedRegion as keyof typeof GHANA_REGIONS]
    if (!regionInfo) return []

    const constituencyStats = regionInfo.constituencies.map(constituency => {
      const constituencyReports = reports.filter(r => 
        r.region === selectedRegion && r.constituency === constituency
      )
      
      const severityCounts = { Low: 0, Medium: 0, High: 0, Critical: 0 }
      let totalCost = 0
      
      constituencyReports.forEach(report => {
        severityCounts[report.severity]++
        totalCost += report.estimatedCost || 0
      })

      const total = Object.values(severityCounts).reduce((a, b) => a + b, 0)
      const urgencyScore = total > 0 
        ? ((severityCounts.Critical * 4 + severityCounts.High * 3 + severityCounts.Medium * 2 + severityCounts.Low) / total)
        : 0

      return {
        constituency,
        total,
        urgencyScore: Math.round(urgencyScore * 25),
        totalCost,
        ...severityCounts
      }
    }).filter(c => c.total > 0).sort((a, b) => b.urgencyScore - a.urgencyScore)

    return constituencyStats
  }, [reports, selectedRegion])

  // Trend data (last 30 days)
  const trendData = useMemo(() => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (29 - i))
      return date.toISOString().split('T')[0]
    })

    return last30Days.map(date => {
      const dayReports = filteredReports.filter(report => {
        const reportDate = new Date(report.timestamp).toISOString().split('T')[0]
        return reportDate === date
      })

      const severityCounts = { Low: 0, Medium: 0, High: 0, Critical: 0 }
      dayReports.forEach(report => severityCounts[report.severity]++)

      return {
        date: date.slice(-5), // MM-DD format
        ...severityCounts,
        total: dayReports.length
      }
    })
  }, [filteredReports])

  const generateInsights = () => {
    const totalReports = filteredReports.length
    const criticalCount = severityData.find(s => s.severity === 'Critical')?.count || 0
    const highCount = severityData.find(s => s.severity === 'High')?.count || 0
    const totalCost = severityData.reduce((sum, s) => sum + s.totalCost, 0)
    const urgentIssues = criticalCount + highCount
    const urgentPercentage = totalReports > 0 ? Math.round((urgentIssues / totalReports) * 100) : 0
    
    const topRiskRegion = regionalData[0]
    const topRiskConstituency = constituencyData[0]

    return {
      totalReports,
      criticalCount,
      highCount,
      urgentIssues,
      urgentPercentage,
      totalCost,
      topRiskRegion,
      topRiskConstituency
    }
  }

  const insights = generateInsights()

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-blue-900 mb-2">📊 Impact Severity Analysis Report</h3>
        <p className="text-blue-700 mb-4">
          Interactive analysis of citizen-reported road damage by impact severity across Ghana's regions and constituencies
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select 
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All Regions">All Regions</option>
            {Object.keys(GHANA_REGIONS).map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
          
          <select 
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All Severities">All Severities</option>
            {['Low', 'Medium', 'High', 'Critical'].map(severity => (
              <option key={severity} value={severity}>{severity} Impact</option>
            ))}
          </select>

          <select 
            value={reportType}
            onChange={(e) => setReportType(e.target.value as any)}
            className="px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="overview">Overview</option>
            <option value="regional">Regional Analysis</option>
            <option value="constituency">Constituency Breakdown</option>
            <option value="trends">Trend Analysis</option>
          </select>

          <div className="text-sm">
            <div className="font-semibold text-blue-800">Total Reports: {insights.totalReports}</div>
            <div className="text-blue-600">Urgent Issues: {insights.urgentPercentage}%</div>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="text-2xl font-bold text-red-800">{insights.criticalCount}</div>
          <div className="text-sm text-red-600">Critical Issues</div>
          <div className="text-xs text-red-500">Require immediate action</div>
        </div>
        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-lg">
          <div className="text-2xl font-bold text-orange-800">{insights.highCount}</div>
          <div className="text-sm text-orange-600">High Priority</div>
          <div className="text-xs text-orange-500">Needs urgent attention</div>
        </div>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
          <div className="text-2xl font-bold text-yellow-800">₵{insights.totalCost.toLocaleString()}</div>
          <div className="text-sm text-yellow-600">Total Cost</div>
          <div className="text-xs text-yellow-500">Estimated repair costs</div>
        </div>
        <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-lg">
          <div className="text-lg font-bold text-purple-800">{insights.topRiskRegion?.region || 'N/A'}</div>
          <div className="text-sm text-purple-600">Highest Risk Region</div>
          <div className="text-xs text-purple-500">Risk Score: {insights.topRiskRegion?.riskScore || 0}/100</div>
        </div>
      </div>

      {/* Dynamic Content Based on Report Type */}
      {reportType === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h4 className="text-lg font-semibold mb-4">Severity Distribution</h4>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={severityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="count"
                    label={({ severity, percentage }) => `${severity}: ${percentage}%`}
                  >
                    {severityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={SEVERITY_COLORS[entry.severity as keyof typeof SEVERITY_COLORS]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [value, 'Reports']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h4 className="text-lg font-semibold mb-4">Cost by Severity</h4>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={severityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="severity" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₵${Number(value).toLocaleString()}`, 'Total Cost']} />
                  <Bar dataKey="totalCost" radius={[4, 4, 0, 0]}>
                    {severityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={SEVERITY_COLORS[entry.severity as keyof typeof SEVERITY_COLORS]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {reportType === 'regional' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h4 className="text-lg font-semibold mb-4">Regional Risk Assessment</h4>
            <div className="w-full h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionalData} margin={{ left: 20, right: 20, top: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="region" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    interval={0}
                    fontSize={12}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [value, name]}
                    labelFormatter={(label) => `Region: ${label}`}
                  />
                  <Bar dataKey="Critical" stackId="a" fill={SEVERITY_COLORS.Critical} />
                  <Bar dataKey="High" stackId="a" fill={SEVERITY_COLORS.High} />
                  <Bar dataKey="Medium" stackId="a" fill={SEVERITY_COLORS.Medium} />
                  <Bar dataKey="Low" stackId="a" fill={SEVERITY_COLORS.Low} />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h4 className="text-lg font-semibold mb-4">Regional Risk Rankings</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Rank</th>
                    <th className="text-left py-2">Region</th>
                    <th className="text-right py-2">Risk Score</th>
                    <th className="text-right py-2">Total Reports</th>
                    <th className="text-right py-2">Critical</th>
                    <th className="text-right py-2">High</th>
                  </tr>
                </thead>
                <tbody>
                  {regionalData.map((region, index) => (
                    <tr key={region.region} className={index < 3 ? 'bg-red-50' : ''}>
                      <td className="py-2">{index + 1}</td>
                      <td className="py-2 font-medium">{region.region}</td>
                      <td className="text-right py-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          region.riskScore > 75 ? 'bg-red-100 text-red-800' :
                          region.riskScore > 50 ? 'bg-orange-100 text-orange-800' :
                          region.riskScore > 25 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {region.riskScore}/100
                        </span>
                      </td>
                      <td className="text-right py-2">{region.total}</td>
                      <td className="text-right py-2 text-red-600">{region.Critical}</td>
                      <td className="text-right py-2 text-orange-600">{region.High}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {reportType === 'constituency' && selectedRegion !== 'All Regions' && (
        <div className="bg-white rounded-xl shadow p-6">
          <h4 className="text-lg font-semibold mb-4">
            Constituency Analysis - {selectedRegion} Region
          </h4>
          {constituencyData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Constituency</th>
                    <th className="text-right py-2">Urgency Score</th>
                    <th className="text-right py-2">Total Reports</th>
                    <th className="text-right py-2">Critical</th>
                    <th className="text-right py-2">High</th>
                    <th className="text-right py-2">Est. Cost (₵)</th>
                  </tr>
                </thead>
                <tbody>
                  {constituencyData.map((constituency, index) => (
                    <tr key={constituency.constituency} className={index < 5 ? 'bg-yellow-50' : ''}>
                      <td className="py-2 font-medium">{constituency.constituency}</td>
                      <td className="text-right py-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          constituency.urgencyScore > 75 ? 'bg-red-100 text-red-800' :
                          constituency.urgencyScore > 50 ? 'bg-orange-100 text-orange-800' :
                          constituency.urgencyScore > 25 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {constituency.urgencyScore}/100
                        </span>
                      </td>
                      <td className="text-right py-2">{constituency.total}</td>
                      <td className="text-right py-2 text-red-600">{constituency.Critical}</td>
                      <td className="text-right py-2 text-orange-600">{constituency.High}</td>
                      <td className="text-right py-2">₵{constituency.totalCost.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No constituency data available for {selectedRegion}. Select a different region.
            </p>
          )}
        </div>
      )}

      {reportType === 'constituency' && selectedRegion === 'All Regions' && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
          <p className="text-yellow-800">
            Please select a specific region to view constituency breakdown analysis.
          </p>
        </div>
      )}

      {reportType === 'trends' && (
        <div className="bg-white rounded-xl shadow p-6">
          <h4 className="text-lg font-semibold mb-4">30-Day Severity Trends</h4>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="Critical" stroke={SEVERITY_COLORS.Critical} strokeWidth={2} />
                <Line type="monotone" dataKey="High" stroke={SEVERITY_COLORS.High} strokeWidth={2} />
                <Line type="monotone" dataKey="Medium" stroke={SEVERITY_COLORS.Medium} strokeWidth={2} />
                <Line type="monotone" dataKey="Low" stroke={SEVERITY_COLORS.Low} strokeWidth={2} />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* AI-Generated Summary Report */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 p-6 rounded-xl">
        <h4 className="text-lg font-bold text-green-800 mb-3">🤖 AI-Generated Summary Report</h4>
        <div className="prose prose-green max-w-none text-sm">
          <p className="mb-2">
            <strong>Analysis Period:</strong> Based on {insights.totalReports} citizen reports 
            {selectedRegion !== 'All Regions' && ` from ${selectedRegion} region`}
            {selectedSeverity !== 'All Severities' && ` with ${selectedSeverity} severity`}.
          </p>
          
          <p className="mb-2">
            <strong>Urgency Assessment:</strong> {insights.urgentPercentage}% of reports ({insights.urgentIssues} issues) 
            require immediate attention, including {insights.criticalCount} critical and {insights.highCount} high-priority cases.
          </p>
          
          {insights.topRiskRegion && (
            <p className="mb-2">
              <strong>Risk Hotspot:</strong> {insights.topRiskRegion.region} region shows the highest risk profile 
              with a score of {insights.topRiskRegion.riskScore}/100, reporting {insights.topRiskRegion.total} total issues.
            </p>
          )}
          
          <p className="mb-2">
            <strong>Financial Impact:</strong> Total estimated repair costs reach ₵{insights.totalCost.toLocaleString()}, 
            with critical issues averaging the highest per-incident costs.
          </p>
          
          <p className="text-green-700 font-medium">
            <strong>Recommendation:</strong> Prioritize resources for {insights.topRiskRegion?.region || 'high-risk regions'} 
            and address {insights.urgentIssues} urgent issues to prevent infrastructure deterioration and ensure citizen safety.
          </p>
        </div>
      </div>
    </div>
  )
}
