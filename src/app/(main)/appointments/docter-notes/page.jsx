'use client';
import React, { useState } from 'react';
import { Users, UserCheck, Pill, TrendingUp, FileText, Search, Filter } from 'lucide-react';
import ConsultationReports from './component/Consultation'
import PrescriptionReports from './component/Prescription'

// Sample data (to be replaced with backend API calls)
const consultationData = [
  {
    id: 'CR001',
    patientName: 'John Smith',
    patientId: 'PAT001',
    patientAge: 35,
    patientGender: 'Male',
    patientContact: '+1-555-0123',
    patientEmail: 'john.smith@email.com',
    doctorName: 'Dr. Sarah Johnson',
    doctorId: 'DOC001',
    department: 'Cardiology',
    consultationDate: '2025-01-28',
    consultationTime: '10:30 AM',
    status: 'completed',
    consultationType: 'Follow-up',
    chiefComplaint: 'Chest pain and shortness of breath',
    vitalSigns: {
      bloodPressure: '140/90 mmHg',
      heartRate: '85 bpm',
      temperature: '98.6°F',
      weight: '180 lbs',
      height: '5\'10"'
    },
    symptoms: ['Chest pain', 'Shortness of breath', 'Fatigue'],
    diagnosis: 'Hypertensive heart disease',
    treatment: 'Lifestyle modifications, medication adjustment',
    notes: 'Patient showing improvement with current treatment. Blood pressure still elevated. Adjusted medication dosage.',
    followUpDate: '2025-02-28',
    prescriptions: [
      {
        medicineId: 'MED001',
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        duration: '30 days',
        instructions: 'Take in the morning with water'
      },
      {
        medicineId: 'MED002',
        name: 'Metoprolol',
        dosage: '50mg',
        frequency: 'Twice daily',
        duration: '30 days',
        instructions: 'Take with meals'
      }
    ],
    labTests: [
      { test: 'ECG', result: 'Normal sinus rhythm', date: '2025-01-28' },
      { test: 'Blood Pressure Monitoring', result: '140/90 mmHg', date: '2025-01-28' }
    ],
    consultationFee: 150,
    insuranceCovered: true
  },
  {
    id: 'CR002',
    patientName: 'Maria Garcia',
    patientId: 'PAT002',
    patientAge: 28,
    patientGender: 'Female',
    patientContact: '+1-555-0456',
    patientEmail: 'maria.garcia@email.com',
    doctorName: 'Dr. Emily Rodriguez',
    doctorId: 'DOC002',
    department: 'Dermatology',
    consultationDate: '2025-01-25',
    consultationTime: '2:15 PM',
    status: 'completed',
    consultationType: 'Initial Consultation',
    chiefComplaint: 'Skin rash on arms and face',
    vitalSigns: {
      bloodPressure: '120/80 mmHg',
      heartRate: '72 bpm',
      temperature: '98.4°F',
      weight: '135 lbs',
      height: '5\'5"'
    },
    symptoms: ['Red rash', 'Itching', 'Swelling'],
    diagnosis: 'Allergic contact dermatitis',
    treatment: 'Topical corticosteroids, antihistamines',
    notes: 'Allergic reaction likely from new cosmetic product. Advised to discontinue use. Rash should improve in 7-10 days.',
    followUpDate: '2025-02-08',
    prescriptions: [
      {
        medicineId: 'MED003',
        name: 'Hydrocortisone Cream',
        dosage: '1%',
        frequency: 'Twice daily',
        duration: '14 days',
        instructions: 'Apply thin layer to affected areas'
      }
    ],
    labTests: [],
    consultationFee: 120,
    insuranceCovered: false
  },
  {
    id: 'CR003',
    patientName: 'Robert Chen',
    patientId: 'PAT003',
    patientAge: 45,
    patientGender: 'Male',
    patientContact: '+1-555-0789',
    patientEmail: 'robert.chen@email.com',
    doctorName: 'Dr. Michael Wilson',
    doctorId: 'DOC003',
    department: 'Orthopedics',
    consultationDate: '2025-01-30',
    consultationTime: '11:15 AM',
    status: 'upcoming',
    consultationType: 'Consultation',
    chiefComplaint: 'Knee pain after sports injury',
    vitalSigns: null,
    symptoms: ['Knee pain', 'Swelling', 'Limited mobility'],
    diagnosis: 'Pending examination',
    treatment: 'To be determined',
    notes: 'Initial consultation scheduled for knee injury assessment.',
    followUpDate: null,
    prescriptions: [],
    labTests: [],
    consultationFee: 180,
    insuranceCovered: true
  }
];

const prescriptionData = [
  {
    id: 'PR001',
    consultationId: 'CR001',
    patientName: 'John Smith',
    patientId: 'PAT001',
    doctorName: 'Dr. Sarah Johnson',
    doctorId: 'DOC001',
    department: 'Cardiology',
    prescriptionDate: '2025-01-28',
    status: 'active',
    totalMedicines: 2,
    medicines: [
      {
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        duration: '30 days',
        instructions: 'Take in the morning with water',
        cost: 25.50,
        refillsRemaining: 2
      },
      {
        name: 'Metoprolol',
        dosage: '50mg',
        frequency: 'Twice daily',
        duration: '30 days',
        instructions: 'Take with meals',
        cost: 18.75,
        refillsRemaining: 1
      }
    ],
    totalCost: 44.25,
    pharmacyName: 'Central Pharmacy',
    dispensedDate: '2025-01-29',
    nextRefillDate: '2025-02-28'
  },
  {
    id: 'PR002',
    consultationId: 'CR002',
    patientName: 'Maria Garcia',
    patientId: 'PAT002',
    doctorName: 'Dr. Emily Rodriguez',
    doctorId: 'DOC002',
    department: 'Dermatology',
    prescriptionDate: '2025-01-25',
    status: 'completed',
    totalMedicines: 1,
    medicines: [
      {
        name: 'Hydrocortisone Cream',
        dosage: '1%',
        frequency: 'Twice daily',
        duration: '14 days',
        instructions: 'Apply thin layer to affected areas',
        cost: 12.99,
        refillsRemaining: 0
      }
    ],
    totalCost: 12.99,
    pharmacyName: 'MediCare Pharmacy',
    dispensedDate: '2025-01-26',
    nextRefillDate: null
  }
];

// Utility function for summary statistics
const useSummaryStats = (consultations, prescriptions) => {
  return {
    totalConsultations: consultations.length,
    completedConsultations: consultations.filter(r => r.status === 'completed').length,
    upcomingConsultations: consultations.filter(r => r.status === 'upcoming').length,
    totalPrescriptions: prescriptions.length,
    activePrescriptions: prescriptions.filter(p => p.status === 'active').length,
    totalRevenue: consultations.reduce((sum, r) => sum + r.consultationFee, 0)
  };
};

const MedicalDashboard = () => {
  const [activeSection, setActiveSection] = useState('consultations');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [doctorFilter, setDoctorFilter] = useState('all');

  // Get summary statistics
  const summaryStats = useSummaryStats(consultationData, prescriptionData);

  // Get unique values for filters
  const departments = [...new Set(consultationData.map(r => r.department))];
  const doctors = [...new Set(consultationData.map(r => r.doctorName))];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-4 mb-3">
          <h1 className="text-2xl font-semibold text-white text-center">
            Consultation & Prescriptions
          </h1>
          <p className="text-teal-100 text-center mt-1 text-sm">
            Monitor and track all consultation reports and prescriptions
          </p>
        </div>

        <div className="p-2">
          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Consultations</p>
                  <p className="text-2xl font-bold text-gray-900">{summaryStats.totalConsultations}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{summaryStats.completedConsultations}</p>
                </div>
                <UserCheck className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Prescriptions</p>
                  <p className="text-2xl font-bold text-purple-600">{summaryStats.activePrescriptions}</p>
                </div>
                <Pill className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-emerald-600">${summaryStats.totalRevenue}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-emerald-600" />
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => setActiveSection('consultations')}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                activeSection === 'consultations'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <FileText className="h-5 w-5 mr-2" />
              Consultation Reports
            </button>
            <button
              onClick={() => setActiveSection('prescriptions')}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                activeSection === 'prescriptions'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Pill className="h-5 w-5 mr-2" />
              Prescription Reports
            </button>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              <div className="relative lg:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search patients, doctors, diagnosis..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {activeSection === 'consultations' && (
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              )}
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              {activeSection === 'consultations' && (
                <select
                  value={doctorFilter}
                  onChange={(e) => setDoctorFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Doctors</option>
                  {doctors.map(doctor => (
                    <option key={doctor} value={doctor}>{doctor}</option>
                  ))}
                </select>
              )}
              <button className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </button>
            </div>
          </div>

          {/* Content Sections */}
          {activeSection === 'consultations' && (
            <ConsultationReports
              consultations={consultationData}
              searchTerm={searchTerm}
              statusFilter={statusFilter}
              departmentFilter={departmentFilter}
              doctorFilter={doctorFilter}
            />
          )}
          {activeSection === 'prescriptions' && (
            <PrescriptionReports
              prescriptions={prescriptionData}
              searchTerm={searchTerm}
              departmentFilter={departmentFilter}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalDashboard;