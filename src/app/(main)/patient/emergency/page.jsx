"use client"
import { useState } from "react"
import { Phone, MapPin, Clock, Ambulance, ArrowLeft, AlertTriangle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const symptoms = [
  "Chest Pain",
  "Difficulty Breathing",
  "Severe Headache",
  "High Fever",
  "Severe Abdominal Pain",
  "Loss of Consciousness",
  "Severe Bleeding",
  "Stroke Symptoms",
  "Heart Attack",
  "Allergic Reaction",
  "Other",
]

const nearbyHospitals = [
  {
    id: 1,
    name: "City General Hospital",
    distance: "2.3 km",
    hasICU: true,
    specialists: ["Cardiology", "Emergency Medicine", "Surgery"],
    rating: 4.8,
    estimatedTime: "8 mins",
    address: "123 Medical Center Dr, Cityville",
    phone: "+1 555-123-4567"
  },
  {
    id: 2,
    name: "Metro Emergency Center",
    distance: "3.1 km",
    hasICU: true,
    specialists: ["Emergency Medicine", "Trauma Surgery", "Neurology"],
    rating: 4.6,
    estimatedTime: "12 mins",
    address: "456 Emergency Way, Metropolis",
    phone: "+1 555-987-6543"
  },
  {
    id: 3,
    name: "Regional Medical Center",
    distance: "4.5 km",
    hasICU: true,
    specialists: ["Cardiology", "Neurology", "Emergency Medicine", "ICU"],
    rating: 4.9,
    estimatedTime: "15 mins",
    address: "789 Health Blvd, Regiontown",
    phone: "+1 555-456-7890"
  },
]

export default function EmergencyPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    symptoms: "",
    location: "",
    useCurrentLocation: false,
  })
  const [showResults, setShowResults] = useState(false)
  const [ambulanceRequested, setAmbulanceRequested] = useState(false)
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [locationError, setLocationError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowResults(true)
  }

  const handleAmbulanceRequest = (hospital) => {
    setAmbulanceRequested(hospital.id)
    router.push(`/emergency/ambulance?hospitalId=${hospital.id}`)
  }

  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      )
      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }
      
      const address = data.address
      let locationString = ""
      
      if (address.city || address.town || address.village) {
        locationString += address.city || address.town || address.village
      }
      if (address.state) {
        locationString += locationString ? `, ${address.state}` : address.state
      }
      if (address.country) {
        locationString += locationString ? `, ${address.country}` : address.country
      }
      
      return locationString || "Unknown location"
    } catch (error) {
      console.error("Reverse geocoding error:", error)
      return `${lat}, ${lng}` // Fallback to coordinates if reverse geocoding fails
    }
  }

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser")
      return
    }

    setIsGettingLocation(true)
    setLocationError(null)

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        })
      })

      const { latitude, longitude } = position.coords
      const address = await reverseGeocode(latitude, longitude)
      
      setFormData({
        ...formData,
        location: address,
        useCurrentLocation: true,
      })
    } catch (error) {
      console.error("Geolocation error:", error)
      switch(error.code) {
        case error.PERMISSION_DENIED:
          setLocationError("Location access was denied. Please enable permissions.")
          break
        case error.POSITION_UNAVAILABLE:
          setLocationError("Location information is unavailable.")
          break
        case error.TIMEOUT:
          setLocationError("The request to get location timed out.")
          break
        default:
          setLocationError("An error occurred while getting your location.")
      }
    } finally {
      setIsGettingLocation(false)
    }
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white text-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-2xl font-bold ml-4">Emergency Assistance</h1>
              <button
                onClick={() => setShowResults(false)}
                className="flex items-center px-3 py-1 text-black hover:bg-blue-200 transition-colors rounded"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-blue-600 mr-2" />
              <p className="text-blue-800 font-semibold">Emergency request submitted for: {formData.symptoms}</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6">Nearest Hospitals with ICU & Specialists</h2>

          <div className="space-y-4">
            {nearbyHospitals.map((hospital) => (
              <div key={hospital.id} className="bg-white rounded-lg shadow-md border-l-4 border-l-blue-500">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{hospital.name}</h3>
                      <div className="flex items-center mt-2 space-x-4">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          {hospital.distance}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          {hospital.estimatedTime}
                        </div>
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                          Rating: {hospital.rating}
                        </span>
                        {hospital.hasICU && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">ICU Available</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <button
                        onClick={() => handleAmbulanceRequest(hospital)}
                        disabled={ambulanceRequested === hospital.id}
                        className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                          ambulanceRequested === hospital.id
                            ? "bg-gray-100 text-gray-600 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        <Ambulance className="h-4 w-4 mr-2" />
                        {ambulanceRequested === hospital.id ? "Ambulance Requested" : "Request Ambulance"}
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Available Specialists:</p>
                    <div className="flex flex-wrap gap-2">
                      {hospital.specialists.map((specialist) => (
                        <span
                          key={specialist}
                          className="px-2 py-1 border border-gray-300 rounded-full text-sm text-gray-700"
                        >
                          {specialist}
                        </span>
                      ))}
                    </div>
                  </div>

                  {ambulanceRequested === hospital.id && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 font-semibold">✓ Ambulance dispatched to your location</p>
                      <p className="text-green-700 text-sm">Estimated arrival: 5-8 minutes</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Need immediate help?</p>
            <button className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-lg mx-auto">
              <Phone className="h-5 w-5 mr-2" />
              Call Emergency: 911
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold ml-4">Emergency Help</h1>
            <Link href="/dashboard">
              <button className="flex items-center px-3 py-1 text-black bg-blue-200 rounded-full hover:bg-blue-200 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md border-l-4 border-l-blue-500">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold flex items-center text-blue-600">
              <AlertTriangle className="h-6 w-6 mr-2" />
              Emergency Assistance Form
            </h2>
            <p className="text-gray-600 mt-2">Fill out this form to get immediate help and find nearby hospitals</p>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700">
                  Select Symptoms
                </label>
                <select
                  id="symptoms"
                  value={formData.symptoms}
                  onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Choose your symptoms</option>
                  {symptoms.map((symptom) => (
                    <option key={symptom} value={symptom}>
                      {symptom}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Your Location
                </label>
                <div className="flex space-x-2">
                  <input
                    id="location"
                    type="text"
                    placeholder="Enter your address or use current location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    disabled={isGettingLocation}
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGettingLocation ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <MapPin className="h-4 w-4 mr-2" />
                    )}
                    {isGettingLocation ? "Locating..." : "Use Current"}
                  </button>
                </div>
                {locationError && (
                  <p className="text-red-500 text-sm mt-1">{locationError}</p>
                )}
                {formData.useCurrentLocation && !locationError && (
                  <p className="text-green-600 text-sm mt-1">
                    ✓ Using your current location
                  </p>
                )}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                  <div>
                    <p className="text-yellow-800 font-semibold">Important:</p>
                    <p className="text-yellow-700 text-sm">
                      If this is a life-threatening emergency, call 911 immediately instead of using this form.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Get Emergency Help
                </button>
                <button
                  type="button"
                  className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call 911
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}