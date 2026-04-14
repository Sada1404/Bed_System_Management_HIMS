"use client";
import {
  Search,
  Phone,
  ChevronDown,
  LogOut,
  User,
  Settings,
} from "lucide-react"
import { createClient } from "../utils/supabase/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Toast from './Toast'
import Image from "next/image"

export default function TopBar({ activeTab }) {
  const [user, setUser] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const supabase = createClient()
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success", // 'success' or 'error'
  });
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }

    fetchUser()
  }, [])

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      setToast({
        show: true,
        message: "Logout successful! Redirecting to login...",
        type: "success"
      })
      
      setTimeout(() => {
        router.push('/auth/login')
      }, 1000)
    } catch (error) {
      setToast({
        show: true,
        message: "Logout failed. Please try again.",
        type: "error"
      })
    }
  }

  return (
    <div className="bg-slate-800 border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ ...toast, show: false })}
          />
        )}
        <div className="flex items-center space-x-8">
          <div className="flex items-center">
            {/* <Image
              src="/logo.png" // Replace with your logo path
              alt="Clinic Logo"
              width={40}
              height={40}
              className="h-8 w-auto"
            /> */}
            <span className=" text-2xl font-bold text-blue-600 hidden sm:inline">SmartCare+</span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search ..."
              className="h-8 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-52"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 text-sm">
            <Phone className="w-4 h-4 text-cyan-500" />
            <span className="text-slate-300">Helpline:</span>
            <span className="font-medium text-white">+91 98 2090 2003</span>
          </div>

          {user && (
            <div className="relative">
              <button 
                className={`flex items-center space-x-2 hover:bg-gray-500 rounded-full p-1 pr-2 transition-all duration-200 ${showDropdown ? 'bg-gray-500' : ''}`}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="w-9 h-9 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center text-blue-600 font-medium border border-blue-100">
                  {user.user_metadata?.full_name?.charAt(0) || 'U'}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-white">
                    {user.user_metadata?.full_name || 'User'}
                  </p>
                  <p className="text-xs text-slate-200 truncate max-w-[160px]">
                    {user.email}
                  </p>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100">
                  <button
                    className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 w-full text-left transition-colors"
                  >
                    <User className="w-4 h-4 mr-3 text-gray-500" />
                    Profile
                  </button>
                  <button
                    className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 w-full text-left transition-colors"
                  >
                    <Settings className="w-4 h-4 mr-3 text-gray-500" />
                    Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-colors border-t border-gray-100 mt-1"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

    </div>
  )
}