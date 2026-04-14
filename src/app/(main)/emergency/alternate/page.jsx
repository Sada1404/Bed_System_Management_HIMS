// "use client"
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// const filters = [
//   { id: 'distance', name: 'Distance', options: ['Nearest first', 'Within 5km', 'Within 10km'] },
//   { id: 'specialty', name: 'Specialty', options: ['Trauma', 'Cardiac', 'Neurology', 'Pediatrics'] },
//   { id: 'availability', name: 'Availability', options: ['ICU Beds', 'Emergency Beds', 'Ventilators'] },
// ];

// const alternateHospitals = [
//   {
//     id: 4,
//     name: 'AIIMS Hospital',
//     address: 'Ansari Nagar, New Delhi',
//     distance: '8.2 km',
//     icuBeds: 3,
//     traumaSupport: true,
//     specialties: ['Trauma', 'Neurology', 'Research'],
//     status: 'yellow',
//     responseTime: '30-35 mins',
//     phone: '+911155443322'
//   },
//   {
//     id: 5,
//     name: 'Holy Family Hospital',
//     address: 'Okhla, New Delhi',
//     distance: '6.7 km',
//     icuBeds: 1,
//     traumaSupport: false,
//     specialties: ['General Medicine', 'Pediatrics'],
//     status: 'green',
//     responseTime: '20-25 mins',
//     phone: '+911188776655'
//   }
// ];

// export default function Alternate() {
//   const [selectedFilters, setSelectedFilters] = useState({});
//   const router = useRouter();

//   const toggleFilter = (filterId, option) => {
//     setSelectedFilters(prev => {
//       const newFilters = { ...prev };
//       if (newFilters[filterId] === option) {
//         delete newFilters[filterId];
//       } else {
//         newFilters[filterId] = option;
//       }
//       return newFilters;
//     });
//   };

//   const statusColor = (status) => {
//     switch (status) {
//       case 'green': return 'bg-green-500';
//       case 'yellow': return 'bg-yellow-500';
//       case 'red': return 'bg-red-500';
//       default: return 'bg-gray-500';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-2xl font-bold text-blue-600">Alternate Hospital Options</h1>
//           <p className="mt-2 text-gray-600">Find hospitals based on different criteria</p>
//         </div>
        
//         <div className="bg-white shadow rounded-lg mb-6 p-6">
//           <h2 className="text-lg font-medium text-gray-900 mb-4">Filter Options</h2>
//           <div className="space-y-6">
//             {filters.map((filter) => (
//               <div key={filter.id}>
//                 <h3 className="text-sm font-medium text-gray-700 mb-2">{filter.name}</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {filter.options.map((option) => (
//                     <button
//                       key={option}
//                       type="button"
//                       onClick={() => toggleFilter(filter.id, option)}
//                       className={`px-3 py-1 rounded-full text-sm ${
//                         selectedFilters[filter.id] === option
//                           ? 'bg-blue-100 text-blue-800 border border-blue-300'
//                           : 'bg-gray-100 text-gray-800 border border-gray-300'
//                       }`}
//                     >
//                       {option}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
        
//         <div className="space-y-6">
//           {alternateHospitals.map((hospital) => (
//             <div key={hospital.id} className="bg-white shadow overflow-hidden rounded-lg">
//               <div className="px-4 py-5 sm:px-6 flex items-start justify-between">
//                 <div>
//                   <h3 className="text-lg leading-6 font-medium text-gray-900">
//                     {hospital.name}
//                   </h3>
//                   <p className="mt-1 text-sm text-gray-500">
//                     {hospital.address} • {hospital.distance} away
//                   </p>
//                 </div>
//                 <div className={`h-5 w-5 rounded-full ${statusColor(hospital.status)}`} title={hospital.status}></div>
//               </div>
//               <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
//                 <dl className="sm:divide-y sm:divide-gray-200">
//                   <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                     <dt className="text-sm font-medium text-gray-500">ICU Beds Available</dt>
//                     <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{hospital.icuBeds}</dd>
//                   </div>
//                   <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                     <dt className="text-sm font-medium text-gray-500">Trauma/ER Support</dt>
//                     <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                       {hospital.traumaSupport ? 'Yes' : 'No'}
//                     </dd>
//                   </div>
//                   <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                     <dt className="text-sm font-medium text-gray-500">Specialties</dt>
//                     <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                       {hospital.specialties.join(', ')}
//                     </dd>
//                   </div>
//                   <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                     <dt className="text-sm font-medium text-gray-500">Estimated Response Time</dt>
//                     <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                       {hospital.responseTime}
//                     </dd>
//                   </div>
//                 </dl>
//               </div>
//               <div className="bg-gray-50 px-4 py-4 sm:px-6 flex flex-wrap justify-end gap-3">
//                 <a
//                   href={`tel:${hospital.phone}`}
//                   className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                 >
//                   Call Hospital
//                 </a>
//                 <button
//                   onClick={() => router.push(`/redirect`)}
//                   className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                 >
//                   Select This Hospital
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
        
//         <div className="mt-6 text-center">
//           <button
//             onClick={() => router.push('/redirect')}
//             className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//           >
//             Back to Main Results
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDownIcon, ChevronUpIcon, LinkIcon, PhoneIcon } from 'lucide-react';

const filters = [
  { id: 'distance', name: 'Distance', options: ['Nearest first', 'Within 5km', 'Within 10km'] },
  { id: 'specialty', name: 'Specialty', options: ['Trauma', 'Cardiac', 'Neurology', 'Pediatrics'] },
  { id: 'availability', name: 'Availability', options: ['ICU Beds', 'Emergency Beds', 'Ventilators'] },
];

const alternateHospitals = [
  {
    id: 4,
    name: 'AIIMS Hospital',
    address: 'Ansari Nagar, New Delhi',
    distance: '8.2 km',
    icuBeds: 3,
    traumaSupport: true,
    specialties: ['Trauma', 'Neurology', 'Research'],
    status: 'yellow',
    responseTime: '30-35 mins',
    phone: '+911155443322'
  },
  {
    id: 5,
    name: 'Holy Family Hospital',
    address: 'Okhla, New Delhi',
    distance: '6.7 km',
    icuBeds: 1,
    traumaSupport: false,
    specialties: ['General Medicine', 'Pediatrics'],
    status: 'green',
    responseTime: '20-25 mins',
    phone: '+911188776655'
  }
];

const homeCareProviders = [
  {
    id: 1,
    name: 'Portea Medical',
    services: ['Doctor visits', 'Nursing care', 'Physiotherapy', 'Post-operative care'],
    coverage: 'Delhi NCR',
    responseTime: '2-4 hours',
    phone: '+9111800456789',
    rating: '4.7/5',
    verified: true
  },
  {
    id: 2,
    name: 'Medlife At Home',
    services: ['General physician', 'Pediatric care', 'Elderly care', 'Medical equipment rental'],
    coverage: 'Delhi & Noida',
    responseTime: '1-3 hours',
    phone: '+911145674321',
    rating: '4.5/5',
    verified: true
  }
];

const telemedicineServices = [
  {
    id: 1,
    name: 'Practo Consult',
    specialties: ['General Physician', 'Pediatrics', 'Cardiology'],
    availability: '24/7',
    waitTime: '15 mins',
    link: 'https://practo.com/consult',
    rating: '4.6/5'
  },
  {
    id: 2,
    name: 'Apollo TeleHealth',
    specialties: ['Second opinions', 'Chronic care', 'Mental health'],
    availability: '6AM-12AM',
    waitTime: '30 mins',
    link: 'https://apollo247.com',
    rating: '4.8/5'
  }
];

const pharmacyServices = [
  {
    id: 1,
    name: 'Netmeds',
    deliveryTime: '1-2 hours',
    phone: '+911123456789',
    features: ['Prescription medicines', 'OTC products', '24/7 service'],
    rating: '4.4/5'
  },
  {
    id: 2,
    name: '1mg',
    deliveryTime: '2-3 hours',
    phone: '+911198765432',
    features: ['Medicine reminders', 'Lab tests', 'Doctor consultations'],
    rating: '4.5/5'
  }
];

const equipmentProviders = [
  {
    id: 1,
    name: 'Healthgenie',
    equipment: ['Oxygen cylinders', 'Wheelchairs', 'Hospital beds', 'Nebulizers'],
    delivery: 'Same day',
    phone: '+911187654321',
    rating: '4.3/5'
  },
  {
    id: 2,
    name: 'Medikabazaar',
    equipment: ['ICU equipment', 'Patient monitors', 'Ventilators'],
    delivery: '4-6 hours',
    phone: '+911176543219',
    rating: '4.2/5'
  }
];

const ambulanceServices = [
  {
    id: 1,
    name: 'Centralized Ambulance (108)',
    types: ['Basic', 'Advanced', 'Air ambulance'],
    phone: '108',
    coverage: 'Pan-India',
    rating: '4.5/5'
  },
  {
    id: 2,
    name: 'ZHL Ambulance',
    types: ['ALS', 'BLS', 'Mortuary'],
    phone: '+911145671234',
    responseTime: '15-20 mins',
    rating: '4.7/5'
  }
];

export default function Alternate() {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [expandedSection, setExpandedSection] = useState(null);
  const router = useRouter();

  const toggleFilter = (filterId, option) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      if (newFilters[filterId] === option) {
        delete newFilters[filterId];
      } else {
        newFilters[filterId] = option;
      }
      return newFilters;
    });
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const statusColor = (status) => {
    switch (status) {
      case 'green': return 'bg-green-500';
      case 'yellow': return 'bg-yellow-500';
      case 'red': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-blue-600">Alternate Healthcare Options</h1>
          <p className="mt-2 text-gray-600">Find hospitals and other healthcare services based on your needs</p>
        </div>
      
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <button
            onClick={() => toggleSection('homeCare')}
            className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 focus:outline-none"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Home Healthcare Services</h2>
              <p className="mt-1 text-sm text-gray-500">Doctor visits, nursing care, and medical services at home</p>
            </div>
            {expandedSection === 'homeCare' ? (
              <ChevronUpIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-gray-500" />
            )}
          </button>
          
          {expandedSection === 'homeCare' && (
            <div className="border-t border-gray-200 px-6 py-6 space-y-6">
              {homeCareProviders.map(provider => (
                <div key={provider.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-md font-medium text-gray-900 flex items-center">
                        {provider.name}
                        {provider.verified && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Verified
                          </span>
                        )}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Coverage: {provider.coverage} • Response: {provider.responseTime}
                      </p>
                      <div className="mt-2">
                        <span className="text-sm font-medium text-gray-900">Services:</span>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {provider.services.map(service => (
                            <span key={service} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                      {provider.rating && (
                        <p className="mt-2 text-sm text-gray-500">
                          Rating: <span className="text-yellow-600">{provider.rating}</span>
                        </p>
                      )}
                    </div>
                    <a
                      href={`tel:${provider.phone}`}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <PhoneIcon className="-ml-1 mr-1 h-4 w-4" />
                      Call
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <button
            onClick={() => toggleSection('telemedicine')}
            className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 focus:outline-none"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Telemedicine Services</h2>
              <p className="mt-1 text-sm text-gray-500">Online doctor consultations and virtual healthcare</p>
            </div>
            {expandedSection === 'telemedicine' ? (
              <ChevronUpIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-gray-500" />
            )}
          </button>
          
          {expandedSection === 'telemedicine' && (
            <div className="border-t border-gray-200 px-6 py-6 space-y-6">
              {telemedicineServices.map(service => (
                <div key={service.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-md font-medium text-gray-900">{service.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Availability: {service.availability} • Wait time: {service.waitTime}
                      </p>
                      <div className="mt-2">
                        <span className="text-sm font-medium text-gray-900">Specialties:</span>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {service.specialties.map(specialty => (
                            <span key={specialty} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                      {service.rating && (
                        <p className="mt-2 text-sm text-gray-500">
                          Rating: <span className="text-yellow-600">{service.rating}</span>
                        </p>
                      )}
                    </div>
                    <a
                      href={service.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <LinkIcon className="-ml-1 mr-1 h-4 w-4" />
                      Visit
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <button
            onClick={() => toggleSection('pharmacy')}
            className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 focus:outline-none"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Pharmacy Delivery</h2>
              <p className="mt-1 text-sm text-gray-500">Get medicines delivered to your location</p>
            </div>
            {expandedSection === 'pharmacy' ? (
              <ChevronUpIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-gray-500" />
            )}
          </button>
          
          {expandedSection === 'pharmacy' && (
            <div className="border-t border-gray-200 px-6 py-6 space-y-6">
              {pharmacyServices.map(pharmacy => (
                <div key={pharmacy.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-md font-medium text-gray-900">{pharmacy.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Delivery time: {pharmacy.deliveryTime}
                      </p>
                      <div className="mt-2">
                        <span className="text-sm font-medium text-gray-900">Features:</span>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {pharmacy.features.map(feature => (
                            <span key={feature} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      {pharmacy.rating && (
                        <p className="mt-2 text-sm text-gray-500">
                          Rating: <span className="text-yellow-600">{pharmacy.rating}</span>
                        </p>
                      )}
                    </div>
                    <a
                      href={`tel:${pharmacy.phone}`}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <PhoneIcon className="-ml-1 mr-1 h-4 w-4" />
                      Order
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <button
            onClick={() => toggleSection('equipment')}
            className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 focus:outline-none"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Medical Equipment Rental</h2>
              <p className="mt-1 text-sm text-gray-500">Rent medical devices and equipment for home care</p>
            </div>
            {expandedSection === 'equipment' ? (
              <ChevronUpIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-gray-500" />
            )}
          </button>
          
          {expandedSection === 'equipment' && (
            <div className="border-t border-gray-200 px-6 py-6 space-y-6">
              {equipmentProviders.map(provider => (
                <div key={provider.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-md font-medium text-gray-900">{provider.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Delivery: {provider.delivery}
                      </p>
                      <div className="mt-2">
                        <span className="text-sm font-medium text-gray-900">Equipment Available:</span>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {provider.equipment.map(item => (
                            <span key={item} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      {provider.rating && (
                        <p className="mt-2 text-sm text-gray-500">
                          Rating: <span className="text-yellow-600">{provider.rating}</span>
                        </p>
                      )}
                    </div>
                    <a
                      href={`tel:${provider.phone}`}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <PhoneIcon className="-ml-1 mr-1 h-4 w-4" />
                      Contact
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <button
            onClick={() => toggleSection('ambulance')}
            className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 focus:outline-none"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Ambulance Services</h2>
              <p className="mt-1 text-sm text-gray-500">Emergency transport and medical evacuation</p>
            </div>
            {expandedSection === 'ambulance' ? (
              <ChevronUpIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-gray-500" />
            )}
          </button>
          
          {expandedSection === 'ambulance' && (
            <div className="border-t border-gray-200 px-6 py-6 space-y-6">
              {ambulanceServices.map(service => (
                <div key={service.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-md font-medium text-gray-900">{service.name}</h3>
                      {service.responseTime && (
                        <p className="mt-1 text-sm text-gray-500">
                          Response time: {service.responseTime}
                        </p>
                      )}
                      <div className="mt-2">
                        <span className="text-sm font-medium text-gray-900">Service Types:</span>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {service.types.map(type => (
                            <span key={type} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                      {service.coverage && (
                        <p className="mt-2 text-sm text-gray-500">
                          Coverage: {service.coverage}
                        </p>
                      )}
                      {service.rating && (
                        <p className="mt-2 text-sm text-gray-500">
                          Rating: <span className="text-yellow-600">{service.rating}</span>
                        </p>
                      )}
                    </div>
                    <a
                      href={`tel:${service.phone}`}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <PhoneIcon className="-ml-1 mr-1 h-4 w-4" />
                      Call Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/emergency/redirect')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Back to Main Results
          </button>
        </div>
      </div>
    </div>
  );
}