"use client"
import { useState } from "react"

export default function GoogleMap() {
  const [activeFilter, setActiveFilter] = useState("all")

  const filters = [
    { id: "all", label: "All", color: "bg-teal-600" },
    { id: "hospitals", label: "Hospitals", color: "bg-blue-600" },
    { id: "doctors", label: "Doctors", color: "bg-green-600" },
    { id: "labs", label: "Labs", color: "bg-purple-600" },
    { id: "medical", label: "Medical Stores", color: "bg-orange-600" },
  ]

  return (
    <div className="w-full bg-gray-100 border-b border-gray-200">
      {/* Map Filter Controls */}
      <div className="bg-white px-4 py-3 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                variant={activeFilter === filter.id ? "default" : "outline"}
                size="sm"
                className={`${
                  activeFilter === filter.id ? `${filter.color} hover:opacity-90` : "border-gray-300 hover:bg-gray-50"
                } transition-colors`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Map with Healthcare Markers */}
      <div className="h-80 relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.2213694147757!2d77.0266!3d28.4595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d582e38859%3A0x2cf5fe8e5c64b1e!2sGreenwood%20City%2C%20Sector%2045%2C%20Gurugram%2C%20Haryana%20122002!5e0!3m2!1sen!2sin!4v1692000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Healthcare Location Map"
        ></iframe>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
          <h4 className="text-sm font-semibold mb-2">Healthcare Facilities</h4>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span>Hospitals</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              <span>Doctors</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              <span>Labs</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
              <span>Medical Stores</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
