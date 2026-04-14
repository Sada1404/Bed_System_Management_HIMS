import { useState, useEffect } from "react"

export const AdvancePaymentForm = ({ 
  initialFormData,
  bills,
  handleSubmit,
  isEditing,
  isLoading
}) => {
  const [formData, setFormData] = useState({
    billId: "",
    patientId: "",
    aid: "",
    amount: 0,
    paymentMethod: "cash",
    cardChequeNo: "",
    receiptNo: "",
    date: new Date().toISOString().split('T')[0],
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialFormData) {
      setFormData(initialFormData)
    }
  }, [initialFormData])

  const validateField = (name, value) => {
    const newErrors = {...errors}
    
    switch (name) {
      case 'billId':
        if (!value) newErrors.billId = 'Bill is required'
        else delete newErrors.billId
        break
      case 'patientId':
        if (!value) newErrors.patientId = 'Patient is required'
        else delete newErrors.patientId
        break
      case 'amount':
        if (!value || parseFloat(value) <= 0) newErrors.amount = 'Valid amount is required'
        else delete newErrors.amount
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
      validateField('billId', formData.billId),
      validateField('patientId', formData.patientId),
      validateField('amount', formData.amount),
    ].every(Boolean)

    if (!isValid) {
      return
    }

    handleSubmit(e, formData)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 h-[calc(100vh-200px)] overflow-y-auto">
      <h2 className="text-lg font-semibold text-blue-500 mb-6">
        {isEditing ? "➕ Edit Advance Payment" : "➕ Add Advance Payment"}
      </h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bill <span className="text-red-500">*</span>
            </label>
            <select
              name="billId"
              value={formData.billId}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border ${errors.billId ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Select bill</option>
              {bills.map(bill => (
                <option key={bill.id} value={bill.id}>
                  {bill.id} - {bill.patient_name}
                </option>
              ))}
            </select>
            {errors.billId && <p className="mt-1 text-sm text-red-600">{errors.billId}</p>}
          </div>

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
              AID
            </label>
            <input
              type="text"
              name="aid"
              value={formData.aid}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              min="0"
              step="0.01"
            />
            {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
          </div>

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
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Receipt No
            </label>
            <input
              type="text"
              name="receiptNo"
              value={formData.receiptNo}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex space-x-4 pt-2">
          <button 
            type="submit" 
            className={`px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : isEditing ? 'Update Payment' : 'Create Payment'}
          </button>
        </div>
      </form>
    </div>
  )
}