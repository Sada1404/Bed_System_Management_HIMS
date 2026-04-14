"use client"

import { useState, useEffect } from 'react';
import { FaProcedures, FaBed, FaUserMd } from 'react-icons/fa';
import { useRouter, useSearchParams } from 'next/navigation';

const BedBooking = ({  }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { query } = router;
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
  const [hospitals] = useState([
    {
      id: 1,
      name: 'City General Hospital',
      availableBeds: 45,
      availableIcuBeds: 5
    },
    {
      id: 2,
      name: 'Cardiac Care Center',
      availableBeds: 12,
      availableIcuBeds: 2
    },
    {
      id: 3,
      name: 'Neuro Speciality Hospital',
      availableBeds: 32,
      availableIcuBeds: 3
    }
  ]);

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
    ]);

  // State for bed booking
  const [bookingData, setBookingData] = useState({
    hospitalId: '',
    bedType: 'general',
    patientName: '',
    contact: ''
  });

  // Handle bed booking
  const handleBedBooking = () => {
    if (!bookingData.hospitalId || !bookingData.patientName || !bookingData.contact) {
      alert('Please fill all required fields');
      return;
    }

    alert(`Bed booking request submitted for ${bookingData.patientName} at hospital ID ${bookingData.hospitalId}`);
    setBookingData({
      hospitalId: '',
      bedType: 'general',
      patientName: '',
      contact: ''
    });
  };

  useEffect(() => {
    const doctorId = searchParams.get('doctorId');
    if (doctorId) {
      // Find the doctor in our mock data
      const doctor = doctors.find(d => d.id === parseInt(doctorId));
      setSelectedDoctor(doctor);
    }
  }, [searchParams]);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      {selectedDoctor && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-medium text-blue-800 mb-2">Booking for:</h3>
          <div className="flex items-center">
            <FaUserMd className="text-blue-600 mr-3 text-xl" />
            <div>
              <h4 className="font-bold">{selectedDoctor.name}</h4>
              <p className="text-sm text-gray-600">{selectedDoctor.specialty}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Hospital Bed Availability</h2>
          <div className="space-y-4">
            {hospitals.map(hospital => (
              <div key={hospital.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-blue-700">{hospital.name}</h3>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="bg-blue-50 p-2 rounded">
                    <div className="text-sm text-gray-600">General Beds</div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">{hospital.availableBeds}</span>
                      <FaBed className={`text-xl ${hospital.availableBeds > 0 ? 'text-green-500' : 'text-red-500'}`} />
                    </div>
                  </div>
                  <div className="bg-red-50 p-2 rounded">
                    <div className="text-sm text-gray-600">ICU Beds</div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">{hospital.availableIcuBeds}</span>
                      <FaProcedures className={`text-xl ${hospital.availableIcuBeds > 0 ? 'text-green-500' : 'text-red-500'}`} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Book a Bed</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Hospital</label>
              <select
                value={bookingData.hospitalId}
                onChange={(e) => setBookingData({...bookingData, hospitalId: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">-- Select Hospital --</option>
                {hospitals.map(hospital => (
                  <option key={hospital.id} value={hospital.id}>{hospital.name}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Bed Type</label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="bedType"
                    value="general"
                    checked={bookingData.bedType === 'general'}
                    onChange={() => setBookingData({...bookingData, bedType: 'general'})}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">General Bed</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="bedType"
                    value="icu"
                    checked={bookingData.bedType === 'icu'}
                    onChange={() => setBookingData({...bookingData, bedType: 'icu'})}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">ICU Bed</span>
                </label>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
              <input
                type="text"
                placeholder="Enter patient name"
                value={bookingData.patientName}
                onChange={(e) => setBookingData({...bookingData, patientName: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
              <input
                type="tel"
                placeholder="Enter contact number"
                value={bookingData.contact}
                onChange={(e) => setBookingData({...bookingData, contact: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason For Bed Booking</label>
              <input
                type="tel"
                placeholder="Enter reason"
                value={bookingData.contact}
                onChange={(e) => setBookingData({...bookingData, contact: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <button
              onClick={handleBedBooking}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
            >
              Request Bed Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BedBooking;