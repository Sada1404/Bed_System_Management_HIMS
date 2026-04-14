import { CreditCard } from "lucide-react";
import { useState } from "react";

const mockPatients = [
  {
    id: "P1001",
    name: "John Doe",
    doctor: "Dr. Smith",
    department: "Cardiology",
    totalDue: 4500,
    insurance: "Star Health",
    lastVisit: "2023-07-15"
  },
  {
    id: "P1002",
    name: "Jane Smith",
    doctor: "Dr. Johnson",
    department: "Orthopedics",
    totalDue: 3200,
    insurance: "HDFC Ergo",
    lastVisit: "2023-07-10"
  },
  {
    id: "P1003",
    name: "Robert Brown",
    doctor: "Dr. Williams",
    department: "Neurology",
    totalDue: 2100,
    insurance: "ICICI Lombard",
    lastVisit: "2023-07-05"
  }
];

export const OnlinePaymentIntegration = ({ 
  handlePayment,
  isLoading
}) => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedGateway, setSelectedGateway] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validateSelection = () => {
    if (!selectedGateway) {
      setErrors({ gateway: 'Please select a payment method' });
      return false;
    }
    setErrors({});
    return true;
  };

  const initiatePayment = async () => {
    if (!validateSelection()) return;
    
    try {
      const result = await handlePayment({
        gateway: selectedGateway,
        patientId: selectedPatient.id,
        amount: selectedPatient.totalDue
      });
      
      setPaymentStatus(result.success ? 'success' : 'failed');
    } catch (error) {
      setPaymentStatus('failed');
    }
  };

  if (paymentStatus === 'success') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 max-w-md mx-auto">
        <div className="text-center py-6">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Payment Successful!</h3>
          <p className="text-gray-600 mb-4">
            ₹{selectedPatient?.totalDue} has been processed successfully for {selectedPatient?.name}.
          </p>
          <button
            onClick={() => {
              setSelectedPatient(null);
              setPaymentStatus(null);
            }}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Patient List
          </button>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'failed') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 max-w-md mx-auto">
        <div className="text-center py-6">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
            <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Payment Failed</h3>
          <p className="text-gray-600 mb-4">
            We couldn't process payment for {selectedPatient?.name}. Please try again.
          </p>
          <button
            onClick={() => setPaymentStatus(null)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (selectedPatient) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 max-w-md mx-auto mt-2.5">
        <button 
          onClick={() => setSelectedPatient(null)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Patient List
        </button>

        <h2 className="text-xl font-semibold text-blue-600 mb-6">💳 Process Payment for {selectedPatient.name}</h2>

        <div className="mb-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h3 className="text-md font-medium text-gray-700 mb-3">Patient Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Patient ID:</span>
              <span className="font-medium">{selectedPatient.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Patient Name:</span>
              <span className="font-medium">{selectedPatient.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Doctor:</span>
              <span className="font-medium">{selectedPatient.doctor}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Department:</span>
              <span className="font-medium">{selectedPatient.department}</span>
            </div>
            <div className="flex justify-between pt-3 mt-3 border-t border-gray-200">
              <span className="text-gray-700 font-semibold">Amount Due:</span>
              <span className="text-blue-600 font-bold">₹{selectedPatient.totalDue}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-md font-medium text-gray-700 mb-3">Payment Method</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: "razorpay", name: "Razorpay", logo: "https://logo.clearbit.com/razorpay.com" },
              { id: "paytm", name: "Paytm", logo: "https://logo.clearbit.com/paytm.com" },
              { id: "upi", name: "UPI", logo: "https://logo.clearbit.com/upipayments.co.in" },
              { id: "card", name: "Credit/Debit Card", logo: "https://logo.clearbit.com/visa.com" }
            ].map(gateway => (
              <div
                key={gateway.id}
                onClick={() => setSelectedGateway(gateway.id)}
                className={`p-3 border rounded-lg cursor-pointer transition-all ${
                  selectedGateway === gateway.id 
                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                    : 'border-gray-300 hover:border-blue-400'
                }`}
              >
                <div className="flex items-center">
                  <img 
                    src={gateway.logo} 
                    alt={gateway.name} 
                    className="h-6 mr-2"
                  />
                  <span className="font-medium text-sm">{gateway.name}</span>
                </div>
              </div>
            ))}
          </div>
          {errors.gateway && (
            <p className="mt-2 text-sm text-red-600">{errors.gateway}</p>
          )}
        </div>

        <div className="pt-2">
          <button 
            onClick={initiatePayment}
            className={`w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              `Pay Now ₹${selectedPatient.totalDue}`
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <CreditCard className="text-blue-500" />
        Patient Payment Records
      </h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Doctor</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Department</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Due</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockPatients.map(patient => (
              <tr key={patient.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{patient.id}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{patient.name}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{patient.doctor}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">{patient.department}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-blue-600">₹{patient.totalDue.toLocaleString()}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => setSelectedPatient(patient)}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors text-sm"
                    aria-label={`Make payment for ${patient.name}`}
                  >
                    Pay Online
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};