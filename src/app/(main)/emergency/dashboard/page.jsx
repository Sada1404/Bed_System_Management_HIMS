"use client";
import { useState } from "react";

export default function AmbulanceAssistDashboard() {
  const [emergencyRequest, setEmergencyRequest] = useState({
    fullName: "",
    phoneNumber: "",
    symptoms: "",
    location: "",
  });

  const [ambulanceRequest, setAmbulanceRequest] = useState({
    fullName: "",
    phoneNumber: "",
    location: "",
    hospital: "",
    medicalNote: "",
  });

  const handleEmergencyChange = (e) => {
    const { name, value } = e.target;
    setEmergencyRequest((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmbulanceChange = (e) => {
    const { name, value } = e.target;
    setAmbulanceRequest((prev) => ({ ...prev, [name]: value }));
  };

  const hospitals = [
    {
      name: "City Hospital",
      distance: "3.3 Km",
      address: "Sabnis Plot, Near kalyan Nagar Chowk",
      icuBeds: 20,
      status: "Available",
    },
    {
      name: "Max Hospital",
      distance: "3 Km",
      address: "Sabnis Plot, Near kalyan Nagar Chowk",
      icuBeds: 25,
      status: "Limited",
    },
    {
      name: "Grand Hospital",
      distance: "3 Km",
      address: "Sabnis Plot, Near kalyan Nagar Chowk",
      icuBeds: 25,
      status: "Full",
    },
  ];

  const [ambulanceStatus, setAmbulanceStatus] = useState({
    requested: true,
    assigned: true,
    dispatched: true,
    arrived: false,
    completed: false
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Dashboard Stats */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-700">Hospital Notified</h3>
            <p className="text-3xl font-bold mt-2">8</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-medium text-green-700">Ambulance Dispatched</h3>
            <p className="text-3xl font-bold mt-2">5</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Hospital Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Nearby Hospitals</h2>
          {hospitals.map((hospital, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 mb-4"
            >
              <h3 className="font-bold">{hospital.name}</h3>
              <p className="text-gray-600">
                {hospital.distance}, {hospital.address}
              </p>
              <p className="mt-2">{hospital.icuBeds} ICU Beds</p>
              <div className="flex justify-between items-center mt-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    hospital.status === "Available"
                      ? "bg-green-100 text-green-800"
                      : hospital.status === "Limited"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {hospital.status}
                </span>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Book An Appointment
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Request Form */}
        <div className="bg-white rounded-lg shadow-md p-6 col-span-1">
          <h2 className="text-xl font-semibold mb-4">Emergency Request Form</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={emergencyRequest.fullName}
                onChange={handleEmergencyChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={emergencyRequest.phoneNumber}
                onChange={handleEmergencyChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Symptoms</label>
              <textarea
                name="symptoms"
                value={emergencyRequest.symptoms}
                onChange={handleEmergencyChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows="3"
                placeholder="Describe symptoms"
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={emergencyRequest.location}
                onChange={handleEmergencyChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your location"
              />
            </div>
            <button
              type="button"
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 font-medium"
            >
              Submit Emergency Request
            </button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Ambulance Request Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Ambulance Request Form</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={ambulanceRequest.fullName}
                onChange={handleAmbulanceChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={ambulanceRequest.phoneNumber}
                onChange={handleAmbulanceChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={ambulanceRequest.location}
                onChange={handleAmbulanceChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your location"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Hospital</label>
              <select
                name="hospital"
                value={ambulanceRequest.hospital}
                onChange={handleAmbulanceChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="">Select Hospital</option>
                {hospitals.map((h, i) => (
                  <option key={i} value={h.name}>
                    {h.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Medical Note</label>
              <textarea
                name="medicalNote"
                value={ambulanceRequest.medicalNote}
                onChange={handleAmbulanceChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows="3"
                placeholder="Enter medical notes"
              ></textarea>
            </div>
            <button
              type="button"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
            >
              Submit Ambulance Request
            </button>
          </form>
        </div>

        {/* Ambulance Status Tracking */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold mb-6">
            Ambulance Status Tracking
          </h3>

          <div className="relative">
            {/* Progress line */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>

            {/* Status items */}
            <div className="space-y-8 pl-8">
              {/* Requested */}
              <div className="relative">
                <div
                  className={`absolute -left-8 top-0 w-6 h-6 rounded-full flex items-center justify-center 
                ${
                  ambulanceStatus.requested
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
                >
                  {ambulanceStatus.requested ? "✓" : "1"}
                </div>
                <div>
                  <h4
                    className={`font-medium ${
                      ambulanceStatus.requested
                        ? "text-green-600"
                        : "text-gray-600"
                    }`}
                  >
                    Requested
                  </h4>
                  <p className="text-sm text-gray-500">
                    {ambulanceStatus.requested
                      ? "Your ambulance request has been received"
                      : "Waiting for request confirmation"}
                  </p>
                  {ambulanceStatus.requested && (
                    <p className="text-xs text-gray-400 mt-1">
                      Today, 10:15 AM
                    </p>
                  )}
                </div>
              </div>

              {/* Assigned */}
              <div className="relative">
                <div
                  className={`absolute -left-8 top-0 w-6 h-6 rounded-full flex items-center justify-center 
                ${
                  ambulanceStatus.assigned
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
                >
                  {ambulanceStatus.assigned ? "✓" : "2"}
                </div>
                <div>
                  <h4
                    className={`font-medium ${
                      ambulanceStatus.assigned
                        ? "text-green-600"
                        : "text-gray-600"
                    }`}
                  >
                    Assigned
                  </h4>
                  <p className="text-sm text-gray-500">
                    {ambulanceStatus.assigned
                      ? "Ambulance #AMB789 assigned"
                      : "Waiting for ambulance assignment"}
                  </p>
                  {ambulanceStatus.assigned && (
                    <p className="text-xs text-gray-400 mt-1">
                      Today, 10:22 AM
                    </p>
                  )}
                </div>
              </div>

              {/* Dispatched */}
              <div className="relative">
                <div
                  className={`absolute -left-8 top-0 w-6 h-6 rounded-full flex items-center justify-center 
                ${
                  ambulanceStatus.dispatched
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
                >
                  {ambulanceStatus.dispatched ? "✓" : "3"}
                </div>
                <div>
                  <h4
                    className={`font-medium ${
                      ambulanceStatus.dispatched
                        ? "text-green-600"
                        : "text-gray-600"
                    }`}
                  >
                    Dispatched
                  </h4>
                  <p className="text-sm text-gray-500">
                    {ambulanceStatus.dispatched
                      ? "Ambulance is on the way"
                      : "Waiting for dispatch"}
                  </p>
                  {ambulanceStatus.dispatched && (
                    <div className="mt-1">
                      <p className="text-xs text-gray-400">Today, 10:30 AM</p>
                      <p className="text-xs text-blue-500">ETA: 12 minutes</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Arrived */}
              <div className="relative">
                <div
                  className={`absolute -left-8 top-0 w-6 h-6 rounded-full flex items-center justify-center 
                ${
                  ambulanceStatus.arrived
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
                >
                  {ambulanceStatus.arrived ? "✓" : "4"}
                </div>
                <div>
                  <h4
                    className={`font-medium ${
                      ambulanceStatus.arrived
                        ? "text-green-600"
                        : "text-gray-600"
                    }`}
                  >
                    Arrived
                  </h4>
                  <p className="text-sm text-gray-500">
                    {ambulanceStatus.arrived
                      ? "Ambulance has arrived at your location"
                      : "Waiting for arrival"}
                  </p>
                  {ambulanceStatus.arrived && (
                    <p className="text-xs text-gray-400 mt-1">
                      Today, 10:42 AM
                    </p>
                  )}
                </div>
              </div>

              {/* Completed */}
              <div className="relative">
                <div
                  className={`absolute -left-8 top-0 w-6 h-6 rounded-full flex items-center justify-center 
                ${
                  ambulanceStatus.completed
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
                >
                  {ambulanceStatus.completed ? "✓" : "5"}
                </div>
                <div>
                  <h4
                    className={`font-medium ${
                      ambulanceStatus.completed
                        ? "text-green-600"
                        : "text-gray-600"
                    }`}
                  >
                    Completed
                  </h4>
                  <p className="text-sm text-gray-500">
                    {ambulanceStatus.completed
                      ? "Patient safely transported to hospital"
                      : "Transport in progress"}
                  </p>
                  {ambulanceStatus.completed && (
                    <p className="text-xs text-gray-400 mt-1">
                      Today, 11:15 AM
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium">
              Contact Driver
            </button>
            <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 font-medium">
              Cancel Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
