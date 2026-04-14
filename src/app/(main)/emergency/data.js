export const emergencyRequests = [
  {
    id: 'EMG-20250724-01',
    date: '24-Jul-2025, 10:15 AM',
    status: 'Responded',
    hospital: 'Fortis Hospital, Delhi',
    symptoms: ['Head Injury', 'Bleeding'],
    ambulanceRequested: true
  },
  {
    id: 'EMG-20250725-02',
    date: '25-Jul-2025, 03:45 PM',
    status: 'Pending',
    hospital: '',
    symptoms: ['Chest Pain'],
    ambulanceRequested: false
  }
];

export const hospitals = [
  {
    id: 'h1',
    name: 'Max Trauma Center',
    address: '123 Medical Lane, Delhi',
    distance: '3.5 km',
    icuBeds: 4,
    status: 'Available',
    traumaSupport: true,
    cardiacSupport: true,
    responseTime: '15-20 mins'
  },
  {
    id: 'h2',
    name: 'Apollo Hospital',
    address: '456 Health Avenue, Delhi',
    distance: '5.2 km',
    icuBeds: 2,
    status: 'Limited',
    traumaSupport: true,
    cardiacSupport: false,
    responseTime: '25-30 mins'
  }
];

export const alternatives = [
  {
    id: 'alt1',
    title: 'Telemedicine Consultation',
    description: 'Connect with a doctor online for immediate advice while you arrange transportation.',
    actionText: 'Start Consultation'
  },
  {
    id: 'alt2',
    title: 'Nearest Available Clinic',
    description: 'Smaller clinic 2km away that can provide initial stabilization.',
    actionText: 'View Details'
  },
  {
    id: 'alt3',
    title: 'Home Care Instructions',
    description: 'Get first aid instructions to manage the situation until help arrives.',
    actionText: 'Get Instructions'
  }
];