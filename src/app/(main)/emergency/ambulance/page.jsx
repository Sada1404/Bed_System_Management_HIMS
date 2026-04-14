"use client"
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Phone, MapPin, Clock, Ambulance, ArrowLeft, AlertTriangle } from 'lucide-react';

import 'leaflet/dist/leaflet.css';

const L = typeof window !== 'undefined' ? require('leaflet') : null;

const hospitals = [
  {
    id: 1,
    name: 'City General Hospital',
    address: '123 Medical Center Dr, Cityville',
    phone: '+1 555-123-4567'
  },
  {
    id: 2,
    name: 'Metro Emergency Center',
    address: '456 Emergency Way, Metropolis',
    phone: '+1 555-987-6543'
  },
  {
    id: 3,
    name: 'Regional Medical Center',
    address: '789 Health Blvd, Regiontown',
    phone: '+1 555-456-7890'
  }
];

const ambulanceData = {
  driverName: "John Smith",
  driverNumber: "+15551234567",
  ambulanceNumber: "EMS-7890",
  eta: "5-8 minutes",
  currentLocation: {
    lat: 28.5355,
    lng: 77.3910
  },
  destination: {
    lat: 28.5245,
    lng: 77.1855
  }
};

export default function AmbulanceTracking() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const hospitalId = searchParams.get('hospitalId');
    
    if (!hospitalId) {
      router.push('/emergency/redirect');
      return;
    }

    const hospital = hospitals.find(h => h.id === parseInt(hospitalId));
    
    if (!hospital) {
      router.push('/emergency/redirect');
      return;
    }

    setSelectedHospital(hospital);
    setMapInitialized(true);
  }, [searchParams, router]);

  useEffect(() => {
    if (mapInitialized && L && selectedHospital && !map) {
      initMap();
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [mapInitialized, selectedHospital]);

  const initMap = () => {
    const mapInstance = L.map('map').setView(
      [ambulanceData.currentLocation.lat, ambulanceData.currentLocation.lng], 
      12
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(mapInstance);

    // Custom icons
    const ambulanceIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });

    const destinationIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });

    // Ambulance marker
    L.marker(
      [ambulanceData.currentLocation.lat, ambulanceData.currentLocation.lng],
      { icon: ambulanceIcon }
    ).addTo(mapInstance).bindPopup("Ambulance");

    // Destination marker
    L.marker(
      [ambulanceData.destination.lat, ambulanceData.destination.lng],
      { icon: destinationIcon }
    ).addTo(mapInstance).bindPopup("Your Location");

    // Add route line
    L.polyline([
      [ambulanceData.currentLocation.lat, ambulanceData.currentLocation.lng],
      [ambulanceData.destination.lat, ambulanceData.destination.lng]
    ], {
      color: 'red',
      weight: 3,
      opacity: 0.7,
      dashArray: '10, 10'
    }).addTo(mapInstance);

    setMap(mapInstance);
  };

  if (!selectedHospital) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading ambulance tracking...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.push('/emergency')}
          className="flex items-center mb-6 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to emergency request
        </button>

        <div className="bg-white shadow overflow-hidden rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6 bg-green-600 text-white">
            <h3 className="text-lg leading-6 font-medium">
              Ambulance Dispatched
            </h3>
            <p className="mt-1 text-sm text-red-100">
              Help is on the way to your location
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">Ambulance Details</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Driver:</span> {ambulanceData.driverName}</p>
                  <p><span className="font-medium">Contact:</span> {ambulanceData.driverNumber}</p>
                  <p><span className="font-medium">Ambulance No.:</span> {ambulanceData.ambulanceNumber}</p>
                  <p><span className="font-medium">Estimated Arrival:</span> {ambulanceData.eta}</p>
                </div>
                
                <div className="mt-6">
                  <a
                    href={`tel:${ambulanceData.driverNumber}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Call Ambulance Driver
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">Hospital Details</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Hospital:</span> {selectedHospital.name}</p>
                  <p><span className="font-medium">Address:</span> {selectedHospital.address}</p>
                  <p><span className="font-medium">Contact:</span> {selectedHospital.phone}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <div id="map" className="w-full h-96 rounded-lg border border-gray-300"></div>
              <p className="mt-2 text-sm text-gray-500 text-center">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                Ambulance • 
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full ml-3 mr-1"></span>
                Your Location
              </p>
            </div>
            
            <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Emergency Instructions</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>• Please stay on the line with the ambulance driver if possible</p>
                    <p>• Ensure the path to your location is clear for emergency personnel</p>
                    <p>• Have your ID and insurance information ready</p>
                    <p>• If symptoms worsen, call the ambulance driver immediately</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}