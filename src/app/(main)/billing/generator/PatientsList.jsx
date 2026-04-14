import { Edit, Trash2 } from "lucide-react"

export function PatientAdmissionList({ 
  patients, 
  onEdit, 
  onDelete, 
  isLoading 
}) {
  const samplePatients = [
    {
      aid: 'UDSGORN',
      patientId: 'PUYH08AP',
      admissionDate: '2025-02-28',
      dischargeDate: '2025-03-01',
      doctorName: 'Dr. Smith',
      packageName: 'PHYSICAL FITNESS CHECKUP (MALE / FEMALE)',
      insuranceName: 'Trust Insurance',
      policyNo: '10',
      agentName: 'Ritu',
      guardianName: '',
      guardianRelation: '',
      guardianContact: '',
      guardianAddress: '',
      status: 'Active'
    },
    {
      aid: 'JASDBJSG',
      patientId: 'PUYH08AP',
      admissionDate: '2025-02-28',
      dischargeDate: '2025-03-01',
      doctorName: 'Dr. Smith',
      packageName: 'PHYSICAL FITNESS CHECKUP (MALE / FEMALE)',
      insuranceName: 'Trust Insurance',
      policyNo: '10',
      agentName: 'Ritu',
      guardianName: '',
      guardianRelation: '',
      guardianContact: '',
      guardianAddress: '',
      status: 'Active'
    }
  ]

  // Use actual patients if provided, otherwise sample data
  const displayPatients = patients.length > 0 ? patients : samplePatients

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl text-blue-500 font-semibold">📋 Patient Admission List</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <div className="flex items-center w-full sm:w-auto">
            <span className="mr-2 text-sm text-gray-600 whitespace-nowrap">Show</span>
            <select className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto">
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden sm:table-cell">AID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Patient ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden xl:table-cell">Admission Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden xl:table-cell">Discharge Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Doctor</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden xxl:table-cell">Package</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden md:table-cell">Insurance</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden md:table-cell">Policy No</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden xl:table-cell">Agent</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan="11" className="px-6 py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : displayPatients.length === 0 ? (
              <tr>
                <td colSpan="11" className="px-6 py-4 text-center text-gray-500">
                  No patient admissions found
                </td>
              </tr>
            ) : (
              displayPatients.map((patient) => (
                <tr key={patient.aid} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 hidden sm:table-cell">{patient.aid}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{patient.patientId}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 hidden xl:table-cell">{patient.admissionDate}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 hidden xl:table-cell">{patient.dischargeDate}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="truncate max-w-[120px] inline-block">{patient.doctorName}</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 hidden xxl:table-cell">
                    <span className="truncate max-w-[120px] inline-block">{patient.packageName}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                    <span className="truncate max-w-[100px] inline-block">{patient.insuranceName}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">{patient.policyNo}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 hidden xl:table-cell">
                    <span className="truncate max-w-[80px] inline-block">{patient.agentName}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${patient.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button 
                        onClick={() => onEdit(patient.aid)}
                        className="w-6 h-6 bg-blue-500 text-white rounded flex items-center justify-center hover:bg-blue-600"
                      >
                        <Edit className="w-3 h-3" />
                      </button>
                      <button 
                        onClick={() => onDelete(patient.aid)}
                        className="w-6 h-6 bg-red-500 text-white rounded flex items-center justify-center hover:bg-red-600"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-500 whitespace-nowrap">
          Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">20</span> results
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 whitespace-nowrap">
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 whitespace-nowrap">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}