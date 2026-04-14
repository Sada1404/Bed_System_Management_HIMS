import { useState, useEffect } from "react"

export const TPAProcessing = ({ 
  initialFormData,
  patients = [],
  tpaList =[],
  handleSubmit,
  isEditing,
  isLoading
}) => {
  const [formData, setFormData] = useState({
    patientId: "",
    tpaId: "",
    verifiedBy: "",
    verificationDate: new Date().toISOString().split('T')[0],
    status: "Pending",
    approvedAmount: "",
    notes: ""
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialFormData) {
      setFormData(initialFormData)
    }
  }, [initialFormData])

  const statusOptions = [
    "Pending",
    "Verified",
    "Rejected",
    "Partially Approved"
  ]

  const validateField = (name, value) => {
    const newErrors = {...errors}
    
    switch (name) {
      case 'patientId':
        if (!value) newErrors.patientId = 'Patient is required'
        else delete newErrors.patientId
        break
      case 'tpaId':
        if (!value) newErrors.tpaId = 'TPA is required'
        else delete newErrors.tpaId
        break
      case 'verifiedBy':
        if (!value) newErrors.verifiedBy = 'Verifier is required'
        else delete newErrors.verifiedBy
        break
      case 'approvedAmount':
        if (formData.status === "Partially Approved" && (!value || parseFloat(value) <= 0)) {
          newErrors.approvedAmount = 'Valid amount is required'
        } else {
          delete newErrors.approvedAmount
        }
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

  const onSubmit = (e) => {
    e.preventDefault()
    
    const isValid = [
      validateField('patientId', formData.patientId),
      validateField('tpaId', formData.tpaId),
      validateField('verifiedBy', formData.verifiedBy),
      validateField('approvedAmount', formData.approvedAmount),
    ].every(Boolean)

    if (!isValid) {
      return
    }

    handleSubmit(e, formData)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 h-[calc(100vh-100px)] sm:h-[calc(100vh-100px)] overflow-y-auto">
      <h2 className="text-lg font-semibold text-blue-500 mb-6">
        {isEditing ? "✏️ Edit TPA Verification" : "🔍 New TPA Verification"}
      </h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Patient <span className="text-red-500">*</span>
            </label>
            <select
              name="patientId"
              value={formData.patientId}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border ${errors.patientId ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Select patient</option>
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {patient.name} (ID: {patient.id})
                </option>
              ))}
            </select>
            {errors.patientId && <p className="mt-1 text-sm text-red-600">{errors.patientId}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              TPA <span className="text-red-500">*</span>
            </label>
            <select
              name="tpaId"
              value={formData.tpaId}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border ${errors.tpaId ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Select TPA</option>
              {tpaList.map(tpa => (
                <option key={tpa.id} value={tpa.id}>{tpa.name}</option>
              ))}
            </select>
            {errors.tpaId && <p className="mt-1 text-sm text-red-600">{errors.tpaId}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Verified By <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="verifiedBy"
              value={formData.verifiedBy}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border ${errors.verifiedBy ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.verifiedBy && <p className="mt-1 text-sm text-red-600">{errors.verifiedBy}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Verification Date
            </label>
            <input
              type="date"
              name="verificationDate"
              value={formData.verificationDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status <span className="text-red-500">*</span>
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

          {formData.status === "Partially Approved" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Approved Amount <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="approvedAmount"
                value={formData.approvedAmount}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${errors.approvedAmount ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                min="0"
                step="0.01"
              />
              {errors.approvedAmount && <p className="mt-1 text-sm text-red-600">{errors.approvedAmount}</p>}
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
            {isLoading ? 'Processing...' : isEditing ? 'Update Verification' : 'Submit Verification'}
          </button>
        </div>
      </form>
    </div>
  )
}