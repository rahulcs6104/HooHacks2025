import Navbar from "../components/navbar"
import Footer from "../components/footer"

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f8f4ea]">
      <Navbar />

      <div className="container mx-auto py-12 md:py-16 px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[#3b4c3a] mb-6 md:mb-8">Terms of Service</h1>

        <div className="bg-white rounded-lg p-6 md:p-8 shadow-md mb-8">
          <p className="text-base text-[#3b4c3a]/80 mb-6">Last Updated: March 30, 2025</p>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-[#3b4c3a] mb-3">1. Agreement to Terms</h2>
              <p className="text-base text-[#3b4c3a]/80">
                By accessing or using the Under Care website and services, you agree to be bound by these Terms of
                Service. If you disagree with any part of the terms, you may not access the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-[#3b4c3a] mb-3">2. Description of Service</h2>
              <p className="text-base text-[#3b4c3a]/80">
                Under Care provides an AI-powered health assessment platform that offers general health information,
                symptom analysis, and preliminary assessments based on user-provided information. Our services are
                intended for informational purposes only and are not a substitute for professional medical advice,
                diagnosis, or treatment.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-[#3b4c3a] mb-3">3. Medical Disclaimer</h2>
              <p className="text-base text-[#3b4c3a]/80">
                The content provided through our services is for informational and educational purposes only. It is not
                intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the
                advice of your physician or other qualified health provider with any questions you may have regarding a
                medical condition. Never disregard professional medical advice or delay in seeking it because of
                something you have read on our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-[#3b4c3a] mb-3">4. User Accounts</h2>
              <p className="text-base text-[#3b4c3a]/80">
                When you create an account with us, you must provide information that is accurate, complete, and current
                at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate
                termination of your account on our service.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-[#3b4c3a] mb-3">5. User Content</h2>
              <p className="text-base text-[#3b4c3a]/80">
                Our service allows you to post, link, store, share, and otherwise make available certain information,
                text, graphics, videos, or other material. You are responsible for the content you submit, and you
                retain all rights to your content.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-[#3b4c3a] mb-3">6. Intellectual Property</h2>
              <p className="text-base text-[#3b4c3a]/80">
                The service and its original content, features, and functionality are and will remain the exclusive
                property of Under Care and its licensors. The service is protected by copyright, trademark, and other
                laws of both the United States and foreign countries.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-[#3b4c3a] mb-3">7. Limitation of Liability</h2>
              <p className="text-base text-[#3b4c3a]/80">
                In no event shall Under Care, nor its directors, employees, partners, agents, suppliers, or affiliates,
                be liable for any indirect, incidental, special, consequential, or punitive damages, including without
                limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access
                to or use of or inability to access or use the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-[#3b4c3a] mb-3">8. Governing Law</h2>
              <p className="text-base text-[#3b4c3a]/80">
                These Terms shall be governed and construed in accordance with the laws of the United States, without
                regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-[#3b4c3a] mb-3">9. Changes to Terms</h2>
              <p className="text-base text-[#3b4c3a]/80">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
                revision is material, we will try to provide at least 30 days' notice prior to any new terms taking
                effect.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-[#3b4c3a] mb-3">10. Contact Us</h2>
              <p className="text-base text-[#3b4c3a]/80">
                If you have any questions about these Terms, please contact us at terms@undercare.com.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

