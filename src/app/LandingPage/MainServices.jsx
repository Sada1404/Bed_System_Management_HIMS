export default function MainServices() {
  const services = [
    {
      title: "Instant Video Consultation",
      subtitle: "Connect Within 60 sec",
      image: "/doctor-video-consultation.png",
      bgColor: "bg-white",
    },
    {
      title: "Find Doctors Near You",
      subtitle: "Confirmed Appointment",
      image: "/female-doctor-stethoscope-mask.png",
      bgColor: "bg-white",
    },
    {
      title: "Surgeries",
      subtitle: "Safe & Trusted Surgery Centers",
      image: "/male-surgeon-tablet.png",
      bgColor: "bg-white",
    },
  ]

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`${service.bgColor} rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow`}
            >
              <div className="aspect-video">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-1">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
