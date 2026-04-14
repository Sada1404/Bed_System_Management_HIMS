import { useState, useEffect } from "react"
import { toast } from 'react-hot-toast'

// Mock data for patients and doctors
const mockPatients = [
  { id: "PAT001", name: "John Doe" },
  { id: "PAT002", name: "Jane Smith" },
  { id: "PAT003", name: "Robert Johnson" },
  { id: "PAT004", name: "Emily Davis" },
  { id: "PAT005", name: "Michael Wilson" }
]

const mockDoctors = [
  { id: "DOC001", name: "Dr. Sarah Williams" },
  { id: "DOC002", name: "Dr. James Brown" },
  { id: "DOC003", name: "Dr. Lisa Taylor" },
  { id: "DOC004", name: "Dr. David Miller" },
  { id: "DOC005", name: "Dr. Jennifer Wilson" }
]

export const BillForm = ({ 
  initialFormData, 
  services,
  packages,
  handleSubmit: parentHandleSubmit,
  isEditing,
  isLoading
}) => {
  const [formData, setFormData] = useState({
    aid: "",
    patientId: "",
    patientName: "",
    dob: "",
    address: "",
    sex: "male",
    doctorName: "",
    admissionDate: "",
    packageName: "",
    totalDays: "",
    dischargeDate: "",
    insuranceName: "",
    policyNo: "",
    services: [],
    advancePayments: [],
    paymentMethod: "cash",
    cardChequeNo: "",
    receiptNo: "",
    discountPercent: 0,
    taxPercent: 0,
    notes: "",
    status: "unpaid",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newService, setNewService] = useState({
    service: "",
    quantity: 1,
    rate: 0,
  })
  const [newAdvancePayment, setNewAdvancePayment] = useState({
    date: new Date().toISOString().split('T')[0],
    receiptNo: "",
    amount: 0,
  })

  useEffect(() => {
    if (initialFormData) {
      setFormData(initialFormData)
    }
  }, [initialFormData])

  const validateField = (name, value) => {
    const newErrors = {...errors}
    
    switch (name) {
      case 'aid':
        if (!value) newErrors.aid = 'AID is required'
        else delete newErrors.aid
        break
      case 'patientId':
        if (!value) newErrors.patientId = 'Patient is required'
        else delete newErrors.patientId
        break
      case 'doctorName':
        if (!value) newErrors.doctorName = 'Doctor is required'
        else delete newErrors.doctorName
        break
      case 'admissionDate':
        if (!value) newErrors.admissionDate = 'Admission date is required'
        else delete newErrors.admissionDate
        break
      default:
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    validateField(name, value)
  }

  const handlePatientSelect = (e) => {
    const patientId = e.target.value
    const patient = mockPatients.find(p => p.id === patientId)
    setFormData(prev => ({
      ...prev,
      patientId,
      patientName: patient ? patient.name : ""
    }))
    validateField('patientId', patientId)
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

  const handleAdvancePaymentChange = (e) => {
    const { name, value } = e.target
    setNewAdvancePayment(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const addService = () => {
    if (!newService.service) {
      toast.error('Please select a service')
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

  const addAdvancePayment = () => {
    if (!newAdvancePayment.amount || parseFloat(newAdvancePayment.amount) <= 0) {
      toast.error('Please enter a valid amount')
      return
    }

    setFormData(prev => ({
      ...prev,
      advancePayments: [
        ...prev.advancePayments,
        {
          ...newAdvancePayment,
          amount: parseFloat(newAdvancePayment.amount) || 0
        }
      ]
    }))

    setNewAdvancePayment({
      date: new Date().toISOString().split('T')[0],
      receiptNo: "",
      amount: 0,
    })
  }

  const removeAdvancePayment = (index) => {
    setFormData(prev => {
      const newPayments = [...prev.advancePayments]
      newPayments.splice(index, 1)
      return {
        ...prev,
        advancePayments: newPayments
      }
    })
  }

  const calculateSubtotal = () => {
    return formData.services.reduce((sum, service) => sum + service.amount, 0)
  }

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal()
    return subtotal * (parseFloat(formData.discountPercent) || 0) / 100
  }

  const calculateTax = () => {
    const subtotal = calculateSubtotal()
    return subtotal * (parseFloat(formData.taxPercent) || 0) / 100
  }

  const calculateTotalAdvance = () => {
    return formData.advancePayments.reduce((sum, payment) => sum + payment.amount, 0)
  }

  const calculatePayable = () => {
    const subtotal = calculateSubtotal()
    const discount = calculateDiscount()
    const tax = calculateTax()
    const advance = calculateTotalAdvance()
    return subtotal - discount + tax - advance
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const isValid = [
      validateField('aid', formData.aid),
      validateField('patientId', formData.patientId),
      validateField('doctorName', formData.doctorName),
      validateField('admissionDate', formData.admissionDate),
    ].every(Boolean)

    if (!isValid) {
      toast.error('Please fix the errors in the form')
      return
    }

    setIsSubmitting(true)
    
    try {
      const submissionData = {
        ...formData,
        subtotal: calculateSubtotal(),
        discount: calculateDiscount(),
        tax: calculateTax(),
        totalAdvance: calculateTotalAdvance(),
        payable: calculatePayable(),
      }

      await parentHandleSubmit(e, submissionData)
      toast.success(`Bill ${isEditing ? 'updated' : 'created'} successfully!`)
    } catch (error) {
      console.error('Submission error:', error)
      toast.error(`Failed to ${isEditing ? 'update' : 'create'} bill`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      aid: "",
      patientId: "",
      patientName: "",
      dob: "",
      address: "",
      sex: "male",
      doctorName: "",
      admissionDate: "",
      packageName: "",
      totalDays: "",
      dischargeDate: "",
      insuranceName: "",
      policyNo: "",
      services: [],
      advancePayments: [],
      paymentMethod: "cash",
      cardChequeNo: "",
      receiptNo: "",
      discountPercent: 0,
      taxPercent: 0,
      notes: "",
      status: "unpaid",
    })
    setErrors({})
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 h-[calc(100vh-200px)] overflow-y-auto">
      <h2 className="text-lg font-semibold text-blue-500 mb-6 bg-white pb-4 border-b border-gray-200">
        {isEditing ? "➕ Edit Bill" : "➕ Add Bill"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <h3 className="font-bold text-gray-700 mb-2">Patient Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  AID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="aid"
                  value={formData.aid}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${errors.aid ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter AID"
                />
                {errors.aid && (
                  <p className="mt-1 text-sm text-red-600">{errors.aid}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient <span className="text-red-500">*</span>
                </label>
                <select
                  name="patientId"
                  value={formData.patientId}
                  onChange={handlePatientSelect}
                  className={`w-full px-3 py-2 border ${errors.patientId ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select patient</option>
                  {mockPatients.map(patient => (
                    <option key={patient.id} value={patient.id}>{patient.name}</option>
                  ))}
                </select>
                {errors.patientId && (
                  <p className="mt-1 text-sm text-red-600">{errors.patientId}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient Name
                </label>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sex"
                      value="male"
                      checked={formData.sex === "male"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Male
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sex"
                      value="female"
                      checked={formData.sex === "female"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Female
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-bold text-gray-700 mb-2">Doctor Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor Name <span className="text-red-500">*</span>
                </label>
                <select
                  name="doctorName"
                  value={formData.doctorName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${errors.doctorName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select doctor</option>
                  {mockDoctors.map(doctor => (
                    <option key={doctor.id} value={doctor.name}>{doctor.name}</option>
                  ))}
                </select>
                {errors.doctorName && (
                  <p className="mt-1 text-sm text-red-600">{errors.doctorName}</p>
                )}
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-bold text-gray-700 mb-2">Admission Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Admission Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="admissionDate"
                  value={formData.admissionDate}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${errors.admissionDate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.admissionDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.admissionDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Package Name
                </label>
                <select
                  name="packageName"
                  value={formData.packageName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select package</option>
                  {packages.map(pkg => (
                    <option key={pkg.id} value={pkg.id}>{pkg.package_name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Days
                </label>
                <input
                  type="number"
                  name="totalDays"
                  value={formData.totalDays}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-bold text-gray-700 mb-2">Discharge Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discharge Date
                </label>
                <input
                  type="date"
                  name="dischargeDate"
                  value={formData.dischargeDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Insurance Name
                </label>
                <input
                  type="text"
                  name="insuranceName"
                  value={formData.insuranceName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter insurance name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Policy No.
                </label>
                <input
                  type="text"
                  name="policyNo"
                  value={formData.policyNo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter policy number"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-bold text-gray-700 mb-2">Services</h3>
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
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
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

          <div className="md:col-span-2">
            <h3 className="font-bold text-gray-700 mb-2">Advance Payment</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={newAdvancePayment.date}
                    onChange={handleAdvancePaymentChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Receipt No
                  </label>
                  <input
                    type="text"
                    name="receiptNo"
                    value={newAdvancePayment.receiptNo}
                    onChange={handleAdvancePaymentChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter receipt number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={newAdvancePayment.amount}
                    onChange={handleAdvancePaymentChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={addAdvancePayment}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Add Payment
                  </button>
                </div>
              </div>

              {formData.advancePayments.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt No</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {formData.advancePayments.map((payment, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.receiptNo}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.amount.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <button
                              type="button"
                              onClick={() => removeAdvancePayment(index)}
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

          <div className="md:col-span-2">
            <h3 className="font-bold text-gray-700 mb-2">Payment Method</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method
                </label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="cheque">Cheque</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {formData.paymentMethod === 'cash' ? 'Receipt No' : 
                   formData.paymentMethod === 'card' ? 'Card No' : 'Cheque No'}
                </label>
                <input
                  type="text"
                  name="cardChequeNo"
                  value={formData.cardChequeNo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Enter ${formData.paymentMethod === 'cash' ? 'receipt number' : 
                              formData.paymentMethod === 'card' ? 'card number' : 'cheque number'}`}
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-bold text-gray-700 mb-2">Bill Summary</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount %
                  </label>
                  <input
                    type="number"
                    name="discountPercent"
                    value={formData.discountPercent}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tax %
                  </label>
                  <input
                    type="number"
                    name="taxPercent"
                    value={formData.taxPercent}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Subtotal:</span>
                  <span className="text-sm font-medium">₹{calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Discount:</span>
                  <span className="text-sm font-medium">-₹{calculateDiscount().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Tax:</span>
                  <span className="text-sm font-medium">+₹{calculateTax().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Advance Payment:</span>
                  <span className="text-sm font-medium">-₹{calculateTotalAdvance().toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2">
                  <span className="text-sm font-bold text-gray-700">Payable Amount:</span>
                  <span className="text-sm font-bold">₹{calculatePayable().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Additional notes"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="unpaid"
                  checked={formData.status === "unpaid"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Unpaid
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="paid"
                  checked={formData.status === "paid"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Paid
              </label>
            </div>
          </div>
        </div>

        <div className="flex space-x-4 pt-4">
          <button 
            type="button" 
            onClick={resetForm}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            disabled={isSubmitting || isLoading}
          >
            Reset
          </button>
          <button 
            type="submit" 
            className={`px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 ${(isSubmitting || isLoading) ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting || isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isEditing ? 'Updating...' : 'Creating...'}
              </span>
            ) : isEditing ? 'Update Bill' : 'Create Bill'}
          </button>
        </div>
      </form>
    </div>
  )
}