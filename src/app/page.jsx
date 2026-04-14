import Header from "../app/LandingPage/Header"
import ServiceCategories from "../app/LandingPage/ServiceCategories"
import HelpSection from "../app/LandingPage/HelpSection"
import HeroBanner from "../app/LandingPage/HeroBanner"
import MainServices from "../app/LandingPage/MainServices"
import HospitalSection from "../app/LandingPage/HospitalSection"
import Footer from "../app/LandingPage/Footer"
import GoogleMap from "../app/LandingPage/GoogleMap"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <GoogleMap />
      <ServiceCategories />
      <HelpSection />
      <HeroBanner />
      <MainServices />
      <HospitalSection />
      <Footer />
    </div>
  )
}
