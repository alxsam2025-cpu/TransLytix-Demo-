export type Report = {
  id: string
  region: string
  constituency: string
  severity: 'Low' | 'Medium' | 'High' | 'Critical'
  status: 'New' | 'In Progress' | 'Resolved'
  photoUrl: string
  lat: number
  lng: number
  timestamp: number
  note?: string
  estimatedCost?: number // Cost in Ghana Cedis
}

// Ghana Regions and their constituencies
export const GHANA_REGIONS = {
  'Greater Accra': {
    capital: 'Accra',
    coordinates: { lat: 5.6037, lng: -0.1870 },
    constituencies: [
      'Ablekuma Central', 'Ablekuma North', 'Ablekuma South', 'Ablekuma West',
      'Accra Central', 'Ayawaso Central', 'Ayawaso East', 'Ayawaso North',
      'Ayawaso West Wuogon', 'Bortianor Ngleshie Amanfro', 'Dome Kwabenya',
      'Ga Central', 'Ga East', 'Ga North', 'Ga South', 'Ga West',
      'Kpone Katamanso', 'Krowor', 'Ledzokuku', 'Madina', 'Manhyia North',
      'Ningo Prampram', 'Odododiodio', 'Okaikwei Central', 'Okaikwei North',
      'Okaikwei South', 'Shai Osudoku', 'Tema Central', 'Tema East', 'Tema West',
      'Trobu', 'Weija Gbawe'
    ]
  },
  'Ashanti': {
    capital: 'Kumasi',
    coordinates: { lat: 6.6885, lng: -1.6244 },
    constituencies: [
      'Adansi North', 'Adansi South', 'Afigya Kwabre North', 'Afigya Kwabre South',
      'Ahafo Ano North', 'Ahafo Ano South East', 'Ahafo Ano South West',
      'Akrofuom', 'Amansie Central', 'Amansie South', 'Amansie West',
      'Asante Akim Central', 'Asante Akim North', 'Asante Akim South',
      'Asokore Mampong', 'Atwima Kwanwoma', 'Atwima Mponua', 'Atwima Nwabiagya North',
      'Atwima Nwabiagya South', 'Bekwai', 'Bosome Freho', 'Bosomtwe',
      'Ejura Sekyedumase', 'Ejuratia', 'Juaben', 'Kwabre East', 'Kumasi Asokwa',
      'Kumasi Central', 'Kumasi North', 'Kumasi South', 'Manhyia North',
      'Manhyia South', 'Mampong', 'New Juaben North', 'New Juaben South',
      'Nhyiaeso', 'Obuasi East', 'Obuasi West', 'Oforikrom', 'Offinso North',
      'Offinso South', 'Old Tafo', 'Sekyere Afram Plains', 'Sekyere Central',
      'Sekyere East', 'Sekyere Kumawu', 'Sekyere South', 'Suame', 'Subin'
    ]
  },
  'Western': {
    capital: 'Sekondi-Takoradi',
    coordinates: { lat: 4.9344, lng: -1.7854 },
    constituencies: [
      'Ahanta West', 'Aowin', 'Bibiani Anhwiaso Bekwai', 'Bia East', 'Bia West',
      'Bodi', 'Effia', 'Ellembelle', 'Evalue Ajomoro Gwira', 'Jomoro',
      'Juaboso', 'Kwesimintsim', 'Mpohor', 'Nzema East Prestea Huni Valley',
      'Prestea Huni Valley', 'Sefwi Akontombra', 'Sefwi Bekwai', 'Sefwi Wiawso',
      'Sekondi', 'Shama', 'Suaman', 'Takoradi', 'Tarkwa Nsuaem', 'Wassa Amenfi Central',
      'Wassa Amenfi East', 'Wassa Amenfi West', 'Wassa East'
    ]
  },
  'Eastern': {
    capital: 'Koforidua',
    coordinates: { lat: 6.0898, lng: -0.2574 },
    constituencies: [
      'Abetifi', 'Abirem', 'Afram Plains North', 'Afram Plains South',
      'Akim Abuakwa North', 'Akim Abuakwa South', 'Akim Oda', 'Akim Swedru',
      'Akuapem North', 'Akuapem South', 'Akyemansa', 'Atiwa East', 'Atiwa West',
      'Ayensuano', 'Birim Central', 'Birim North', 'Birim South', 'Fanteakwa North',
      'Fanteakwa South', 'Kade', 'Kwaebibirem', 'Kwahu Afram Plains North',
      'Kwahu Afram Plains South', 'Kwahu East', 'Kwahu South', 'Kwahu West',
      'Lower Manya Krobo', 'Mpraeso', 'New Juaben North', 'New Juaben South',
      'Nkawkaw', 'Nsawam Adoagyire', 'Okere', 'Suhum', 'Upper Manya Krobo',
      'Upper West Akim', 'Yilo Krobo'
    ]
  },
  'Northern': {
    capital: 'Tamale',
    coordinates: { lat: 9.4034, lng: -0.8424 },
    constituencies: [
      'Bimbilla', 'Chereponi', 'Daboya Mankarigu', 'Gushegu', 'Karaga',
      'Kpandai', 'Kumbungu', 'Mion', 'Nabdam', 'Nanton', 'Saboba',
      'Savelugu', 'Tamale Central', 'Tamale North', 'Tamale South',
      'Tatale Sanguli', 'Tolon', 'Wulensi', 'Yendi', 'Zabzugu'
    ]
  },
  'Volta': {
    capital: 'Ho',
    coordinates: { lat: 6.6086, lng: 0.4710 },
    constituencies: [
      'Adaklu', 'Agotime Ziope', 'Akatsi North', 'Akatsi South',
      'Anlo', 'Ave', 'Buem', 'Central Tongu', 'Ho Central', 'Ho West',
      'Hohoe', 'Jasikan', 'Kadjebi', 'Keta', 'Ketu North', 'Ketu South',
      'Krachi East', 'Krachi Nchumuru', 'Krachi West', 'Nkwanta North',
      'Nkwanta South', 'North Dayi', 'North Tongu', 'Some', 'South Dayi',
      'South Tongu'
    ]
  },
  'Central': {
    capital: 'Cape Coast',
    coordinates: { lat: 5.1293, lng: -1.2461 },
    constituencies: [
      'Abura Asebu Kwamankese', 'Agona East', 'Agona West', 'Ajumako Enyan Essiam',
      'Assin Central', 'Assin North', 'Assin South', 'Awutu Senya East',
      'Awutu Senya West', 'Cape Coast North', 'Cape Coast South', 'Effutu',
      'Ekumfi', 'Gomoa Central', 'Gomoa East', 'Gomoa West', 'Hemang Lower Denkyira',
      'Komenda Edina Eguafo Abirem', 'Mfantseman', 'Twifo Ati Mokwa',
      'Twifo Hemang Lower Denkyira', 'Upper Denkyira East', 'Upper Denkyira West'
    ]
  },
  'Upper East': {
    capital: 'Bolgatanga',
    coordinates: { lat: 10.7854, lng: -0.8513 },
    constituencies: [
      'Bawku Central', 'Bawku West', 'Binduri', 'Bolgatanga Central',
      'Bolgatanga East', 'Builsa North', 'Builsa South', 'Garu',
      'Nabdam', 'Pusiga', 'Tempane', 'Zebilla'
    ]
  },
  'Upper West': {
    capital: 'Wa',
    coordinates: { lat: 10.0607, lng: -2.5057 },
    constituencies: [
      'Daffiama Bussie Issa', 'Jirapa', 'Lambussie Karni', 'Lawra',
      'Nadowli Kaleo', 'Nandom', 'Sissala East', 'Sissala West',
      'Wa Central', 'Wa East', 'Wa West'
    ]
  },
  'Brong Ahafo': {
    capital: 'Sunyani',
    coordinates: { lat: 7.3386, lng: -2.3265 },
    constituencies: [
      'Asunafo North', 'Asunafo South', 'Asutifi North', 'Asutifi South',
      'Atebubu Amantin', 'Banda', 'Berekum East', 'Berekum West',
      'Dormaa Central', 'Dormaa East', 'Dormaa West', 'Jaman North',
      'Jaman South', 'Kintampo North', 'Kintampo South', 'Nkoranza North',
      'Nkoranza South', 'Pru East', 'Pru West', 'Sene East', 'Sene West',
      'Sunyani East', 'Sunyani West', 'Tain', 'Techiman North',
      'Techiman South', 'Wenchi', 'Yapei Kusawgu'
    ]
  }
}

export const getAllConstituencies = () => {
  return Object.values(GHANA_REGIONS).flatMap(region => region.constituencies)
}

export const getRegionByConstituency = (constituency: string) => {
  for (const [regionName, regionData] of Object.entries(GHANA_REGIONS)) {
    if (regionData.constituencies.includes(constituency)) {
      return regionName
    }
  }
  return null
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

function getConstituencyCoord(constituency: string) {
  const region = getRegionByConstituency(constituency)
  if (!region) return { lat: 5.6037, lng: -0.1870 } // Default to Accra
  
  const regionData = GHANA_REGIONS[region as keyof typeof GHANA_REGIONS]
  const baseCoords = regionData.coordinates
  
  // Add small random offset for constituency-level positioning
  return {
    lat: baseCoords.lat + (Math.random() - 0.5) * 0.5,
    lng: baseCoords.lng + (Math.random() - 0.5) * 0.5
  }
}

function estimateRepairCost(severity: Report['severity']): number {
  // Cost estimates in Ghana Cedis based on severity
  const baseCosts = {
    'Low': 500,
    'Medium': 1500,
    'High': 5000,
    'Critical': 15000
  }
  
  const base = baseCosts[severity]
  // Add 20% random variation
  return Math.round(base * (0.8 + Math.random() * 0.4))
}

export function makeInitialReports(count = 60): Report[] {
  const constituencies = getAllConstituencies()
  const out: Report[] = []
  
  for (let i = 0; i < count; i++) {
    const constituency = pick(constituencies)
    const region = getRegionByConstituency(constituency)!
    const { lat, lng } = getConstituencyCoord(constituency)
    const severity = pick(severities)
    
    out.push({
      id: crypto.randomUUID(),
      region,
      constituency,
      severity,
      status: pick(statuses),
      photoUrl: pick(photos),
      lat,
      lng,
      timestamp: Date.now() - Math.floor(rand(0, 1000 * 60 * 60 * 24 * 7)),
      note: Math.random() > 0.6 ? 'Potholes and cracks observed' : undefined,
      estimatedCost: estimateRepairCost(severity)
    })
  }
  return out
}

export function computeRoadHealthIndex(reports: Report[]) {
  const weights: Record<Report['severity'], number> = { Low: 0.2, Medium: 0.5, High: 0.8, Critical: 1.0 }
  const scoreByRegion: Record<string, number> = {}
  const counts: Record<string, number> = {}
  
  for (const r of reports) {
    scoreByRegion[r.region] = (scoreByRegion[r.region] || 0) + weights[r.severity]
    counts[r.region] = (counts[r.region] || 0) + 1
  }
  
  const result: Record<string, number> = {}
  for (const region in scoreByRegion) {
    const avg = scoreByRegion[region] / counts[region]
    result[region] = Math.max(0, Math.round(100 - avg * 100))
  }
  return result
}

export function predictiveAlerts(reports: Report[]) {
  const recent = [...reports].sort((a, b) => b.timestamp - a.timestamp).slice(0, 30)
  const buckets: Record<string, number> = {}
  
  for (const r of recent) {
    const key = `${r.region}:${r.constituency}`
    if (r.severity === 'High' || r.severity === 'Critical') {
      buckets[key] = (buckets[key] || 0) + 1
    }
  }
  
  return Object.entries(buckets)
    .filter(([, n]) => n >= 3) // Lower threshold since we have fewer total reports
    .map(([key, n]) => ({
      key,
      count: n,
      message: `Predictive maintenance alert: ${key.replace(':', ' / ')} trending deteriorations.`
    }))
}

export function getTotalRepairCosts(reports: Report[]): Record<string, number> {
  const costsByRegion: Record<string, number> = {}
  
  for (const report of reports) {
    if (report.estimatedCost && report.status !== 'Resolved') {
      costsByRegion[report.region] = (costsByRegion[report.region] || 0) + report.estimatedCost
    }
  }
  
  return costsByRegion
}
