export default function Footer() {
  return (
    <footer className="bg-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* App Download Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Get The App Now</h2>
          <div className="flex justify-center gap-4 mb-8">
            <img src="/google-play.png" alt="Get it on Google Play" className="h-14" />
            <img src="images/app-store.png" alt="Download on the App Store" className="h-14" />
          </div>
        </div>

        {/* Main Footer */}
        <div className="bg-teal-600 rounded-lg p-8 text-white">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-block bg-white text-teal-600 px-6 py-2 rounded-lg font-bold text-xl">LOGO</div>
          </div>

          {/* Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Policies */}
            <div>
              <h3 className="font-bold text-lg mb-4">POLICIES :</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Address */}
            <div>
              <h3 className="font-bold text-lg mb-4">ADDRESS :</h3>
              <div className="space-y-1">
                <p>Registered Addr: Greenwood City,</p>
                <p>Sector 45</p>
                <p>Gurgaon</p>
                <p>Haryana 122002</p>
                <p>IN</p>
              </div>
            </div>

            {/* Information */}
            <div>
              <h3 className="font-bold text-lg mb-4">INFORMATION:</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Blogs
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex justify-center gap-4 mt-8">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">f</span>
            </div>
            <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">📷</span>
            </div>
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">▶</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
