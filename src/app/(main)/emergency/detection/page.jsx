"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const symptomsList = [
  'Chest Pain',
  'Bleeding',
  'Head Injury',
  'Breathing Difficulty',
  'Unconsciousness',
  'Severe Burns',
  'Allergic Reaction',
  'Stroke Symptoms',
  'Seizures',
  'Poisoning'
];

export default function Detection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [pincode, setPincode] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const router = useRouter();

  const toggleSymptom = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const detectLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPincode(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
          setIsLocating(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLocating(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setIsLocating(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    router.push('/emergency/redirect');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-blue-600">Emergency Help Request</h1>
            <p className="mt-2 text-gray-600">Fill out this form to get immediate assistance</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name (optional)
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number (recommended)
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Symptoms
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {symptomsList.map((symptom) => (
                  <button
                    key={symptom}
                    type="button"
                    onClick={() => toggleSymptom(symptom)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedSymptoms.includes(symptom)
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : 'bg-gray-100 text-gray-800 border border-gray-300'
                    }`}
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                Location (Pin Code or Address)
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  id="pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="110001 or your address"
                />
                <button
                  type="button"
                  onClick={detectLocation}
                  disabled={isLocating}
                  className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  {isLocating ? 'Locating...' : 'Auto-detect'}
                </button>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={!pincode || selectedSymptoms.length === 0}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Request Emergency Help
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}