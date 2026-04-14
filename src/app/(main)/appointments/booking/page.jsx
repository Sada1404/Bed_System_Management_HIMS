'use client';
import { useState } from 'react';
 
 // form data entities
export default function AppointmentBooking() {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    department: '',
    doctor: '',
    preferredDate: '',
    preferredTimeSlot: '',
    symptoms: '',
    emergencyContactName: '',
    relationWithPatient: '',
    emergencyContactNumber: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  // mock data used for demo
  const departments = [
    'Cardiology', 'Dermatology', 'Emergency Medicine', 'Family Medicine',
    'Gastroenterology', 'General Surgery', 'Internal Medicine', 'Neurology',
    'Oncology', 'Orthopedics', 'Pediatrics', 'Psychiatry'
  ];

  const doctorsByDepartment = {
    'Cardiology': ['Dr. Smith Johnson', 'Dr. Emily Davis', 'Dr. Michael Brown'],
    'Dermatology': ['Dr. Sarah Wilson', 'Dr. James Miller', 'Dr. Lisa Garcia'],
    'Emergency Medicine': ['Dr. Robert Jones', 'Dr. Amanda Taylor', 'Dr. Kevin Lee'],
    'Family Medicine': ['Dr. Jennifer White', 'Dr. David Martinez', 'Dr. Mary Anderson'],
    'Gastroenterology': ['Dr. Christopher Thompson', 'Dr. Jessica Rodriguez', 'Dr. Daniel Lewis'],
    'General Surgery': ['Dr. Matthew Clark', 'Dr. Ashley Hall', 'Dr. Ryan Walker'],
    'Internal Medicine': ['Dr. Nicole Young', 'Dr. Brandon King', 'Dr. Stephanie Wright'],
    'Neurology': ['Dr. Andrew Green', 'Dr. Rachel Adams', 'Dr. Justin Baker'],
    'Oncology': ['Dr. Samantha Nelson', 'Dr. Timothy Carter', 'Dr. Michelle Phillips'],
    'Orthopedics': ['Dr. Jonathan Evans', 'Dr. Lauren Turner', 'Dr. Eric Collins'],
    'Pediatrics': ['Dr. Kimberly Stewart', 'Dr. Joshua Parker', 'Dr. Vanessa Morris'],
    'Psychiatry': ['Dr. Gregory Cook', 'Dr. Megan Rogers', 'Dr. Alexander Reed']
  };

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
  ];

  //events and required***
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'department') {
      setFormData(prev => ({
        ...prev,
        doctor: ''
      }));
    }
  };

  const validateForm = () => {
    const requiredFields = [
      'fullName', 'age', 'gender', 'contactNumber', 'email',
      'department', 'doctor', 'preferredDate', 'preferredTimeSlot',
      'emergencyContactName', 'relationWithPatient', 'emergencyContactNumber'
    ];

    for (let field of requiredFields) {
      if (!formData[field]) return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    return (
      emailRegex.test(formData.email) &&
      phoneRegex.test(formData.contactNumber) &&
      phoneRegex.test(formData.emergencyContactNumber)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!validateForm()) {
      setMessage('Please fill all required fields with valid information.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMessage('Appointment booked successfully! You will receive a confirmation shortly.');
        setFormData({
          fullName: '',
          age: '',
          gender: '',
          contactNumber: '',
          email: '',
          department: '',
          doctor: '',
          preferredDate: '',
          preferredTimeSlot: '',
          symptoms: '',
          emergencyContactName: '',
          relationWithPatient: '',
          emergencyContactNumber: ''
        });
      } else {
        setMessage('Failed to book appointment. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className=" mx-auto ">
      <div className="bg-white/10 backdrop-blur-sm p-2 shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-slate-200 to-slate-400 px-6 py-5 text-center">
          <h1 className="text-3xl font-bold text-black">Book Appointment</h1>
          <p className="text-sm text-slate-800 mt-1">Please fill in all required information</p>
        </div>

        {message && (
          <div className={`p-4 text-sm font-medium text-center ${
            message.includes('successfully') 
              ? 'bg-green-100 text-green-800 border border-green-300' 
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-10">
          {/* Patient Info */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Patient Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-teal-400" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Age <span className="text-red-500">*</span></label>
                <input type="number" name="age" value={formData.age} onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-teal-400" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Gender <span className="text-red-500">*</span></label>
                <select name="gender" value={formData.gender} onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-teal-400" required>
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Number <span className="text-red-500">*</span></label>
                <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-teal-400" required pattern="\d{10}" />
              </div>

              <div className="sm:col-span-2 lg:col-span-4">
                <label className="block text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-teal-400" required />
              </div>
            </div>
          </section>

          {/* Appointment Details */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Appointment Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Department <span className="text-red-500">*</span></label>
                <select name="department" value={formData.department} onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-teal-400" required>
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Doctor <span className="text-red-500">*</span></label>
                <select name="doctor" value={formData.doctor} onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-teal-400"
                  required disabled={!formData.department}>
                  <option value="">Select Doctor</option>
                  {formData.department && doctorsByDepartment[formData.department]?.map((doc) => (
                    <option key={doc} value={doc}>{doc}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Preferred Date <span className="text-red-500">*</span></label>
                <input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-teal-400"
                  min={new Date().toISOString().split('T')[0]} required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Time Slot <span className="text-red-500">*</span></label>
                <select name="preferredTimeSlot" value={formData.preferredTimeSlot} onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-teal-400" required>
                  <option value="">Select Time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2 lg:col-span-4">
                <label className="block text-sm font-medium text-gray-700">Symptoms</label>
                <textarea name="symptoms" value={formData.symptoms} onChange={handleInputChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-teal-400"
                  placeholder="Describe your symptoms" />
              </div>
            </div>
          </section>

          {/* Emergency Contact */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Emergency Contact</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Name <span className="text-red-500">*</span></label>
                <input type="text" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-teal-400" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Relation <span className="text-red-500">*</span></label>
                <select name="relationWithPatient" value={formData.relationWithPatient} onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-teal-400" required>
                  <option value="">Select</option>
                  <option>Parent</option>
                  <option>Spouse</option>
                  <option>Sibling</option>
                  <option>Child</option>
                  <option>Friend</option>
                  <option>Guardian</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Number <span className="text-red-500">*</span></label>
                <input type="tel" name="emergencyContactNumber" value={formData.emergencyContactNumber} onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-teal-400" required pattern="\d{10}" />
              </div>
            </div>
          </section>

          {/* Submit */}
          <div className="text-center pt-6">
            <button type="submit" disabled={loading}
              className={`px-8 py-3 rounded-lg font-semibold text-white transition-all ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400'
              }`}>
              {loading ? 'Booking Appointment...' : 'Book Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


// need to fetch dr name when called by another component...