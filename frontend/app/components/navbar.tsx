"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"

export default function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="relative z-20">
      <div className="absolute top-0 left-0 w-full h-24 bg-[#3b4c3a]"></div>

      <div className="container relative mx-auto pt-6 px-4 md:px-6 z-10">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden">
              <Image
                src="/images/logo.png"
                alt="Under Care Logo"
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="font-bold text-xl md:text-2xl text-white">Under Care</div>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="text-white hover:bg-white/10">
              {mobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="4" x2="20" y1="12" y2="12"></line>
                  <line x1="4" x2="20" y1="6" y2="6"></line>
                  <line x1="4" x2="20" y1="18" y2="18"></line>
                </svg>
              )}
            </Button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/questionnaire"
              className={`text-white hover:text-gray-200 relative group transition-all duration-300 ${pathname === "/questionnaire" ? "font-medium" : ""}`}
            >
              General
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${pathname === "/questionnaire" ? "w-full" : "w-0 group-hover:w-full"}`}
              ></span>
            </Link>
            <Link
              href="/physical-health"
              className={`text-white hover:text-gray-200 relative group transition-all duration-300 ${pathname === "/physical-health" ? "font-medium" : ""}`}
            >
              Physical
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${pathname === "/physical-health" ? "w-full" : "w-0 group-hover:w-full"}`}
              ></span>
            </Link>
            <Link
              href="/about"
              className={`text-white hover:text-gray-200 relative group transition-all duration-300 ${pathname === "/about" ? "font-medium" : ""}`}
            >
              About Us
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${pathname === "/about" ? "w-full" : "w-0 group-hover:w-full"}`}
              ></span>
            </Link>
            <Link
              href="/emergency"
              className={`text-white hover:text-gray-200 relative group transition-all duration-300 ${pathname === "/emergency" ? "font-medium" : ""}`}
            >
              Emergency
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${pathname === "/emergency" ? "w-full" : "w-0 group-hover:w-full"}`}
              ></span>
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#3b4c3a] shadow-lg z-20 py-4 px-4 flex flex-col space-y-4 border-t border-white/10">
            <Link
              href="/questionnaire"
              className={`text-white py-2 px-4 rounded-md ${pathname === "/questionnaire" ? "bg-white/10 font-medium" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              General
            </Link>
            <Link
              href="/physical-health"
              className={`text-white py-2 px-4 rounded-md ${pathname === "/physical-health" ? "bg-white/10 font-medium" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Physical
            </Link>
            <Link
              href="/about"
              className={`text-white py-2 px-4 rounded-md ${pathname === "/about" ? "bg-white/10 font-medium" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/emergency"
              className={`text-white py-2 px-4 rounded-md ${pathname === "/emergency" ? "bg-white/10 font-medium" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Emergency
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

