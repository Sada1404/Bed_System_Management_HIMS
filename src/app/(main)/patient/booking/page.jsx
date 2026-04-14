"use client"

import { useState } from "react"
import { Calendar, Star, ArrowLeft } from 'lucide-react'
import Link from "next/link"
import { useRouter } from "next/navigation"

const specializations = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Radiology",
  "Surgery",
]

const locations = ["Downtown Medical Center", "North Side Hospital", "East Valley Clinic", "West End Medical Plaza"]

const doctors = {
  Cardiology: [
    { id: 1, name: "Dr. Sarah Johnson", rating: 4.8, experience: "15 years", fee: "$150" },
    { id: 2, name: "Dr. Michael Brown", rating: 4.6, experience: "12 years", fee: "$140" },
  ],
  Dermatology: [
    { id: 3, name: "Dr. Emily Chen", rating: 4.9, experience: "10 years", fee: "$120" },
    { id: 4, name: "Dr. David Wilson", rating: 4.7, experience: "8 years", fee: "$110" },
  ],
  Neurology: [{ id: 5, name: "Dr. Lisa Anderson", rating: 4.8, experience: "18 years", fee: "$180" }],
}

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
]

export default function BookAppointmentPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    specialization: "",
    location: "",
    doctor: null,
    date: "",
    time: "",
    reason: "",
  })
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    // Mock booking submission
    setShowConfirmation(true)
  }

  const availableDoctors = doctors[formData.specialization] || []

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md">
          <div className="p-6 text-center border-b">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-600">Booking Confirmed!</h2>
            <p className="text-gray-600 mt-2">Your appointment has been successfully booked</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p>
                <strong>Doctor:</strong> {formData.doctor?.name}
              </p>
              <p>
                <strong>Specialization:</strong> {formData.specialization}
              </p>
              <p>
                <strong>Date:</strong> {formData.date}
              </p>
              <p>
                <strong>Time:</strong> {formData.time}
              </p>
              <p>
                <strong>Location:</strong> {formData.location}
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Book Another
              </button>
              <Link href="/dashboard" className="flex-1">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Go to Dashboard
                </button>
              </Link>
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
            <h1 className="text-2xl font-bold text-gray-900 ml-4">Book Appointment</h1>
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
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step >= stepNumber ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {stepNumber}
              </div>
              {stepNumber < 4 && (
                <div className={`w-16 h-1 mx-2 ${step > stepNumber ? "bg-blue-600" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">
              {step === 1 && "Select Specialization & Location"}
              {step === 2 && "Choose Your Doctor"}
              {step === 3 && "Pick Date & Time"}
              {step === 4 && "Add Details & Confirm"}
            </h2>
          </div>
          <div className="p-6">
            {/* Step 1: Specialization & Location */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Select Specialization</label>
                  <select
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Choose specialization</option>
                    {specializations.map((spec) => (
                      <option key={spec} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Select Location</label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Choose location</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleNext}
                  disabled={!formData.specialization || !formData.location}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Next: Choose Doctor
                </button>
              </div>
            )}

            {/* Step 2: Doctor Selection */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="grid gap-4">
                  {availableDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        formData.doctor?.id === doctor.id
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:shadow-md"
                      }`}
                      onClick={() => setFormData({ ...formData, doctor })}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{doctor.name}</h3>
                          <p className="text-gray-600">{formData.specialization}</p>
                          <div className="flex items-center mt-2">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            <span className="text-sm">{doctor.rating}</span>
                            <span className="text-gray-400 mx-2">•</span>
                            <span className="text-sm text-gray-600">{doctor.experience}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                            {doctor.fee}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleBack}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!formData.doctor}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Next: Pick Date & Time
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Date & Time */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Select Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Select Time</label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setFormData({ ...formData, time })}
                        className={`px-3 py-2 rounded-md text-sm transition-colors ${
                          formData.time === time
                            ? "bg-blue-600 text-white"
                            : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleBack}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!formData.date || !formData.time}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Next: Add Details
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Details & Confirmation */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Reason for Visit</label>
                  <textarea
                    placeholder="Describe your symptoms or reason for the appointment"
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Appointment Summary</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Doctor:</strong> {formData.doctor?.name}
                    </p>
                    <p>
                      <strong>Specialization:</strong> {formData.specialization}
                    </p>
                    <p>
                      <strong>Date:</strong> {formData.date}
                    </p>
                    <p>
                      <strong>Time:</strong> {formData.time}
                    </p>
                    <p>
                      <strong>Location:</strong> {formData.location}
                    </p>
                    <p>
                      <strong>Fee:</strong> {formData.doctor?.fee}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleBack}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
