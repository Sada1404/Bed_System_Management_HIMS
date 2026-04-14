'use client';

import { useState } from 'react';
import { Clock } from 'lucide-react';


export default function AppointmentModal({ doctor, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    phone: '',
    gender: '',
    problem: '',
    appointmentDate: '',
    appointmentTime: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass back to parent
    setFormData({
      patientName: '',
      email: '',
      phone: '',
      gender: '',
      problem: '',
      appointmentDate: '',
      appointmentTime: ''
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-white/30 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 w-full max-w-md sm:max-w-lg z-50 shadow-lg transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Book Appointment with {doctor.name}
          </h3>
          <button onClick={onClose}>
            <Clock className="w-5 h-5 text-gray-600 hover:text-teal-700" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Patient Info */}
          <input
            type="text"
            name="patientName"
            placeholder="Patient Name"
            value={formData.patientName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="text"
            name="problem"
            placeholder="Describe your problem"
            value={formData.problem}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              required
              className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="time"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              required
              className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 hover:text-teal-700 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </>
  );
}