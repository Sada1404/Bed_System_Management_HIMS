'use client';
import React, { useState } from 'react';
import { FileText, Eye, Download, User, Stethoscope, ClipboardList, Activity, Pill } from 'lucide-react';
import jsPDF from 'jspdf';

// Utility function for status colors
const getStatusColor = (status) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800 border-green-200';
    case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
    case 'active': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

// Filter function
const useConsultationFilters = (consultations, searchTerm, statusFilter, departmentFilter, doctorFilter) => {
  return consultations.filter(report => {
    const matchesSearch =
      report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || report.department === departmentFilter;
    const matchesDoctor = doctorFilter === 'all' || report.doctorName === doctorFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment && matchesDoctor;
  });
};

// PDF generation function
const generateConsultationPDF = (consultation) => {
  const doc = new jsPDF();
  let yOffset = 20;

  // Title
  doc.setFontSize(16);
  doc.text('CONSULTATION REPORT', 20, yOffset);
  yOffset += 10;
  doc.setFontSize(12);
  doc.text(`Report ID: ${consultation.id}`, 20, yOffset);
  doc.text(`Date Generated: ${new Date().toLocaleDateString()}`, 140, yOffset);
  yOffset += 10;

  // Patient Information
  doc.setFontSize(14);
  doc.text('PATIENT INFORMATION', 20, yOffset);
  yOffset += 5;
  doc.setLineWidth(0.5);
  doc.line(20, yOffset, 190, yOffset);
  yOffset += 10;
  doc.setFontSize(12);
  doc.text(`Name: ${consultation.patientName}`, 20, yOffset);
  yOffset += 7;
  doc.text(`Patient ID: ${consultation.patientId}`, 20, yOffset);
  yOffset += 7;
  doc.text(`Age: ${consultation.patientAge} years`, 20, yOffset);
  yOffset += 7;
  doc.text(`Gender: ${consultation.patientGender}`, 20, yOffset);
  yOffset += 7;
  doc.text(`Contact: ${consultation.patientContact}`, 20, yOffset);
  yOffset += 7;
  doc.text(`Email: ${consultation.patientEmail}`, 20, yOffset);
  yOffset += 15;

  // Doctor Information
  doc.setFontSize(14);
  doc.text('DOCTOR INFORMATION', 20, yOffset);
  yOffset += 5;
  doc.line(20, yOffset, 190, yOffset);
  yOffset += 10;
  doc.setFontSize(12);
  doc.text(`Doctor: ${consultation.doctorName}`, 20, yOffset);
  yOffset += 7;
  doc.text(`Doctor ID: ${consultation.doctorId}`, 20, yOffset);
  yOffset += 7;
  doc.text(`Department: ${consultation.department}`, 20, yOffset);
  yOffset += 15;

  // Consultation Details
  doc.setFontSize(14);
  doc.text('CONSULTATION DETAILS', 20, yOffset);
  yOffset += 5;
  doc.line(20, yOffset, 190, yOffset);
  yOffset += 10;
  doc.setFontSize(12);
  doc.text(`Date: ${new Date(consultation.consultationDate).toLocaleDateString()}`, 20, yOffset);
  yOffset += 7;
  doc.text(`Time: ${consultation.consultationTime}`, 20, yOffset);
  yOffset += 7;
  doc.text(`Type: ${consultation.consultationType}`, 20, yOffset);
  yOffset += 7;
  doc.text(`Status: ${consultation.status.toUpperCase()}`, 20, yOffset);
  yOffset += 15;

  // Clinical Information
  doc.setFontSize(14);
  doc.text('CLINICAL INFORMATION', 20, yOffset);
  yOffset += 5;
  doc.line(20, yOffset, 190, yOffset);
  yOffset += 10;
  doc.setFontSize(12);
  doc.text(`Chief Complaint: ${consultation.chiefComplaint}`, 20, yOffset, { maxWidth: 170 });
  yOffset += 10;
  doc.text(`Symptoms: ${consultation.symptoms.join(', ')}`, 20, yOffset, { maxWidth: 170 });
  yOffset += 10;
  doc.text(`Diagnosis: ${consultation.diagnosis}`, 20, yOffset, { maxWidth: 170 });
  yOffset += 10;
  doc.text(`Treatment: ${consultation.treatment}`, 20, yOffset, { maxWidth: 170 });
  yOffset += 10;
  doc.text(`Doctor's Notes: ${consultation.notes}`, 20, yOffset, { maxWidth: 170 });
  yOffset += 15;

  // Vital Signs
  if (consultation.vitalSigns) {
    doc.setFontSize(14);
    doc.text('VITAL SIGNS', 20, yOffset);
    yOffset += 5;
    doc.line(20, yOffset, 190, yOffset);
    yOffset += 10;
    doc.setFontSize(12);
    Object.entries(consultation.vitalSigns).forEach(([key, value]) => {
      doc.text(`${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: ${value}`, 20, yOffset);
      yOffset += 7;
    });
    yOffset += 10;
  }

  // Prescriptions
  if (consultation.prescriptions.length > 0) {
    doc.setFontSize(14);
    doc.text('PRESCRIBED MEDICATIONS', 20, yOffset);
    yOffset += 5;
    doc.line(20, yOffset, 190, yOffset);
    yOffset += 10;
    doc.setFontSize(12);
    consultation.prescriptions.forEach((med, index) => {
      doc.text(`${index + 1}. ${med.name} (${med.dosage})`, 20, yOffset);
      yOffset += 7;
      doc.text(`   Frequency: ${med.frequency}`, 20, yOffset);
      yOffset += 7;
      doc.text(`   Duration: ${med.duration}`, 20, yOffset);
      yOffset += 7;
      doc.text(`   Instructions: ${med.instructions}`, 20, yOffset, { maxWidth: 170 });
      yOffset += 10;
    });
    yOffset += 10;
  }

  // Lab Tests
  if (consultation.labTests.length > 0) {
    doc.setFontSize(14);
    doc.text('LABORATORY TESTS', 20, yOffset);
    yOffset += 5;
    doc.line(20, yOffset, 190, yOffset);
    yOffset += 10;
    doc.setFontSize(12);
    consultation.labTests.forEach((test, index) => {
      doc.text(`${index + 1}. ${test.test}`, 20, yOffset);
      yOffset += 7;
      doc.text(`   Result: ${test.result}`, 20, yOffset);
      yOffset += 7;
      doc.text(`   Date: ${new Date(test.date).toLocaleDateString()}`, 20, yOffset);
      yOffset += 10;
    });
    yOffset += 10;
  }

  // Financial Information
  doc.setFontSize(14);
  doc.text('FINANCIAL INFORMATION', 20, yOffset);
  yOffset += 5;
  doc.line(20, yOffset, 190, yOffset);
  yOffset += 10;
  doc.setFontSize(12);
  doc.text(`Consultation Fee: $${consultation.consultationFee}`, 20, yOffset);
  yOffset += 7;
  doc.text(`Insurance Covered: ${consultation.insuranceCovered ? 'Yes' : 'No'}`, 20, yOffset);
  yOffset += 7;
  if (consultation.followUpDate) {
    doc.text(`Next Follow-up: ${new Date(consultation.followUpDate).toLocaleDateString()}`, 20, yOffset);
    yOffset += 7;
  }

  // Footer
  yOffset += 15;
  doc.setFontSize(10);
  doc.text(`Report generated on ${new Date().toLocaleString()}`, 20, yOffset);

  // Save the PDF
  doc.save(`consultation-report-${consultation.id}.pdf`);
};

// Detailed Report Modal Component
const DetailedReportModal = ({ report, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Detailed Consultation Report</h2>
          <p className="text-gray-600">Report ID: {report.id}</p>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-2xl"
        >
          ×
        </button>
      </div>

      <div className="p-6 space-y-8">
        {/* Patient Information */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User className="h-5 w-5 mr-2 text-blue-600" />
            Patient Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><span className="font-medium">Name:</span> {report.patientName}</p>
              <p><span className="font-medium">Patient ID:</span> {report.patientId}</p>
              <p><span className="font-medium">Age:</span> {report.patientAge} years</p>
              <p><span className="font-medium">Gender:</span> {report.patientGender}</p>
            </div>
            <div>
              <p><span className="font-medium">Contact:</span> {report.patientContact}</p>
              <p><span className="font-medium">Email:</span> {report.patientEmail}</p>
            </div>
          </div>
        </div>

        {/* Doctor Information */}
        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Stethoscope className="h-5 w-5 mr-2 text-green-600" />
            Doctor Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><span className="font-medium">Doctor:</span> {report.doctorName}</p>
              <p><span className="font-medium">Doctor ID:</span> {report.doctorId}</p>
              <p><span className="font-medium">Department:</span> {report.department}</p>
            </div>
            <div>
              <p><span className="font-medium">Consultation Date:</span> {new Date(report.consultationDate).toLocaleDateString()}</p>
              <p><span className="font-medium">Time:</span> {report.consultationTime}</p>
              <p><span className="font-medium">Type:</span> {report.consultationType}</p>
            </div>
          </div>
        </div>

        {/* Clinical Information */}
        <div className="bg-yellow-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ClipboardList className="h-5 w-5 mr-2 text-yellow-600" />
            Clinical Information
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Chief Complaint</h4>
              <p className="text-gray-700 bg-white p-3 rounded border">{report.chiefComplaint}</p>
            </div>
            
            {report.vitalSigns && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Vital Signs</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(report.vitalSigns).map(([key, value]) => (
                    <div key={key} className="bg-white p-3 rounded border">
                      <p className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                      <p className="font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Symptoms</h4>
              <div className="flex flex-wrap gap-2">
                {report.symptoms.map((symptom, index) => (
                  <span key={index} className="bg-white px-3 py-1 rounded-full border text-sm">
                    {symptom}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Diagnosis</h4>
              <p className="text-gray-700 bg-white p-3 rounded border">{report.diagnosis}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Treatment Plan</h4>
              <p className="text-gray-700 bg-white p-3 rounded border">{report.treatment}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Doctor's Notes</h4>
              <p className="text-gray-700 bg-white p-3 rounded border">{report.notes}</p>
            </div>
          </div>
        </div>

        {/* Prescriptions */}
        {report.prescriptions.length > 0 && (
          <div className="bg-purple-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Pill className="h-5 w-5 mr-2 text-purple-600" />
              Prescribed Medications
            </h3>
            <div className="space-y-3">
              {report.prescriptions.map((med, index) => (
                <div key={index} className="bg-white p-4 rounded border">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{med.name}</h4>
                    <span className="text-sm font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded">
                      {med.dosage}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-600">
                    <p><span className="font-medium">Frequency:</span> {med.frequency}</p>
                    <p><span className="font-medium">Duration:</span> {med.duration}</p>
                    <p><span className="font-medium">Instructions:</span> {med.instructions}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lab Tests */}
        {report.labTests.length > 0 && (
          <div className="bg-indigo-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-indigo-600" />
              Laboratory Tests
            </h3>
            <div className="space-y-3">
              {report.labTests.map((test, index) => (
                <div key={index} className="bg-white p-4 rounded border">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{test.test}</h4>
                      <p className="text-gray-700">{test.result}</p>
                    </div>
                    <span className="text-sm text-gray-500">{new Date(test.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Financial Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><span className="font-medium">Consultation Fee:</span> ${report.consultationFee}</p>
            <p><span className="font-medium">Insurance Covered:</span> {report.insuranceCovered ? 'Yes' : 'No'}</p>
            {report.followUpDate && (
              <p><span className="font-medium">Next Follow-up:</span> {new Date(report.followUpDate).toLocaleDateString()}</p>
            )}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 bg-white border-t p-6 flex justify-end space-x-3">
        <button 
          onClick={() => generateConsultationPDF(report)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </button>
        <button 
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

const ConsultationReports = ({ consultations, searchTerm, statusFilter, departmentFilter, doctorFilter }) => {
  const [selectedReport, setSelectedReport] = useState(null);

  const filteredConsultations = useConsultationFilters(
    consultations,
    searchTerm,
    statusFilter,
    departmentFilter,
    doctorFilter
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Consultation Reports</h2>
      {filteredConsultations.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Doctor & Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Consultation Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredConsultations.map(report => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{report.patientName}</div>
                        <div className="text-sm text-gray-500">ID: {report.patientId}</div>
                        <div className="text-sm text-gray-500">{report.patientAge}y, {report.patientGender}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{report.doctorName}</div>
                        <div className="text-sm text-gray-500">{report.department}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">{new Date(report.consultationDate).toLocaleDateString()}</div>
                        <div className="text-sm text-gray-500">{report.consultationTime}</div>
                        <div className="text-sm text-gray-500">{report.consultationType}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(report.status)}`}>
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedReport(report)}
                          className="flex items-center px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </button>
                        <button 
                          onClick={() => generateConsultationPDF(report)}
                          className="flex items-center px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No consultation records found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
      {selectedReport && (
        <DetailedReportModal 
          report={selectedReport} 
          onClose={() => setSelectedReport(null)} 
        />
      )}
    </div>
  );
};

export default ConsultationReports;