"use client"

import { Button } from "@/components/ui/button"

export default function EmergencyMap() {
  const handleMapClick = () => {
    // Open Google Maps in a new tab showing open hospitals near the user
    window.open("https://www.google.com/maps/search/hospitals+open+now", "_blank")
  }

  return (
    <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden border-4 border-[#3b4c3a]/20 shadow-lg">
      {/* Map placeholder */}
      <div
        className="absolute inset-0 bg-[#e8e8e8] cursor-pointer"
        onClick={handleMapClick}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%233b4c3a' fillOpacity='0.1' fillRule='evenodd'/%3E%3C/svg%3E")`,
        }}
      >
        {/* Map UI elements */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-[#3b4c3a] rounded-full flex items-center justify-center animate-pulse">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-[#f5a742] rounded-full"></div>
          </div>
        </div>

        {/* Map roads */}
        <div className="absolute top-1/2 left-0 w-full h-2 md:h-3 bg-[#3b4c3a]/20"></div>
        <div className="absolute top-0 left-1/3 w-2 md:w-3 h-full bg-[#3b4c3a]/20"></div>
        <div className="absolute top-0 left-2/3 w-2 md:w-3 h-full bg-[#3b4c3a]/20"></div>

        {/* Hospital markers with "Open" indicators */}
        <div className="absolute top-1/4 left-1/4 flex flex-col items-center">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-[#3b4c3a] rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="md:w-4 md:h-4"
            >
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
            </svg>
          </div>
          <div className="mt-1 px-1 bg-green-100 rounded-sm text-[8px] md:text-[10px] text-green-800 font-medium">
            OPEN
          </div>
        </div>

        <div className="absolute top-3/4 right-1/4 flex flex-col items-center">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-[#3b4c3a] rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="md:w-4 md:h-4"
            >
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
            </svg>
          </div>
          <div className="mt-1 px-1 bg-green-100 rounded-sm text-[8px] md:text-[10px] text-green-800 font-medium">
            OPEN
          </div>
        </div>

        {/* Map overlay with text */}
        <div className="absolute top-4 left-4 right-4 bg-white/80 p-2 md:p-3 rounded-lg shadow-md">
          <h3 className="text-sm md:text-base text-[#3b4c3a] font-semibold">Find Open Medical Facilities</h3>
          <p className="text-xs md:text-sm text-[#3b4c3a]/70">Click on the map to search for open hospitals</p>
        </div>

        {/* Controls */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-center">
          <Button
            onClick={handleMapClick}
            className="bg-[#3b4c3a] hover:bg-[#2a382a] text-white text-xs md:text-sm py-1 px-2 md:py-2 md:px-4"
          >
            View Open Hospitals
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1 md:ml-2 md:w-4 md:h-4"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </Button>
        </div>
      </div>
    </div>
  )
}

