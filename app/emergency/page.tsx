import Navbar from "../components/navbar"
import EmergencyMap from "../components/emergency-map"
import Footer from "../components/footer"

export default function EmergencyPage() {
  return (
    <main className="min-h-screen bg-[#f8f4ea]">
      <Navbar />

      <div className="container mx-auto py-12 md:py-16 px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[#3b4c3a] mb-4 md:mb-8">Emergency Services</h1>

        <div className="bg-red-100 border-l-4 border-red-500 p-3 md:p-4 mb-6 md:mb-8 rounded">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-red-500 mr-2 md:mr-3 flex-shrink-0"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <p className="text-red-700 font-medium text-sm md:text-base">
              If you are experiencing a life-threatening emergency, call emergency services immediately (911 in the US).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-xl md:text-2xl font-semibold text-[#3b4c3a]">Find Nearby Medical Facilities</h2>
            <p className="text-base md:text-lg text-[#3b4c3a]/80">
              Use the interactive map to locate the nearest hospitals, urgent care centers, and other medical facilities
              in your area.
            </p>

            <div className="bg-[#3b4c3a]/20 p-4 md:p-6 rounded-xl border-l-4 border-[#3b4c3a]">
              <h3 className="text-lg md:text-xl font-semibold text-[#3b4c3a] mb-2">Emergency Signs:</h3>
              <ul className="list-disc pl-5 space-y-1 text-[#3b4c3a] text-sm md:text-base">
                <li>Difficulty breathing</li>
                <li>Chest pain or pressure</li>
                <li>Severe bleeding</li>
                <li>Sudden dizziness or weakness</li>
                <li>Severe allergic reactions</li>
                <li>Loss of consciousness</li>
                <li>Severe burns or injuries</li>
                <li>Poisoning or overdose</li>
              </ul>
            </div>
          </div>

          <div>
            <EmergencyMap />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 md:p-8 shadow-md mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-[#3b4c3a] mb-3 md:mb-4">Emergency Contacts</h2>

          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center p-2 md:p-3 border-b">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-red-100 rounded-full flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-red-600 md:w-5 md:h-5"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-[#3b4c3a] text-sm md:text-base">Emergency Services</h3>
                <p className="text-[#3b4c3a]/80 text-xs md:text-sm">911</p>
              </div>
            </div>

            <div className="flex items-center p-2 md:p-3 border-b">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-600 md:w-5 md:h-5"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-[#3b4c3a] text-sm md:text-base">Poison Control</h3>
                <p className="text-[#3b4c3a]/80 text-xs md:text-sm">1-800-222-1222</p>
              </div>
            </div>

            <div className="flex items-center p-2 md:p-3 border-b">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-purple-600 md:w-5 md:h-5"
                >
                  <path d="M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2"></path>
                  <path d="M20 12H7"></path>
                  <path d="m12 7-5 5 5 5"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-[#3b4c3a] text-sm md:text-base">Crisis Text Line</h3>
                <p className="text-[#3b4c3a]/80 text-xs md:text-sm">Text HOME to 741741</p>
              </div>
            </div>

            <div className="flex items-center p-2 md:p-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-yellow-600 md:w-5 md:h-5"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-[#3b4c3a] text-sm md:text-base">
                  National Suicide Prevention Lifeline
                </h3>
                <p className="text-[#3b4c3a]/80 text-xs md:text-sm">1-800-273-8255</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#3b4c3a]/10 p-4 md:p-6 rounded-lg">
          <h3 className="text-lg md:text-xl font-semibold text-[#3b4c3a] mb-2 md:mb-3">Important Note</h3>
          <p className="text-sm md:text-base text-[#3b4c3a]/80">
            This service is not a substitute for professional emergency medical care. If you believe you are
            experiencing a medical emergency, please call emergency services or go to your nearest emergency room
            immediately.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  )
}

