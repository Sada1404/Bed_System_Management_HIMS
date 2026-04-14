import { Plus, BedIcon, User, FileText, BarChart3, CalculatorIcon, Package, WalletCards, List, ListChecks } from "lucide-react"

export const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "add-bill", label: "Add Bill", icon: Plus, shortLabel:"Add", ariaLabel:"Add Bill" },
    { id: "bill-list", label: "Bill List", icon: CalculatorIcon, shortLabel:"List", ariaLabel:"Bill List" },
    { id: "add-advance-payment", label: "Add Advance Payment", icon: Plus, shortLabel:"Advance", ariaLabel:"Add Advance Payment" },
    { id: "advance-payment-list", label: "Advance Payment List", icon: WalletCards, shortLabel:"List", ariaLabel:"Advance List" }
  ]

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
      <div className="relative">
        {/* Scroll indicators for mobile */}
        <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none md:hidden" />
        <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none md:hidden" />
        
        {/* Tabs container */}
        <div className="flex items-center overflow-x-auto scroll-smooth no-scrollbar">
          <div className="flex flex-nowrap min-w-full px-1 py-1 space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={tab.ariaLabel}
                  className={`flex-shrink-0 flex items-center justify-center px-3 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 rounded-lg mx-1 ${
                    isActive
                      ? "text-blue-700 bg-blue-50 border border-blue-200 shadow-xs"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon className={`w-4 h-4 mr-1 sm:mr-2 flex-shrink-0 ${
                    isActive ? "text-blue-600" : "text-gray-500"
                  }`} />
                  <span className="sr-only sm:not-sr-only sm:inline md:hidden">{tab.shortLabel}</span>
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}