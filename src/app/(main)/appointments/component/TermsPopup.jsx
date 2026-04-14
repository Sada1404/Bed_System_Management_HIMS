'use client'
import { useEffect } from 'react'


export default function TermsPopup({ onClose }) {
  // Optional: close with Escape key
  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-xl relative">
        {/* Header */}
        <h2 className="text-xl font-bold text-teal-700 mb-4">Terms and Conditions</h2>

        {/* Body Text */}
        <div className="text-sm text-gray-700 space-y-3 h-60 overflow-y-auto pr-2">
          <p>
            By registering, you confirm that all information provided is accurate and complete. You agree to our data privacy policies, clinical usage terms, and consent for communication related to healthcare updates.
          </p>
          <p>
            Uploaded identification documents and contact details will be verified securely for authentication and emergency use only. Data will not be shared outside authorized parties.
          </p>
          <p>
            For full documentation and legal disclosures, please refer to the official privacy policy and registration guidelines provided by the healthcare institution.
          </p>
          <p>
            Clicking "I Agree" means you understand and accept the conditions listed above.
          </p>
        </div>

        {/* ✅ Actions */}
        <div className="mt-6 flex justify-end">
          <button
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-300"
            onClick={onClose}
          >
            I Agree
          </button>
        </div>
      </div>
    </div>
  )
}