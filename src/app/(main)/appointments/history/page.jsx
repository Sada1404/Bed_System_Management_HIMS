'use client'
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Upload, X, Calendar, AlertTriangle, FileText, Camera, Save, Cancel } from 'lucide-react';

const MedicalHistorySection = () => {
  const [activeSection, setActiveSection] = useState('illnesses');
  const [isAddingIllness, setIsAddingIllness] = useState(false);
  const [isAddingAllergy, setIsAddingAllergy] = useState(false);
  const [editingIllness, setEditingIllness] = useState(null);
  const [editingAllergy, setEditingAllergy] = useState(null);

  // Sample data - replace with your actual data
  const [pastIllnesses, setPastIllnesses] = useState([
    {
      id: 1,
      condition: 'Hypertension',
      diagnosedDate: '2020-03-15',
      status: 'Ongoing',
      severity: 'Moderate',
      notes: 'Controlled with medication. Regular monitoring required.',
      treatingDoctor: 'Dr. Smith'
    },
    {
      id: 2,
      condition: 'Type 2 Diabetes',
      diagnosedDate: '2019-07-22',
      status: 'Ongoing',
      severity: 'Mild',
      notes: 'Well controlled with diet and medication.',
      treatingDoctor: 'Dr. Johnson'
    },
    {
      id: 3,
      condition: 'Appendicitis',
      diagnosedDate: '2018-11-10',
      status: 'Resolved',
      severity: 'Severe',
      notes: 'Appendectomy performed. Full recovery.',
      treatingDoctor: 'Dr. Wilson'
    }
  ]);

  const [allergies, setAllergies] = useState([
    {
      id: 1,
      allergen: 'Penicillin',
      type: 'Medication',
      severity: 'Severe',
      symptoms: 'Skin rash, difficulty breathing',
      discoveredDate: '2015-05-12'
    },
    {
      id: 2,
      allergen: 'Peanuts',
      type: 'Food',
      severity: 'Moderate',
      symptoms: 'Hives, stomach upset',
      discoveredDate: '2010-08-03'
    },
    {
      id: 3,
      allergen: 'Dust Mites',
      type: 'Environmental',
      severity: 'Mild',
      symptoms: 'Sneezing, watery eyes',
      discoveredDate: '2012-04-18'
    }
  ]);

  const [uploadedPrescriptions, setUploadedPrescriptions] = useState([
    {
      id: 1,
      name: 'Prescription_Jan_2025.pdf',
      uploadDate: '2025-01-20',
      doctor: 'Dr. Smith',
      type: 'Prescription'
    },
    {
      id: 2,
      name: 'Lab_Results_Dec_2024.pdf',
      uploadDate: '2024-12-15',
      doctor: 'Dr. Johnson',
      type: 'Lab Report'
    }
  ]);

  const [newIllness, setNewIllness] = useState({
    condition: '',
    diagnosedDate: '',
    status: 'Ongoing',
    severity: 'Mild',
    notes: '',
    treatingDoctor: ''
  });

  const [newAllergy, setNewAllergy] = useState({
    allergen: '',
    type: 'Medication',
    severity: 'Mild',
    symptoms: '',
    discoveredDate: ''
  });

  const handleAddIllness = () => {
    if (newIllness.condition && newIllness.diagnosedDate) {
      const illness = {
        ...newIllness,
        id: Date.now()
      };
      setPastIllnesses([...pastIllnesses, illness]);
      setNewIllness({
        condition: '',
        diagnosedDate: '',
        status: 'Ongoing',
        severity: 'Mild',
        notes: '',
        treatingDoctor: ''
      });
      setIsAddingIllness(false);
    }
  };

  const handleAddAllergy = () => {
    if (newAllergy.allergen && newAllergy.discoveredDate) {
      const allergy = {
        ...newAllergy,
        id: Date.now()
      };
      setAllergies([...allergies, allergy]);
      setNewAllergy({
        allergen: '',
        type: 'Medication',
        severity: 'Mild',
        symptoms: '',
        discoveredDate: ''
      });
      setIsAddingAllergy(false);
    }
  };

  const handleEditIllness = (illness) => {
    setEditingIllness(illness);
  };

  const handleSaveIllness = (updatedIllness) => {
    setPastIllnesses(pastIllnesses.map(illness => 
      illness.id === updatedIllness.id ? updatedIllness : illness
    ));
    setEditingIllness(null);
  };

  const handleDeleteIllness = (id) => {
    setPastIllnesses(pastIllnesses.filter(illness => illness.id !== id));
  };

  const handleEditAllergy = (allergy) => {
    setEditingAllergy(allergy);
  };

  const handleSaveAllergy = (updatedAllergy) => {
    setAllergies(allergies.map(allergy => 
      allergy.id === updatedAllergy.id ? updatedAllergy : allergy
    ));
    setEditingAllergy(null);
  };

  const handleDeletedoc = (id) => {
  setUploadedPrescriptions(prev => prev.filter(doc => doc.id !== id));
  };
  const handlePreview = (doc) => {
  // If it's a URL, open in new tab:
  window.open(doc.url, '_blank');
  };


  const handleDeleteAllergy = (id) => {
    setAllergies(allergies.filter(allergy => allergy.id !== id));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      const newFile = {
        id: Date.now() + Math.random(),
        name: file.name,
        uploadDate: new Date().toISOString().split('T')[0],
        doctor: '',
        type: 'Prescription'
      };
      setUploadedPrescriptions(prev => [...prev, newFile]);
    });
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Mild': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'Severe': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ongoing': return 'bg-blue-100 text-blue-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Chronic': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const IllnessCard = ({ illness, isEditing, onEdit, onSave, onCancel, onDelete }) => {
    const [editData, setEditData] = useState(illness);

    if (isEditing) {
      return (
        <div className="bg-white border border-blue-200 rounded-lg p-6 shadow-sm">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Condition *</label>
                <input
                  type="text"
                  value={editData.condition}
                  onChange={(e) => setEditData({...editData, condition: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosed Date *</label>
                <input
                  type="date"
                  value={editData.diagnosedDate}
                  onChange={(e) => setEditData({...editData, diagnosedDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editData.status}
                  onChange={(e) => setEditData({...editData, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Ongoing">Ongoing</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Chronic">Chronic</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                <select
                  value={editData.severity}
                  onChange={(e) => setEditData({...editData, severity: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Mild">Mild</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Severe">Severe</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Treating Doctor</label>
                <input
                  type="text"
                  value={editData.treatingDoctor}
                  onChange={(e) => setEditData({...editData, treatingDoctor: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={editData.notes}
                  onChange={(e) => setEditData({...editData, notes: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => onSave(editData)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </button>
              <button
                onClick={onCancel}
                className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{illness.condition}</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(illness)}
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(illness.id)}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(illness.status)}`}>
              {illness.status}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(illness.severity)}`}>
              {illness.severity}
            </span>
          </div>
          
          <div className="text-sm text-gray-600">
            <p><span className="font-medium">Diagnosed:</span> {new Date(illness.diagnosedDate).toLocaleDateString()}</p>
            {illness.treatingDoctor && (
              <p><span className="font-medium">Doctor:</span> {illness.treatingDoctor}</p>
            )}
          </div>
          
          {illness.notes && (
            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">{illness.notes}</p>
          )}
        </div>
      </div>
    );
  };

  const AllergyCard = ({ allergy, isEditing, onEdit, onSave, onCancel, onDelete }) => {
    const [editData, setEditData] = useState(allergy);

    if (isEditing) {
      return (
        <div className="bg-white border border-red-200 rounded-lg p-6 shadow-sm">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Allergen *</label>
                <input
                  type="text"
                  value={editData.allergen}
                  onChange={(e) => setEditData({...editData, allergen: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={editData.type}
                  onChange={(e) => setEditData({...editData, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="Medication">Medication</option>
                  <option value="Food">Food</option>
                  <option value="Environmental">Environmental</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                <select
                  value={editData.severity}
                  onChange={(e) => setEditData({...editData, severity: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="Mild">Mild</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Severe">Severe</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discovered Date *</label>
                <input
                  type="date"
                  value={editData.discoveredDate}
                  onChange={(e) => setEditData({...editData, discoveredDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Symptoms</label>
                <textarea
                  value={editData.symptoms}
                  onChange={(e) => setEditData({...editData, symptoms: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => onSave(editData)}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </button>
              <button
                onClick={onCancel}
                className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h3 className="text-lg font-semibold text-gray-900">{allergy.allergen}</h3>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(allergy)}
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(allergy.id)}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-4">
            <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
              {allergy.type}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(allergy.severity)}`}>
              {allergy.severity}
            </span>
          </div>
          
          <div className="text-sm text-gray-600">
            <p><span className="font-medium">Discovered:</span> {new Date(allergy.discoveredDate).toLocaleDateString()}</p>
          </div>
          
          {allergy.symptoms && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Symptoms:</p>
              <p className="text-sm text-gray-700 bg-red-50 p-3 rounded-md">{allergy.symptoms}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className=" mx-auto ">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700  px-6 py-4">
        <h1 className="text-2xl font-semibold text-white text-center">Medical History</h1>
        <p className="text-teal-100 text-center mt-1 text-sm">Manage your past illnesses, allergies, and medical documents</p>
      </div>
     <div className='p-4'>
      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 mb-8 p-4">
        <button
          onClick={() => setActiveSection('illnesses')}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeSection === 'illnesses'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Past Illnesses
        </button>
        <button
          onClick={() => setActiveSection('allergies')}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeSection === 'allergies'
              ? 'border-red-500 text-red-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Allergies
        </button>
        <button
          onClick={() => setActiveSection('documents')}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeSection === 'documents'
              ? 'border-green-500 text-green-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Documents
        </button>
      </div>

      {/* Past Illnesses Section */}
      {activeSection === 'illnesses' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Past Illnesses</h2>
            <button
              onClick={() => setIsAddingIllness(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Illness
            </button>
          </div>

          {/* Add New Illness Form */}
          {isAddingIllness && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Illness</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Condition *</label>
                    <input
                      type="text"
                      value={newIllness.condition}
                      onChange={(e) => setNewIllness({...newIllness, condition: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Hypertension, Diabetes"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosed Date *</label>
                    <input
                      type="date"
                      value={newIllness.diagnosedDate}
                      onChange={(e) => setNewIllness({...newIllness, diagnosedDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={newIllness.status}
                      onChange={(e) => setNewIllness({...newIllness, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Ongoing">Ongoing</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Chronic">Chronic</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                    <select
                      value={newIllness.severity}
                      onChange={(e) => setNewIllness({...newIllness, severity: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Mild">Mild</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Severe">Severe</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Treating Doctor</label>
                    <input
                      type="text"
                      value={newIllness.treatingDoctor}
                      onChange={(e) => setNewIllness({...newIllness, treatingDoctor: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Doctor's name"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                      value={newIllness.notes}
                      onChange={(e) => setNewIllness({...newIllness, notes: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Additional notes about the condition"
                    />
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleAddIllness}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Illness
                  </button>
                  <button
                    onClick={() => setIsAddingIllness(false)}
                    className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Illnesses List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pastIllnesses.map(illness => (
              <IllnessCard
                key={illness.id}
                illness={illness}
                isEditing={editingIllness?.id === illness.id}
                onEdit={handleEditIllness}
                onSave={handleSaveIllness}
                onCancel={() => setEditingIllness(null)}
                onDelete={handleDeleteIllness}
              />
            ))}
          </div>
        </div>
      )}

      {/* Allergies Section */}
      {activeSection === 'allergies' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Allergies</h2>
            <button
              onClick={() => setIsAddingAllergy(true)}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Allergy
            </button>
          </div>

          {/* Add New Allergy Form */}
          {isAddingAllergy && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Allergy</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Allergen *</label>
                    <input
                      type="text"
                      value={newAllergy.allergen}
                      onChange={(e) => setNewAllergy({...newAllergy, allergen: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="e.g., Penicillin, Peanuts"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={newAllergy.type}
                      onChange={(e) => setNewAllergy({...newAllergy, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="Medication">Medication</option>
                      <option value="Food">Food</option>
                      <option value="Environmental">Environmental</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                    <select
                      value={newAllergy.severity}
                      onChange={(e) => setNewAllergy({...newAllergy, severity: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="Mild">Mild</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Severe">Severe</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discovered Date *</label>
                    <input
                      type="date"
                      value={newAllergy.discoveredDate}
                      onChange={(e) => setNewAllergy({...newAllergy, discoveredDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Symptoms</label>
                    <textarea
                      value={newAllergy.symptoms}
                      onChange={(e) => setNewAllergy({...newAllergy, symptoms: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Describe the symptoms experienced"
                    />
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleAddAllergy}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Allergy
                  </button>
                  <button
                    onClick={() => setIsAddingAllergy(false)}
                    className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Allergies List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {allergies.map(allergy => (
              <AllergyCard
                key={allergy.id}
                allergy={allergy}
                isEditing={editingAllergy?.id === allergy.id}
                onEdit={handleEditAllergy}
                onSave={handleSaveAllergy}
                onCancel={() => setEditingAllergy(null)}
                onDelete={handleDeleteAllergy}
              />
            ))}
          </div>

          {allergies.length === 0 && !isAddingAllergy && (
            <div className="text-center py-12">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No allergies recorded</h3>
              <p className="text-gray-600 mb-4">Keep track of your allergies for safer medical care</p>
              <button
                onClick={() => setIsAddingAllergy(true)}
                className="flex items-center mx-auto px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Allergy
              </button>
            </div>
          )}
        </div>
      )}

      {/* Documents Section */}
      {activeSection === 'documents' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Medical Documents</h2>
            <div className="flex space-x-3">
              <label className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors cursor-pointer">
                <Upload className="h-4 w-4 mr-2" />
                Upload Files
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Upload Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
            <div className="space-y-4">
              <div className="flex justify-center space-x-4">
                <Upload className="h-8 w-8 text-gray-400" />
                <Camera className="h-8 w-8 text-gray-400" />
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900">Upload Medical Documents</p>
                <p className="text-gray-600 mt-2">
                  Drag and drop files here, or click the upload button above
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB per file)
                </p>
              </div>
            </div>
          </div>

          {/* Documents List */}
          <div className="space-y-4">
            {uploadedPrescriptions.map(doc => (
              <div key={doc.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <FileText className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{doc.name}</h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</p>
                        {doc.doctor && <p>Doctor: {doc.doctor}</p>}
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {doc.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                     onClick={() => handlePreview(doc)}
                     className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <FileText className="h-5 w-5" />
                    </button>
                    <button 
                     onClick={() => handleDeletedoc(doc.id)}
                     className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {uploadedPrescriptions.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No documents uploaded</h3>
              <p className="text-gray-600 mb-4">Upload your prescriptions, lab reports, and other medical documents</p>
            </div>
          )}
        </div>
      )}

      {/* Emergency Contact Info */}
      <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-800">Important Medical Information</h3>
            <p className="text-yellow-700 mt-2">
              Keep this information updated and easily accessible. In case of emergency, medical professionals 
              will need accurate information about your allergies and medical history.
            </p>
            <div className="mt-4 flex space-x-4">
              <button className="text-sm bg-yellow-200 text-yellow-800 px-3 py-2 rounded-md hover:bg-yellow-300 transition-colors">
                Print Medical Summary
              </button>
              <button className="text-sm bg-yellow-200 text-yellow-800 px-3 py-2 rounded-md hover:bg-yellow-300 transition-colors">
                Download Emergency Card
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistorySection;