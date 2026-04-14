import { useState } from "react"

export const ServiceForm = ({ 
  handleSubmit, 
  isEditing,
  isLoading
}) => {
  const [formData, setFormData] = useState({
    serviceName: "",
    description: "",
    quantity: 1,
    rate: 0,
    status: "active"
  })
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    validateField(name, value)
  }

  const validateField = (name, value) => {
    const newErrors = {...errors}
    
    switch (name) {
      case 'serviceName':
        if (!value) newErrors.serviceName = 'Service name is required'
        else delete newErrors.serviceName
        break
      case 'quantity':
        if (!value || parseInt(value) <= 0) newErrors.quantity = 'Valid quantity is required'
        else delete newErrors.quantity
        break
      case 'rate':
        if (!value || parseFloat(value) < 0) newErrors.rate = 'Valid rate is required'
        else delete newErrors.rate
        break
      default:
        break
    }
    
    setErrors(newErrors)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    
    const isValid = [
      validateField('serviceName', formData.serviceName),
      validateField('quantity', formData.quantity),
      validateField('rate', formData.rate),
    ].every(Boolean)

    if (!isValid) {
      return
    }

    const submissionData = {
      service_name: formData.serviceName,
      description: formData.description,
      quantity: parseInt(formData.quantity),
      rate: parseFloat(formData.rate),
      status: formData.status
    }

    handleSubmit(e, submissionData)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-blue-500 mb-6">
        {isEditing ? "➕ Edit Service" : "➕ Add Service"}
      </h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="serviceName"
              value={formData.serviceName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border ${errors.serviceName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter service name"
            />
            {errors.serviceName && (
              <p className="mt-1 text-sm text-red-600">{errors.serviceName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border ${errors.quantity ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              min="1"
            />
            {errors.quantity && (
              <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rate <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="rate"
              value={formData.rate}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border ${errors.rate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              min="0"
              step="0.01"
            />
            {errors.rate && (
              <p className="mt-1 text-sm text-red-600">{errors.rate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={formData.status === "active"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Active
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="inactive"
                  checked={formData.status === "inactive"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Inactive
              </label>
            </div>
          </div>
        </div>

        <div className="flex space-x-4 pt-2">
          <button 
            type="submit" 
            className={`px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : isEditing ? 'Update Service' : 'Save Service'}
          </button>
        </div>
      </form>
    </div>
  )
}