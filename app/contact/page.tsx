import Navbar from "../components/navbar"
import Footer from "../components/footer"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f8f4ea]">
      <Navbar />

      <div className="container mx-auto py-12 md:py-16 px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[#3b4c3a] mb-6 md:mb-8">Contact Us</h1>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg p-6 md:p-8 shadow-md">
            <h2 className="text-xl md:text-2xl font-semibold text-[#3b4c3a] mb-4">Get in Touch</h2>
            <p className="text-base text-[#3b4c3a]/80 mb-6">
              Have questions or feedback? We'd love to hear from you. Fill out the form below and our team will get back
              to you as soon as possible.
            </p>

            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#3b4c3a] mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b4c3a]/50"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#3b4c3a] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b4c3a]/50"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-[#3b4c3a] mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b4c3a]/50"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#3b4c3a] mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b4c3a]/50"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>

              <Button className="w-full bg-[#3b4c3a] hover:bg-[#2a382a] text-white">Send Message</Button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

