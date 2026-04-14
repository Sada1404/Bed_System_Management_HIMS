import { ChevronLeft, ChevronRight } from "lucide-react"

export default function HeroBanner() {
  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-teal-600 rounded-lg p-8 flex items-center justify-between relative overflow-hidden">
          <button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex-1 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Get Health Insurance</h2>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">With Full Coverage</h3>
            <p className="text-lg mb-6">Find Plans With Complete Health Security</p>
            <button className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold">
              Explore Now
            </button>
          </div>

          <div className="hidden md:block">
            <img src="/healthcare-insurance-shield.png" alt="Healthcare Insurance" className="w-48 h-48" />
          </div>

          <button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}
