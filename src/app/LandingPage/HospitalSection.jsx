import { Phone, MapPin, Star, X } from "lucide-react"

export default function HospitalSection() {
  const filters = [
    { label: "4 Filter", icon: "⚙️", removable: false },
    { label: "Ratings", removable: true },
    { label: "Speciality", removable: true },
    { label: "Hospital", removable: true },
    { label: "Within 5Km", removable: true },
  ]

  const hospitals = [
    {
      name: "City Hospital , Defence Colony , Pune",
      specialty: "Eye Specialist , 3.5 Km",
      rating: 4.9,
      image: "/placeholder-twj9r.png",
    },
    {
      name: "Max Hospital , Defence Colony , Pune",
      specialty: "Eye Specialist , 4 Km",
      rating: 4.9,
      image: "/large-hospital-complex.png",
    },
  ]

  return (
    <section className="py-8 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Health Needs Under One Roof</h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {filters.map((filter, index) => (
            <div key={index} className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-2">
              {!filter.removable && <span>{filter.icon}</span>}
              <span className="text-sm font-medium">{filter.label}</span>
              {filter.removable && <X className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />}
            </div>
          ))}
        </div>

        {/* Hospital Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {hospitals.map((hospital, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={hospital.image || "/placeholder.svg"}
                  alt={hospital.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-white rounded-full px-3 py-1 flex items-center gap-1">
                  <span className="font-bold text-sm">{hospital.rating}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{hospital.name}</h3>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-600">{hospital.specialty}</p>
                  <div className="flex gap-2">
                    <button variant="outline" size="icon">
                      <Phone className="w-4 h-4" />
                    </button>
                    <button variant="outline" size="icon">
                      <MapPin className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button variant="outline" className="flex-1 bg-transparent">
                    Know More
                  </button>
                  <button className="flex-1 bg-teal-600 hover:bg-teal-700">Book An Appointment</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
