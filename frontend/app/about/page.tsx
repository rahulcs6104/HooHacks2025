import Navbar from "../components/navbar"
import Footer from "../components/footer"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8f4ea]">
      <Navbar />

      <div className="container mx-auto py-12 md:py-16 px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[#3b4c3a] mb-6 md:mb-8">About Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-xl md:text-2xl font-semibold text-[#3b4c3a] mb-3 md:mb-4">Our Mission</h2>
            <p className="text-base md:text-lg text-[#3b4c3a]/80">
              At Under Care, our mission is to bridge the gap between medical professionals and individuals who lack
              immediate access to healthcare. By leveraging AI, we provide fast, reliable symptom analysis and injury
              assessments, empowering people in remote areas or those with non-urgent conditions to make informed
              decisions about their health.
            </p>

            <p className="text-base md:text-lg text-[#3b4c3a]/80">
              We believe in the transformative power of technology to improve healthcare delivery. However, we never
              forget the importance of the human connection in healing and growth. Our system is designed to complement
              professional medical advice by providing personalized, real-time recommendations, allowing you to take the
              necessary steps for recovery while staying informed.
            </p>

            <p className="text-base md:text-lg text-[#3b4c3a]/80">
              Our AI-powered platform combines cutting-edge technology with evidence-based practices to provide support
              that adapts to your unique needs, making mental wellness accessible to everyone, everywhere.
            </p>
          </div>

          <div className="flex items-center md:items-start md:pt-32">
            <div className="w-full rounded-xl overflow-hidden">
              <img
                src="/images/robotic-hand.png"
                alt="Robotic hand and human hand demonstrating the integration of technology and humanity"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mb-12 md:mb-16">
          <h2 className="text-xl md:text-2xl font-semibold text-[#3b4c3a] mb-4 md:mb-6">Our Approach</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#3b4c3a]/10 rounded-full flex items-center justify-center mb-3 md:mb-4">
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
                  className="text-[#3b4c3a] md:w-6 md:h-6"
                >
                  <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-medium text-[#3b4c3a] mb-2">Technology & Humanity</h3>
              <p className="text-sm md:text-base text-[#3b4c3a]/80">
                We integrate advanced AI models like Perplexity for symptom analysis, MobileNetV2 for injury detection,
                and Google Maps for seamless navigation—ensuring a perfect blend of technology and human-centered care.
              </p>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#3b4c3a]/10 rounded-full flex items-center justify-center mb-3 md:mb-4">
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
                  className="text-[#3b4c3a] md:w-6 md:h-6"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-medium text-[#3b4c3a] mb-2">Evidence-Based</h3>
              <p className="text-sm md:text-base text-[#3b4c3a]/80">
                Our recommendations are backed by medical research and AI-driven insights, providing accurate guidance
                tailored to individual health needs. However, we do not guarentee a 100% accuracy.
              </p>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-xl shadow-md sm:col-span-2 md:col-span-1">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#3b4c3a]/10 rounded-full flex items-center justify-center mb-3 md:mb-4">
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
                  className="text-[#3b4c3a] md:w-6 md:h-6"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-medium text-[#3b4c3a] mb-2">Privacy & Security</h3>
              <p className="text-sm md:text-base text-[#3b4c3a]/80">
                We prioritize data security with strict encryption and privacy measures, ensuring that your personal
                health information remains safe and confidential.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-[#3b4c3a] mb-4 md:mb-6">Our Team</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {[
              {
                name: "Rahul",
                role: "Core Architect",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rahul_new-VLKUcsQx99S28OjWV4WZgI0rLrkImK.png",
              },
              { name: "Swetha", role: "Project Innovator", image: "/images/swetha.png" },
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md">
                <div className="h-64 md:h-80 relative">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="font-medium text-[#3b4c3a] text-sm md:text-base">{member.name}</h3>
                  <p className="text-xs md:text-sm text-[#3b4c3a]/70">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

