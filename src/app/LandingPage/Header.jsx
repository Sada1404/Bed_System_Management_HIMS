import { Search, MapPin, User, AmbulanceIcon } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo and Location */}
        <div className="flex items-center gap-4">
          <div className="text-teal-600 font-bold text-2xl">LOGO</div>
          <div className="hidden sm:flex items-center gap-2 text-gray-600">
            <MapPin className="w-7 h-7" />
            <div className="w-24 h-px bg-gray-300"></div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button size="sm" className="absolute right-1 top-1 bg-teal-600 hover:bg-teal-700 px-3">
            <Search className="w-8 h-8" />
          </button>
        </div>

        {/* Emergency and Login */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-red-500 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold"><AmbulanceIcon/></span>
            </div>
          </div>
          <button variant="outline" className="flex items-center gap-2 px-4 py-2 bg-transparent">
            <span >Login</span>
            <User className="w-7 h-7" />
          </button>
        </div>
      </div>
    </header>
  )
}
