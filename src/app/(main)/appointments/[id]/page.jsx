'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AppointmentDetails() {
  const params = useParams();
  const appointmentId = params?.id;
  const [appointment, setAppointment] = useState(null);

   //this is mock data used to preview the appointment details will be fetched from the backend by id
  useEffect(() => {
    if (appointmentId) {
      setAppointment({
        id: appointmentId,
        patientName: 'Aarav Sharma',
        doctorName: 'Dr. Meera Rao',
        department: 'Cardiology',
        date: '2025-08-02',
        time: '10:30 AM',
        status: 'Scheduled',
        notes: 'Follow-up for chest pain. Bring previous ECG reports.',
        reason: 'Routine Checkup',
        contactNo: '+91-9876543210',
        email: 'aarav.sharma@example.com',
        emergencyContact: '+91-9123456789',
      });
    }
  }, [appointmentId]);

  const InfoBlock = ({ label, value }) => (
    <div className="flex flex-col">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-base font-medium text-gray-900">{value}</span>
    </div>
  );

  if (!appointment)
    return (
      <div className="flex justify-center mt-10">
        <p className="text-gray-500">Loading appointment details...</p>
      </div>
    );

  return (
    //<Layout>
    <div className="bg-white rounded-xl shadow-xl p-8 max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📋 Appointment Details</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <InfoBlock label="Appointment ID" value={appointment.id} />
        <InfoBlock label="Patient Name" value={appointment.patientName} />
        <InfoBlock label="Doctor Name" value={appointment.doctorName} />
        <InfoBlock label="Department" value={appointment.department} />
        <InfoBlock label="Date" value={appointment.date} />
        <InfoBlock label="Time" value={appointment.time} />
        <InfoBlock label="Status" value={appointment.status} />
        <InfoBlock label="Reason" value={appointment.reason} />
        <InfoBlock label="Contact No." value={appointment.contactNo} />
        <InfoBlock label="Email" value={appointment.email} />
        <InfoBlock label="Emergency Contact" value={appointment.emergencyContact} />
      </div>

      <div className="border-t pt-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">📝 Notes</h2>
        <p className="text-gray-600">{appointment.notes}</p>
      </div>
    </div>
    //</Layout>
  );
}