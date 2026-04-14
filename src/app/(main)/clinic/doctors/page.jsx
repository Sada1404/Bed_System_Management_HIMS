"use client"

import { useState } from 'react';
import { FaUserMd, FaStar, FaClock, FaSearch, FaProcedures } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const DoctorProfiles = ({ selectedHospital }) => {
  const router = useRouter();

  const [doctors] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      experience: '12 years',
      rating: 4.7,
      timings: 'Mon-Fri: 9AM-5PM',
      hospital: 'City General Hospital'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Neurology',
      experience: '8 years',
      rating: 4.5,
      timings: 'Mon-Wed, Fri: 10AM-4PM',
      hospital: 'Neuro Speciality Hospital'
    },
    {
      id: 3,
      name: 'Dr. Priya Patel',
      specialty: 'Pediatrics',
      experience: '15 years',
      rating: 4.9,
      timings: 'Tue-Thu: 8AM-3PM, Sat: 9AM-1PM',
      hospital: 'City General Hospital'
    }
  ].filter(doctor => 
    !selectedHospital || doctor.hospital === selectedHospital.name
  ));

  const handleViewSpecialists = () => {
    router.push('/clinic/specialists');
  };

  const handleBookDoctorAndBed = (doctor) => {
    router.push(`/clinic/beds?doctorId=${doctor.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      {selectedHospital && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-800">Showing doctors from: {selectedHospital.name}</h3>
        </div>
      )}
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800 flex items-center">
          <FaUserMd className="mr-2" /> Doctor Profiles
        </h1>
        <button 
          onClick={handleViewSpecialists}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FaSearch className="mr-2" /> View Specialists
        </button>
      </div>
      
      <div className="space-y-4">
        {doctors.map(doctor => (
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
                <div className="mt-2 text-gray-600 flex items-center">
                  <FaClock className="mr-1 text-blue-500" />
                  <span>{doctor.timings}</span>
                </div>
                <div className="mt-1 text-gray-600">
                  <span>Experience: {doctor.experience}</span>
                </div>
                <div className="mt-1 text-gray-600">
                  <span>Hospital: {doctor.hospital}</span>
                </div>
                </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm mr-10 mt-4">
                    Book Appointment
                  </button>
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
        ))}
      </div>
    </div>
  );
};

export default DoctorProfiles;