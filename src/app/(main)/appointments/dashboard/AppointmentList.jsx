'use client';

import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';

export default function AppointmentList({ appointments }) {
  const router = useRouter();
  const [filter, setFilter] = useState('Today');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Visited':
        return 'text-green-600';
      case 'Not Confirmed':
        return 'text-red-600';
      case 'Scheduled':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleViewDetails = (id) => {
    router.push(`/appointments/${id}`);
  };

  const handleSeeAll = () => {
    router.push('/appointments/appointlist');
  };

  // to download csv file
  const handleDownloadCSV = () => {
    const header = ['Date & Time', 'Patient', 'Doctor', 'Status', 'Reason'];
    const rows = filteredAppointments.map((a) =>
      [`${a.date} ${a.time}`, a.patient, a.doctor, a.status, a.reason].join(',')
    );
    const csvContent = [header.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `appointments_${filter.toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // searching sorting

  const filteredAppointments = useMemo(() => {
    const now = new Date();
    return appointments.filter(({ date }) => {
      const apptDate = new Date(date);

      if (filter === 'All') {
      return true;
      }
      if (filter === 'Today') {
        return apptDate.getDate() === now.getDate() &&
               apptDate.getMonth() === now.getMonth() &&
               apptDate.getFullYear() === now.getFullYear();
      }

      if (filter === 'This Week') {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        return apptDate >= startOfWeek && apptDate <= endOfWeek;
      }

      if (filter === 'This Month') {
        return apptDate.getMonth() === now.getMonth() &&
               apptDate.getFullYear() === now.getFullYear();
      }
      if (filter == 'This Year'){
        return apptDate.getFullYear() === now.getFullYear();
      }

      return true;
    });
  }, [appointments, filter]);


  //all body elements
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
        <h3 className="text-xl font-semibold text-gray-900">Appointment list</h3>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleDownloadCSV}
            className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            Download
          </button>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
          <button
            onClick={handleSeeAll}
            className="border border-gray-300 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
          >
            See All
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">Date & Time</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Patient</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Doctor</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Reason</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4 text-gray-900 font-medium">
                  {`${appointment.date} ${appointment.time}`}
                </td>
                <td className="py-4 px-4 text-gray-600">{appointment.patient}</td>
                <td className="py-4 px-4 text-gray-600">{appointment.doctor}</td>
                <td className="py-4 px-4">
                  <span className={`font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-600">{appointment.reason}</td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => handleViewDetails(appointment.id)}
                    className="bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-800 text-sm"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}