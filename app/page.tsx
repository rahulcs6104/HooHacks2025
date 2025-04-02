import ServiceCard from "./components/service-card"
import EmergencyMap from "./components/emergency-map"
import AnimatedSection from "./components/animated-section"
import Navbar from "./components/navbar"
import Footer from "./components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f4ea] overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto py-16 md:py-24 px-4 md:px-6 flex flex-col md:flex-row items-center gap-8 relative">
        {/* Left Content */}
        <div className="flex-1 space-y-6 md:space-y-8 relative z-10">
          {/* Main Heading */}
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight tracking-tight">
              INSTANT HEALTH CHECK
            </h1>
            <div className="bg-white inline-block rounded-full px-4 md:px-6 py-1 md:py-2 my-2 shadow-md">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3b4c3a] tracking-tight">SMART AI</h1>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black tracking-tight">FOR FASTER CARE</h1>
          </div>

          <div className="border-t border-gray-300 w-3/4 pt-4 md:pt-6 relative">
            <div className="absolute -top-1 left-0 w-8 md:w-10 h-2 bg-[#3b4c3a] rounded-full"></div>
          </div>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-600 max-w-lg">
            AI-powered health assistant that analyzes injuries and assesses mild health conditions. Get instant
            first-aid advice and over-the-counter treatment recommendations.
          </p>
        </div>

        {/* Right Image - Artistic shape */}
        <div className="flex-1 relative mt-8 md:mt-0">
          <div className="artistic-image-container">
            <img
              src="/images/hero-image.png"
              alt="Human and robot hands reaching towards each other"
              className="artistic-image"
            />
          </div>
        </div>
      </section>

      {/* Services Section - Card Style */}
      <section className="container mx-auto py-12 md:py-16 px-4 md:px-6 mb-12 md:mb-16">
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-medium text-[#3b4c3a] relative">
            Services
            <span className="absolute -bottom-2 left-0 w-12 md:w-16 h-1 bg-[#3b4c3a]"></span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Online Sessions Card */}
          <AnimatedSection delay={0}>
            <ServiceCard
              backgroundColor="#3b4c3a"
              title="General Health Check"
              subtitle="Questionnaire Based"
              description="Instant assessment for common health conditions."
              linkPath="/questionnaire"
              isNew={false}
              highlight={false}
              textColor="white"
            />
          </AnimatedSection>

          {/* Personal Mentor Card */}
          <AnimatedSection delay={200}>
            <ServiceCard
              backgroundColor="#4a614a"
              title="Physical Health Check"
              subtitle="Image Based"
              description="Instant injury detection and real-time diagnosis"
              linkPath="/physical-health"
              isNew={false}
              highlight={true}
              highlightWord="real-time diagnosis"
              highlightColor="#d7e84c"
              textColor="white"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Emergency Section - Static (No Animation) */}
      <section className="bg-[#3b4c3a]/10 py-12 md:py-16 px-4 md:px-6 mb-12 md:mb-16 rounded-3xl mx-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-4 md:space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[#3b4c3a]">In Case of Emergency</h2>
              <p className="text-base md:text-lg text-[#3b4c3a]">
                If you're experiencing a medical emergency, please visit the nearest doctor or hospital immediately.
                Don't wait for online consultations in urgent situations.
              </p>
              <div className="bg-[#3b4c3a]/20 p-4 md:p-6 rounded-xl border-l-4 border-[#3b4c3a]">
                <h3 className="text-lg md:text-xl font-semibold text-[#3b4c3a] mb-2">Emergency Signs:</h3>
                <ul className="list-disc pl-5 space-y-1 text-[#3b4c3a]">
                  <li>Difficulty breathing</li>
                  <li>Chest pain or pressure</li>
                  <li>Severe bleeding</li>
                  <li>Sudden dizziness or weakness</li>
                  <li>Severe allergic reactions</li>
                </ul>
              </div>
            </div>

            <div className="flex-1 w-full mt-6 md:mt-0">
              <EmergencyMap />
            </div>
          </div>
        </div>
      </section>

      {/* Block 4: Disclaimer - With Animation */}
      <section className="py-8 md:py-12 px-4 md:px-6 bg-[#3b4c3a]/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNGRkZGRkYiIGZpbGwtb3BhY2l0eT0iLjAyIiBkPSJNMzAgMGMxNi41NjkgMCAzMCAxMy40MzEgMzAgMzAgMCAxNi41NjktMTMuNDMxIDMwLTMwIDMwQzEzLjQzMSA2MCAwIDQ2LjU2OSAwIDMwIDAgMTMuNDMxIDEzLjQzMSAwIDMwIDB6Ii8+PC9nPjwvc3ZnPg==')]"></div>

        <div className="container mx-auto relative z-10">
          <AnimatedSection>
            <div className="bg-[#f8f4ea] border border-[#3b4c3a]/20 rounded-[20px] md:rounded-[30px] p-6 md:p-8 shadow-xl relative overflow-hidden">
              <h3 className="text-lg md:text-xl font-semibold text-[#3b4c3a] mb-4 relative inline-block">
                AI Disclaimer
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#3b4c3a]/30"></span>
              </h3>
              <p className="text-sm md:text-base text-[#3b4c3a]/80 relative z-10">
                This platform uses artificial intelligence to provide information and analysis. While we strive for
                accuracy, the content generated by AI may not always be completely accurate or up-to-date. Always
                consult with qualified healthcare professionals for medical advice and treatment.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}

