'use client';
import { useState, useRef } from 'react';
import TermsPopup from '../component/TermsPopup'
import {
  LucideCamera,
  LucideEye,
  LucideEyeOff,
  EyeClosedIcon,
  EyeOffIcon,
  FileUpIcon,
  FileDownIcon,
} from 'lucide-react';


// Comprehensive country-state-city data
const locationData = {
  "United States": {
    "California": ["Los Angeles", "San Francisco", "San Diego", "Sacramento", "Oakland", "Fresno", "San Jose", "Long Beach"],
    "New York": ["New York City", "Buffalo", "Rochester", "Syracuse", "Albany", "Yonkers", "New Rochelle", "Mount Vernon"],
    "Texas": ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth", "El Paso", "Arlington", "Corpus Christi"],
    "Florida": ["Miami", "Orlando", "Tampa", "Jacksonville", "St. Petersburg", "Hialeah", "Tallahassee", "Fort Lauderdale"],
    "Illinois": ["Chicago", "Aurora", "Peoria", "Rockford", "Joliet", "Springfield", "Elgin", "Waukegan"]
  },
  "India": {
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur", "Amravati", "Kolhapur"],
    "Karnataka": ["Bengaluru", "Mysuru", "Mangalore", "Hubli-Dharwad", "Belgaum", "Gulbarga", "Davangere", "Bellary"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli", "Tirunelveli", "Erode", "Vellore"],
    "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi", "Central Delhi", "North East Delhi", "North West Delhi"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar", "Junagadh"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner", "Alwar", "Bharatpur"],
    "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Malda", "Bardhaman", "Baharampur"]
  },
  "United Kingdom": {
    "England": ["London", "Manchester", "Birmingham", "Liverpool", "Bristol", "Sheffield", "Leicester", "Coventry"],
    "Scotland": ["Edinburgh", "Glasgow", "Aberdeen", "Dundee", "Stirling", "Perth", "Inverness", "Paisley"],
    "Wales": ["Cardiff", "Swansea", "Newport", "Wrexham", "Barry", "Caerphilly", "Bridgend", "Neath"],
    "Northern Ireland": ["Belfast", "Derry", "Lisburn", "Newtownabbey", "Bangor", "Craigavon", "Ballymena", "Newry"]
  },
  "Canada": {
    "Ontario": ["Toronto", "Ottawa", "Hamilton", "London", "Markham", "Vaughan", "Kitchener", "Windsor"],
    "Quebec": ["Montreal", "Quebec City", "Laval", "Gatineau", "Longueuil", "Sherbrooke", "Saguenay", "Trois-Rivières"],
    "British Columbia": ["Vancouver", "Surrey", "Burnaby", "Richmond", "Abbotsford", "Coquitlam", "Langley", "Delta"],
    "Alberta": ["Calgary", "Edmonton", "Red Deer", "Lethbridge", "St. Albert", "Medicine Hat", "Grande Prairie", "Airdrie"]
  },
  "Australia": {
    "New South Wales": ["Sydney", "Newcastle", "Wollongong", "Central Coast", "Maitland", "Albury", "Wagga Wagga", "Port Macquarie"],
    "Victoria": ["Melbourne", "Geelong", "Ballarat", "Bendigo", "Shepparton", "Latrobe", "Warrnambool", "Horsham"],
    "Queensland": ["Brisbane", "Gold Coast", "Townsville", "Cairns", "Toowoomba", "Rockhampton", "Mackay", "Bundaberg"],
    "Western Australia": ["Perth", "Fremantle", "Rockingham", "Mandurah", "Bunbury", "Kalgoorlie", "Geraldton", "Albany"]
  }
};

export default function RegistrationForm() {
  const [showTerms, setShowTerms] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [emailNA, setEmailNA] = useState(false);

  const [profilePic, setProfilePic] = useState(null);
  const [idFront, setIdFront] = useState(null);
  const [idBack, setIdBack] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    title: '',
    firstName: '',
    middleName: '',
    lastName: '',
    mobile: '',
    email: '',
    dob: '',
    gender: '',
    maritalStatus: '',
    bloodGroup: '',
    age: '',
    emergencyContact: '',
    address1: '',
    address2: '',
    country: '',
    state: '',
    city: '',
    pinCode: '',
    idDocument: '',
    validTill: '',
    password: '',
    confirmPassword: '',
  });

  const fileInputRef = useRef(null);
  const idFrontInputRef = useRef(null);
  const idBackInputRef = useRef(null);

  // Dynamic location options based on selection
  const countries = Object.keys(locationData);
  const states = form.country ? Object.keys(locationData[form.country] || {}) : [];
  const cities = form.state ? locationData[form.country]?.[form.state] || [] : [];

  const maritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed'];
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === 'emailNA') {
      setEmailNA(checked);
      if (checked) setForm((p) => ({ ...p, email: '' }));
      return;
    }

    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === 'country') {
        updated.state = '';
        updated.city = '';
      }
      if (name === 'state') {
        updated.city = '';
      }
      return updated;
    });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setProfilePic(reader.result);
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e, setter) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setter(reader.result);
    reader.readAsDataURL(file);
  };

  const isFormValid = () => {
    return true; // placeholder for future validation
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!accepted || !isFormValid()) return;
    console.log('SUBMIT', form);
  };

  return (
    <div className="h-full overflow-auto bg-gray-50">
  <div className="min-h-full">
    <div className="w-full bg-white shadow-sm border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-4">
        <h1 className="text-2xl font-semibold text-white text-center">
          Patient Registration
        </h1>
        <p className="text-teal-100 text-center mt-1 text-sm">
          Please fill in all required information
        </p>
      </div>

      <div className="p-6">
        {/* Profile Picture */}
        <div className="flex justify-center mb-8">
          <div className="text-center">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="relative group w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden ring-4 ring-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <LucideCamera className="w-8 h-8 text-gray-400 group-hover:text-teal-600 transition" />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition rounded-full flex items-center justify-center">
                <LucideCamera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition" />
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="hidden"
              />
            </button>
            <p className="text-xs text-gray-500 mt-2">Upload Photo</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-8">
          {/* Patient Details */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-teal-600 text-sm font-bold">1</span>
              </div>
              Patient Details
            </h2>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <select
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  required
                >
                  <option value="">Select Title</option>
                  {['Mr', 'Mrs', 'Ms', 'Dr'].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Middle Name
                </label>
                <input
                  type="text"
                  name="middleName"
                  value={form.middleName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>
            </div>

            {/* Contact and Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile *
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      disabled={emailNA}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100"
                    />
                  </div>
                  <label className="flex items-center gap-1 text-sm text-gray-600 whitespace-nowrap">
                    <input
                      type="checkbox"
                      name="emailNA"
                      checked={emailNA}
                      onChange={handleChange}
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    N/A
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  required
                >
                  <option value="">Select Gender</option>
                  {['Male', 'Female', 'Other'].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marital Status
                </label>
                <select
                  name="maritalStatus"
                  value={form.maritalStatus}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="">Select Marital Status</option>
                  {maritalStatuses.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blood Group
                </label>
                <select
                  name="bloodGroup"
                  value={form.bloodGroup}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>

            {/* Emergency Contact and Passwords */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Emergency Contact
                </label>
                <input
                  type="tel"
                  name="emergencyContact"
                  value={form.emergencyContact}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <LucideEyeOff className="w-5 h-5" />
                  ) : (
                    <EyeClosedIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password *
                </label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <LucideEye className="w-5 h-5" />
                  ) : (
                    <EyeOffIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-teal-600 text-sm font-bold">2</span>
              </div>
              Address Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 1
                </label>
                <input
                  type="text"
                  name="address1"
                  value={form.address1}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 2
                </label>
                <input
                  type="text"
                  name="address2"
                  value={form.address2}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country *
                </label>
                <select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  required
                >
                  <option value="">Select Country</option>
                  {countries.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State *
                </label>
                <select
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  disabled={!form.country}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100"
                  required
                >
                  <option value="">Select State</option>
                  {states.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <select
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  disabled={!form.state}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100"
                  required
                >
                  <option value="">Select City</option>
                  {cities.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PIN Code
                </label>
                <input
                  type="text"
                  name="pinCode"
                  value={form.pinCode}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Identification Documents */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-teal-600 text-sm font-bold">3</span>
              </div>
              Identification Documents
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Identification Document *
                </label>
                <select
                  name="idDocument"
                  value={form.idDocument}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  required
                >
                  <option value="">Select Document</option>
                  {['Aadhar Card', 'Passport', 'Driving License', 'Voter ID'].map(
                    (option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Valid Till
                </label>
                <input
                  type="date"
                  name="validTill"
                  value={form.validTill}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ID Front */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload ID Front *
                </label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-teal-400 hover:bg-teal-50 transition-all duration-200"
                  onClick={() => idFrontInputRef.current?.click()}
                >
                  {idFront ? (
                    <div className="space-y-2">
                      <img
                        src={idFront}
                        alt="ID Front"
                        className="mx-auto h-32 w-auto object-contain rounded"
                      />
                      <p className="text-sm text-green-600">✓ Front uploaded</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <FileDownIcon className="w-12 h-12 text-gray-400 mx-auto" />
                      <p className="text-sm text-gray-600">Click to upload front side</p>
                      <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={idFrontInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, setIdFront)}
                    required
                  />
                </div>
              </div>

              {/* ID Back */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload ID Back *
                </label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-teal-400 hover:bg-teal-50 transition-all duration-200"
                  onClick={() => idBackInputRef.current?.click()}
                >
                  {idBack ? (
                    <div className="space-y-2">
                      <img
                        src={idBack}
                        alt="ID Back"
                        className="mx-auto h-32 w-auto object-contain rounded"
                      />
                      <p className="text-sm text-green-600">✓ Back uploaded</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <FileUpIcon className="w-12 h-12 text-gray-400 mx-auto" />
                      <p className="text-sm text-gray-600">Click to upload back side</p>
                      <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={idBackInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, setIdBack)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Submit */}
          <div>
            <div className="flex flex-col items-center space-y-4">
              <label className="flex items-start gap-3 text-sm text-gray-600 max-w-md text-center">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded mt-0.5"
                  required
                />
                <span>
                  I accept the{' '}
                  <button
                    type="button"
                    onClick={() => setShowTerms(true)}
                    className="text-teal-600 hover:text-teal-700 underline font-medium"
                  >
                    Terms and Conditions
                  </button>{' '}
                  and confirm that all information provided is accurate.
                </span>
              </label>

              <button
                type="submit"
                disabled={!accepted}
                className="px-12 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg font-medium hover:from-teal-700 hover:to-teal-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Complete Registration
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    {/* Terms Popup */}
    {showTerms && <TermsPopup onClose={() => setShowTerms(false)} />}
  </div>
</div>
  );
}