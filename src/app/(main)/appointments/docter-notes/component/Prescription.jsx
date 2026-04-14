'use client';
import React from 'react';
import { Pill, Eye, Download, AlertCircle } from 'lucide-react';
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
const usePrescriptionFilters = (prescriptions, searchTerm, departmentFilter) => {
  return prescriptions.filter(prescription => {
    const matchesSearch =
      prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.medicines.some(med =>
        med.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesDepartment = departmentFilter === 'all' || prescription.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });
};

// PDF generation function
const generatePrescriptionPDF = (prescription) => {
  const doc = new jsPDF();
  let yOffset = 20;

  // Title
  doc.setFontSize(16);
  doc.text('PRESCRIPTION REPORT', 20, yOffset);
  yOffset += 10;
  doc.setFontSize(12);
  doc.text(`Prescription ID: ${prescription.id}`, 20, yOffset);
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
  doc.text(`Name: ${prescription.patientName}`, 20, yOffset);
  yOffset += 7;
  doc.text(`Patient ID: ${prescription.patientId}`, 20, yOffset);
  yOffset += 15;

  // Doctor Information
  doc.setFontSize(14);
  doc.text('DOCTOR INFORMATION', 20, yOffset);
  yOffset += 5;
  doc.line(20, yOffset, 190, yOffset);
  yOffset += 10;
  doc.setFontSize(12);
  doc.text(`Doctor: ${prescription.doctorName}`, 20, yOffset);
  yOffset += 7;
  doc.text(`Doctor ID: ${prescription.doctorId}`, 20, yOffset);
  yOffset += 7;
  doc.text(`Department: ${prescription.department}`, 20, yOffset);
  yOffset += 15;

  // Prescription Details
  doc.setFontSize(14);
  doc.text('PRESCRIPTION DETAILS', 20, yOffset);
  yOffset += 5;
  doc.line(20, yOffset, 190, yOffset);
  yOffset += 10;
  doc.setFontSize(12);
  doc.text(`Prescription Date: ${new Date(prescription.prescriptionDate).toLocaleDateString()}`, 20, yOffset);
  yOffset += 7;
  doc.text(`Status: ${prescription.status.toUpperCase()}`, 20, yOffset);
  yOffset += 7;
  doc.text(`Total Medicines: ${prescription.totalMedicines}`, 20, yOffset);
  yOffset += 7;
  doc.text(`Total Cost: $${prescription.totalCost}`, 20, yOffset);
  yOffset += 15;

  // Prescribed Medications
  doc.setFontSize(14);
  doc.text('PRESCRIBED MEDICATIONS', 20, yOffset);
  yOffset += 5;
  doc.line(20, yOffset, 190, yOffset);
  yOffset += 10;
  doc.setFontSize(12);
  prescription.medicines.forEach((med, index) => {
    doc.text(`${index + 1}. ${med.name} (${med.dosage})`, 20, yOffset);
    yOffset += 7;
    doc.text(`   Frequency: ${med.frequency}`, 20, yOffset);
    yOffset += 7;
    doc.text(`   Duration: ${med.duration}`, 20, yOffset);
    yOffset += 7;
    doc.text(`   Instructions: ${med.instructions}`, 20, yOffset, { maxWidth: 170 });
    yOffset += 7;
    doc.text(`   Cost: $${med.cost}`, 20, yOffset);
    yOffset += 7;
    doc.text(`   Refills Remaining: ${med.refillsRemaining}`, 20, yOffset);
    yOffset += 10;
  });
  yOffset += 10;

  // Pharmacy Information
  doc.setFontSize(14);
  doc.text('PHARMACY INFORMATION', 20, yOffset);
  yOffset += 5;
  doc.line(20, yOffset, 190, yOffset);
  yOffset += 10;
  doc.setFontSize(12);
  doc.text(`Pharmacy: ${prescription.pharmacyName}`, 20, yOffset);
  yOffset += 7;
  doc.text(`Dispensed Date: ${prescription.dispensedDate ? new Date(prescription.dispensedDate).toLocaleDateString() : 'Not dispensed'}`, 20, yOffset);
  yOffset += 7;
  doc.text(`Next Refill: ${prescription.nextRefillDate ? new Date(prescription.nextRefillDate).toLocaleDateString() : 'N/A'}`, 20, yOffset);
  yOffset += 15;

  // Footer
  doc.setFontSize(10);
  doc.text(`Report generated on ${new Date().toLocaleString()}`, 20, yOffset);

  // Save the PDF
  doc.save(`prescription-report-${prescription.id}.pdf`);
};

const PrescriptionReports = ({ prescriptions, searchTerm, departmentFilter }) => {
  const filteredPrescriptions = usePrescriptionFilters(prescriptions, searchTerm, departmentFilter);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Prescription Reports</h2>
      {filteredPrescriptions.length > 0 ? (
        <div className="grid gap-6">
          {filteredPrescriptions.map(prescription => (
            <div key={prescription.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Pill className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Prescription #{prescription.id}</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><span className="font-medium">Patient:</span> {prescription.patientName} (ID: {prescription.patientId})</p>
                      <p><span className="font-medium">Doctor:</span> {prescription.doctorName}</p>
                      <p><span className="font-medium">Department:</span> {prescription.department}</p>
                      <p><span className="font-medium">Date:</span> {new Date(prescription.prescriptionDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(prescription.status)}`}>
                    {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                  </span>
                  <div className="text-right text-sm text-gray-600">
                    <p className="font-medium">${prescription.totalCost}</p>
                    <p>{prescription.totalMedicines} medicine(s)</p>
                  </div>
                </div>
              </div>

              {/* Medicine List */}
              <div className="bg-purple-50 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-gray-900 mb-3">Prescribed Medicines</h4>
                <div className="space-y-2">
                  {prescription.medicines.map((medicine, index) => (
                    <div key={index} className="bg-white rounded p-3 border border-purple-200">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{medicine.name}</span>
                          <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded">
                            {medicine.dosage}
                          </span>
                        </div>
                        <div className="text-right text-sm">
                          <p className="font-medium text-gray-900">${medicine.cost}</p>
                          <p className="text-gray-500">{medicine.refillsRemaining} refills left</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                        <p><span className="font-medium">Frequency:</span> {medicine.frequency}</p>
                        <p><span className="font-medium">Duration:</span> {medicine.duration}</p>
                        <p><span className="font-medium">Instructions:</span> {medicine.instructions}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Prescription Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Pharmacy:</span>
                  <p>{prescription.pharmacyName}</p>
                </div>
                <div>
                  <span className="font-medium">Dispensed Date:</span>
                  <p>{prescription.dispensedDate ? new Date(prescription.dispensedDate).toLocaleDateString() : 'Not dispensed'}</p>
                </div>
                <div>
                  <span className="font-medium">Next Refill:</span>
                  <p>{prescription.nextRefillDate ? new Date(prescription.nextRefillDate).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <Eye className="h-4 w-4 mr-2" />
                  View Full Prescription
                </button>
                <button 
                  onClick={() => generatePrescriptionPDF(prescription)}
                  className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </button>
                {prescription.status === 'active' && (
                  <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Track Refills
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Pill className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No prescription records found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default PrescriptionReports;