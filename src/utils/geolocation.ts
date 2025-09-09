import { GHANA_REGIONS } from '../data/sample'

interface Coordinates {
  lat: number
  lng: number
}

// Extended constituency data with approximate coordinates
// In a real application, you would have exact polygon boundaries for each constituency
const CONSTITUENCY_COORDINATES: Record<string, { region: string; coordinates: Coordinates }> = {
  // Greater Accra Region
  'Ablekuma Central': { region: 'Greater Accra', coordinates: { lat: 5.5945, lng: -0.2470 } },
  'Ablekuma North': { region: 'Greater Accra', coordinates: { lat: 5.6045, lng: -0.2570 } },
  'Ablekuma South': { region: 'Greater Accra', coordinates: { lat: 5.5845, lng: -0.2370 } },
  'Ablekuma West': { region: 'Greater Accra', coordinates: { lat: 5.5945, lng: -0.2670 } },
  'Accra Central': { region: 'Greater Accra', coordinates: { lat: 5.5592, lng: -0.1962 } },
  'Ayawaso Central': { region: 'Greater Accra', coordinates: { lat: 5.5992, lng: -0.1862 } },
  'Ayawaso East': { region: 'Greater Accra', coordinates: { lat: 5.6092, lng: -0.1762 } },
  'Ayawaso North': { region: 'Greater Accra', coordinates: { lat: 5.6192, lng: -0.1862 } },
  'Ayawaso West Wuogon': { region: 'Greater Accra', coordinates: { lat: 5.6092, lng: -0.1962 } },
  'Dome Kwabenya': { region: 'Greater Accra', coordinates: { lat: 5.6892, lng: -0.1762 } },
  'Ga Central': { region: 'Greater Accra', coordinates: { lat: 5.6392, lng: -0.2062 } },
  'Ga East': { region: 'Greater Accra', coordinates: { lat: 5.6892, lng: -0.1362 } },
  'Ga South': { region: 'Greater Accra', coordinates: { lat: 5.5392, lng: -0.2062 } },
  'Ga West': { region: 'Greater Accra', coordinates: { lat: 5.6392, lng: -0.2462 } },
  'Krowor': { region: 'Greater Accra', coordinates: { lat: 5.5892, lng: -0.1462 } },
  'Ledzokuku': { region: 'Greater Accra', coordinates: { lat: 5.5792, lng: -0.1562 } },
  'Madina': { region: 'Greater Accra', coordinates: { lat: 5.6892, lng: -0.1562 } },
  'Odododiodoo': { region: 'Greater Accra', coordinates: { lat: 5.5392, lng: -0.2162 } },
  'Okaikwei Central': { region: 'Greater Accra', coordinates: { lat: 5.6192, lng: -0.2162 } },
  'Okaikwei North': { region: 'Greater Accra', coordinates: { lat: 5.6292, lng: -0.2162 } },
  'Okaikwei South': { region: 'Greater Accra', coordinates: { lat: 5.6092, lng: -0.2162 } },
  'Tema Central': { region: 'Greater Accra', coordinates: { lat: 5.6392, lng: -0.0262 } },
  'Tema East': { region: 'Greater Accra', coordinates: { lat: 5.6492, lng: -0.0162 } },
  'Tema West': { region: 'Greater Accra', coordinates: { lat: 5.6292, lng: -0.0362 } },
  'Weija Gbawe': { region: 'Greater Accra', coordinates: { lat: 5.5592, lng: -0.3162 } },

  // Ashanti Region (Kumasi area)
  'Kumasi Central': { region: 'Ashanti', coordinates: { lat: 6.6885, lng: -1.6244 } },
  'Kumasi North': { region: 'Ashanti', coordinates: { lat: 6.7085, lng: -1.6244 } },
  'Kumasi South': { region: 'Ashanti', coordinates: { lat: 6.6685, lng: -1.6244 } },
  'Kumasi Asokwa': { region: 'Ashanti', coordinates: { lat: 6.6785, lng: -1.6344 } },
  'Suame': { region: 'Ashanti', coordinates: { lat: 6.6985, lng: -1.6444 } },
  'Subin': { region: 'Ashanti', coordinates: { lat: 6.6985, lng: -1.6144 } },
  'Nhyiaeso': { region: 'Ashanti', coordinates: { lat: 6.7085, lng: -1.6144 } },
  'Oforikrom': { region: 'Ashanti', coordinates: { lat: 6.6785, lng: -1.6044 } },
  'Old Tafo': { region: 'Ashanti', coordinates: { lat: 6.7185, lng: -1.5944 } },
  'Manhyia North': { region: 'Ashanti', coordinates: { lat: 6.7185, lng: -1.6344 } },
  'Manhyia South': { region: 'Ashanti', coordinates: { lat: 6.7085, lng: -1.6344 } },
  'Bekwai': { region: 'Ashanti', coordinates: { lat: 6.4585, lng: -1.5744 } },
  'Obuasi East': { region: 'Ashanti', coordinates: { lat: 6.2085, lng: -1.6644 } },
  'Obuasi West': { region: 'Ashanti', coordinates: { lat: 6.1985, lng: -1.6744 } },

  // Western Region
  'Sekondi': { region: 'Western', coordinates: { lat: 4.9244, lng: -1.7054 } },
  'Takoradi': { region: 'Western', coordinates: { lat: 4.8944, lng: -1.7554 } },
  'Effia': { region: 'Western', coordinates: { lat: 4.9144, lng: -1.7254 } },
  'Kwesimintsim': { region: 'Western', coordinates: { lat: 4.9044, lng: -1.7354 } },
  'Shama': { region: 'Western', coordinates: { lat: 4.9444, lng: -1.6854 } },
  'Mpohor': { region: 'Western', coordinates: { lat: 5.1844, lng: -1.7854 } },
  'Tarkwa Nsuaem': { region: 'Western', coordinates: { lat: 5.2844, lng: -1.9854 } },

  // Eastern Region
  'New Juaben North': { region: 'Eastern', coordinates: { lat: 6.0998, lng: -0.2474 } },
  'New Juaben South': { region: 'Eastern', coordinates: { lat: 6.0798, lng: -0.2574 } },
  'Nsawam Adoagyire': { region: 'Eastern', coordinates: { lat: 5.8098, lng: -0.3474 } },
  'Suhum': { region: 'Eastern', coordinates: { lat: 6.0398, lng: -0.4474 } },
  'Akuapem North': { region: 'Eastern', coordinates: { lat: 5.9098, lng: -0.1474 } },
  'Akuapem South': { region: 'Eastern', coordinates: { lat: 5.8898, lng: -0.1574 } },
  'Yilo Krobo': { region: 'Eastern', coordinates: { lat: 6.1398, lng: 0.0526 } },
  'Upper Manya Krobo': { region: 'Eastern', coordinates: { lat: 6.1098, lng: 0.0326 } },
  'Lower Manya Krobo': { region: 'Eastern', coordinates: { lat: 6.0898, lng: 0.0426 } },
  'Akim Oda': { region: 'Eastern', coordinates: { lat: 5.9298, lng: -0.9774 } },

  // Northern Region
  'Tamale Central': { region: 'Northern', coordinates: { lat: 9.4034, lng: -0.8424 } },
  'Tamale North': { region: 'Northern', coordinates: { lat: 9.4234, lng: -0.8424 } },
  'Tamale South': { region: 'Northern', coordinates: { lat: 9.3834, lng: -0.8424 } },
  'Savelugu': { region: 'Northern', coordinates: { lat: 9.6234, lng: -0.8224 } },
  'Tolon': { region: 'Northern', coordinates: { lat: 9.7234, lng: -0.9224 } },
  'Kumbungu': { region: 'Northern', coordinates: { lat: 9.5234, lng: -0.9424 } },
  'Yendi': { region: 'Northern', coordinates: { lat: 9.4434, lng: -0.0124 } },
  'Zabzugu': { region: 'Northern', coordinates: { lat: 9.2234, lng: -0.1324 } },

  // Volta Region
  'Ho Central': { region: 'Volta', coordinates: { lat: 6.6086, lng: 0.4710 } },
  'Ho West': { region: 'Volta', coordinates: { lat: 6.5886, lng: 0.4510 } },
  'Hohoe': { region: 'Volta', coordinates: { lat: 7.1586, lng: 0.4710 } },
  'Keta': { region: 'Volta', coordinates: { lat: 5.9186, lng: 0.9910 } },
  'Anlo': { region: 'Volta', coordinates: { lat: 5.7986, lng: 0.8910 } },
  'Ketu South': { region: 'Volta', coordinates: { lat: 5.9386, lng: 1.0110 } },

  // Central Region
  'Cape Coast North': { region: 'Central', coordinates: { lat: 5.1393, lng: -1.2361 } },
  'Cape Coast South': { region: 'Central', coordinates: { lat: 5.1193, lng: -1.2461 } },
  'Komenda Edina Eguafo Abirem': { region: 'Central', coordinates: { lat: 5.0793, lng: -1.3461 } },
  'Mfantseman': { region: 'Central', coordinates: { lat: 5.2993, lng: -0.8461 } },
  'Awutu Senya East': { region: 'Central', coordinates: { lat: 5.3993, lng: -0.6461 } },
  'Awutu Senya West': { region: 'Central', coordinates: { lat: 5.3793, lng: -0.6661 } },
  'Effutu': { region: 'Central', coordinates: { lat: 5.2793, lng: -0.5461 } },

  // Upper East Region
  'Bolgatanga Central': { region: 'Upper East', coordinates: { lat: 10.7854, lng: -0.8513 } },
  'Bolgatanga East': { region: 'Upper East', coordinates: { lat: 10.7954, lng: -0.8413 } },
  'Bawku Central': { region: 'Upper East', coordinates: { lat: 11.0554, lng: -0.2513 } },
  'Bawku West': { region: 'Upper East', coordinates: { lat: 11.0454, lng: -0.2613 } },

  // Upper West Region
  'Wa Central': { region: 'Upper West', coordinates: { lat: 10.0607, lng: -2.5057 } },
  'Wa East': { region: 'Upper West', coordinates: { lat: 10.0707, lng: -2.4957 } },
  'Wa West': { region: 'Upper West', coordinates: { lat: 10.0507, lng: -2.5157 } },
  'Lawra': { region: 'Upper West', coordinates: { lat: 10.6507, lng: -2.9057 } },

  // Brong Ahafo Region
  'Sunyani East': { region: 'Brong Ahafo', coordinates: { lat: 7.3486, lng: -2.3165 } },
  'Sunyani West': { region: 'Brong Ahafo', coordinates: { lat: 7.3286, lng: -2.3365 } },
  'Techiman North': { region: 'Brong Ahafo', coordinates: { lat: 7.5986, lng: -1.9365 } },
  'Techiman South': { region: 'Brong Ahafo', coordinates: { lat: 7.5786, lng: -1.9465 } },
  'Berekum East': { region: 'Brong Ahafo', coordinates: { lat: 7.4486, lng: -2.5765 } },
  'Berekum West': { region: 'Brong Ahafo', coordinates: { lat: 7.4386, lng: -2.5865 } },
}

/**
 * Calculate the distance between two coordinates using Haversine formula
 */
function calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = (coord2.lat - coord1.lat) * Math.PI / 180
  const dLng = (coord2.lng - coord1.lng) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

/**
 * Find the nearest constituency based on GPS coordinates
 */
export function findNearestConstituency(latitude: number, longitude: number): {
  constituency: string
  region: string
  distance: number
} | null {
  const userLocation: Coordinates = { lat: latitude, lng: longitude }
  let nearestConstituency = null
  let minDistance = Infinity

  // Check all constituency coordinates
  for (const [constituency, data] of Object.entries(CONSTITUENCY_COORDINATES)) {
    const distance = calculateDistance(userLocation, data.coordinates)
    if (distance < minDistance) {
      minDistance = distance
      nearestConstituency = {
        constituency,
        region: data.region,
        distance
      }
    }
  }

  // If no exact match found, try to determine region based on general area
  if (!nearestConstituency || minDistance > 50) {
    // Check if coordinates fall within any region's general boundary
    for (const [regionName, regionData] of Object.entries(GHANA_REGIONS)) {
      const regionDistance = calculateDistance(userLocation, regionData.coordinates)
      if (regionDistance < 100) { // Within 100km of region center
        // Find a default constituency for this region
        const regionConstituencies = regionData.constituencies
        const defaultConstituency = regionConstituencies[0] // Use first constituency as default
        
        return {
          constituency: defaultConstituency,
          region: regionName,
          distance: regionDistance
        }
      }
    }
  }

  return nearestConstituency
}

/**
 * Reverse geocoding using a simple coordinate-based lookup
 * In a real application, you might use Google Maps API or similar service
 */
export function reverseGeocode(latitude: number, longitude: number): Promise<{
  constituency: string
  region: string
  confidence: 'high' | 'medium' | 'low'
}> {
  return new Promise((resolve, reject) => {
    try {
      const result = findNearestConstituency(latitude, longitude)
      
      if (result) {
        let confidence: 'high' | 'medium' | 'low' = 'low'
        
        if (result.distance < 5) confidence = 'high'
        else if (result.distance < 15) confidence = 'medium'
        
        resolve({
          constituency: result.constituency,
          region: result.region,
          confidence
        })
      } else {
        reject(new Error('Unable to determine constituency from coordinates'))
      }
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Check if coordinates are within Ghana's approximate boundaries
 */
export function isWithinGhana(latitude: number, longitude: number): boolean {
  // Ghana's approximate boundaries
  const GHANA_BOUNDS = {
    north: 11.2,
    south: 4.5,
    east: 1.3,
    west: -3.3
  }
  
  return (
    latitude >= GHANA_BOUNDS.south &&
    latitude <= GHANA_BOUNDS.north &&
    longitude >= GHANA_BOUNDS.west &&
    longitude <= GHANA_BOUNDS.east
  )
}
