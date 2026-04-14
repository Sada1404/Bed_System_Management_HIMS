import { useState } from "react"

export const PackageForm = ({ 
  services,
  handleSubmit, 
  isEditing,
  isLoading
}) => {
  const [formData, setFormData] = useState({
    packageName: "",
    description: "",
    discount: 0,
    status: "active",
    services: []
  })
  const [errors, setErrors] = useState({})
  const [newService, setNewService] = useState({
    service: "",
    quantity: 1,
    rate: 0,
  })

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
      case 'packageName':
        if (!value) newErrors.packageName = 'Package name is required'
        else delete newErrors.packageName
        break
      case 'discount':
        if (isNaN(value) || parseFloat(value) < 0) newErrors.discount = 'Valid discount is required'
        else delete newErrors.discount
        break
      default:
        break
    }
    
    setErrors(newErrors)
  }

  const handleServiceChange = (e) => {
    const { name, value } = e.target
    setNewService(prev => ({
      ...prev,
      [name]: value
    }))

    if (name === 'service') {
      const selectedService = services.find(s => s.id === value)
      if (selectedService) {
        setNewService(prev => ({
          ...prev,
          rate: selectedService.rate
        }))
      }
    }
  }

  const addService = () => {
    if (!newService.service) {
      return
    }

    const service = services.find(s => s.id === newService.service)
    if (!service) return

    setFormData(prev => ({
      ...prev,
      services: [
        ...prev.services,
        {
          id: service.id,
          name: service.service_name,
          quantity: parseInt(newService.quantity) || 1,
          rate: parseFloat(newService.rate) || 0,
          amount: (parseInt(newService.quantity) || 1) * (parseFloat(newService.rate) || 0)
        }
      ]
    }))

    setNewService({
      service: "",
      quantity: 1,
      rate: 0,
    })
  }

  const removeService = (index) => {
    setFormData(prev => {
      const newServices = [...prev.services]
      newServices.splice(index, 1)
      return {
        ...prev,
        services: newServices
      }
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    
    const isValid = [
      validateField('packageName', formData.packageName),
      validateField('discount', formData.discount),
    ].every(Boolean)

    if (!isValid) {
      return
    }

    const submissionData = {
      packageName: formData.packageName,
      description: formData.description,
      discount: parseFloat(formData.discount),
      status: formData.status,
      services: formData.services
    }

    handleSubmit(e, submissionData)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 h-[calc(100vh-180px)] sm:h-[calc(100vh-200px)] overflow-y-auto">
      <h2 className="text-lg font-semibold text-blue-500 mb-6">
        {isEditing ? "➕ Edit Package" : "➕ Add Package"}
      </h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Package Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="packageName"
              value={formData.packageName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border ${errors.packageName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter package name"
            />
            {errors.packageName && (
              <p className="mt-1 text-sm text-red-600">{errors.packageName}</p>
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
              Discount <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border ${errors.discount ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              min="0"
              step="0.01"
            />
            {errors.discount && (
              <p className="mt-1 text-sm text-red-600">{errors.discount}</p>
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

        <div className="mt-6">
          <h3 className="font-medium text-gray-700 mb-2">Package Including</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service
                </label>
                <select
                  name="service"
                  value={newService.service}
                  onChange={handleServiceChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select service</option>
                  {services.map(service => (
                    <option key={service.id} value={service.id}>{service.service_name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={newService.quantity}
                  onChange={handleServiceChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rate
                </label>
                <input
                  type="number"
                  name="rate"
                  value={newService.rate}
                  onChange={handleServiceChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={addService}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Add Service
                </button>
              </div>
            </div>

            {formData.services.length > 0 && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {formData.services.map((service, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{service.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{service.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{service.rate.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{service.amount.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <button
                            type="button"
                            onClick={() => removeService(index)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="flex space-x-4 pt-2">
          <button 
            type="submit" 
            className={`px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : isEditing ? 'Update Package' : 'Save Package'}
          </button>
        </div>
      </form>
    </div>
  )
}