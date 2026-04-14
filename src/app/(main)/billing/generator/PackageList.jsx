import { Edit, File, FileScan, FileText, Printer, Trash2, ChevronLeft, ChevronRight } from "lucide-react"

export const PackageList = ({ packages, onEdit, onDelete, isLoading }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-4">
        <h2 className="text-lg font-semibold text-blue-500">📋 Package List</h2>
        <div className="w-full md:w-auto flex flex-col-reverse sm:flex-row items-end sm:items-center gap-3">
          <div className="w-full sm:w-auto flex items-center gap-2">
            <select className="w-full sm:w-auto px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Show 10</option>
              <option>Show 15</option>
              <option>Show 25</option>
            </select>
            <input
              type="text"
              placeholder="Search..."
              className="w-full sm:w-auto px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full sm:w-auto flex gap-2 justify-end">
            <button
              className={`flex items-center gap-1 px-3 py-2 text-xs font-medium border border-green-200 rounded-md hover:bg-green-50 transition-colors`}
            >
              <FileScan className="text-green-600 w-3 h-3" />
              <span className="hidden sm:inline">CSV</span>
            </button>
            <button
              className={`flex items-center gap-1 px-3 py-2 text-xs font-medium border border-blue-200 rounded-md hover:bg-blue-50 transition-colors`}
            >
              <FileText className="text-blue-600 w-3 h-3" />
              <span className="hidden sm:inline">Excel</span>
            </button>
            <button
              className={`flex items-center gap-1 px-3 py-2 text-xs font-medium border border-red-200 rounded-md hover:bg-red-50 transition-colors`}
            >
              <File className="text-red-600 w-3 h-3" />
              <span className="hidden sm:inline">PDF</span>
            </button>
            <button
              className={`flex items-center gap-1 px-3 py-2 text-xs font-medium border border-purple-200 rounded-md hover:bg-purple-50 transition-colors`}
            >
              <Printer className="text-purple-600 w-3 h-3" />
              <span className="hidden sm:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SL.NO</th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Description</th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Discount</th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan="6" className="px-3 py-4 text-center text-sm">Loading packages...</td>
              </tr>
            ) : packages.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-3 py-4 text-center text-sm text-gray-500">No packages available</td>
              </tr>
            ) : (
              packages.map((pkg, index) => (
                <tr key={pkg.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                  <td className="px-3 py-2 md:px-6 md:py-4 text-sm text-gray-900">
                    <div className="font-medium">{pkg.package_name}</div>
                    <div className="text-xs text-gray-500 lg:hidden mt-1">
                      {pkg.description?.length > 30 ? `${pkg.description.substring(0, 30)}...` : pkg.description}
                    </div>
                    <div className="sm:hidden text-xs mt-1">
                      Discount: {pkg.discount.toFixed(2)}%
                    </div>
                  </td>
                  <td className="px-3 py-2 md:px-6 md:py-4 text-sm text-gray-900 hidden lg:table-cell">
                    {pkg.description?.length > 50 ? `${pkg.description.substring(0, 50)}...` : pkg.description}
                  </td>
                  <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900 hidden sm:table-cell">{pkg.discount.toFixed(2)}%</td>
                  <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      pkg.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {pkg.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex space-x-1 md:space-x-2">
                      <button 
                        onClick={() => onEdit(pkg.id)}
                        className="p-1 md:w-6 md:h-6 bg-blue-500 text-white rounded flex items-center justify-center hover:bg-blue-600 transition-colors"
                        aria-label="Edit package"
                      >
                        <Edit className="w-3 h-3" />
                      </button>
                      <button 
                        onClick={() => onDelete(pkg.id)}
                        className="p-1 md:w-6 md:h-6 bg-red-500 text-white rounded flex items-center justify-center hover:bg-red-600 transition-colors"
                        aria-label="Delete package"
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

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
        <div className="text-xs sm:text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{packages.length}</span> of <span className="font-medium">{packages.length}</span> entries
        </div>
        <div className="flex space-x-1">
          <button className="p-1 sm:px-3 sm:py-1 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center">
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline ml-1">Previous</span>
          </button>
          <button className="px-2 py-1 sm:px-3 sm:py-1 border border-gray-300 rounded-md bg-blue-500 text-white">1</button>
          <button className="p-1 sm:px-3 sm:py-1 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center">
            <span className="hidden sm:inline mr-1">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}