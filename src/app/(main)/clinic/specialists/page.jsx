"use client"

import { useState } from 'react';
import { FaUserMd, FaStar, FaProcedures, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const SpecialistSearch = () => {
  const router = useRouter();

  const [doctors] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      experience: '12 years',
      rating: 4.7,
      hospital: 'City General Hospital'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Neurology',
      experience: '8 years',
      rating: 4.5,
      hospital: 'Neuro Speciality Hospital'
    },
    {
      id: 3,
      name: 'Dr. Priya Patel',
      specialty: 'Pediatrics',
      experience: '15 years',
      rating: 4.9,
      hospital: 'City General Hospital'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredDoctors = doctors.filter(doctor => {
    return searchTerm === '' || 
           doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleBookDoctorAndBed = (doctor) => {
    router.push(`/clinic/beds?doctorId=${doctor.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-blue-800 mb-6 flex items-center">
        <FaSearch className="mr-2" /> Specialist Search
      </h1>
      
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Find Top Specialists</h2>
        <div className="flex">
          <input
            type="text"
            placeholder="Search by specialty (e.g., cardiologist, neurologist)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-l-md"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md">
            <FaSearch />
          </button>
        </div>
      </div>
      
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Specialists</h2>
      <div className="space-y-4">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map(doctor => (
            <div key={doctor.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="mr-4 bg-blue-100 p-3 rounded-full">
                  <FaUserMd className="text-blue-600 text-2xl" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-blue-700">{doctor.name}</h3>
                  <div className="flex items-center mt-1 text-gray-600">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">{doctor.specialty}</span>
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>{doctor.rating}</span>
                  </div>
                  <div className="mt-2 text-gray-600">
                    <span>Hospital: {doctor.hospital}</span>
                  </div>
                  <div className="mt-1 text-gray-600">
                    <span>Experience: {doctor.experience}</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button 
                    onClick={() => handleBookDoctorAndBed(doctor)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
                  >
                    <FaProcedures className="mr-2" /> Book Doctor & Bed
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-4 rounded-lg shadow text-center text-gray-500">
            {searchTerm 
              ? `No specialists found for "${searchTerm}"`
              : 'Search for specialists by entering a specialty above'}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecialistSearch;