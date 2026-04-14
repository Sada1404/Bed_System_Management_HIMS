'use client';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppointmentModal from './AppointmentModal';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Filter, Search } from 'lucide-react';


export default function DoctorsTable({ doctors }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    timing: '',
    department: '',
    rating: '',
    status: ''
  });

  const toggleFilters = () => setShowFilters(!showFilters);

  const filteredDoctors = doctors.filter((doctor) => {
  const matchesSearch =
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.department.toLowerCase().includes(searchQuery.toLowerCase());

  const matchesTiming = filters.timing ? doctor.timing === filters.timing : true;
  const matchesDept = filters.department ? doctor.department === filters.department : true;
  const matchesRating = filters.rating ? doctor.rating >= parseInt(filters.rating) : true;
  const matchesStatus = filters.status ? doctor.status === filters.status : true;

    return matchesSearch && matchesTiming && matchesDept && matchesRating && matchesStatus;
  });

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleSubmitAppointment = (formData) => {
    console.log('Appointment booked:', { ...formData, doctor: selectedDoctor });
    toast.success('Appointment booked successfully!');
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-0">Doctors Availability</h3>
         <Link
            href="/appointments/availability"
            className="text-teal-600 hover:text-teal-700 text-sm font-medium transition-colors"
          >
          See All
          </Link>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <div className="relative flex-1 w-full">
          <input
            type="search"
            placeholder="Search doctors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        <button
        onClick={toggleFilters}
        className="bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-800 flex items-center text-sm transition-colors"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </button>
        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-lg mt-4 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
            <select
              value={filters.timing}
              onChange={(e) => setFilters({ ...filters, timing: e.target.value })}
              className="px-4 py-2 border rounded-lg text-sm"
            >
              <option value="">All Timings</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
            </select>
            <select
            value={filters.department}
            onChange={(e) => setFilters({ ...filters, department: e.target.value })}
            className="px-4 py-2 border rounded-lg text-sm"
            >
              <option value="">All Departments</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Pediatrics">Pediatrics</option>
              {/* Add more as needed */}
              </select>
              <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="px-4 py-2 border rounded-lg text-sm"
            >
              <option value="">Status</option>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
              {/* Add more as needed */}
            </select>
            <select
            value={filters.rating}
            onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
            className="px-4 py-2 border rounded-lg text-sm"
            >
              <option value="">Any Rating</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              </select>
              </div>
            )}
          </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm sm:text-base text-gray-700">Name</th>
              <th className="text-left py-3 px-4 text-sm sm:text-base text-gray-700">Date</th>
              <th className="text-left py-3 px-4 text-sm sm:text-base text-gray-700">Department</th>
              <th className="text-left py-3 px-4 text-sm sm:text-base text-gray-700">Status</th>
              <th className="text-left py-3 px-4 text-sm sm:text-base text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <tr key={doctor.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <img
                        src="/api/placeholder/40/40"
                        alt={doctor.name}
                        className="h-8 w-8 sm:h-10 sm:w-10 rounded-full mr-3"
                      />
                      <span className="text-gray-900 font-medium text-sm sm:text-base">{doctor.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{doctor.date}</td>
                  <td className="py-4 px-4 text-gray-600">{doctor.department}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        doctor.status === 'Available'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {doctor.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleBookAppointment(doctor)}
                      className="bg-teal-700 text-white px-3 py-2 rounded-lg hover:bg-teal-800 text-xs sm:text-sm transition-colors"
                    >
                      Book Appointment
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-4 px-4 text-center text-gray-600">No doctors found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedDoctor && (
        <AppointmentModal
          doctor={selectedDoctor}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitAppointment}
        />
      )}
    </div>
  );
}