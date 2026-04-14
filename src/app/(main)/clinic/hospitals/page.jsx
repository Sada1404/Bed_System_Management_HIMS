"use client"

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaHospital, FaStar, FaMapMarkerAlt, FaBed, FaProcedures, FaUserMd } from 'react-icons/fa';

const HospitalBeds = () => {
  const [selectedHospital, setSelectedHospital] = useState(null);
  const router = useRouter();

  // Sample data for hospitals
  const [hospitals] = useState([
    {
      id: 1,
      name: 'City General Hospital',
      rating: 4.5,
      distance: '2.5 km',
      specialty: 'Multi-specialty',
      beds: 250,
      icuBeds: 30,
      availableBeds: 45,
      availableIcuBeds: 5,
      location: '123 Main Street'
    },
    {
      id: 2,
      name: 'Cardiac Care Center',
      rating: 4.8,
      distance: '3.1 km',
      specialty: 'Cardiology',
      beds: 120,
      icuBeds: 25,
      availableBeds: 12,
      availableIcuBeds: 2,
      location: '456 Heart Avenue'
    },
    {
      id: 3,
      name: 'Neuro Speciality Hospital',
      rating: 4.2,
      distance: '5.7 km',
      specialty: 'Neurology',
      beds: 180,
      icuBeds: 20,
      availableBeds: 32,
      availableIcuBeds: 3,
      location: '789 Brain Road'
    }
  ]);

  // State for filters
  const [filters, setFilters] = useState({
    rating: '',
    distance: '',
    specialty: ''
  });

  // Filter hospitals based on filters
  const filteredHospitals = hospitals.filter(hospital => {
    return (
      (filters.rating === '' || hospital.rating >= parseFloat(filters.rating)) &&
      (filters.distance === '' || parseFloat(hospital.distance) <= parseFloat(filters.distance)) &&
      (filters.specialty === '' || hospital.specialty.toLowerCase().includes(filters.specialty.toLowerCase()))
    );
  });

   const handleViewDoctors = (hospital) => {
    setSelectedHospital(hospital);
    router.push('/clinic/doctors');
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-blue-800 mb-6 flex items-center">
        <FaHospital className="mr-2" /> Hospital Beds Availability
      </h1>
      
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Filter Hospitals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Rating</label>
            <select
              value={filters.rating}
              onChange={(e) => setFilters({...filters, rating: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Any Rating</option>
              <option value="3">3+ Stars</option>
              <option value="4">4+ Stars</option>
              <option value="4.5">4.5+ Stars</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Distance (km)</label>
            <select
              value={filters.distance}
              onChange={(e) => setFilters({...filters, distance: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Any Distance</option>
              <option value="3">Within 3 km</option>
              <option value="5">Within 5 km</option>
              <option value="10">Within 10 km</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
            <input
              type="text"
              placeholder="Cardiology, Neurology, etc."
              value={filters.specialty}
              onChange={(e) => setFilters({...filters, specialty: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
      
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Nearby Hospitals</h2>
      <div className="space-y-4">
        {filteredHospitals.length > 0 ? (
          filteredHospitals.map(hospital => (
            <div key={hospital.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-blue-700">{hospital.name}</h3>
                  <div className="flex items-center mt-1 text-gray-600">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>{hospital.rating} • {hospital.specialty} • {hospital.distance} away</span>
                  </div>
                  <div className="flex items-center mt-2 text-gray-600">
                    <FaMapMarkerAlt className="mr-1 text-red-500" />
                    <span>{hospital.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Total Beds: {hospital.beds}</div>
                  <div className="text-sm text-gray-600">ICU Beds: {hospital.icuBeds}</div>
                  <div className="mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${hospital.availableBeds > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      General Beds: {hospital.availableBeds} available
                    </span>
                  </div>
                  <div className="mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${hospital.availableIcuBeds > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      ICU Beds: {hospital.availableIcuBeds} available
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button 
                    onClick={() => handleViewDoctors(hospital)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
                  >
                    <FaUserMd className="mr-2" /> View Doctors
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-4 rounded-lg shadow text-center text-gray-500">
            No hospitals match your filters. Please try different criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalBeds;