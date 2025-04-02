"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Navbar from "../components/navbar"
import BackgroundMarquee from "../components/background-marquee"
import Footer from "../components/footer"
import VoiceChatModal from "../components/voice-chat-modal"

export default function QuestionnairePage() {
  const [isVoiceChatOpen, setIsVoiceChatOpen] = useState(false)

  // List of health conditions for the marquee
  const healthConditions = [
    "Mild Anxiety",
    "Sleep Issues",
    "Stress Management",
    "Mood Changes",
    "Concentration Problems",
    "Mild Depression",
    "Work-Life Balance",
    "Relationship Concerns",
    "Burnout",
    "Social Anxiety",
  ]

  return (
    <main className="min-h-screen bg-[#f8f4ea]">
      <Navbar />

      <div className="container mx-auto py-12 md:py-16 px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[#3b4c3a] mb-4 md:mb-6">General Health Check</h1>

        {/* Brief explanation */}
        <div className="mb-8 md:mb-10 max-w-3xl">
          <p className="text-base md:text-lg text-[#3b4c3a]/80">
            Our General Health Check will have an interactive questionnaire where our chatbot asks questions both via
            audio and text. You can respond with either audio or text, with the flexibility to edit your answers at any
            time. Based on your responses, along with factors like age, medical history, and allergies, the system
            provides personalized recommendations, including medication suggestions and lifestyle adjustments for better
            health.
          </p>
        </div>

        {/* Background container with marquee and voice chat box */}
        <div className="mb-12 md:mb-16">
          <div className="relative w-full overflow-hidden" style={{ minHeight: "500px" }}>
            {/* Background with running marquee text - reduced number of rows */}
            <div className="absolute inset-0 opacity-20">
              <BackgroundMarquee items={healthConditions} textColor="#3b4c3a" reducedRows={true} />
            </div>

            {/* Content container */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Voice chat box - centered */}
              <div className="w-full max-w-[280px] md:max-w-md mx-auto mt-16">
                <div className="rounded-[16px] p-6 md:p-8 shadow-lg bg-[#3b4c3a]">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">Voice Chat</h3>
                    <p className="mt-1 opacity-80 text-white text-sm md:text-base">AI-Powered Assistance</p>

                    <p className="text-xl md:text-2xl font-medium mt-4 md:mt-6 text-white">
                      You can use audio to chat with us
                    </p>

                    <div className="mt-4 md:mt-6">
                      <Button
                        className="w-full rounded-full border-white/30 bg-white/20 py-4 md:py-6 text-white hover:bg-white/30 text-sm md:text-base"
                        onClick={() => setIsVoiceChatOpen(true)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 md:w-6 md:h-6"
                        >
                          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                          <line x1="12" x2="12" y1="19" y2="22"></line>
                        </svg>
                        Start Voice Chat
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Voice Chat Modal */}
      <VoiceChatModal isOpen={isVoiceChatOpen} onClose={() => setIsVoiceChatOpen(false)} />

      <Footer />
    </main>
  )
}

