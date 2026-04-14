"use client"

import { useState } from "react"
import { FileText, ArrowLeft, User, Heart, Shield, Phone, MapPin, CheckCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
const maritalStatus = ["Single", "Married", "Divorced", "Widowed", "Separated"]
const religions = ["Hindu", "Muslim", "Christian", "Sikh", "Buddhist", "Jain", "Other", "Prefer not to say"]
const occupations = [
  "Student",
  "Teacher",
  "Engineer",
  "Doctor",
  "Nurse",
  "Business",
  "Government Employee",
  "Private Employee",
  "Farmer",
  "Homemaker",
  "Retired",
  "Unemployed",
  "Other",
]
const relationshipTypes = ["Spouse", "Parent", "Child", "Sibling", "Friend", "Guardian", "Other"]

const medicalConditions = [
  "Diabetes",
  "Hypertension",
  "Heart Disease",
  "Asthma",
  "Arthritis",
  "Cancer",
  "Kidney Disease",
  "Liver Disease",
  "Thyroid Disorder",
  "Mental Health Condition",
  "Other",
]

const allergies = [
  "Penicillin",
  "Aspirin",
  "Sulfa drugs",
  "Latex",
  "Peanuts",
  "Shellfish",
  "Dairy",
  "Eggs",
  "Pollen",
  "Dust",
  "Pet dander",
  "Other",
]

export default function PatientRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    maritalStatus: "",
    religion: "",
    occupation: "",

    // Contact Information
    phone: "",
    alternatePhone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",

    // Emergency Contact
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelation: "",
    emergencyAddress: "",

    // Medical History
    medicalConditions: [],
    allergies: [],
    currentMedications: "",
    previousSurgeries: "",
    familyHistory: "",
    smokingStatus: "",
    alcoholStatus: "",

    // Insurance Information
    hasInsurance: false,
    insuranceProvider: "",
    policyNumber: "",
    policyHolderName: "",
    policyHolderRelation: "",

    // Additional Information
    preferredLanguage: "",
    specialNeeds: "",
    referredBy: "",
    visitReason: "",

    // Consent
    consentTreatment: false,
    consentDataSharing: false,
    consentMarketing: false,
  })

  const totalSteps = 6

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Mock submission
    setShowSuccess(true)
  }

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleArrayField = (field, value, checked) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked ? [...prev[field], value] : prev[field].filter((item) => item !== value),
    }))
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md">
          <div className="p-6 text-center border-b">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-600">Registration Complete!</h2>
            <p className="text-gray-600 mt-2">Your patient registration has been successfully submitted</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p>
                <strong>Patient ID:</strong> PT{Date.now().toString().slice(-6)}
              </p>
              <p>
                <strong>Name:</strong> {formData.firstName} {formData.lastName}
              </p>
              <p>
                <strong>Registration Date:</strong> {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                ✓ Your patient record has been created. Please bring a valid ID for verification during your visit.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link href="/dashboard" className="flex-1">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                  Go to Dashboard
                </button>
              </Link>
              <button
                onClick={() => window.print()}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Print Details
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900 ml-4">Patient Registration</h1>
            <Link href="/dashboard">
              <button className="flex items-center px-3 py-1 text-gray-600 bg-blue-200 rounded-full hover:text-gray-800 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep >= stepNumber ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {stepNumber}
              </div>
              {stepNumber < totalSteps && (
                <div className={`w-16 h-1 mx-2 ${currentStep > stepNumber ? "bg-blue-600" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold flex items-center">
              {currentStep === 1 && (
                <>
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </>
              )}
              {currentStep === 2 && (
                <>
                  <MapPin className="h-5 w-5 mr-2" />
                  Contact Information
                </>
              )}
              {currentStep === 3 && (
                <>
                  <Phone className="h-5 w-5 mr-2" />
                  Emergency Contact
                </>
              )}
              {currentStep === 4 && (
                <>
                  <Heart className="h-5 w-5 mr-2" />
                  Medical History
                </>
              )}
              {currentStep === 5 && (
                <>
                  <Shield className="h-5 w-5 mr-2" />
                  Insurance Information
                </>
              )}
              {currentStep === 6 && (
                <>
                  <FileText className="h-5 w-5 mr-2" />
                  Additional Information & Consent
                </>
              )}
            </h2>
            <p className="text-gray-600 mt-2">
              Step {currentStep} of {totalSteps} - Please fill in all required information
            </p>
          </div>
          <div className="p-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First Name *
                    </label>
                    <input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => updateFormData("firstName", e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last Name *
                    </label>
                    <input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => updateFormData("lastName", e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                      Date of Birth *
                    </label>
                    <input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Gender *</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => updateFormData("gender", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                    <select
                      value={formData.bloodGroup}
                      onChange={(e) => updateFormData("bloodGroup", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select blood group</option>
                      {bloodGroups.map((group) => (
                        <option key={group} value={group}>
                          {group}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Marital Status</label>
                    <select
                      value={formData.maritalStatus}
                      onChange={(e) => updateFormData("maritalStatus", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select status</option>
                      {maritalStatus.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Religion</label>
                    <select
                      value={formData.religion}
                      onChange={(e) => updateFormData("religion", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select religion</option>
                      {religions.map((religion) => (
                        <option key={religion} value={religion}>
                          {religion}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Occupation</label>
                    <select
                      value={formData.occupation}
                      onChange={(e) => updateFormData("occupation", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select occupation</option>
                      {occupations.map((occupation) => (
                        <option key={occupation} value={occupation}>
                          {occupation}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Contact Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="alternatePhone" className="block text-sm font-medium text-gray-700">
                      Alternate Phone
                    </label>
                    <input
                      id="alternatePhone"
                      type="tel"
                      value={formData.alternatePhone}
                      onChange={(e) => updateFormData("alternatePhone", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Complete Address *
                  </label>
                  <textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => updateFormData("address", e.target.value)}
                    placeholder="House/Flat No, Street, Area"
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City *
                    </label>
                    <input
                      id="city"
                      value={formData.city}
                      onChange={(e) => updateFormData("city", e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                      State *
                    </label>
                    <input
                      id="state"
                      value={formData.state}
                      onChange={(e) => updateFormData("state", e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                      PIN Code *
                    </label>
                    <input
                      id="pincode"
                      value={formData.pincode}
                      onChange={(e) => updateFormData("pincode", e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Emergency Contact */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                    <div>
                      <p className="text-yellow-800 font-semibold">Emergency Contact Information</p>
                      <p className="text-yellow-700 text-sm">
                        This person will be contacted in case of medical emergency
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="emergencyName" className="block text-sm font-medium text-gray-700">
                      Full Name *
                    </label>
                    <input
                      id="emergencyName"
                      value={formData.emergencyName}
                      onChange={(e) => updateFormData("emergencyName", e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="emergencyPhone" className="block text-sm font-medium text-gray-700">
                      Phone Number *
                    </label>
                    <input
                      id="emergencyPhone"
                      type="tel"
                      value={formData.emergencyPhone}
                      onChange={(e) => updateFormData("emergencyPhone", e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Relationship *</label>
                  <select
                    value={formData.emergencyRelation}
                    onChange={(e) => updateFormData("emergencyRelation", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select relationship</option>
                    {relationshipTypes.map((relation) => (
                      <option key={relation} value={relation}>
                        {relation}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="emergencyAddress" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <textarea
                    id="emergencyAddress"
                    value={formData.emergencyAddress}
                    onChange={(e) => updateFormData("emergencyAddress", e.target.value)}
                    placeholder="Emergency contact's address"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Medical History */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <label className="text-base font-semibold">Current Medical Conditions</label>
                  <div className="grid md:grid-cols-3 gap-2">
                    {medicalConditions.map((condition) => (
                      <div key={condition} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={condition}
                          checked={formData.medicalConditions.includes(condition)}
                          onChange={(e) => handleArrayField("medicalConditions", condition, e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor={condition} className="text-sm">
                          {condition}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div className="space-y-4">
                  <label className="text-base font-semibold">Known Allergies</label>
                  <div className="grid md:grid-cols-3 gap-2">
                    {allergies.map((allergy) => (
                      <div key={allergy} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={allergy}
                          checked={formData.allergies.includes(allergy)}
                          onChange={(e) => handleArrayField("allergies", allergy, e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor={allergy} className="text-sm">
                          {allergy}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="currentMedications" className="block text-sm font-medium text-gray-700">
                      Current Medications
                    </label>
                    <textarea
                      id="currentMedications"
                      value={formData.currentMedications}
                      onChange={(e) => updateFormData("currentMedications", e.target.value)}
                      placeholder="List all current medications with dosage"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="previousSurgeries" className="block text-sm font-medium text-gray-700">
                      Previous Surgeries/Hospitalizations
                    </label>
                    <textarea
                      id="previousSurgeries"
                      value={formData.previousSurgeries}
                      onChange={(e) => updateFormData("previousSurgeries", e.target.value)}
                      placeholder="List any previous surgeries or hospitalizations with dates"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="familyHistory" className="block text-sm font-medium text-gray-700">
                      Family Medical History
                    </label>
                    <textarea
                      id="familyHistory"
                      value={formData.familyHistory}
                      onChange={(e) => updateFormData("familyHistory", e.target.value)}
                      placeholder="Any hereditary conditions or family medical history"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Smoking Status</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="never-smoke"
                          name="smokingStatus"
                          value="never"
                          checked={formData.smokingStatus === "never"}
                          onChange={(e) => updateFormData("smokingStatus", e.target.value)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="never-smoke" className="text-sm">
                          Never
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="former-smoke"
                          name="smokingStatus"
                          value="former"
                          checked={formData.smokingStatus === "former"}
                          onChange={(e) => updateFormData("smokingStatus", e.target.value)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="former-smoke" className="text-sm">
                          Former smoker
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="current-smoke"
                          name="smokingStatus"
                          value="current"
                          checked={formData.smokingStatus === "current"}
                          onChange={(e) => updateFormData("smokingStatus", e.target.value)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="current-smoke" className="text-sm">
                          Current smoker
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Alcohol Consumption</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="never-alcohol"
                          name="alcoholStatus"
                          value="never"
                          checked={formData.alcoholStatus === "never"}
                          onChange={(e) => updateFormData("alcoholStatus", e.target.value)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="never-alcohol" className="text-sm">
                          Never
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="occasional-alcohol"
                          name="alcoholStatus"
                          value="occasional"
                          checked={formData.alcoholStatus === "occasional"}
                          onChange={(e) => updateFormData("alcoholStatus", e.target.value)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="occasional-alcohol" className="text-sm">
                          Occasional
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="regular-alcohol"
                          name="alcoholStatus"
                          value="regular"
                          checked={formData.alcoholStatus === "regular"}
                          onChange={(e) => updateFormData("alcoholStatus", e.target.value)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="regular-alcohol" className="text-sm">
                          Regular
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Insurance Information */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="hasInsurance"
                    checked={formData.hasInsurance}
                    onChange={(e) => updateFormData("hasInsurance", e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="hasInsurance" className="text-base font-semibold">
                    I have health insurance
                  </label>
                </div>

                {formData.hasInsurance && (
                  <div className="space-y-4 border rounded-lg p-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="insuranceProvider" className="block text-sm font-medium text-gray-700">
                          Insurance Provider *
                        </label>
                        <input
                          id="insuranceProvider"
                          value={formData.insuranceProvider}
                          onChange={(e) => updateFormData("insuranceProvider", e.target.value)}
                          placeholder="e.g., Star Health, HDFC ERGO"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="policyNumber" className="block text-sm font-medium text-gray-700">
                          Policy Number *
                        </label>
                        <input
                          id="policyNumber"
                          value={formData.policyNumber}
                          onChange={(e) => updateFormData("policyNumber", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="policyHolderName" className="block text-sm font-medium text-gray-700">
                          Policy Holder Name *
                        </label>
                        <input
                          id="policyHolderName"
                          value={formData.policyHolderName}
                          onChange={(e) => updateFormData("policyHolderName", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Relationship to Policy Holder</label>
                        <select
                          value={formData.policyHolderRelation}
                          onChange={(e) => updateFormData("policyHolderRelation", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select relationship</option>
                          <option value="self">Self</option>
                          <option value="spouse">Spouse</option>
                          <option value="parent">Parent</option>
                          <option value="child">Child</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {!formData.hasInsurance && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800 text-sm">
                      <strong>Note:</strong> Without insurance, you will be responsible for all medical costs. We accept
                      cash, card, and UPI payments.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 6: Additional Information & Consent */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="preferredLanguage" className="block text-sm font-medium text-gray-700">
                      Preferred Language
                    </label>
                    <select
                      id="preferredLanguage"
                      value={formData.preferredLanguage}
                      onChange={(e) => updateFormData("preferredLanguage", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select language</option>
                      <option value="english">English</option>
                      <option value="hindi">Hindi</option>
                      <option value="bengali">Bengali</option>
                      <option value="tamil">Tamil</option>
                      <option value="telugu">Telugu</option>
                      <option value="marathi">Marathi</option>
                      <option value="gujarati">Gujarati</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="referredBy" className="block text-sm font-medium text-gray-700">
                      Referred By
                    </label>
                    <input
                      id="referredBy"
                      value={formData.referredBy}
                      onChange={(e) => updateFormData("referredBy", e.target.value)}
                      placeholder="Doctor name or source"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="specialNeeds" className="block text-sm font-medium text-gray-700">
                    Special Needs/Accessibility Requirements
                  </label>
                  <textarea
                    id="specialNeeds"
                    value={formData.specialNeeds}
                    onChange={(e) => updateFormData("specialNeeds", e.target.value)}
                    placeholder="Wheelchair access, hearing aid, etc."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="visitReason" className="block text-sm font-medium text-gray-700">
                    Reason for Today's Visit
                  </label>
                  <textarea
                    id="visitReason"
                    value={formData.visitReason}
                    onChange={(e) => updateFormData("visitReason", e.target.value)}
                    placeholder="Brief description of your symptoms or reason for visit"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <hr className="border-gray-200" />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Consent and Agreements</h3>

                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        id="consentTreatment"
                        checked={formData.consentTreatment}
                        onChange={(e) => updateFormData("consentTreatment", e.target.checked)}
                        className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="consentTreatment" className="text-sm leading-relaxed">
                        I consent to medical treatment and understand that no guarantee has been made regarding the
                        outcome of treatment or examination.
                      </label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        id="consentDataSharing"
                        checked={formData.consentDataSharing}
                        onChange={(e) => updateFormData("consentDataSharing", e.target.checked)}
                        className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="consentDataSharing" className="text-sm leading-relaxed">
                        I authorize the hospital to share my medical information with insurance companies and other
                        healthcare providers as necessary for treatment and billing.
                      </label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        id="consentMarketing"
                        checked={formData.consentMarketing}
                        onChange={(e) => updateFormData("consentMarketing", e.target.checked)}
                        className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="consentMarketing" className="text-sm leading-relaxed">
                        I agree to receive health-related information and appointment reminders via SMS/email
                        (optional).
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {currentStep < totalSteps ? (
                <button
                  onClick={handleNext}
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!formData.consentTreatment}
                  className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Complete Registration
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
