"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Loader2, AlertCircle, X, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react"

interface SelfDiagnosisModalProps {
  onClose: () => void
}

// Define injury types with their specific questions
const injuryTypes = [
  {
    id: "rash",
    name: "Rash",
    image: "/images/injury-rash.png", // Updated to use the new rash image
    questions: [
      {
        id: "rash-coverage",
        question: "How much of your skin is covered by the rash?",
        options: [
          { value: "small", label: "Small area (less than 2 inches)" },
          { value: "medium", label: "Medium area (2-6 inches)" },
          { value: "large", label: "Large area (more than 6 inches)" },
          { value: "widespread", label: "Widespread (multiple body parts)" },
        ],
      },
      {
        id: "rash-color",
        question: "What color is the rash?",
        options: [
          { value: "red", label: "Red" },
          { value: "pink", label: "Pink" },
          { value: "purple", label: "Purple or dark red" },
          { value: "white", label: "White or pale" },
        ],
      },
      {
        id: "rash-symptoms",
        question: "Are you experiencing any of these symptoms?",
        options: [
          { value: "itching", label: "Itching" },
          { value: "pain", label: "Pain" },
          { value: "swelling", label: "Swelling" },
          { value: "fever", label: "Fever" },
        ],
      },
      {
        id: "additional-info",
        question: "Is there anything else we should know about your injury? (burning sensation, extreme pain, etc.)",
        isOpenEnded: true,
      },
    ],
  },
  {
    id: "burn",
    name: "Burn",
    image: "/images/injury-burn.png", // Updated to use the new burn image
    questions: [
      {
        id: "burn-degree",
        question: "What does the burn look like?",
        options: [
          { value: "first", label: "Red, painful, no blisters (First degree)" },
          { value: "second", label: "Red, painful, with blisters (Second degree)" },
          { value: "third", label: "White/charred, possibly numb (Third degree)" },
        ],
      },
      {
        id: "burn-size",
        question: "How large is the burn?",
        options: [
          { value: "small", label: "Small (smaller than palm of hand)" },
          { value: "medium", label: "Medium (size of palm)" },
          { value: "large", label: "Large (larger than palm)" },
        ],
      },
      {
        id: "burn-location",
        question: "Where is the burn located?",
        options: [
          { value: "extremity", label: "Arm or leg" },
          { value: "torso", label: "Chest, back, or abdomen" },
          { value: "face", label: "Face, hands, feet, or genitals" },
          { value: "joint", label: "Over a joint (elbow, knee, etc.)" },
        ],
      },
      {
        id: "additional-info",
        question: "Is there anything else we should know about your injury? (burning sensation, extreme pain, etc.)",
        isOpenEnded: true,
      },
    ],
  },
  {
    id: "bruise",
    name: "Bruise",
    image: "/images/injury-bruise.png", // Already updated with the bruise image
    questions: [
      {
        id: "bruise-color",
        question: "What color is the bruise?",
        options: [
          { value: "red-purple", label: "Red or purple (fresh)" },
          { value: "blue-black", label: "Blue or black (1-2 days old)" },
          { value: "green-yellow", label: "Green or yellow (healing)" },
        ],
      },
      {
        id: "bruise-size",
        question: "How large is the bruise?",
        options: [
          { value: "small", label: "Small (smaller than a quarter)" },
          { value: "medium", label: "Medium (size of a golf ball)" },
          { value: "large", label: "Large (larger than a golf ball)" },
        ],
      },
      {
        id: "bruise-pain",
        question: "How painful is the bruise?",
        options: [
          { value: "mild", label: "Mild (noticeable but not limiting movement)" },
          { value: "moderate", label: "Moderate (uncomfortable, some limitation)" },
          { value: "severe", label: "Severe (very painful, limiting movement)" },
        ],
      },
      {
        id: "additional-info",
        question: "Is there anything else we should know about your injury? (burning sensation, extreme pain, etc.)",
        isOpenEnded: true,
      },
    ],
  },
  {
    id: "cut",
    name: "Cut",
    image: "/images/injury-cut.png", // Updated to use the new cut image
    questions: [
      {
        id: "cut-depth",
        question: "How deep is the cut?",
        options: [
          { value: "superficial", label: "Superficial (just the outer skin layer)" },
          { value: "partial", label: "Partial (through skin, no deeper tissue visible)" },
          { value: "deep", label: "Deep (can see fat, muscle, or bone)" },
        ],
      },
      {
        id: "cut-bleeding",
        question: "How much is it bleeding?",
        options: [
          { value: "minimal", label: "Minimal (stops quickly with pressure)" },
          { value: "moderate", label: "Moderate (takes several minutes to stop)" },
          { value: "severe", label: "Severe (difficult to control)" },
        ],
      },
      {
        id: "cut-location",
        question: "Where is the cut located?",
        options: [
          { value: "extremity", label: "Arm or leg" },
          { value: "torso", label: "Chest, back, or abdomen" },
          { value: "face", label: "Face or scalp" },
          { value: "joint", label: "Over a joint (elbow, knee, etc.)" },
        ],
      },
      {
        id: "additional-info",
        question: "Is there anything else we should know about your injury? (burning sensation, extreme pain, etc.)",
        isOpenEnded: true,
      },
    ],
  },
]

// Define timing options
const timingOptions = [
  { value: "minutes", label: "Within the last hour" },
  { value: "hours", label: "Several hours ago" },
  { value: "day", label: "About a day ago" },
  { value: "days", label: "Several days ago" },
  { value: "week", label: "A week or more ago" },
]

// Assessment logic based on injury type and answers
const assessInjury = (injuryType: string, timing: string, answers: Record<string, string>) => {
  let severity = "low"
  let advice = ""
  let treatment = ""

  // Common timing factor - older injuries may be less urgent but could indicate complications if not healing
  const isRecent = timing === "minutes" || timing === "hours"
  const isOld = timing === "week"

  switch (injuryType) {
    case "rash":
      // Assess rash severity
      if (answers["rash-coverage"] === "widespread" || answers["rash-symptoms"] === "fever") {
        severity = "high"
        advice = "This could be a serious allergic reaction or infection."
        treatment = "Seek immediate medical attention, especially if you have fever or difficulty breathing."
      } else if (answers["rash-color"] === "purple" || answers["rash-coverage"] === "large") {
        severity = "medium"
        advice = "This rash may require medical evaluation."
        treatment = "Schedule an appointment with your healthcare provider within 24-48 hours."
      } else {
        severity = "low"
        advice = "This appears to be a mild rash."
        treatment =
          "Try over-the-counter hydrocortisone cream and antihistamines. Keep the area clean and avoid irritants."
      }
      break

    case "burn":
      // Assess burn severity
      if (answers["burn-degree"] === "third" || answers["burn-location"] === "face") {
        severity = "high"
        advice = "This is a serious burn that requires immediate medical attention."
        treatment = "Seek emergency care immediately. Do not apply creams or ointments."
      } else if (
        answers["burn-degree"] === "second" &&
        (answers["burn-size"] === "medium" || answers["burn-size"] === "large")
      ) {
        severity = "medium"
        advice = "This is a significant burn that should be evaluated by a healthcare provider."
        treatment = "Rinse with cool water for 10-15 minutes. Do not break blisters. Seek medical care within 24 hours."
      } else {
        severity = "low"
        advice = "This appears to be a minor burn."
        treatment =
          "Cool the burn with running water for 10-15 minutes. Apply aloe vera gel or antibiotic ointment and cover with a sterile bandage."
      }
      break

    case "bruise":
      // Assess bruise severity
      if (answers["bruise-pain"] === "severe" && isRecent) {
        severity = "medium"
        advice = "This bruise is unusually painful and may indicate a more serious injury."
        treatment =
          "Apply ice for 15-20 minutes several times a day. Rest and elevate the area. Consider medical evaluation if pain persists or worsens."
      } else if (answers["bruise-size"] === "large" && answers["bruise-color"] === "red-purple" && isRecent) {
        severity = "medium"
        advice = "This is a significant bruise that may benefit from medical evaluation."
        treatment =
          "Apply ice for 15-20 minutes several times a day. Rest and elevate the area. If it continues to expand, seek medical attention."
      } else {
        severity = "low"
        advice = "This appears to be a typical bruise."
        treatment =
          "Apply ice for 15-20 minutes several times a day. Rest and elevate the area. It should heal within 2-4 weeks."
      }
      break

    case "cut":
      // Assess cut severity
      if (answers["cut-depth"] === "deep" || answers["cut-bleeding"] === "severe") {
        severity = "high"
        advice = "This cut requires immediate medical attention."
        treatment = "Apply direct pressure to control bleeding and seek emergency care for proper cleaning and closure."
      } else if (
        (answers["cut-depth"] === "partial" && answers["cut-location"] === "face") ||
        answers["cut-bleeding"] === "moderate"
      ) {
        severity = "medium"
        advice = "This cut may require medical evaluation and possibly stitches."
        treatment =
          "Clean with mild soap and water, apply direct pressure to stop bleeding, and seek medical care within 24 hours."
      } else {
        severity = "low"
        advice = "This appears to be a minor cut."
        treatment =
          "Clean with mild soap and water, apply antibiotic ointment, and cover with a clean bandage. Change the bandage daily."
      }
      break
  }

  // Adjust for timing
  if (severity === "low" && isOld && injuryType !== "bruise") {
    severity = "medium"
    advice += " However, the fact that it hasn't healed after a week is concerning."
    treatment = "Since this has persisted for a week or more, please consult with a healthcare provider."
  }

  return { severity, advice, treatment }
}

export default function SelfDiagnosisModal({ onClose }: SelfDiagnosisModalProps) {
  // State for tracking the current step
  const [currentStep, setCurrentStep] = useState(1)
  const [timing, setTiming] = useState<string>("")
  const [selectedInjuryType, setSelectedInjuryType] = useState<string>("")
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [assessment, setAssessment] = useState<{ severity: string; advice: string; treatment: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isApiLoading, setIsApiLoading] = useState(false)
  const [apiResponse, setApiResponse] = useState<string | null>(null)
  const [apiError, setApiError] = useState<string | null>(null)

  // Refs for scrolling
  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  // Get the current injury type object
  const currentInjuryType = injuryTypes.find((type) => type.id === selectedInjuryType)

  // Handle timing selection
  const handleTimingSelect = (value: string) => {
    setTiming(value)
  }

  // Handle injury type selection
  const handleInjurySelect = (injuryId: string) => {
    setSelectedInjuryType(injuryId)
    // Move to the next step after a short delay
    setTimeout(() => {
      setCurrentStep(3)
      // Scroll to the first question
      if (currentInjuryType && questionRefs.current[currentInjuryType.questions[0].id]) {
        questionRefs.current[currentInjuryType.questions[0].id]?.scrollIntoView({ behavior: "smooth" })
      }
    }, 300)
  }

  // Handle answer selection
  const handleAnswerSelect = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  // Check if all questions for the current injury type have been answered
  const allQuestionsAnswered = () => {
    if (!currentInjuryType) return false
    return currentInjuryType.questions.every((q) => {
      if (q.isOpenEnded) {
        // For open-ended questions, any input (even empty) is considered answered
        return answers[q.id] !== undefined
      }
      return answers[q.id]
    })
  }

  // Handle assessment
  const handleAssessment = async () => {
    if (!selectedInjuryType || !timing) return

    setIsLoading(true)
    setIsApiLoading(true)
    setApiError(null)

    try {
      // Format the data for Perplexity API
      const currentInjury = injuryTypes.find((injury) => injury.id === selectedInjuryType)

      // Find the timing option safely
      const timingOption = timingOptions.find((option) => option.value === timing)
      const timingLabel = timingOption ? timingOption.label : timing

      let prompt = `Please analyze this physical injury assessment and provide medical advice:

Injury Type: ${currentInjury?.name || selectedInjuryType}
When it occurred: ${timingLabel}

Specific details:
`

      // Add all the answers to specific questions
      if (currentInjury && currentInjury.questions) {
        currentInjury.questions.forEach((question) => {
          const answer = answers[question.id]
          if (question.options) {
            const selectedOption = question.options.find((opt) => opt.value === answer)
            prompt += `- ${question.question} ${selectedOption ? selectedOption.label : answer || "Not specified"}
`
          } else {
            prompt += `- ${question.question} ${answer || "Not specified"}
`
          }
        })
      }

      prompt += `
Based on this information, please provide:
1. A severity assessment (low, medium, or high concern)
2. A brief explanation of what this injury appears to be
3. Recommended treatment steps
4. When to seek professional medical care

IMPORTANT: If you assess this as "high concern" or severe, ONLY provide the severity assessment and a brief statement that immediate professional medical attention is needed. DO NOT provide detailed treatment advice for severe cases.

Keep your response concise and structured.`

      // Call the Perplexity API
      const response = await fetch("/api/perplexity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `API request failed with status ${response.status}`)
      }

      const data = await response.json()
      setApiResponse(data.text)

      // Move to the next step
      setCurrentStep(4)
    } catch (error) {
      console.error("Error getting assessment from API:", error)
      setApiError(error instanceof Error ? error.message : "Failed to get assessment. Please try again.")

      // Fallback to local assessment if API fails
      const result = assessInjury(selectedInjuryType, timing, answers)
      setAssessment(result)
      setCurrentStep(4)
    } finally {
      setIsLoading(false)
      setIsApiLoading(false)
    }
  }

  // Get severity color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Reset the form
  const resetForm = () => {
    setCurrentStep(1)
    setTiming("")
    setSelectedInjuryType("")
    setAnswers({})
    setAssessment(null)
    setApiResponse(null)
    setApiError(null)
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-xl">
        {/* Header */}
        <div className="bg-[#4a614a] text-white p-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Physical Injury Assessment</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 max-h-[70vh] overflow-y-auto">
          {/* Step indicator */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep >= step ? "bg-[#4a614a] text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {currentStep > step ? <CheckCircle className="h-5 w-5" /> : <span>{step}</span>}
                  </div>
                  <span className="text-xs mt-1 text-gray-500">
                    {step === 1 ? "Timing" : step === 2 ? "Type" : step === 3 ? "Details" : "Assessment"}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-2 h-1 bg-gray-200 relative">
              <div
                className="absolute top-0 left-0 h-full bg-[#4a614a] transition-all duration-300"
                style={{ width: `${(currentStep - 1) * 33.33}%` }}
              ></div>
            </div>
          </div>

          {/* Step 1: When did the injury occur */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h4 className="text-lg font-medium text-[#4a614a]">When did the injury occur?</h4>
              <RadioGroup value={timing} onValueChange={handleTimingSelect}>
                <div className="space-y-3">
                  {timingOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value}>{option.label}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Step 2: What type of injury */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h4 className="text-lg font-medium text-[#4a614a]">What type of injury do you have?</h4>
              <div className="grid grid-cols-2 gap-4">
                {injuryTypes.map((injury) => (
                  <div
                    key={injury.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                      selectedInjuryType === injury.id ? "border-[#4a614a] bg-[#4a614a]/10" : "border-gray-200"
                    }`}
                    onClick={() => handleInjurySelect(injury.id)}
                  >
                    <div className="flex flex-col items-center">
                      <img
                        src={injury.image || "/placeholder.svg"}
                        alt={injury.name}
                        className="w-24 h-24 object-cover rounded-lg mb-3"
                      />
                      <span className="font-medium text-center">{injury.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Specific questions based on injury type */}
          {currentStep === 3 && currentInjuryType && (
            <div className="space-y-8">
              <h4 className="text-lg font-medium text-[#4a614a]">
                Tell us more about your {currentInjuryType.name.toLowerCase()}
              </h4>

              {currentInjuryType.questions.map((question, index) => (
                <div key={question.id} className="pt-2" ref={(el) => (questionRefs.current[question.id] = el)}>
                  <h5 className="font-medium mb-3">{question.question}</h5>
                  {question.isOpenEnded ? (
                    <div className="mt-2">
                      <input
                        type="text"
                        id={question.id}
                        value={answers[question.id] || ""}
                        onChange={(e) => handleAnswerSelect(question.id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4a614a]/50"
                        placeholder="Type your answer here..."
                      />
                    </div>
                  ) : (
                    <RadioGroup
                      value={answers[question.id] || ""}
                      onValueChange={(value) => handleAnswerSelect(question.id, value)}
                    >
                      <div className="space-y-3">
                        {question.options.map((option) => (
                          <div key={option.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                            <Label htmlFor={`${question.id}-${option.value}`}>{option.label}</Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Step 4: Assessment */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium text-[#4a614a]">Assessment Results</h4>
                {!apiResponse && assessment && (
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(assessment.severity)}`}
                  >
                    {assessment.severity === "low"
                      ? "Low Concern"
                      : assessment.severity === "medium"
                        ? "Moderate Concern"
                        : "High Concern"}
                  </div>
                )}
              </div>

              {/* API Error message */}
              {apiError && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded mb-4">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-red-700">Error getting AI assessment: {apiError}</p>
                      <p className="text-sm text-red-700 mt-1">Showing local assessment instead.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Medical disclaimer */}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0" />
                  <p className="text-sm text-yellow-700">
                    This is an AI-assisted assessment and should not replace professional medical advice. Please consult
                    with a healthcare provider for proper diagnosis and treatment.
                  </p>
                </div>
              </div>

              {/* API Response */}
              {apiResponse ? (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="prose prose-sm max-w-none">
                    {apiResponse.toLowerCase().includes("high concern") ||
                    apiResponse.toLowerCase().includes("severe") ||
                    apiResponse.toLowerCase().includes("immediate medical") ? (
                      <div>
                        <div className="bg-red-50 p-4 border-l-4 border-red-500 mb-4">
                          <h5 className="font-bold text-red-700 mb-2">URGENT MEDICAL ATTENTION NEEDED</h5>
                          <p className="text-red-700">
                            Based on your description, this appears to be a severe condition that requires immediate
                            professional medical care.
                          </p>
                        </div>
                        <p>
                          Please seek professional medical help immediately. Do not attempt to treat this condition on
                          your own.
                        </p>
                      </div>
                    ) : (
                      apiResponse.split("\n").map((line, index) => {
                        // Check if line is a header
                        if (line.startsWith("#")) {
                          return (
                            <h5 key={index} className="font-medium text-[#4a614a] mt-4 mb-2">
                              {line.replace(/^#+\s/, "")}
                            </h5>
                          )
                        }

                        // Check if line is a list item
                        if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
                          return (
                            <div key={index} className="flex items-start my-1">
                              <span className="mr-2">•</span>
                              <span>{line.replace(/^[-*]\s/, "")}</span>
                            </div>
                          )
                        }

                        // Check if line is numbered
                        if (/^\d+\./.test(line)) {
                          return (
                            <div key={index} className="flex items-start my-1">
                              <span className="mr-2">{line.match(/^\d+\./)?.[0]}</span>
                              <span>{line.replace(/^\d+\.\s/, "")}</span>
                            </div>
                          )
                        }

                        // Empty lines become spacing
                        if (!line.trim()) {
                          return <div key={index} className="h-2"></div>
                        }

                        // Regular text
                        return (
                          <p key={index} className="my-2">
                            {line}
                          </p>
                        )
                      })
                    )}
                  </div>
                </div>
              ) : (
                assessment && (
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h5 className="font-medium text-[#4a614a] mb-3">Assessment:</h5>
                    <p className="text-gray-700 mb-4">{assessment.advice}</p>

                    <h5 className="font-medium text-[#4a614a] mb-2">Recommended Action:</h5>
                    <p className="text-gray-700">{assessment.treatment}</p>

                    {assessment.severity === "high" && (
                      <div className="mt-4 bg-red-50 p-3 border-l-4 border-red-400 text-red-700">
                        <strong>Urgent:</strong> This condition appears to require immediate medical attention.
                      </div>
                    )}
                  </div>
                )
              )}

              <Button onClick={resetForm} variant="outline" className="w-full">
                Start New Assessment
              </Button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-4 bg-gray-100 flex justify-between">
          {currentStep > 1 && currentStep < 4 ? (
            <Button variant="outline" onClick={() => setCurrentStep((prev) => prev - 1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          ) : (
            <div></div>
          )}

          {currentStep < 4 && (
            <Button
              className="bg-[#4a614a] hover:bg-[#3a5a3a] text-white"
              onClick={() => {
                if (currentStep === 1 && timing) {
                  setCurrentStep(2)
                } else if (currentStep === 2 && selectedInjuryType) {
                  setCurrentStep(3)
                } else if (currentStep === 3 && allQuestionsAnswered()) {
                  handleAssessment()
                }
              }}
              disabled={
                (currentStep === 1 && !timing) ||
                (currentStep === 2 && !selectedInjuryType) ||
                (currentStep === 3 && !allQuestionsAnswered()) ||
                isLoading ||
                isApiLoading
              }
            >
              {isLoading || isApiLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isApiLoading ? "Getting AI Assessment..." : "Analyzing..."}
                </>
              ) : (
                <>
                  {currentStep === 3 ? "Get Assessment" : "Continue"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}

          {currentStep === 4 && (
            <Button className="bg-[#4a614a] hover:bg-[#3a5a3a] text-white" onClick={onClose}>
              Close
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

