import { ChevronRight } from "lucide-react"

export default function HelpSection() {
  const helpItems = [
    {
      icon: "🏥",
      title: "Health Insurance",
      subtitle: "Explore Plans",
      bgColor: "bg-green-100",
      iconBg: "bg-green-200",
    },
    {
      icon: "📅",
      title: "Doctor Appointment",
      subtitle: "Book Now",
      bgColor: "bg-purple-100",
      iconBg: "bg-purple-200",
    },
    {
      icon: "🔬",
      title: "Lab Test",
      subtitle: "At Home",
      bgColor: "bg-blue-100",
      iconBg: "bg-blue-200",
    },
  ]

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">We Can Help You Find</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {helpItems.map((item, index) => (
            <div
              key={index}
              className={`${item.bgColor} rounded-lg p-6 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${item.iconBg} rounded-lg flex items-center justify-center`}>
                  <span className="text-xl">{item.icon}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.subtitle}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
