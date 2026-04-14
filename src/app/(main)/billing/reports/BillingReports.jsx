import { useState } from "react";
import { BarChartComponent, PieChartComponent, LineChartComponent } from "./ChartComponents";
import { Download, FileText, File, Printer, ChevronLeft, ChevronRight } from "lucide-react";

export const BillingReports = ({ 
  reportData = {},
  departments = [],
  isLoading = false
}) => {
  const [filters, setFilters] = useState({
    dateRange: "this_month",
    startDate: "",
    endDate: "",
    department: "",
    patientType: ""
  });
  
  const [activeTab, setActiveTab] = useState("summary");
  const [detailedBills, setDetailedBills] = useState([]);

  const patientTypes = [
    "All",
    "OPD",
    "IPD",
    "Insurance",
    "Cash"
  ];

  const dateRanges = [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "this_week", label: "This Week" },
    { value: "last_week", label: "Last Week" },
    { value: "this_month", label: "This Month" },
    { value: "last_month", label: "Last Month" },
    { value: "this_year", label: "This Year" },
    { value: "custom", label: "Custom Date Range" }
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleViewDetails = () => {
    setDetailedBills([
      { id: "B1001", patient: "John Doe", date: "2023-07-15", amount: 4500, status: "Paid" },
      { id: "B1002", patient: "Jane Smith", date: "2023-07-16", amount: 3200, status: "Pending" },
      { id: "B1003", patient: "Robert Johnson", date: "2023-07-17", amount: 2100, status: "Paid" },
      { id: "B1004", patient: "Emily Davis", date: "2023-07-18", amount: 1750, status: "Pending" },
      { id: "B1005", patient: "Michael Wilson", date: "2023-07-19", amount: 3900, status: "Paid" }
    ]);
  };

  const handleExport = (format) => {
    alert(`Exporting report as ${format}...`);
  };

  // Format data for charts
  const paymentModeData = reportData?.paymentModeData?.map(item => ({
    name: item.name,
    value: item.value
  })) || [];

  const departmentRevenue = reportData?.departmentRevenue?.map(item => ({
    name: item.name,
    value: item.value
  })) || [];

  const revenueTrend = reportData?.revenueTrend?.map(item => ({
    name: item.name,
    value: item.value
  })) || [];

  return (
    <div className="bg-white rounded-lg border border-gray-200 flex flex-col h-[calc(100vh-100px)] overflow-y-auto">
      {/* Fixed header section */}
      <div className="p-4 md:p-6 border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-blue-600">📊 Billing Reports</h2>
            
            <div className="flex gap-2">
              <button 
                onClick={() => handleExport('pdf')}
                className="flex items-center gap-1 px-3 py-2 text-xs font-medium border border-red-200 rounded-md hover:bg-red-50 transition-colors"
                aria-label="Export as PDF"
              >
                <File className="text-red-600 w-3 h-3" />
                <span className="hidden sm:inline">PDF</span>
              </button>
              <button 
                onClick={() => handleExport('excel')}
                className="flex items-center gap-1 px-3 py-2 text-xs font-medium border border-green-200 rounded-md hover:bg-green-50 transition-colors"
                aria-label="Export as Excel"
              >
                <FileText className="text-green-600 w-3 h-3" />
                <span className="hidden sm:inline">Excel</span>
              </button>
              <button 
                onClick={() => handleExport('print')}
                className="flex items-center gap-1 px-3 py-2 text-xs font-medium border border-purple-200 rounded-md hover:bg-purple-50 transition-colors"
                aria-label="Print"
              >
                <Printer className="text-purple-600 w-3 h-3" />
                <span className="hidden sm:inline">Print</span>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Date Range Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <select
                name="dateRange"
                value={filters.dateRange}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {dateRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
            </div>

            {/* Conditional Date Inputs */}
            {filters.dateRange === "custom" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={filters.startDate}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={filters.endDate}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}

            {/* Department Selector */}
            <div className={filters.dateRange === "custom" ? "hidden lg:block" : ""}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                name="department"
                value={filters.department}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
            </div>

            {/* Patient Type Selector */}
            <div className={filters.dateRange === "custom" ? "hidden lg:block" : ""}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient Type</label>
              <select
                name="patientType"
                value={filters.patientType}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {patientTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-4 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab("summary")}
              className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "summary" 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Summary
            </button>
            <button
              onClick={() => setActiveTab("revenue")}
              className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "revenue" 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Revenue Analysis
            </button>
            <button
              onClick={() => setActiveTab("dues")}
              className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "dues" 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Outstanding Dues
            </button>
          </nav>
        </div>
      </div>

      {/* Scrollable content section */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {activeTab === "summary" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium text-blue-800">Total Revenue</h3>
                        <p className="text-2xl font-semibold text-blue-600 mt-1">₹{reportData?.totalRevenue || '0'}</p>
                      </div>
                      <button 
                        onClick={handleViewDetails}
                        className="text-xs text-blue-500 hover:text-blue-700 hover:underline"
                        aria-label="View revenue details"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium text-green-800">Paid Amount</h3>
                        <p className="text-2xl font-semibold text-green-600 mt-1">₹{reportData?.paidAmount || '0'}</p>
                      </div>
                      <button 
                        onClick={handleViewDetails}
                        className="text-xs text-green-500 hover:text-green-700 hover:underline"
                        aria-label="View paid amount details"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium text-yellow-800">Outstanding Dues</h3>
                        <p className="text-2xl font-semibold text-yellow-600 mt-1">₹{reportData?.outstandingDues || '0'}</p>
                      </div>
                      <button 
                        onClick={handleViewDetails}
                        className="text-xs text-yellow-500 hover:text-yellow-700 hover:underline"
                        aria-label="View outstanding dues details"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-medium text-gray-700">Payment Mode Distribution</h3>
                      <button 
                        onClick={() => handleExport('payment-modes')}
                        className="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-1"
                        aria-label="Export payment modes"
                      >
                        <Download className="w-3 h-3" />
                        Export
                      </button>
                    </div>
                    <div className="h-64">
                      <PieChartComponent data={paymentModeData} />
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-medium text-gray-700">Department-wise Revenue</h3>
                      <button 
                        onClick={() => handleExport('department-revenue')}
                        className="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-1"
                        aria-label="Export department revenue"
                      >
                        <Download className="w-3 h-3" />
                        Export
                      </button>
                    </div>
                    <div className="h-64">
                      <BarChartComponent data={departmentRevenue} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "revenue" && (
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-medium text-gray-700">Revenue Trend</h3>
                    <button 
                      onClick={() => handleExport('revenue-trend')}
                      className="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-1"
                      aria-label="Export revenue trend"
                    >
                      <Download className="w-3 h-3" />
                      Export
                    </button>
                  </div>
                  <div className="h-80">
                    <LineChartComponent data={revenueTrend} />
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-medium text-gray-700">Insurance vs Cash</h3>
                      <button 
                        onClick={() => handleExport('insurance-cash')}
                        className="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-1"
                        aria-label="Export insurance vs cash"
                      >
                        <Download className="w-3 h-3" />
                        Export
                      </button>
                    </div>
                    <div className="h-64">
                      <PieChartComponent data={paymentModeData} />
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-medium text-gray-700">OPD vs IPD Revenue</h3>
                      <button 
                        onClick={() => handleExport('opd-ipd')}
                        className="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-1"
                        aria-label="Export OPD vs IPD revenue"
                      >
                        <Download className="w-3 h-3" />
                        Export
                      </button>
                    </div>
                    <div className="h-64">
                      <BarChartComponent data={departmentRevenue} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "dues" && (
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-medium text-gray-700">Outstanding Dues Trend</h3>
                    <button 
                      onClick={() => handleExport('dues-trend')}
                      className="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-1"
                      aria-label="Export dues trend"
                    >
                      <Download className="w-3 h-3" />
                      Export
                    </button>
                  </div>
                  <div className="h-80">
                    <LineChartComponent data={revenueTrend} />
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700">Outstanding Bills</h3>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleExport('outstanding-bills')}
                        className="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-1"
                        aria-label="Export outstanding bills"
                      >
                        <Download className="w-3 h-3" />
                        Export
                      </button>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Bill ID
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Patient
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                            Date
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {detailedBills.length > 0 ? (
                          detailedBills.map((bill) => (
                            <tr key={bill.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                {bill.id}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                {bill.patient}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                                {bill.date}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                ₹{bill.amount.toLocaleString()}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  bill.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {bill.status}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="px-4 py-4 text-center text-sm text-gray-500">
                              No outstanding bills found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {detailedBills.length > 0 && (
                    <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-t border-gray-200">
                      <div className="text-xs text-gray-500 mb-2 sm:mb-0">
                        Showing <span className="font-medium">1</span> to <span className="font-medium">{detailedBills.length}</span> of <span className="font-medium">{detailedBills.length}</span> entries
                      </div>
                      <div className="flex space-x-1">
                        <button 
                          className="p-1 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center disabled:opacity-50"
                          disabled
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button className="px-2 py-1 border border-gray-300 rounded-md bg-blue-500 text-white text-sm">
                          1
                        </button>
                        <button 
                          className="p-1 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center disabled:opacity-50"
                          disabled
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};