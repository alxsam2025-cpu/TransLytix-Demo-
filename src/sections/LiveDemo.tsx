import { useState, useEffect } from 'react'
import { useDataStore } from '../store/useDataStore'
import { GHANA_REGIONS, getRegionByConstituency, Report } from '../data/sample'
import { MapPin, Phone, Mail, Camera, Video, Send, AlertTriangle, Navigation, MapPinCheck } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { reverseGeocode, isWithinGhana } from '../utils/geolocation'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix Leaflet icon in Vite
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

type FormData = {
  phoneNumber: string
  email: string
  region: string
  constituency: string
  specificArea: string
  severity: 'Low' | 'Medium' | 'High' | 'Critical'
  comments: string
  latitude?: number
  longitude?: number
  photoFiles?: File[]
  videoFile?: File
}

export default function LiveDemo(){
  const addReport = useDataStore(s => s.addReport)
  
  const [formData, setFormData] = useState<FormData>({
    phoneNumber: '',
    email: '',
    region: '',
    constituency: '',
    specificArea: '',
    severity: 'Low',
    comments: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [gpsStatus, setGpsStatus] = useState<'idle' | 'getting' | 'success' | 'error'>('idle')
  const [showMap, setShowMap] = useState(false)
  const [geoLocationResult, setGeoLocationResult] = useState<{
    constituency: string
    region: string
    confidence: 'high' | 'medium' | 'low'
  } | null>(null)

  const ghanaRegions = Object.keys(GHANA_REGIONS)
  const constituencies = formData.region 
    ? GHANA_REGIONS[formData.region as keyof typeof GHANA_REGIONS].constituencies 
    : []

  const getGPSLocation = () => {
    setGpsStatus('getting')
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude
          const longitude = position.coords.longitude
          
          // Check if location is within Ghana
          if (!isWithinGhana(latitude, longitude)) {
            setGpsStatus('error')
            console.error('Location is outside Ghana boundaries')
            return
          }
          
          // Update form data with coordinates
          setFormData(prev => ({
            ...prev,
            latitude,
            longitude
          }))
          
          // Try to determine constituency from GPS coordinates
          try {
            const geoResult = await reverseGeocode(latitude, longitude)
            setGeoLocationResult(geoResult)
            
            // Auto-fill region and constituency if not already filled
            setFormData(prev => ({
              ...prev,
              latitude,
              longitude,
              region: prev.region || geoResult.region,
              constituency: prev.constituency || geoResult.constituency
            }))
            
          } catch (error) {
            console.warn('Could not determine constituency from GPS:', error)
            // Still show success even if reverse geocoding fails
            setGeoLocationResult(null)
          }
          
          setGpsStatus('success')
          setShowMap(true) // Show map when GPS is successful
        },
        (error) => {
          console.error('GPS Error:', error)
          setGpsStatus('error')
          setGeoLocationResult(null)
        },
        {
          enableHighAccuracy: true,
          timeout: 15000, // Increased timeout for better accuracy
          maximumAge: 60000
        }
      )
    } else {
      setGpsStatus('error')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Create new report
    const newReport: Report = {
      id: crypto.randomUUID(),
      region: formData.region,
      constituency: formData.constituency,
      severity: formData.severity,
      status: 'New',
      photoUrl: 'https://picsum.photos/seed/road-report/400/260',
      lat: formData.latitude || GHANA_REGIONS[formData.region as keyof typeof GHANA_REGIONS]?.coordinates.lat || 5.6037,
      lng: formData.longitude || GHANA_REGIONS[formData.region as keyof typeof GHANA_REGIONS]?.coordinates.lng || -0.1870,
      timestamp: Date.now(),
      note: formData.comments,
      estimatedCost: formData.severity === 'Critical' ? 15000 : 
                    formData.severity === 'High' ? 5000 : 
                    formData.severity === 'Medium' ? 1500 : 500
    }
    
    addReport(newReport)
    setIsSubmitting(false)
    setSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        phoneNumber: '',
        email: '',
        region: '',
        constituency: '',
        specificArea: '',
        severity: 'Low',
        comments: ''
      })
      setGpsStatus('idle')
      setGeoLocationResult(null)
      setShowMap(false)
    }, 3000)
  }

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'region' ? { constituency: '' } : {})
    }))
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-green-50 border border-green-200 p-8 rounded-xl text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">Report Submitted Successfully!</h2>
          <p className="text-green-700 mb-4">
            Thank you for reporting the road condition in {formData.constituency}, {formData.region}.
          </p>
          <p className="text-sm text-green-600">
            Your report will help improve Ghana's road infrastructure. 
            Returning to form in a moment...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-red-50 border border-red-200 p-6 rounded-xl mb-6">
        <h2 className="text-2xl font-bold text-red-800 mb-2 flex items-center gap-2">
          📱 Report Road Damage
        </h2>
        <p className="text-red-700">
          Help improve roads by reporting issues in your community.
        </p>
      </div>

      {/* Report Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={formData.phoneNumber}
              onChange={(e) => updateFormData('phoneNumber', e.target.value)}
              placeholder="0XX XXX XXXX"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email Address (optional)
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {/* Location Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Region *
            </label>
            <select
              required
              value={formData.region}
              onChange={(e) => updateFormData('region', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Choose a Ghana Region...</option>
              {ghanaRegions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Constituency *
            </label>
            <select
              required
              value={formData.constituency}
              onChange={(e) => updateFormData('constituency', e.target.value)}
              disabled={!formData.region}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
            >
              <option value="">{formData.region ? 'Choose a Constituency...' : 'Select a region first'}</option>
              {constituencies.map(constituency => (
                <option key={constituency} value={constituency}>{constituency}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Specific Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-2" />
            Specific Area
          </label>
          <input
            type="text"
            value={formData.specificArea}
            onChange={(e) => updateFormData('specificArea', e.target.value)}
            placeholder="Street name, landmark, or specific location"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {/* GPS Location */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-blue-800 flex items-center gap-2">
              <Navigation className="w-4 h-4" />
              Use My GPS Location
              {(!formData.constituency || !formData.region) && (
                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                  Auto-fills constituency
                </span>
              )}
            </label>
            <button
              type="button"
              onClick={getGPSLocation}
              disabled={gpsStatus === 'getting'}
              className={`px-4 py-2 rounded-lg text-white font-medium transition-all ${
                gpsStatus === 'getting' ? 'bg-gray-400' :
                gpsStatus === 'success' ? 'bg-green-600' :
                gpsStatus === 'error' ? 'bg-red-600' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {gpsStatus === 'getting' ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block mr-2"></div>
                  Getting Location...
                </>
              ) : gpsStatus === 'success' ? '✓ Location Added' :
               gpsStatus === 'error' ? '✗ Location Failed' : '📍 Get GPS Location'}
            </button>
          </div>
          
          {gpsStatus === 'success' && formData.latitude && formData.longitude && (
            <div className="mt-3">
              <div className="bg-green-50 border border-green-200 p-3 rounded-lg mb-3">
                <p className="text-sm text-green-700 font-medium flex items-center gap-2">
                  <MapPinCheck className="w-4 h-4" />
                  🎯 Location captured: {formData.latitude.toFixed(6)}, {formData.longitude.toFixed(6)}
                </p>
                {geoLocationResult && (
                  <div className="mt-2 p-2 bg-green-100 rounded border border-green-300">
                    <p className="text-xs text-green-800 font-medium">
                      ✨ Auto-filled from GPS:
                    </p>
                    <p className="text-sm text-green-700">
                      <strong>Region:</strong> {geoLocationResult.region}
                    </p>
                    <p className="text-sm text-green-700">
                      <strong>Constituency:</strong> {geoLocationResult.constituency}
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      Confidence: {geoLocationResult.confidence === 'high' ? '🔥 High' : 
                                  geoLocationResult.confidence === 'medium' ? '🟡 Medium' : '🟠 Low'}
                      {geoLocationResult.confidence === 'low' && ' (Please verify accuracy)'}
                    </p>
                  </div>
                )}
              </div>
              
              {/* Interactive GPS Map */}
              <div className="bg-white rounded-lg overflow-hidden border border-blue-200">
                <div className="bg-blue-600 text-white px-3 py-2 text-sm font-medium">
                  🗺️ Your Location on Map
                </div>
                <div className="h-64">
                  <MapContainer 
                    center={[formData.latitude, formData.longitude]} 
                    zoom={15} 
                    style={{ height: '100%', width: '100%' }}
                    key={`${formData.latitude}-${formData.longitude}`}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution="&copy; OpenStreetMap contributors"
                    />
                    <Marker position={[formData.latitude, formData.longitude]}>
                      <Popup>
                        <div className="text-center">
                          <div className="font-semibold text-green-700">📍 Your Location</div>
                          <div className="text-xs text-gray-600 mt-1">
                            Lat: {formData.latitude.toFixed(6)}
                          </div>
                          <div className="text-xs text-gray-600">
                            Lng: {formData.longitude.toFixed(6)}
                          </div>
                          <div className="text-xs text-green-600 mt-2 font-medium">
                            ✓ Ready for report submission
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
                <div className="bg-gray-50 px-3 py-2 text-xs text-gray-600 border-t">
                  ℹ️ This location will be included with your road damage report
                </div>
              </div>
            </div>
          )}
          
          {gpsStatus === 'error' && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">
                ⚠️ Unable to get your location or determine constituency. Please ensure:
              </p>
              <ul className="text-xs text-red-600 mt-1 ml-4 list-disc">
                <li>Location services are enabled in your browser</li>
                <li>You granted permission when prompted</li>
                <li>You are physically located within Ghana</li>
                <li>You have a stable internet connection</li>
              </ul>
              <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-xs text-yellow-700">
                  📍 <strong>Alternative:</strong> Manually select your region and constituency from the dropdowns above.
                </p>
              </div>
              <button
                type="button"
                onClick={getGPSLocation}
                className="mt-2 px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          )}
        </div>

        {/* Upload Files */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Camera className="w-4 h-4 inline mr-2" />
              Upload Image/Video
            </label>
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            <p className="text-xs text-gray-500 mt-1">Upload photos or videos of the road condition</p>
          </div>
        </div>

        {/* Impact Severity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <AlertTriangle className="w-4 h-4 inline mr-2" />
            Impact Severity *
          </label>
          <select
            required
            value={formData.severity}
            onChange={(e) => updateFormData('severity', e.target.value as FormData['severity'])}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="Low">Low - Minor issues, passable</option>
            <option value="Medium">Medium - Noticeable damage, some difficulty</option>
            <option value="High">High - Significant damage, major difficulty</option>
            <option value="Critical">Critical - Severe damage, dangerous/impassable</option>
          </select>
        </div>

        {/* Additional Comments */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Comments
          </label>
          <textarea
            rows={4}
            value={formData.comments}
            onChange={(e) => updateFormData('comments', e.target.value)}
            placeholder="Describe the road condition, damage details, or any additional information..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting || !formData.phoneNumber || !formData.region || !formData.constituency}
            className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-semibold text-white ${
              isSubmitting || !formData.phoneNumber || !formData.region || !formData.constituency
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                Submitting Report...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Report
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

