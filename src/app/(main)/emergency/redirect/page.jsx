"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const hospitals = [
  {
    id: 1,
    name: 'Max Trauma Center',
    address: 'Saket, New Delhi',
    distance: '3.5 km',
    icuBeds: 4,
    traumaSupport: true,
    specialties: ['Trauma', 'Cardiac'],
    status: 'green',
    responseTime: '15-20 mins',
    phone: '+911123456789'
  },
  {
    id: 2,
    name: 'Fortis Hospital',
    address: 'Vasant Kunj, New Delhi',
    distance: '5.2 km',
    icuBeds: 2,
    traumaSupport: true,
    specialties: ['Neurology', 'Orthopedics'],
    status: 'yellow',
    responseTime: '25-30 mins',
    phone: '+911198765432'
  },
  {
    id: 3,
    name: 'Apollo Hospital',
    address: 'Sarita Vihar, New Delhi',
    distance: '7.8 km',
    icuBeds: 0,
    traumaSupport: true,
    specialties: ['General Surgery', 'Pediatrics'],
    status: 'red',
    responseTime: '35-40 mins',
    phone: '+911176543219'
  }
];

export default function HospitalRedirect() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);

  const statusColor = (status) => {
    switch (status) {
      case 'green': return 'bg-green-500';
      case 'yellow': return 'bg-yellow-500';
      case 'red': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleRequestAmbulance = (hospital) => {
    setSelectedHospital(hospital);
    setShowForm(true);
  };

  if (showForm && selectedHospital) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setShowForm(false)}
            className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to hospitals
          </button>

          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6 bg-blue-600 text-white">
              <h3 className="text-lg leading-6 font-medium">
                Request Ambulance to {selectedHospital.name}
              </h3>
              <p className="mt-1 text-sm text-red-100">
                {selectedHospital.address} • Phone: {selectedHospital.phone}
              </p>
            </div>
            
            <AmbulanceRequestForm 
              hospital={selectedHospital} 
              onSubmit={() => router.push(`/emergency/ambulance?hospitalId=${selectedHospital.id}`)}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-blue-600">Nearby Hospitals with Available Care</h1>
          <p className="mt-2 text-gray-600">Based on your location and symptoms, here are the best options</p>
        </div>
        
        <div className="space-y-6">
          {hospitals.map((hospital) => (
            <div key={hospital.id} className="bg-white shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex items-start justify-between">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {hospital.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {hospital.address} • {hospital.distance} away
                  </p>
                </div>
                <div className={`h-5 w-5 rounded-full ${statusColor(hospital.status)}`} title={hospital.status}></div>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">ICU Beds Available</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{hospital.icuBeds}</dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Trauma/ER Support</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {hospital.traumaSupport ? 'Yes' : 'No'}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Specialties</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {hospital.specialties.join(', ')}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Estimated Response Time</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {hospital.responseTime}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6 flex flex-wrap justify-end gap-3">
                <a
                  href={`tel:${hospital.phone}`}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Call Hospital
                </a>
                <button
                  onClick={() => handleRequestAmbulance(hospital)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Request Ambulance
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AmbulanceRequestForm({ hospital, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationDetect = () => {
    // In a real app, this would use the browser's geolocation API
    alert('Location detection would be implemented here');
    setFormData(prev => ({ ...prev, location: 'Detected Location' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Ambulance request submitted:', {
      ...formData,
      hospital
    });
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Patient Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Contact Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Pickup Location
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              name="location"
              id="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
              placeholder="Enter address or location"
            />
            <button
              type="button"
              onClick={handleLocationDetect}
              className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Medical Notes (optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            value={formData.notes}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Any important medical information for the ambulance team"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Request Ambulance
        </button>
      </div>
    </form>
  );
}