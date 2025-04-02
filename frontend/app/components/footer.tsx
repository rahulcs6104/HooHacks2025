import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-[#3b4c3a] py-6 md:py-8 px-4 md:px-6 relative text-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 flex items-center gap-3">
            <div className="relative w-8 h-8 md:w-10 md:h-10 overflow-hidden bg-white rounded-full p-1">
              <Image
                src="/images/logo.png"
                alt="Under Care Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-white text-sm md:text-base font-medium">© {new Date().getFullYear()} Under Care</p>
          </div>
          <div className="flex space-x-4 md:space-x-8">
            <Link
              href="/privacy"
              className="text-sm md:text-base text-white hover:text-gray-200 transition-colors duration-300"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm md:text-base text-white hover:text-gray-200 transition-colors duration-300"
            >
              Terms
            </Link>
            <Link
              href="/contact"
              className="text-sm md:text-base text-white hover:text-gray-200 transition-colors duration-300"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

