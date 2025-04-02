import Navbar from "../components/navbar"
import Footer from "../components/footer"

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f8f4ea]">
      <Navbar />

      <div className="container mx-auto py-12 md:py-16 px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[#3b4c3a] mb-6 md:mb-8">Privacy Policy</h1>

        <div className="bg-white rounded-lg p-6 md:p-8 shadow-md mb-8">
          <p className="text-base text-[#3b4c3a]/80 mb-6">Last Updated: March 30, 2025</p>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-[#3b4c3a] mb-3">1. Introduction</h2>
              <p className="text-base text-[#3b4c3a]/80">
                Under Care ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains
                how we collect, use, disclose, and safeguard your information when you use our website and services.
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy,
                please do not access the site.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-[#3b4c3a] mb-3">2. Information We Collect</h2>
              <p className="text-base text-[#3b4c3a]/80 mb-3">
                We may collect information about you in various ways, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#3b4c3a]/80">
                <li>
                  <strong>Personal Data:</strong> Personally identifiable information, such as your name, email address,
                  and telephone number, that you voluntarily provide when using our services.
                </li>
                <li>
                  <strong>Health Information:</strong> Information about your health conditions, symptoms, and medical
                  history that you provide through our questionnaires and image uploads.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information on how you access and use our website, including your browser
                  type, IP address, and the pages you visit.
                </li>
                <li>
                  <strong>Images and Media:</strong> Photos or images you upload for analysis through our services.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-[#3b4c3a] mb-3">3. How We Use Your Information</h2>
              <p className="text-base text-[#3b4c3a]/80 mb-3">
                We may use the information we collect about you for various purposes, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#3b4c3a]/80">
                <li>Providing and maintaining our services</li>
                <li>Personalizing your experience on our website</li>
                <li>Analyzing and improving our services</li>
                <li>Communicating with you about our services</li>
                <li>Providing health assessments and recommendations</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-[#3b4c3a] mb-3">4. Data Security</h2>
              <p className="text-base text-[#3b4c3a]/80">
                We implement appropriate technical and organizational measures to protect the security of your personal
                information. However, please be aware that no method of transmission over the internet or electronic
                storage is 100% secure, and we cannot guarantee the absolute security of your data.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-[#3b4c3a] mb-3">5. Third-Party Services</h2>
              <p className="text-base text-[#3b4c3a]/80">
                We may use third-party services to support our website and services. These third parties may have access
                to your information only to perform specific tasks on our behalf and are obligated not to disclose or
                use your information for any other purpose.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-[#3b4c3a] mb-3">6. Your Rights</h2>
              <p className="text-base text-[#3b4c3a]/80 mb-3">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#3b4c3a]/80">
                <li>The right to access the personal information we hold about you</li>
                <li>The right to request correction of your personal information</li>
                <li>The right to request deletion of your personal information</li>
                <li>The right to restrict processing of your personal information</li>
                <li>The right to data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-[#3b4c3a] mb-3">
                7. Changes to This Privacy Policy
              </h2>
              <p className="text-base text-[#3b4c3a]/80">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-[#3b4c3a] mb-3">8. Contact Us</h2>
              <p className="text-base text-[#3b4c3a]/80">
                If you have any questions about this Privacy Policy, please contact us at privacy@undercare.com.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

