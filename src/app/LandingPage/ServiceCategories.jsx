export default function ServiceCategories() {
  const services = [
    {
      icon: "🏥",
      title: "Hospitals",
      bgColor: "bg-red-50",
      iconBg: "bg-red-100",
    },
    {
      icon: "👨‍⚕️",
      title: "Doctors",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
    },
    {
      icon: "🔬",
      title: "Lab Test",
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-100",
    },
    {
      icon: "💊",
      title: "Dispensary",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
    },
    {
      icon: "🏛️",
      title: "Govt. Scheme",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100",
    },
    {
      icon: "❓",
      title: "FAQ",
      bgColor: "bg-yellow-50",
      iconBg: "bg-yellow-100",
    },
  ]

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div
                className={`w-24 h-24 ${service.iconBg} rounded-lg flex items-center justify-center mb-3 border-2 border-dashed border-gray-300`}
              >
                <span className="text-7xl">{service.icon}</span>
              </div>
              <span className="text-md font-medium text-gray-700">{service.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
