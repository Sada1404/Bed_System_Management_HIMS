
// optional page with  some chnage and routing
'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
//import Layout from '@/components/Layout';

// Mock data for doctors
const mockDoctors = [
  {
    id: 1,
    name: "Dr. Agastya",
    title: "Dean",
    hospital: "NavJeet",
    specialization: "Diabetology/Endocrinology",
    subSpecialization: "Diabetology/Endocrinology | Endocrinology",
    experience: 14,
    fees: 2800,
    image: "/api/placeholder/80/80",
    availableDays: ["Monday", "Wednesday", "Friday"],
    timeSlots: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"],
    rating: 4.8,
    totalReviews: 245
  },
  {
    id: 2,
    name: "Dr. Strange",
    title: "Head of neuro",
    hospital: "Multiverse",
    specialization: "Nephrology",
    subSpecialization: "Nephrology | Kidney Transplant",
    experience: 40,
    fees: 1800,
    image: "/api/placeholder/80/80",
    availableDays: ["Tuesday", "Thursday", "Saturday"],
    timeSlots: ["10:00 AM - 1:00 PM", "3:00 PM - 6:00 PM"],
    rating: 4.7,
    totalReviews: 189
  },
  {
    id: 3,
    name: "Dr. Revati",
    title: "PRINCIPAL DIRECTOR & HOD - ORTHOPAEDICS",
    hospital: "HealthyNation",
    specialization: "Orthopaedics",
    subSpecialization: "Orthopaedics and Joint Replacement | Robotic Surgery",
    experience: 27,
    fees: 1500,
    image: "/api/placeholder/80/80",
    availableDays: ["Monday", "Tuesday", "Thursday"],
    timeSlots: ["11:00 AM - 2:00 PM", "4:00 PM - 7:00 PM"],
    rating: 4.9,
    totalReviews: 156
  },
  {
    id: 4,
    name: "Dr. Doom",
    title: "CHAIRMAN CARDIOLOGY",
    hospital: "FitWorld",
    specialization: "Cardiac Sciences",
    subSpecialization: "Cardiac Sciences | Electrophysiology",
    experience: 35,
    fees: 2000,
    image: "/api/placeholder/80/80",
    availableDays: ["Monday", "Wednesday", "Friday"],
    timeSlots: ["9:00 AM - 12:00 PM", "1:00 PM - 4:00 PM"],
    rating: 4.8,
    totalReviews: 312
  },
  {
    id: 5,
    name: "Dr. Monica",
    title: "EXECUTIVE DIRECTOR PAEDIATRIC CARDIOLOGY",
    hospital: "Sasoon Hospital",
    specialization: "Paediatrics",
    subSpecialization: "Paediatrics | Paediatric Cardiac Sciences",
    experience: 40,
    fees: 2000,
    image: "/api/placeholder/80/80",
    availableDays: ["Tuesday", "Thursday", "Saturday"],
    timeSlots: ["10:00 AM - 1:00 PM", "2:30 PM - 5:30 PM"],
    rating: 4.6,
    totalReviews: 98
  },
  {
    id: 6,
    name: "Dr. Pruthviraj",
    title: "PRINCIPAL DIRECTOR & HOD PAEDIATRICS",
    hospital: "Earthik Organization",
    specialization: "Paediatrics",
    subSpecialization: "Paediatrics",
    experience: 38,
    fees: 1400,
    image: "/api/placeholder/80/80",
    availableDays: ["Monday", "Wednesday", "Friday", "Saturday"],
    timeSlots: ["9:30 AM - 12:30 PM", "3:00 PM - 6:00 PM"],
    rating: 4.7,
    totalReviews: 201
  }
];

const DoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  // Filter doctors based on search and filters
  const filteredDoctors = mockDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesHospital = selectedHospital === '' || doctor.hospital === selectedHospital;
    const matchesSpecialty = selectedSpecialty === '' || doctor.specialization === selectedSpecialty;
    
    return matchesSearch && matchesHospital && matchesSpecialty;
  });

  // Get unique hospitals and specialties for filters
  const hospitals = [...new Set(mockDoctors.map(doctor => doctor.hospital))];
  const specialties = [...new Set(mockDoctors.map(doctor => doctor.specialization))];

  return (
    //<Layout>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
        <div className="bg-gradient-to-r from-slate-200 to-slate-400  px-6 py-4">
            <h1 className="text-2xl font-semibold text-black text-center">
              Find Doctors
            </h1>
            <p className="text-slate-800 text-center mt-1 text-sm">
              Book appointments with our experienced doctors
            </p>
        </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                placeholder="Search doctor"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <select
                value={selectedHospital}
                onChange={(e) => setSelectedHospital(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Filter by Hospital</option>
                {hospitals.map(hospital => (
                  <option key={hospital} value={hospital}>{hospital}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Filter by Specialty</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                {/* Doctor Info */}
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{doctor.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">{doctor.title}</p>
                    <p className="text-sm text-blue-600">{doctor.hospital}</p>
                  </div>
                </div>

                {/* Specialization */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-green-600 mb-1">{doctor.specialization}</p>
                  <p className="text-xs text-gray-500">{doctor.subSpecialization}</p>
                </div>

                {/* Experience and Fees */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {doctor.experience} Years Experience
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    ₹ {doctor.fees}
                    <span className="text-sm font-normal text-gray-500 ml-1">Fees</span>
                  </div>
                </div>

                {/* Available Days */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Available Days:</p>
                  <div className="flex flex-wrap gap-1">
                    {doctor.availableDays.map((day) => (
                      <span key={day} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {day}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Time Slots */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Time Slots:</p>
                  <div className="space-y-1">
                    {doctor.timeSlots.map((slot, index) => (
                      <span key={index} className="block text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-4 h-4 ${star <= Math.floor(doctor.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {doctor.rating} ({doctor.totalReviews} reviews)
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Link 
                    href={`/appointments/docter-slots/${doctor.id}`}
                    className="flex-1 text-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    View Full Profile
                  </Link>
                  <Link 
                    href={`/appointments/booking?doctorId=${doctor.id}`}
                    className="flex-1 text-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No doctors found matching your criteria</p>
            <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
    //</Layout>
  );
};

export default DoctorsPage;