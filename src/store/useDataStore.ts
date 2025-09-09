import { create } from 'zustand'
import { Report, makeInitialReports, computeRoadHealthIndex, predictiveAlerts, getTotalRepairCosts } from '../data/sample'

type State = {
  reports: Report[]
  lastUpdate: number
  addRandomReport: () => void
  addReport: (report: Report) => void
  getReportsByRegion: (region: string) => Report[]
  getReportsByConstituency: (constituency: string) => Report[]
  getTotalCostsByRegion: () => Record<string, number>
}

export const useDataStore = create<State>((set, get) => ({
  reports: makeInitialReports(60),
  lastUpdate: Date.now(),
  addRandomReport: () => {
    const one = makeInitialReports(1)[0]
    one.timestamp = Date.now()
    set({ reports: [one, ...get().reports].slice(0, 250), lastUpdate: Date.now() })
  },
  addReport: (report: Report) => {
    set({ reports: [report, ...get().reports].slice(0, 250), lastUpdate: Date.now() })
  },
  getReportsByRegion: (region: string) => {
    return get().reports.filter(r => r.region === region)
  },
  getReportsByConstituency: (constituency: string) => {
    return get().reports.filter(r => r.constituency === constituency)
  },
  getTotalCostsByRegion: () => {
    return getTotalRepairCosts(get().reports)
  }
}))

export const selectors = {
  roadHealthIndex: (s: State) => computeRoadHealthIndex(s.reports),
  predictiveAlerts: (s: State) => predictiveAlerts(s.reports),
  totalRepairCosts: (s: State) => getTotalRepairCosts(s.reports),
}
