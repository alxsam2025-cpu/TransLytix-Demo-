import { create } from 'zustand'
import { Report, makeInitialReports, computeRoadHealthIndex, predictiveAlerts } from '../data/sample'

type State = {
  reports: Report[]
  lastUpdate: number
  addRandomReport: () => void
}

export const useDataStore = create<State>((set, get) => ({
  reports: makeInitialReports(60),
  lastUpdate: Date.now(),
  addRandomReport: () => {
    const one = makeInitialReports(1)[0]
    one.timestamp = Date.now()
    set({ reports: [one, ...get().reports].slice(0, 250), lastUpdate: Date.now() })
  }
}))

export const selectors = {
  roadHealthIndex: (s: State) => computeRoadHealthIndex(s.reports),
  predictiveAlerts: (s: State) => predictiveAlerts(s.reports),
}
