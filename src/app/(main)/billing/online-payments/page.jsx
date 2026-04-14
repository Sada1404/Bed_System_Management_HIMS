'use client'

import { OnlinePaymentIntegration } from "./OnlinePaymentIntegration"

export default function OnlinePaymentIntegrationPage() {
  return (
    <div className="p-2 md:p-2 max-w-8xl space-y-6">
      <OnlinePaymentIntegration
        handlePayment={async (paymentData) => {
          // Implement your actual payment processing here
          console.log("Processing payment:", paymentData);
          return { success: true }; // or false for failure
        }}
      />
    </div>
  )
}