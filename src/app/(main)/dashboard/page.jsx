// "use client"
// import { useState } from 'react';

// export default function HospitalDashboard() {
//   const [searchQuery, setSearchQuery] = useState('');

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">Hospital Management Dashboard</h1>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
//         {/* Total Hospital Registered */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <p className="text-gray-500 text-sm mb-1">Total Hospital Registered</p>
//           <p className="text-3xl font-bold text-blue-600">70</p>
//         </div>

//         {/* Available ICU Beds */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <p className="text-gray-500 text-sm mb-1">Available ICU Beds</p>
//           <p className="text-3xl font-bold text-green-600">150</p>
//         </div>

//         {/* Total Appointments */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <p className="text-gray-500 text-sm mb-1">Total Appointments</p>
//           <p className="text-3xl font-bold text-purple-600">55 <span className="text-lg">Today</span></p>
//         </div>

//         {/* Active Emergency Cases */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <p className="text-gray-500 text-sm mb-1">Active Emergency Cases</p>
//           <p className="text-3xl font-bold text-orange-600">85</p>
//         </div>

//         {/* Insurance - Approved Hospital Count */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <p className="text-gray-500 text-sm mb-1">Insurance - Approved Hospital Count</p>
//           <p className="text-3xl font-bold text-indigo-600">60</p>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Column */}
//         <div className="space-y-6">
//           {/* Bed & ICU Status */}
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold">Bed & ICU Status</h2>
//               <input
//                 type="text"
//                 placeholder="Search patients name, id"
//                 className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
            
//             <div className="space-y-4">
//               {/* Room Status Cards */}
//               <div className="border-b pb-4">
//                 <p className="font-medium text-gray-700 mb-2">Room No.</p>
//                 <div className="grid grid-cols-3 gap-2 text-sm">
//                   <span className="text-gray-500">Bed ID</span>
//                   <span className="text-gray-500">Unit</span>
//                   <span className="text-gray-500">Status</span>
//                 </div>
//               </div>

//               {/* Room BO01 */}
//               <div className="border-b pb-4">
//                 <div className="grid grid-cols-3 gap-2 items-center">
//                   <span className="font-medium">BO01</span>
//                   <span>B12</span>
//                   <span className="flex items-center">
//                     <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
//                     ICU
//                   </span>
//                   <span className="col-span-3">
//                     <span className="text-green-600">Available</span>
//                   </span>
//                 </div>
//               </div>

//               {/* Room BO02 */}
//               <div className="border-b pb-4">
//                 <div className="grid grid-cols-3 gap-2 items-center">
//                   <span className="font-medium">BO02</span>
//                   <span>B13</span>
//                   <span className="flex items-center">
//                     <span className="w-2 h-2 rounded-full bg-gray-300 mr-2"></span>
//                     General
//                   </span>
//                   <span className="col-span-3">
//                     <span className="text-red-600">Unavailable</span>
//                   </span>
//                 </div>
//               </div>

//               {/* Room BO03 */}
//               <div className="border-b pb-4">
//                 <div className="grid grid-cols-3 gap-2 items-center">
//                   <span className="font-medium">BO03</span>
//                   <span>B21</span>
//                   <span className="flex items-center">
//                     <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
//                     ICU
//                   </span>
//                   <span className="col-span-3">
//                     <span className="text-yellow-600">Occupied</span>
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Patient Visit */}
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h2 className="text-lg font-semibold mb-4">Patient Visit</h2>
//             <div className="bg-blue-50 p-4 rounded-lg text-center">
//               <p className="text-blue-600 font-medium">Daily</p>
//             </div>
//           </div>
//         </div>

//         {/* Middle Column */}
//         <div className="space-y-6">
//           {/* Top Doctors */}
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold">Top Doctors</h2>
//               <div className="flex space-x-2">
//                 <span className="text-sm text-gray-500">Hospital</span>
//                 <span className="text-sm text-gray-500">Review</span>
//               </div>
//             </div>
            
//             <div className="space-y-4">
//               {/* Doctor Card 1 */}
//               <div className="border-b pb-4">
//                 <h3 className="font-medium">Dr. Pawan Rao</h3>
//                 <p className="text-sm text-gray-500 mb-2">Cardiological - City Hospital</p>
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-500">315 Reviews</span>
//                 </div>
//               </div>

//               {/* Doctor Card 2 */}
//               <div className="border-b pb-4">
//                 <h3 className="font-medium">Dr. Pawan Rao</h3>
//                 <p className="text-sm text-gray-500 mb-2">Neurosurgery - Max Hospital</p>
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-500">315 Reviews</span>
//                 </div>
//               </div>

//               {/* Doctor Card 3 */}
//               <div className="border-b pb-4">
//                 <h3 className="font-medium">Dr. Pawan Rao</h3>
//                 <p className="text-sm text-gray-500 mb-2">Orthopedic - City Hospital</p>
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-500">200 Reviews</span>
//                 </div>
//               </div>

//               {/* Doctor Card 4 */}
//               <div className="pb-2">
//                 <h3 className="font-medium">Dr. Pawan Rao</h3>
//                 <p className="text-sm text-gray-500 mb-2">Cardiological - City Hospital</p>
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-500">315 Reviews</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Doctors List */}
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold">Doctors List</h2>
//               <div className="flex space-x-4">
//                 <span className="text-sm text-gray-500">Speciality</span>
//                 <span className="text-sm text-gray-500">Today</span>
//               </div>
//             </div>
            
//             <div className="space-y-3">
//               {/* Doctor 1 */}
//               <div className="flex justify-between items-center py-2">
//                 <div>
//                   <h3 className="font-medium">Dr. Niam Pawar</h3>
//                   <p className="text-sm text-gray-500">Cardiologist</p>
//                 </div>
//                 <span className="text-green-600 text-sm">Available</span>
//               </div>

//               {/* Doctor 2 */}
//               <div className="flex justify-between items-center py-2">
//                 <div>
//                   <h3 className="font-medium">Dr. Pratik Rathi</h3>
//                   <p className="text-sm text-gray-500">Neurosurgeon</p>
//                 </div>
//                 <span className="text-red-600 text-sm">Absent</span>
//               </div>

//               {/* Doctor 3 */}
//               <div className="flex justify-between items-center py-2">
//                 <div>
//                   <h3 className="font-medium">Dr. Rucha Rathi</h3>
//                   <p className="text-sm text-gray-500">Cardiologist</p>
//                 </div>
//                 <span className="text-green-600 text-sm">Available</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-6">
//           {/* Insurance Claim Statistic */}
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h2 className="text-lg font-semibold mb-4">Insurance Claim Statistic</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="bg-indigo-50 p-4 rounded-lg text-center">
//                 <p className="text-indigo-600 font-bold text-2xl">31k%</p>
//               </div>
//               <div className="bg-indigo-50 p-4 rounded-lg text-center">
//                 <p className="text-indigo-600 font-bold text-2xl">45k%</p>
//               </div>
//             </div>
//           </div>

//           {/* Hospital By Location */}
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h2 className="text-lg font-semibold mb-4">Hospital By Location</h2>
//             <div className="space-y-3">
//               <div className="flex items-center justify-between py-2 border-b">
//                 <span className="font-medium">Care Hospital</span>
//               </div>
//               <div className="flex items-center justify-between py-2 border-b">
//                 <span className="font-medium">City Hospital</span>
//               </div>
//               <div className="flex items-center justify-between py-2">
//                 <span className="font-medium">Max Hospital</span>
//               </div>
//               <div className="flex items-center justify-between py-2">
//                 <span className="font-medium">New City Hospital</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client"
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

const DashboardMap = dynamic(() => import('./DashboardMap'), { ssr: false });

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const pieData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

export default function HospitalDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Hospital Management System</h1>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Refresh</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">Settings</button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <p className="text-gray-500 text-sm">Total Hospital Registered</p>
          <p className="text-3xl font-bold text-blue-600">70</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <p className="text-gray-500 text-sm">Available ICU Beds</p>
          <p className="text-3xl font-bold text-green-600">150</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
          <p className="text-gray-500 text-sm">Total Appointments</p>
          <p className="text-3xl font-bold text-purple-600">55 <span className="text-lg">Today</span></p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-orange-500">
          <p className="text-gray-500 text-sm">Active Emergency Cases</p>
          <p className="text-3xl font-bold text-orange-600">85</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-indigo-500">
          <p className="text-gray-500 text-sm">Insurance - Approved Hospital Count</p>
          <p className="text-3xl font-bold text-indigo-600">60</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Bed & ICU Status */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Bed & ICU Status</h2>
              <input 
                type="text" 
                placeholder="Search patients name, id" 
                className="px-3 py-1 border rounded text-sm"
              />
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-2 text-sm font-medium text-gray-500 border-b pb-2">
                <span>Room No.</span>
                <span>Bed ID</span>
                <span>Unit</span>
                <span>Status</span>
              </div>
              
              <div className="grid grid-cols-4 gap-2 items-center border-b pb-3">
                <span className="font-medium">BO01</span>
                <span>B12</span>
                <span>ICU</span>
                <span className="text-green-600">Available</span>
              </div>
              
              <div className="grid grid-cols-4 gap-2 items-center border-b pb-3">
                <span className="font-medium">BO02</span>
                <span>B13</span>
                <span>General</span>
                <span className="text-red-600">Unavailable</span>
              </div>
              
              <div className="grid grid-cols-4 gap-2 items-center">
                <span className="font-medium">BO03</span>
                <span>B21</span>
                <span>ICU</span>
                <span className="text-yellow-600">Occupied</span>
              </div>
            </div>
          </div>

          {/* Patient Visit Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Patient Visit</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-2">
              <span className="inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full">Daily</span>
            </div>
          </div>
        </div>

        {/* Middle Column */}
        <div className="space-y-6">
          {/* Top Doctors */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Top Doctors</h2>
              <div className="flex space-x-4 text-sm text-gray-500">
                <span>Hospital</span>
                <span>Review</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-medium">Dr. Pawan Rao</h3>
                <p className="text-sm text-gray-500">Cardiological - City Hospital</p>
                <p className="text-sm text-gray-400 mt-1">315 Reviews</p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="font-medium">Dr. Pawan Rao</h3>
                <p className="text-sm text-gray-500">Neurosurgery - Max Hospital</p>
                <p className="text-sm text-gray-400 mt-1">315 Reviews</p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="font-medium">Dr. Pawan Rao</h3>
                <p className="text-sm text-gray-500">Orthopedic - City Hospital</p>
                <p className="text-sm text-gray-400 mt-1">200 Reviews</p>
              </div>
              
              <div>
                <h3 className="font-medium">Dr. Pawan Rao</h3>
                <p className="text-sm text-gray-500">Cardiological - City Hospital</p>
                <p className="text-sm text-gray-400 mt-1">315 Reviews</p>
              </div>
            </div>
          </div>

          {/* Doctors List */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Doctors List</h2>
              <div className="flex space-x-4 text-sm text-gray-500">
                <span>Speciality</span>
                <span>Today</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <div>
                  <h3 className="font-medium">Dr. Niam Pawar</h3>
                  <p className="text-sm text-gray-500">Cardiologist</p>
                </div>
                <span className="text-green-600 text-sm">Available</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b">
                <div>
                  <h3 className="font-medium">Dr. Pratik Rathi</h3>
                  <p className="text-sm text-gray-500">Neurosurgeon</p>
                </div>
                <span className="text-red-600 text-sm">Absent</span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <div>
                  <h3 className="font-medium">Dr. Rucha Rathi</h3>
                  <p className="text-sm text-gray-500">Cardiologist</p>
                </div>
                <span className="text-green-600 text-sm">Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Insurance Claim Statistic */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Insurance Claim Statistic</h2>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-indigo-100 p-3 rounded text-center">
                <p className="text-indigo-600 font-bold text-xl">31k%</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded text-center">
                <p className="text-indigo-600 font-bold text-xl">45k%</p>
              </div>
            </div>
          </div>

          {/* Hospital Map */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Hospital By Location</h2>
            <div className="h-64 bg-gray-100 rounded mb-4">
              <DashboardMap />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span>Care Hospital</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>City Hospital</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                <span>Max Hospital</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                <span>New City Hospital</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}