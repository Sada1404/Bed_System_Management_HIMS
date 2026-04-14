'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';


// Mock data for detailed doctor profiles
const mockDoctorProfiles = {
  1: {
    id: 1,
    name: "Dr. Strange",
    title: "EXECUTIVE CHAIRMAN FORTIS C DOC",
    hospital: "Multiverse",
    specialization: "Diabetology/Endocrinology",
    subSpecialization: "Diabetology/Endocrinology | Endocrinology",
    experience: 40,
    fees: 2800,
    image: "/api/placeholder/150/150",
    availableDays: ["Monday", "Wednesday", "Friday"],
    timeSlots: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"],
    rating: 4.8,
    totalReviews: 245,
    about: "Dr. Strange is a renowned Endocrinologist and Diabetologist with over 40 years of experience in treating diabetes, obesity, and metabolic disorders. He has been instrumental in establishing diabetes care protocols and has published numerous research papers in international journals.",
    education: [
      "MBBS - All India Institute of Medical Sciences (AIIMS), New Delhi",
      "MD (Internal Medicine) - All India Institute of Medical Sciences (AIIMS), New Delhi",
      "DM (Endocrinology) - All India Institute of Medical Sciences (AIIMS), New Delhi"
    ],
    specialties: [
      "Diabetes Management",
      "Obesity Treatment",
      "Thyroid Disorders",
      "Metabolic Syndrome",
      "Hormonal Disorders",
      "PCOS Management"
    ],
    awards: [
      "Padma Shri Award for Medicine",
      "Dr. B.C. Roy National Award",
      "Outstanding Diabetes Educator Award"
    ],
    languages: ["English", "Hindi"],
    consultationFee: 2800,
    followUpFee: 1500,
    waitingTime: "30-45 minutes",
    clinic: {
      name: "Fortis C-Doc",
      address: "B-18, Qutab Institutional Area, Near Qutab Minar, New Delhi - 110016",
      phone: "+91-11-4277-6222"
    }
  },
  2: {
    id: 2,
    name: "Dr. Pruthviraj",
    title: "PRINCIPAL DIRECTOR NEPHROLOGY",
    hospital: "Nurgis",
    specialization: "Nephrology",
    subSpecialization: "Nephrology | Kidney Transplant",
    experience: 40,
    fees: 1800,
    image: "/api/placeholder/150/150",
    availableDays: ["Tuesday", "Thursday", "Saturday"],
    timeSlots: ["10:00 AM - 1:00 PM", "3:00 PM - 6:00 PM"],
    rating: 4.7,
    totalReviews: 189,
    about: "Dr. Pruthviraj is a leading Nephrologist with extensive experience in kidney transplantation, dialysis, and treatment of chronic kidney diseases. He has performed over 500 successful kidney transplants and is known for his expertise in complex renal cases.",
    education: [
      "MBBS - Maulana Azad Medical College, New Delhi",
      "MD (Internal Medicine) - Maulana Azad Medical College, New Delhi",
      "DM (Nephrology) - All India Institute of Medical Sciences (AIIMS), New Delhi"
    ],
    specialties: [
      "Kidney Transplantation",
      "Chronic Kidney Disease",
      "Dialysis Management",
      "Hypertension",
      "Glomerular Diseases",
      "Acute Kidney Injury"
    ],
    awards: [
      "Excellence in Nephrology Award",
      "Best Transplant Surgeon Award",
      "Distinguished Service Award"
    ],
    languages: ["English", "Hindi", "Punjabi"],
    consultationFee: 1800,
    followUpFee: 1200,
    waitingTime: "20-30 minutes",
    clinic: {
      name: "Fortis Escorts Heart Institute, Okhla",
      address: "Okhla Road, New Delhi - 110025",
      phone: "+91-11-4713-5000"
    }
  }
  // Add other doctors as needed
};

const DoctorProfilePage = () => {
  const params = useParams();
  const id = params.id;
  const [doctor, setDoctor] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (id) {
      const doctorData = mockDoctorProfiles[parseInt(id)];
      if (doctorData) {
        setDoctor(doctorData);
      } else {
        // Fallback for doctors not in detailed profiles
        setDoctor({
          id: parseInt(id),
          name: "Doctor Not Found",
          message: "Detailed profile not available"
        });
      }
    }
  }, [id]);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading doctor profile...</p>
        </div>
      </div>
    );
  }

  if (doctor.message) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">{doctor.message}</p>
          <Link href="/appointments/availability" className="mt-4 inline-block text-green-600 hover:text-green-700">
            Back to Doctors
          </Link>
        </div>
      </div>
    );
  }

  return (
    
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/appointments/docter-slots" className="text-green-600 hover:text-green-700 text-sm font-medium">
            ← Back to Doctors
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Doctor Info  */} 
          <div className="lg:col-span-2">
            {/* Doctor Basic Info */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-start space-x-6">
                <div className="w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
                  <p className="text-lg text-gray-600 mb-2">{doctor.title}</p>
                  <p className="text-green-600 font-medium mb-3">{doctor.hospital}</p>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-5 h-5 ${star <= Math.floor(doctor.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">
                      {doctor.rating} ({doctor.totalReviews} reviews)
                    </span>
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      {doctor.experience} Years Experience
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                      ₹{doctor.consultationFee} Consultation Fee
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {['overview', 'education', 'specialties', 'awards'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                        activeTab === tab
                          ? 'border-green-500 text-green-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">About Dr. {doctor.name.split(' ').slice(-1)[0]}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{doctor.about}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Languages Spoken</h4>
                        <div className="flex flex-wrap gap-2">
                          {doctor.languages.map((language) => (
                            <span key={language} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                              {language}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Consultation Details</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>Consultation Fee: ₹{doctor.consultationFee}</p>
                          <p>Follow-up Fee: ₹{doctor.followUpFee}</p>
                          <p>Average Waiting Time: {doctor.waitingTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'education' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Education & Qualifications</h3>
                    <div className="space-y-4">
                      {doctor.education.map((edu, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700">{edu}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'specialties' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Areas of Expertise</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {doctor.specialties.map((specialty, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-800">{specialty}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'awards' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Awards & Recognition</h3>
                    <div className="space-y-4">
                      {doctor.awards.map((award, index) => (
                        <div key={index} className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
                          <svg className="w-6 h-6 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <p className="text-gray-800 font-medium">{award}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Appointment Booking */}
          <div className="lg:col-span-1">
            {/* Appointment Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Book Appointment</h3>
              
              {/* Consultation Fee */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Consultation Fee</span>
                  <span className="text-xl font-bold text-gray-900">₹{doctor.consultationFee}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Follow-up Fee</span>
                  <span className="text-gray-900">₹{doctor.followUpFee}</span>
                </div>
              </div>

              {/* Available Days */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Available Days</h4>
                <div className="grid grid-cols-3 gap-2">
                  {doctor.availableDays.map((day) => (
                    <span key={day} className="px-2 py-2 bg-green-100 text-green-800 text-xs text-center rounded-md font-medium">
                      {day.substring(0, 3)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Available Times</h4>
                <div className="space-y-2">
                  {doctor.timeSlots.map((slot, index) => (
                    <div key={index} className="p-2 bg-gray-50 text-gray-700 text-sm text-center rounded-md">
                      {slot}
                    </div>
                  ))}
                </div>
              </div>

              {/* Book Appointment Button */}
              <Link 
                href={`/appointments/booking?doctorId=${doctor.id}`}
                className="w-full bg-green-600 text-white text-center py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors block"
              >
                Book Appointment
              </Link>

              {/* Clinic Information */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Clinic Information</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="font-medium text-gray-900">{doctor.clinic.name}</p>
                  <p>{doctor.clinic.address}</p>
                  <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    {doctor.clinic.phone}
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Average waiting time:</p>
                    <p>{doctor.waitingTime}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    //</Layout>
  );
};

export default DoctorProfilePage;