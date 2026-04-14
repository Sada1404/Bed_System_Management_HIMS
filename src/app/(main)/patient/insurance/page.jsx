"use client"

import { useState } from "react"
import { Shield, Upload, ArrowLeft, CheckCircle, FileText } from "lucide-react"
import Link from "next/link"

const insuranceProviders = [
  "Ayushman Bharat",
  "Star Health",
  "HDFC ERGO",
  "ICICI Lombard",
  "Bajaj Allianz",
  "New India Assurance",
  "Oriental Insurance",
  "United India Insurance",
  "National Insurance",
  "Other",
]

const policyTypes = [
  "Individual Health Insurance",
  "Family Floater",
  "Senior Citizen Plan",
  "Critical Illness Cover",
  "Group Health Insurance",
  "Top-up Plan",
]

export default function InsurancePage() {
  const [formData, setFormData] = useState({
    provider: "",
    policyType: "",
    policyNumber: "",
    validityDate: "",
    uploadedFile: null,
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock submission
    setShowSuccess(true)
  }

  const handleFileUpload = (file) => {
    if (file && (file.type === "application/pdf" || file.type.startsWith("image/"))) {
      setFormData({ ...formData, uploadedFile: file })
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md">
          <div className="p-6 text-center border-b">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-600">Insurance Added Successfully!</h2>
            <p className="text-gray-600 mt-2">Your insurance information has been saved</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p>
                <strong>Provider:</strong> {formData.provider}
              </p>
              <p>
                <strong>Policy Type:</strong> {formData.policyType}
              </p>
              <p>
                <strong>Valid Until:</strong> {formData.validityDate}
              </p>
              <p>
                <strong>Document:</strong> {formData.uploadedFile?.name}
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-2">
              <p className="text-blue-800 text-sm">
                ✓ Your insurance is now active and will be used for faster appointment processing
              </p>
            </div>
            <Link href="/dashboard">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Go to Dashboard
              </button>
            </Link>
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
            <h1 className="text-2xl font-bold text-gray-900 ml-4">Insurance Information</h1>
            <Link href="/dashboard">
              <button className="flex items-center px-3 py-1 text-gray-600 bg-blue-200 rounded-full hover:text-gray-800 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold flex items-center">
              <Shield className="h-6 w-6 mr-2 text-green-600" />
              Add Insurance Details
            </h2>
            <p className="text-gray-600 mt-2">
              Upload your insurance information for faster appointment processing and hospital filtering
            </p>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="provider" className="block text-sm font-medium text-gray-700">
                  Insurance Provider
                </label>
                <select
                  id="provider"
                  value={formData.provider}
                  onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select your insurance provider</option>
                  {insuranceProviders.map((provider) => (
                    <option key={provider} value={provider}>
                      {provider}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="policyType" className="block text-sm font-medium text-gray-700">
                  Policy Type
                </label>
                <select
                  id="policyType"
                  value={formData.policyType}
                  onChange={(e) => setFormData({ ...formData, policyType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select policy type</option>
                  {policyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="policyNumber" className="block text-sm font-medium text-gray-700">
                  Policy Number
                </label>
                <input
                  id="policyNumber"
                  type="text"
                  placeholder="Enter your policy number"
                  value={formData.policyNumber}
                  onChange={(e) => setFormData({ ...formData, policyNumber: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="validityDate" className="block text-sm font-medium text-gray-700">
                  Validity Date
                </label>
                <input
                  id="validityDate"
                  type="date"
                  value={formData.validityDate}
                  onChange={(e) => setFormData({ ...formData, validityDate: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Upload Health Card (Image/PDF)</label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {formData.uploadedFile ? (
                    <div className="space-y-2">
                      <FileText className="h-12 w-12 text-green-600 mx-auto" />
                      <p className="text-green-600 font-semibold">{formData.uploadedFile.name}</p>
                      <p className="text-sm text-gray-600">File uploaded successfully</p>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, uploadedFile: null })}
                        className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors text-sm"
                      >
                        Remove File
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                      <p className="text-gray-600">Drag and drop your health card here, or</p>
                      <button
                        type="button"
                        onClick={() => document.getElementById("fileInput").click()}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                      >
                        Browse Files
                      </button>
                      <p className="text-xs text-gray-500">Supports: JPG, PNG, PDF (Max 5MB)</p>
                    </div>
                  )}
                </div>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                  className="hidden"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Benefits of Adding Insurance:</h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Faster appointment processing</li>
                  <li>• Automatic hospital filtering based on coverage</li>
                  <li>• Reduced paperwork during visits</li>
                  <li>• Direct billing with covered hospitals</li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={
                  !formData.provider || !formData.policyType || !formData.policyNumber || !formData.validityDate
                }
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Save Insurance Information
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}