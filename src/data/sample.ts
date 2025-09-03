export type Report = {
  id: string
  country: 'Ghana' | 'Kenya' | 'Zimbabwe'
  region: string
  severity: 'Low' | 'Medium' | 'High' | 'Critical'
  status: 'New' | 'In Progress' | 'Resolved'
  photoUrl: string
  lat: number
  lng: number
  timestamp: number
  note?: string
}

export const REGIONS = {
  Ghana: ['Greater Accra','Ashanti','Northern','Volta','Western'],
  Kenya: ['Nairobi','Kiambu','Mombasa','Nakuru','Kisumu'],
  Zimbabwe: ['Harare','Bulawayo','Manicaland','Mashonaland West','Masvingo']
}

const photos = [
  'https://picsum.photos/seed/road1/400/260',
  'https://picsum.photos/seed/road2/400/260',
  'https://picsum.photos/seed/road3/400/260',
  'https://picsum.photos/seed/road4/400/260'
]

const severities: Report['severity'][] = ['Low','Medium','High','Critical']
const statuses: Report['status'][] = ['New','In Progress','Resolved']

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random()*arr.length)] }

function coord(country: Report['country']){
  const boxes = {
    Ghana: { lat:[4.5,11], lng:[-3.5,1.5] },
    Kenya: { lat:[-4.7,5.2], lng:[33.9,41.9] },
    Zimbabwe: { lat:[-22.4,-15.6], lng:[25.2,33.1] }
  } as const
  const b = boxes[country]
  return { lat: rand(b.lat[0], b.lat[1]), lng: rand(b.lng[0], b.lng[1]) }
}

export function makeInitialReports(count = 60): Report[] {
  const countries: Report['country'][] = ['Ghana','Kenya','Zimbabwe']
  const out: Report[] = []
  for (let i=0;i<count;i++){
    const c = pick(countries)
    const {lat,lng} = coord(c)
    out.push({
      id: crypto.randomUUID(),
      country: c,
      region: pick(REGIONS[c as keyof typeof REGIONS]),
      severity: pick(severities),
      status: pick(statuses),
      photoUrl: pick(photos),
      lat, lng,
      timestamp: Date.now() - Math.floor(rand(0, 1000*60*60*24*7)),
      note: Math.random() > 0.6 ? 'Potholes and cracks observed' : undefined
    })
  }
  return out
}

export function computeRoadHealthIndex(reports: Report[]) {
  const weights: Record<Report['severity'], number> = { Low: 0.2, Medium: 0.5, High: 0.8, Critical: 1.0 }
  const scoreByCountry: Record<string, number> = {}
  const counts: Record<string, number> = {}
  for (const r of reports){
    scoreByCountry[r.country] = (scoreByCountry[r.country] || 0) + weights[r.severity]
    counts[r.country] = (counts[r.country] || 0) + 1
  }
  const result: Record<string, number> = {}
  for (const c in scoreByCountry){
    const avg = scoreByCountry[c] / counts[c]
    result[c] = Math.max(0, Math.round(100 - avg*100))
  }
  return result
}

export function predictiveAlerts(reports: Report[]) {
  const recent = [...reports].sort((a,b)=>b.timestamp-a.timestamp).slice(0, 30)
  const buckets: Record<string, number> = {}
  for (const r of recent){
    const key = `${r.country}:${r.region}`
    if (r.severity === 'High' || r.severity === 'Critical'){
      buckets[key] = (buckets[key] || 0) + 1
    }
  }
  return Object.entries(buckets)
    .filter(([,n])=>n>=4)
    .map(([key,n])=>({ key, count:n, message:`Predictive maintenance alert: ${key.replace(':',' / ')} trending deteriorations.` }))
}
