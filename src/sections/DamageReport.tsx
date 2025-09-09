import { useMemo, useState } from 'react'
import { Download, Search, Filter } from 'lucide-react'
import { useDataStore } from '../store/useDataStore'
import { GHANA_REGIONS, getAllConstituencies, getTotalRepairCosts } from '../data/sample'

export default function DamageReport(){
  const reports = useDataStore(s=>s.reports)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('All')
  const [selectedConstituency, setSelectedConstituency] = useState('All')
  const [selectedSeverity, setSelectedSeverity] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [activeTab, setActiveTab] = useState<'all' | 'regional' | 'constituency'>('all')

  const regions = Object.keys(GHANA_REGIONS)
  const constituencies = selectedRegion === 'All' 
    ? getAllConstituencies()
    : GHANA_REGIONS[selectedRegion as keyof typeof GHANA_REGIONS].constituencies

  const filteredReports = useMemo(() => {
    return reports.filter(r => {
      if (selectedRegion !== 'All' && r.region !== selectedRegion) return false
      if (selectedConstituency !== 'All' && r.constituency !== selectedConstituency) return false
      if (selectedSeverity !== 'All' && r.severity !== selectedSeverity) return false
      if (selectedStatus !== 'All' && r.status !== selectedStatus) return false
      if (searchTerm && !r.constituency.toLowerCase().includes(searchTerm.toLowerCase())) return false
      return true
    }).sort((a, b) => b.timestamp - a.timestamp)
  }, [reports, searchTerm, selectedRegion, selectedConstituency, selectedSeverity, selectedStatus])

  const summary = useMemo(() => {
    const totalCost = filteredReports.reduce((sum, r) => sum + (r.estimatedCost || 0), 0)
    const avgCost = filteredReports.length ? totalCost / filteredReports.length : 0
    const bySeverity = { Low: 0, Medium: 0, High: 0, Critical: 0 }
    filteredReports.forEach(r => bySeverity[r.severity]++)
    
    return { totalCost, avgCost, bySeverity }
  }, [filteredReports])

  const downloadCSV = () => {
    const headers = ['Region', 'Regional Capital', 'Constituency', 'Severity', 'Status', 'Est. Cost (GHS)', 'Date', 'Note']
    const rows = filteredReports.map(r => {
      const regionData = GHANA_REGIONS[r.region as keyof typeof GHANA_REGIONS]
      return [
        r.region,
        regionData?.capital || 'N/A',
        r.constituency,
        r.severity,
        r.status,
        r.estimatedCost || 0,
        new Date(r.timestamp).toLocaleDateString(),
        r.note || ''
      ]
    })
    
    const totalBudget = filteredReports.reduce((sum, r) => sum + (r.estimatedCost || 0), 0)
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
      '',
      `"SUMMARY: ${filteredReports.length} reports"`,
      `"TOTAL ESTIMATED BUDGET: GHS ${totalBudget.toLocaleString()}"`
    ].join('\\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ghana-road-damage-report-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
        <h2 className="text-xl font-bold text-green-800 mb-2">🇬🇭 Ghana Road Damage Reports</h2>
        <p className="text-sm text-green-700">
          Comprehensive damage reports across all {Object.keys(GHANA_REGIONS).length} Ghana regions and 275+ constituencies.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'all' 
              ? 'bg-white text-green-700 shadow' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          All Reports
        </button>
        <button
          onClick={() => setActiveTab('regional')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'regional' 
              ? 'bg-white text-green-700 shadow' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          By Regional Capitals
        </button>
        <button
          onClick={() => setActiveTab('constituency')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'constituency' 
              ? 'bg-white text-green-700 shadow' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          By Constituency
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-xl">
          <h3 className="font-semibold text-blue-800">Total Reports</h3>
          <div className="text-2xl font-bold text-blue-600">{filteredReports.length}</div>
        </div>
        <div className="bg-green-50 p-4 rounded-xl">
          <h3 className="font-semibold text-green-800">Total Cost</h3>
          <div className="text-lg font-bold text-green-600">GHS {summary.totalCost.toLocaleString()}</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-xl">
          <h3 className="font-semibold text-yellow-800">Average Cost</h3>
          <div className="text-lg font-bold text-yellow-600">GHS {Math.round(summary.avgCost).toLocaleString()}</div>
        </div>
        <div className="bg-red-50 p-4 rounded-xl">
          <h3 className="font-semibold text-red-800">Critical/High</h3>
          <div className="text-2xl font-bold text-red-600">{summary.bySeverity.Critical + summary.bySeverity.High}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search constituency..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-md"
            />
          </div>
          
          <select value={selectedRegion} onChange={e => {setSelectedRegion(e.target.value); setSelectedConstituency('All')}} className="px-3 py-2 border rounded-md">
            <option value="All">All Regions</option>
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          
          <select value={selectedConstituency} onChange={e => setSelectedConstituency(e.target.value)} className="px-3 py-2 border rounded-md">
            <option value="All">All Constituencies</option>
            {constituencies.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          
          <select value={selectedSeverity} onChange={e => setSelectedSeverity(e.target.value)} className="px-3 py-2 border rounded-md">
            <option value="All">All Severities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
          
          <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)} className="px-3 py-2 border rounded-md">
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
          
          <button onClick={downloadCSV} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            <Download className="w-4 h-4" />
            Download CSV
          </button>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Region</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Capital</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Constituency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Est. Cost (GHS)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredReports.map(r => {
                const regionData = GHANA_REGIONS[r.region as keyof typeof GHANA_REGIONS]
                return (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{new Date(r.timestamp).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{r.region}</td>
                    <td className="px-6 py-4 text-sm text-blue-600 font-medium">{regionData?.capital || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{r.constituency}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        r.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                        r.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                        r.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {r.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{r.status}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{r.estimatedCost?.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{r.note}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
