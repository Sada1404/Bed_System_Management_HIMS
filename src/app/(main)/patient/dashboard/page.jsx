'use client'

import { useState } from 'react';
import { Search, Calendar, User, HeartPulse, Bell, ChevronDown, ChevronRight, Plus } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const doctors = [
    { id: 1, name: 'Dr Preeti Singh', date: '11/07/25', department: 'Cardiology', status: 'Available' },
    { id: 2, name: 'Dr Pratik Sharma', date: '13/07/25', department: 'Neurology', status: 'Unavailable' },
    { id: 3, name: 'Dr Rucha Patel', date: '10/08/25', department: 'Gynecology', status: 'Available' },
    { id: 4, name: 'Dr Pratik Sharma', date: '11/07/25', department: 'Cardiology', status: 'Unavailable' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-4 md:p-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="bg-green-200 rounded-lg shadow p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500">Total Patients</p>
                  <h3 className="text-2xl font-bold mt-1">2500</h3>
                </div>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm flex items-center h-6">
                  +08.04%
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-2">Last Month</p>
            </div>

            <div className="bg-yellow-200 rounded-lg shadow p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500">New Patient</p>
                  <h3 className="text-2xl font-bold mt-1">150</h3>
                </div>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm flex items-center h-6">
                  +08.04%
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-2">Today</p>
            </div>

            <div className="bg-blue-200 rounded-lg shadow p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Book An Appointments</p>
                  <button className="mt-2 text-blue-600 flex items-center text-sm">
                    See All <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-purple-200 rounded-lg shadow p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500">Available Doctors</p>
                  <h3 className="text-2xl font-bold mt-1">24</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Doctors Table */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-semibold text-lg">Search doctors</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search doctors..." 
                    className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {doctors.map((doctor) => (
                      <tr key={doctor.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doctor.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doctor.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doctor.department}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${doctor.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {doctor.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button 
                            disabled={doctor.status === 'Unavailable'}
                            className={`text-blue-600 hover:text-blue-800 ${doctor.status === 'Unavailable' ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            Book Appointment
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Appointment Card */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold text-lg mb-4">Appointment</h3>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium">Dr. Preeti Singh</h4>
                    <p className="text-gray-500 text-sm">Cardiologist</p>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="font-medium">Aug 22, 9:00 AM</p>
                  <p className="text-green-600 text-sm">Confirmed</p>
                </div>
                <div className="flex space-x-3">
                  <button className="flex-1 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                    Cancel
                  </button>
                  <button className="flex-1 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                    Reschedule
                  </button>
                </div>
                <button className="mt-4 w-full py-2 border border-blue-600 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-50">
                  <Plus className="w-4 h-4 mr-2" />
                  Book New Appointment
                </button>
              </div>

              {/* Patient Statistics */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">Patient Statistic</h3>
                  <select className="border rounded-lg px-2 py-1 text-sm">
                    <option>Yearly</option>
                    <option>Monthly</option>
                    <option>Weekly</option>
                  </select>
                </div>
                <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                  <p className="text-gray-400">Chart will be displayed here</p>
                </div>
              </div>

              {/* Emergency Help */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold text-lg mb-2">Emergency Help</h3>
                <p className="text-gray-500 mb-4">Need urgent help?</p>
                <button className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Emergency Assistant
                </button>
              </div>

              {/* Insurance */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold text-lg mb-2">Insurance</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-medium">Health care Inc.</p>
                  <p className="text-gray-500 text-sm mt-1">Policy: ABC123456</p>
                  <p className="text-gray-500 text-sm">Valid until: Dec 31, 2027</p>
                  <button className="mt-3 text-blue-600 text-sm hover:underline">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}