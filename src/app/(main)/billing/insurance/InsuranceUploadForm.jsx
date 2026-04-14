import { useState, useEffect } from "react"

export const InsuranceUploadForm = ({ 
  initialFormData,
  handleSubmit,
  isEditing,
  isLoading
}) => {
  const [formData, setFormData] = useState({
    patientId: "",
    insuranceProvider: "",
    policyType: "",
    policyNumber: "",
    documents: [],
    status: "Submitted",
    notes: ""
  })
  const [errors, setErrors] = useState({})
  const [uploadedDocs, setUploadedDocs] = useState([])

  useEffect(() => {
    if (initialFormData) {
      setFormData(initialFormData)
      setUploadedDocs(initialFormData.documents || [])
    }
  }, [initialFormData])

  const insuranceProviders = [
    "Star Health",
    "HDFC Ergo",
    "ICICI Lombard",
    "Bajaj Allianz",
    "New India Assurance"
  ]

  const policyTypes = [
    "Individual",
    "Family Floater",
    "Senior Citizen",
    "Critical Illness",
    "Group Policy"
  ]

  const statusOptions = [
    "Submitted",
    "Under Review",
    "Approved",
    "Rejected"
  ]

  const validateField = (name, value) => {
    const newErrors = {...errors}
    
    switch (name) {
      case 'patientId':
        if (!value) newErrors.patientId = 'Patient ID is required'
        else delete newErrors.patientId
        break
      case 'insuranceProvider':
        if (!value) newErrors.insuranceProvider = 'Provider is required'
        else delete newErrors.insuranceProvider
        break
      case 'policyType':
        if (!value) newErrors.policyType = 'Policy type is required'
        else delete newErrors.policyType
        break
      default:
        break
    }
    
    setErrors(newErrors)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    validateField(name, value)
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    const newDocs = files.map(file => ({
      name: file.name,
      type: file.type,
      size: file.size,
      file
    }))
    setUploadedDocs([...uploadedDocs, ...newDocs])
  }

  const removeDocument = (index) => {
    const updatedDocs = [...uploadedDocs]
    updatedDocs.splice(index, 1)
    setUploadedDocs(updatedDocs)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    
    const isValid = [
      validateField('patientId', formData.patientId),
      validateField('insuranceProvider', formData.insuranceProvider),
      validateField('policyType', formData.policyType),
    ].every(Boolean)

    if (!isValid) {
      return
    }

    const submitData = {
      ...formData,
      documents: uploadedDocs
    }

    handleSubmit(e, submitData)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 h-[calc(100vh-100px)] sm:h-[calc(100vh-100px)] overflow-y-auto">
      <h2 className="text-lg font-semibold text-blue-500 mb-6">
        {isEditing ? "✏️ Edit Insurance Submission" : "📤 New Insurance Submission"}
      </h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Patient ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="patientId"
              value={formData.patientId}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border ${errors.patientId ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.patientId && <p className="mt-1 text-sm text-red-600">{errors.patientId}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Insurance Provider <span className="text-red-500">*</span>
            </label>
            <select
              name="insuranceProvider"
              value={formData.insuranceProvider}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border ${errors.insuranceProvider ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Select provider</option>
              {insuranceProviders.map(provider => (
                <option key={provider} value={provider}>{provider}</option>
              ))}
            </select>
            {errors.insuranceProvider && <p className="mt-1 text-sm text-red-600">{errors.insuranceProvider}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Policy Type <span className="text-red-500">*</span>
            </label>
            <select
              name="policyType"
              value={formData.policyType}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border ${errors.policyType ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Select policy type</option>
              {policyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.policyType && <p className="mt-1 text-sm text-red-600">{errors.policyType}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Policy Number
            </label>
            <input
              type="text"
              name="policyNumber"
              value={formData.policyNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {isEditing && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Documents (Policy Card, Aadhar, etc.)
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-500 hover:text-blue-400 focus-within:outline-none">
                  <span>Upload files</span>
                  <input 
                    type="file" 
                    className="sr-only" 
                    multiple
                    onChange={handleFileUpload}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PDF, JPG, PNG up to 10MB
              </p>
            </div>
          </div>
          
          {uploadedDocs.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Documents:</h4>
              <ul className="divide-y divide-gray-200">
                {uploadedDocs.map((doc, index) => (
                  <li key={index} className="py-2 flex justify-between items-center">
                    <span className="text-sm text-gray-600">{doc.name}</span>
                    <button
                      type="button"
                      onClick={() => removeDocument(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes/Comments
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex space-x-4 pt-2">
          <button 
            type="submit" 
            className={`px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : isEditing ? 'Update Submission' : 'Submit for Pre-Authorization'}
          </button>
        </div>
      </form>
    </div>
  )
}