import { useState, useEffect } from "react"

export const ClaimDocumentSubmission = ({ 
  initialFormData,
  handleSubmit,
  isEditing,
  isLoading
}) => {
  const [formData, setFormData] = useState({
    claimId: "",
    patientId: "",
    insuranceProvider: "",
    finalBill: null,
    dischargeSummary: null,
    labResults: [],
    otherDocuments: [],
    status: "Submitted",
    notes: ""
  })
  const [errors, setErrors] = useState({})
  const [missingDocs, setMissingDocs] = useState([])

  const mandatoryDocs = [
    "Final Bill",
    "Discharge Summary"
  ]

  useEffect(() => {
    if (initialFormData) {
      setFormData(initialFormData)
      checkMissingDocs(initialFormData)
    }
  }, [initialFormData])

  const checkMissingDocs = (data) => {
    const missing = []
    if (!data.finalBill) missing.push("Final Bill")
    if (!data.dischargeSummary) missing.push("Discharge Summary")
    setMissingDocs(missing)
  }

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

  const handleFileUpload = (docType, file) => {
    setFormData(prev => {
      const updated = {...prev}
      if (docType === 'finalBill') updated.finalBill = file
      else if (docType === 'dischargeSummary') updated.dischargeSummary = file
      else if (docType === 'labResults') {
        updated.labResults = [...(prev.labResults || []), file]
      }
      else if (docType === 'otherDocuments') {
        updated.otherDocuments = [...(prev.otherDocuments || []), file]
      }
      checkMissingDocs(updated)
      return updated
    })
  }

  const removeDocument = (docType, index) => {
    setFormData(prev => {
      const updated = {...prev}
      if (docType === 'labResults') {
        updated.labResults = [...prev.labResults]
        updated.labResults.splice(index, 1)
      }
      else if (docType === 'otherDocuments') {
        updated.otherDocuments = [...prev.otherDocuments]
        updated.otherDocuments.splice(index, 1)
      }
      checkMissingDocs(updated)
      return updated
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    
    const isValid = [
      validateField('patientId', formData.patientId),
      validateField('insuranceProvider', formData.insuranceProvider),
    ].every(Boolean)

    if (!isValid || missingDocs.length > 0) {
      return
    }

    handleSubmit(e, formData)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 h-[calc(100vh-100px)] sm:h-[calc(100vh-100px)] overflow-y-auto">
      <h2 className="text-lg font-semibold text-blue-500 mb-6">
        {isEditing ? "✏️ Edit Claim Submission" : "📤 Submit Claim Documents"}
      </h2>

      {missingDocs.length > 0 && (
        <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p className="font-medium">Missing required documents:</p>
          <ul className="list-disc pl-5">
            {missingDocs.map(doc => (
              <li key={doc}>{doc}</li>
            ))}
          </ul>
        </div>
      )}

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
            <input
              type="text"
              name="insuranceProvider"
              value={formData.insuranceProvider}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border ${errors.insuranceProvider ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.insuranceProvider && <p className="mt-1 text-sm text-red-600">{errors.insuranceProvider}</p>}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-2">Mandatory Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DocumentUploadField
                label="Final Bill"
                required
                onFileUpload={(file) => handleFileUpload('finalBill', file)}
                file={formData.finalBill}
              />
              <DocumentUploadField
                label="Discharge Summary"
                required
                onFileUpload={(file) => handleFileUpload('dischargeSummary', file)}
                file={formData.dischargeSummary}
              />
            </div>
          </div>

          <div>
            <h3 className="text-md font-medium text-gray-700 mb-2">Additional Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DocumentUploadField
                label="Lab Results"
                multiple
                onFileUpload={(file) => handleFileUpload('labResults', file)}
              />
              {formData.labResults?.length > 0 && (
                <DocumentList 
                  documents={formData.labResults} 
                  onRemove={(index) => removeDocument('labResults', index)}
                />
              )}
              <DocumentUploadField
                label="Other Documents"
                multiple
                onFileUpload={(file) => handleFileUpload('otherDocuments', file)}
              />
              {formData.otherDocuments?.length > 0 && (
                <DocumentList 
                  documents={formData.otherDocuments} 
                  onRemove={(index) => removeDocument('otherDocuments', index)}
                />
              )}
            </div>
          </div>
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
            disabled={isLoading || missingDocs.length > 0}
          >
            {isLoading ? 'Processing...' : isEditing ? 'Update Claim' : 'Submit Claim'}
          </button>
        </div>
      </form>
    </div>
  )
}

const DocumentUploadField = ({ label, required, multiple, onFileUpload, file }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          {file ? (
            <div className="text-sm text-gray-600">
              <p>{file.name}</p>
              <p className="text-xs text-gray-500">{Math.round(file.size / 1024)} KB</p>
            </div>
          ) : (
            <>
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-500 hover:text-blue-400 focus-within:outline-none">
                  <span>Upload file</span>
                  <input 
                    type="file" 
                    className="sr-only" 
                    multiple={multiple}
                    onChange={(e) => onFileUpload(e.target.files[0])}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PDF, JPG, PNG up to 10MB
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const DocumentList = ({ documents, onRemove }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Uploaded Files</label>
      <ul className="divide-y divide-gray-200 border rounded-md p-2">
        {documents.map((doc, index) => (
          <li key={index} className="py-2 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">{doc.name}</p>
              <p className="text-xs text-gray-500">{Math.round(doc.size / 1024)} KB</p>
            </div>
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}