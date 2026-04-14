// "use client";

// import { useActionState, useState } from "react";
// import { Eye, EyeOff, Shield, Phone, Mail, ArrowLeft } from "lucide-react";
// import Link from "next/link";
// import { signUp } from "../actions/auth";
// import { useFormStatus } from "react-dom";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function RegisterPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [state, action] = useActionState(signUp, { message: null });
//   const router = useRouter();

//   useEffect(() => {
//     if (state?.message === "success") {
//       const timer = setTimeout(() => {
//         router.push("/");
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [state, router]);

//   return (
//     <div className="min-h-screen bg-gray-400 flex flex-col">
//       {/* Main Content */}
//       <div className="flex-1 flex items-center justify-center p-6">
//         <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden">
//           {/* Form Header */}
//           <div className="flex justify-between bg-teal-600 p-6">
//             <h2 className="text-white text-xl font-semibold flex items-center">
//               <Shield className="w-5 h-5 mr-2" />
//               Patient Registration
//             </h2>
//             <Link href="/auth/login" className="flex items-center space-x-2 text-white hover:text-teal-300 transition-colors">
//               <ArrowLeft className="w-4 h-4" />
//               <span className="hidden sm:inline">Back to Login</span>
//             </Link>
//           </div>

//           {/* Form Body */}
//           <div className="p-6 space-y-6">
//             <form action={action} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-gray-700 text-sm font-medium mb-1">Full Name *</label>
//                   <input
//                     type="text"
//                     name="fullName"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
//                     placeholder="John Doe"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 text-sm font-medium mb-1">Email Address *</label>
//                   <input
//                     type="email"
//                     name="email"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
//                     placeholder="john@example.com"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 text-sm font-medium mb-1">Phone Number *</label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
//                     placeholder="+91 98765 43210"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 text-sm font-medium mb-1">Username *</label>
//                   <input
//                     type="text"
//                     name="username"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
//                     placeholder="Choose a username"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 text-sm font-medium mb-1">Password *</label>
//                   <div className="relative">
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all pr-12"
//                       placeholder="Create password"
//                       required
//                       minLength={6}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-teal-600"
//                     >
//                       {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                     </button>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 text-sm font-medium mb-1">Confirm Password *</label>
//                   <div className="relative">
//                     <input
//                       type={showConfirmPassword ? "text" : "password"}
//                       name="confirmPassword"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all pr-12"
//                       placeholder="Confirm password"
//                       required
//                       minLength={6}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-teal-600"
//                     >
//                       {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-gray-700 text-sm font-medium mb-1">Date of Birth</label>
//                   <input
//                     type="date"
//                     name="dob"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 text-sm font-medium mb-1">Gender</label>
//                   <select
//                     name="gender"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
//                   >
//                     <option value="">Select</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>
//               </div>

//               {state?.message && (
//                 <div className={`p-3 text-sm rounded-lg ${
//                   state.message.includes("success") 
//                     ? "text-green-700 bg-green-100" 
//                     : "text-red-700 bg-red-100"
//                 }`}>
//                   {state.message}
//                 </div>
//               )}

//               <div className="flex items-start space-x-2">
//                 <input
//                   type="checkbox"
//                   name="agreeTerms"
//                   className="mt-1 w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
//                   required
//                 />
//                 <label className="text-gray-700 text-sm">
//                   I agree to the <Link href="/terms" className="text-teal-600 hover:underline">Terms of Service</Link> and{' '}
//                   <Link href="/privacy" className="text-teal-600 hover:underline">Privacy Policy</Link>
//                 </label>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <RegisterButton />
//                 <Link
//                   href="/auth/login"
//                   className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
//                 >
//                   Already have an account?
//                 </Link>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function RegisterButton() {
//   const { pending } = useFormStatus();

//   return (
//     <button
//       type="submit"
//       className="bg-teal-600 hover:bg-teal-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
//       disabled={pending}
//     >
//       {pending ? (
//         <>
//           <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//           </svg>
//           Creating account...
//         </>
//       ) : (
//         "Register Now"
//       )}
//     </button>
//   );
// }


"use client";

import { useState, useRef } from "react";
import { Eye, EyeOff, Shield, Phone, Mail, ArrowLeft, ChevronRight, User, Calendar, Lock } from "lucide-react";
import Link from "next/link";
import { signUp } from "../actions/auth";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const formRef = useRef(null);
  const router = useRouter();

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:shadow-xl">
        <div className="bg-teal-600 p-6 text-center">
          <h2 className="text-white text-xl font-semibold flex items-center justify-center">
            <Shield className="w-5 h-5 mr-2" />
            Patient Registration
          </h2>
          <p className="text-teal-100 text-sm mt-1">Step {step} of 3</p>
        </div>

        <form ref={formRef} action={signUp} className="p-6">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <User className="text-blue-500" />
                <div className="flex-1">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    className="w-full px-3 py-2 border-b border-blue-200 bg-transparent focus:outline-none focus:border-teal-500 transition-colors"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Calendar className="text-blue-500" />
                  <div className="flex-1">
                    <label className="block text-gray-700 text-sm font-medium mb-1">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      className="w-full px-3 py-2 border-b border-blue-200 bg-transparent focus:outline-none focus:border-teal-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <User className="text-blue-500" />
                  <div className="flex-1">
                    <label className="block text-gray-700 text-sm font-medium mb-1">Gender</label>
                    <select
                      name="gender"
                      className="w-full px-3 py-2 border-b border-blue-200 bg-transparent focus:outline-none focus:border-teal-500 transition-colors"
                      required
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  Next <ChevronRight className="ml-1 w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Contact Information */}
          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Mail className="text-blue-500" />
                <div className="flex-1">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-3 py-2 border-b border-blue-200 bg-transparent focus:outline-none focus:border-teal-500 transition-colors"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Phone className="text-blue-500" />
                <div className="flex-1">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full px-3 py-2 border-b border-blue-200 bg-transparent focus:outline-none focus:border-teal-500 transition-colors"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <User className="text-blue-500" />
                <div className="flex-1">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Username</label>
                  <input
                    type="text"
                    name="username"
                    className="w-full px-3 py-2 border-b border-blue-200 bg-transparent focus:outline-none focus:border-teal-500 transition-colors"
                    placeholder="Choose a username"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-white text-teal-600 border border-teal-600 hover:bg-teal-50 py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center"
                >
                  Next <ChevronRight className="ml-1 w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Security Information */}
          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Lock className="text-blue-500" />
                <div className="flex-1 relative">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="w-full px-3 py-2 border-b border-blue-200 bg-transparent focus:outline-none focus:border-teal-500 transition-colors pr-10"
                    placeholder="Create password"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 bottom-2 text-gray-500 hover:text-teal-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Lock className="text-blue-500" />
                <div className="flex-1 relative">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Confirm Password</label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    className="w-full px-3 py-2 border-b border-blue-200 bg-transparent focus:outline-none focus:border-teal-500 transition-colors pr-10"
                    placeholder="Confirm password"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-0 bottom-2 text-gray-500 hover:text-teal-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-2 p-3">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  className="mt-1 w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  required
                />
                <label className="text-gray-700 text-sm">
                  I agree to the <Link href="/terms" className="text-teal-600 hover:underline">Terms of Service</Link> and{' '}
                  <Link href="/privacy" className="text-teal-600 hover:underline">Privacy Policy</Link>
                </label>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-white text-teal-600 border border-teal-600 hover:bg-teal-50 py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Back
                </button>
                <RegisterButton />
              </div>
            </div>
          )}
        </form>

        <div className="px-6 pb-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-teal-600 font-medium hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>

      {/* Add some global styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

function RegisterButton() {
  const { pending } = useFormStatus();
  const router = useRouter();

  return (
    <button
      type="submit"
      className="bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-lg font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
      disabled={pending}
    >
      {pending ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Creating account...
        </>
      ) : (
        "Complete Registration"
      )}
    </button>
  );
}