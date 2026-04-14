'use client';

import { useState, useEffect } from 'react';
import AgeGroupChart from '@/components/dashboard/AgeGroupChart';
import AppointmentList from '@/components/dashboard/AppointmentList';
import CompletionChart from '@/components/dashboard/CompletionChart';
import DoctorsTable from '@/components/dashboard/DoctorsTable';
import StatsCard from '@/components/dashboard/StatsCard';


export default function AppointmentsPage() {
  const [appointmentStats, setAppointmentStats] = useState({
  totalAppointments: 550,
  todayNewAppointments: 100,
  totalIncrease: 10,
  todayIncrease: 5,
  completedAppointments: 420,
  pendingConfirmations: 65,
});
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [ageGroupData, setAgeGroupData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMockData = () => {
      setTimeout(() => {
        setDoctors([
          { id: 1, name: 'Dr Preeti Sharma', date: '11/07/25', department: 'Cardiology', status: 'Available' },
          { id: 2, name: 'Dr Pratik Sharma', date: '11/07/25', department: 'Cardiology', status: 'Unavailable' },
          { id: 3, name: 'Dr Anjali Mehta', date: '11/07/25', department: 'Neurology', status: 'Available' },
          { id: 4, name: 'Dr Vikram Singh', date: '11/07/25', department: 'Orthopedics', status: 'Unavailable' },
        ]);

        setAppointments([
          { id: 1, time: '8:00 - 8:30 AM', patient: 'Deepali Patil', doctor: 'Dr Preeti Sharma', status: 'Visited' },
          { id: 2, time: '9:00 - 9:30 AM', patient: 'Rohan Desai', doctor: 'Dr Pratik Sharma', status: 'Not Confirmed' },
          { id: 3, time: '10:00 - 10:30 AM', patient: 'Sneha Verma', doctor: 'Dr Anjali Mehta', status: 'Scheduled' },
        ]);

        setAgeGroupData([
          { name: 'Kids', value: 35, color: '#E5E7EB' },
          { name: 'Young Adult', value: 10, color: '#F97316' },
          { name: 'Middle Aged', value: 10, color: '#94A3B8' },
          { name: 'Seniors', value: 45, color: '#3B82F6' },
        ]);

        setLoading(false);
      }, 1000);
    };

    fetchMockData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-700 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    
    <div className="  max-w-7xl mx-auto w-full">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Appointments</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
  <StatsCard
    title="Total Appointments"
    value={appointmentStats.totalAppointments}
    increase={appointmentStats.totalIncrease}
    period="from last month"
    bgColor="bg-purple-200"
    dropdown="Monthly"
  />
  <StatsCard
    title="Today's New Appointments"
    value={appointmentStats.todayNewAppointments}
    increase={appointmentStats.todayIncrease}
    period="from yesterday"
    bgColor="bg-blue-200"
  />
  <StatsCard
    title="Completed Appointments"
    value={appointmentStats.completedAppointments}
    increase={8} // or any dynamic value
    period="this week"
    bgColor="bg-green-200"
  />
  <StatsCard
    title="Pending Confirmations"
    value={appointmentStats.pendingConfirmations}
    increase={-4} // negative indicates a drop
    period="since last check"
    bgColor="bg-yellow-200"
  />
</div>

      {/* Doctors Table */}
      <div className="mb-8">
        <DoctorsTable doctors={doctors} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <CompletionChart />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <AgeGroupChart ageData={ageGroupData} />
        </div>
      </div>

      {/* Appointment List */}
      <div className="bg-white p-4 rounded-lg shadow">
        <AppointmentList appointments={appointments} />
      </div>
    </div>
    
  );
}