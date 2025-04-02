"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Mic, MicOff, Volume2, VolumeX, Edit2, Send, Loader2 } from "lucide-react"

interface Message {
  id: string
  role: "bot" | "user"
  content: string
  isEditing?: boolean
}

// Add these interfaces after the Message interface
interface ValidationRule {
  question: string
  validate: (answer: string) => boolean
  errorMessage: string
}

interface ValidationStatus {
  questionId: string
  isValid: boolean
  message?: string
}

// Add these interfaces after the ValidationStatus interface
interface QuestionAnswer {
  question: string
  answer: string
}

interface PerplexityResponse {
  text: string
  error?: string
}

interface VoiceChatModalProps {
  isOpen: boolean
  onClose: () => void
}

// Declare SpeechRecognition
declare var SpeechRecognition: any
declare var webkitSpeechRecognition: any

export default function VoiceChatModal({ isOpen, onClose }: VoiceChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [currentInput, setCurrentInput] = useState("")
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null)
  const [editText, setEditText] = useState("")

  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initial questions for the assessment
  // Replace the questions array with this updated version that includes question IDs
  const questions = [
    { id: "age", text: "What is your age?" },
    { id: "gender", text: "What is your Gender?" },
    {
      id: "intoxication",
      text: "Have you been intoxicated in any form? ....This includes medication, alcohol, vape or cigarette. If any thing , please let me know",
    },
    { id: "symptoms", text: "What are the problems or symptoms you are currently facing?" },
    { id: "duration", text: "How long have you been having these symptoms?" },
    {
      id: "frequency",
      text: "How frequently do you have this problem? To give you an example : I have been having a headache every 3 days",
    },
    {
      id: "history",
      text: "Do you have any previous history of serious health conditions ? To give you an example: I was diagnosed with a mild form of asthma during my childhood",
    },
    { id: "family", text: "Does anyone in your immediate family diagnosed with serious health conditions?" },
    {
      id: "allergies",
      text: "Have you had any allergic reactions to any medications in the past?. If you do, please take the time to get the correct name of the medication you are allergic to",
    },
  ]

  // Add these state variables after the other useState declarations
  const [validationResults, setValidationResults] = useState<ValidationStatus[]>([])
  const [showValidationWarning, setShowValidationWarning] = useState(false)
  const [assessmentCompleted, setAssessmentCompleted] = useState(false)

  // Add these state variables after the other useState declarations
  const [questionAnswers, setQuestionAnswers] = useState<QuestionAnswer[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [aiResponse, setAiResponse] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  // Add this validation rules array after the questions array
  const validationRules: ValidationRule[] = [
    {
      question: "age",
      validate: (answer) => /^\d+$/.test(answer.trim()),
      errorMessage: "Age should be a number",
    },
    {
      question: "gender",
      validate: (answer) => {
        const lowerAnswer = answer.toLowerCase().trim()
        return ["male", "female", "other", "others"].includes(lowerAnswer)
      },
      errorMessage: "Gender should be male, female, or others",
    },
    {
      question: "intoxication",
      validate: (answer) => {
        const lowerAnswer = answer.toLowerCase()
        return lowerAnswer.includes("yes") || lowerAnswer.includes("no")
      },
      errorMessage: "Please answer with yes or no",
    },
    {
      question: "history",
      validate: (answer) => {
        const lowerAnswer = answer.toLowerCase()
        return lowerAnswer.includes("yes") || lowerAnswer.includes("no")
      },
      errorMessage: "Please answer with yes or no",
    },
    {
      question: "family",
      validate: (answer) => {
        const lowerAnswer = answer.toLowerCase()
        return lowerAnswer.includes("yes") || lowerAnswer.includes("no")
      },
      errorMessage: "Please answer with yes or no",
    },
    {
      question: "allergies",
      validate: (answer) => {
        const lowerAnswer = answer.toLowerCase()
        return lowerAnswer.includes("yes") || lowerAnswer.includes("no")
      },
      errorMessage: "Please answer with yes or no",
    },
  ]

  useEffect(() => {
    // Initialize speech synthesis
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis
    }

    // Add initial welcome message when modal opens
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        id: Date.now().toString(),
        role: "bot" as const,
        content:
          "Hello! I'm your health assistant. I'll ask you a few questions to better understand your problem. You can respond by voice or type your answers. Let's begin.",
      }
      setMessages([welcomeMessage])

      // Set timeout to allow the modal to render before speaking
      setTimeout(() => {
        speakText(welcomeMessage.content)
      }, 500)
    }
  }, [isOpen])

  useEffect(() => {
    // Scroll to bottom when messages change
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Clean up speech recognition and synthesis when component unmounts
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (synthRef.current) {
        synthRef.current.cancel()
      }
    }
  }, [])

  // Ask the next question after a user response
  useEffect(() => {
    const lastMessage = messages[messages.length - 1]

    if (lastMessage && lastMessage.role === "user" && currentQuestionIndex < questions.length) {
      setTimeout(() => {
        const nextQuestion = questions[currentQuestionIndex].text
        addBotMessage(nextQuestion)
        setCurrentQuestionIndex((prev) => prev + 1)
      }, 1000)
    }
  }, [messages, currentQuestionIndex])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Update the speakText function to handle the new question format
  const speakText = (text: string) => {
    if (synthRef.current) {
      // Cancel any ongoing speech
      synthRef.current.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1
      utterance.pitch = 1
      utterance.volume = 1

      setIsSpeaking(true)

      utterance.onend = () => {
        setIsSpeaking(false)

        // Start listening after speaking if this is a question
        if (questions.some((q) => q.text === text)) {
          startListening()
        }
      }

      synthRef.current.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel()
      setIsSpeaking(false)
    }
  }

  // Add a function to check browser compatibility before attempting to use speech recognition
  const checkBrowserCompatibility = () => {
    // Check if running in a secure context
    const isSecureContext = window.isSecureContext

    // Check if speech recognition is available
    const hasSpeechRecognition = "SpeechRecognition" in window || "webkitSpeechRecognition" in window

    // Check browser type
    const isChrome = navigator.userAgent.indexOf("Chrome") > -1
    const isEdge = navigator.userAgent.indexOf("Edg") > -1
    const isSafari = navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1

    // Return compatibility status
    return {
      isCompatible: hasSpeechRecognition,
      isSecureContext,
      recommendedBrowser: isChrome || isEdge || isSafari,
      browserInfo: isChrome ? "Chrome" : isEdge ? "Edge" : isSafari ? "Safari" : "Other",
    }
  }

  const startListening = () => {
    const compatibility = checkBrowserCompatibility()

    if (!compatibility.isCompatible) {
      alert("Sorry, your browser doesn't support speech recognition. Please use Chrome, Edge, or Safari.")
      return
    }

    if (!compatibility.isSecureContext) {
      setCurrentInput(
        "⚠️ Speech recognition requires a secure context (HTTPS). When deployed to production with HTTPS, this feature will work properly.",
      )
      console.warn("Speech recognition requires a secure context (HTTPS)")
      // Still try to initialize for local development
    }

    if (!compatibility.recommendedBrowser) {
      console.warn(`Current browser may have limited speech recognition support. Chrome, Edge, or Safari recommended.`)
    }

    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

      try {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = "en-US"

        // Add error handling for network issues
        recognitionRef.current.onerror = (event) => {
          console.error("Speech recognition error:", event.error)

          // Handle specific error types
          if (event.error === "network") {
            setCurrentInput(
              "⚠️ Network error: Speech recognition requires internet access. Please check your connection.",
            )
          } else if (event.error === "not-allowed") {
            setCurrentInput("⚠️ Microphone access denied. Please enable microphone permissions.")
          } else if (event.error === "service-not-allowed") {
            setCurrentInput("⚠️ Speech recognition service not allowed. Try using HTTPS or a different browser.")
          } else {
            setCurrentInput(`⚠️ Speech recognition error: ${event.error}. Try typing instead.`)
          }

          setIsListening(false)
        }

        recognitionRef.current.onstart = () => {
          setIsListening(true)
          setCurrentInput("")
        }

        recognitionRef.current.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map((result) => result[0])
            .map((result) => result.transcript)
            .join("")

          setCurrentInput(transcript)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)

          // If we have input and it's not an error message, add it as a user message
          if (currentInput.trim() && !currentInput.startsWith("⚠️")) {
            addUserMessage(currentInput)
            setCurrentInput("")
          }
        }

        // Add a timeout to detect if the recognition doesn't start properly
        const startTimeout = setTimeout(() => {
          if (recognitionRef.current && isListening) {
            // If still trying to listen after timeout, there might be an issue
            recognitionRef.current.stop()
            setIsListening(false)
            setCurrentInput("⚠️ Speech recognition failed to start. Try using a different browser or check permissions.")
          }
        }, 3000)

        // Start recognition and clear timeout if successful
        recognitionRef.current.start()

        // Clear timeout if recognition starts successfully
        recognitionRef.current.onstart = () => {
          clearTimeout(startTimeout)
          setIsListening(true)
          setCurrentInput("")
        }
      } catch (error) {
        console.error("Error initializing speech recognition:", error)
        setCurrentInput("⚠️ Failed to initialize speech recognition. Try using Chrome or Edge browser.")
        setIsListening(false)
      }
    } else {
      alert("Sorry, your browser doesn't support speech recognition. Please use Chrome, Edge, or Safari.")
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const addBotMessage = (content: string) => {
    const newMessage = {
      id: Date.now().toString(),
      role: "bot" as const,
      content,
    }

    setMessages((prev) => [...prev, newMessage])
    speakText(content)
  }

  // Replace the addUserMessage function with this updated version
  const addUserMessage = (content: string) => {
    const newMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content,
    }

    setMessages((prev) => [...prev, newMessage])

    // Validate the answer if it's for a question we're tracking
    if (currentQuestionIndex > 0 && currentQuestionIndex <= questions.length) {
      const currentQuestion = questions[currentQuestionIndex - 1]
      const rule = validationRules.find((r) => r.question === currentQuestion.id)

      // Store the question-answer pair
      setQuestionAnswers((prev) => [
        ...prev,
        {
          question: currentQuestion.text,
          answer: content,
        },
      ])

      if (rule) {
        const isValid = rule.validate(content)
        setValidationResults((prev) => [
          ...prev,
          {
            questionId: currentQuestion.id,
            isValid,
            message: isValid ? undefined : rule.errorMessage,
          },
        ])
      }
    }

    // Check if this was the last question
    if (currentQuestionIndex === questions.length) {
      setTimeout(() => {
        setAssessmentCompleted(true)

        // Check if all validations passed
        const hasInvalidAnswers = validationResults.some((result) => !result.isValid)
        if (hasInvalidAnswers) {
          setShowValidationWarning(true)
          addBotMessage(
            "⚠️ Some of your answers don't meet our validation criteria. Please consider filling out the form manually for more accurate results.",
          )
        } else {
          addBotMessage(
            "Thank you for completing the assessment. Your responses have been recorded. Click the Submit button below to analyze your responses.",
          )
        }
      }, 1500)
    }
  }

  const handleSendMessage = () => {
    if (currentInput.trim()) {
      addUserMessage(currentInput)
      setCurrentInput("")
    }
  }

  const handleEditMessage = (id: string) => {
    const messageToEdit = messages.find((msg) => msg.id === id)
    if (messageToEdit) {
      setEditingMessageId(id)
      setEditText(messageToEdit.content)
    }
  }

  // Find the handleSaveEdit function and replace it with this updated version that re-validates answers

  const handleSaveEdit = () => {
    if (editingMessageId) {
      // Find the message being edited
      const messageToEdit = messages.find((msg) => msg.id === editingMessageId)

      if (messageToEdit && messageToEdit.role === "user") {
        // Update the message in the messages array
        setMessages((prev) => prev.map((msg) => (msg.id === editingMessageId ? { ...msg, content: editText } : msg)))

        // Find which question this message was answering
        const messageIndex = messages.findIndex((msg) => msg.id === editingMessageId)
        if (messageIndex >= 0) {
          // Find the corresponding question (messages alternate between bot and user, so we need to find the bot message before this one)
          let questionIndex = -1
          for (let i = messageIndex - 1; i >= 0; i--) {
            if (messages[i].role === "bot") {
              // Found the question
              questionIndex = questions.findIndex((q) => q.text === messages[i].content)
              break
            }
          }

          if (questionIndex >= 0) {
            const question = questions[questionIndex]

            // Update the question-answer pair
            setQuestionAnswers((prev) =>
              prev.map((qa) => (qa.question === question.text ? { ...qa, answer: editText } : qa)),
            )

            // Re-validate the answer
            const rule = validationRules.find((r) => r.question === question.id)
            if (rule) {
              const isValid = rule.validate(editText)

              // Update validation results
              setValidationResults((prev) =>
                prev.map((result) =>
                  result.questionId === question.id
                    ? { ...result, isValid, message: isValid ? undefined : rule.errorMessage }
                    : result,
                ),
              )

              // Check if all validations now pass
              setTimeout(() => {
                const updatedValidationResults = validationResults.map((result) =>
                  result.questionId === question.id
                    ? { ...result, isValid, message: isValid ? undefined : rule.errorMessage }
                    : result,
                )

                const hasInvalidAnswers = updatedValidationResults.some((result) => !result.isValid)
                setShowValidationWarning(hasInvalidAnswers)
              }, 0)
            }
          }
        }
      }

      setEditingMessageId(null)
      setEditText("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (editingMessageId) {
        handleSaveEdit()
      } else {
        handleSendMessage()
      }
    }
  }

  // Add this function to render validation warnings
  const renderValidationWarnings = () => {
    if (!showValidationWarning) return null

    const invalidAnswers = validationResults.filter((result) => !result.isValid)

    if (invalidAnswers.length === 0) return null

    return (
      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <h4 className="font-medium text-amber-800 mb-2">Please correct the following answers:</h4>
        <ul className="list-disc pl-5 text-sm text-amber-700">
          {invalidAnswers.map((invalid, index) => {
            const question = questions.find((q) => q.id === invalid.questionId)
            return (
              <li key={index}>
                <span className="font-medium">{question?.text}</span>: {invalid.message}
              </li>
            )
          })}
        </ul>
        <p className="mt-2 text-sm text-amber-800">
          For more accurate assessment results, please consider filling the form manually.
        </p>
      </div>
    )
  }

  // Add this function to handle the submission to Perplexity AI
  const handleSubmitToPerplexity = async () => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Format the questions and answers for the API request
      const prompt = formatQuestionsAndAnswers()

      console.log("Sending request to API route...")

      // Call the API route
      const response = await fetch("/api/perplexity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `API request failed with status ${response.status}`)
      }

      if (data.error) {
        throw new Error(data.error)
      }

      // Display the AI response
      setAiResponse(data.text)
      addBotMessage(data.text)
    } catch (error) {
      console.error("Error submitting to Perplexity:", error)
      setSubmitError(error instanceof Error ? error.message : "An unknown error occurred")
      addBotMessage(
        `⚠️ There was an error analyzing your responses: ${error instanceof Error ? error.message : "Unknown error"}`,
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // Add this function to format the questions and answers for the API
  const formatQuestionsAndAnswers = () => {
    let formattedText = "Please analyze the following health assessment responses and provide insights:\n\n"

    questionAnswers.forEach((qa) => {
      formattedText += `Question: ${qa.question}\nAnswer: ${qa.answer}\n\n`
    })

    formattedText +=
      "Based on these responses, please provide a very short 1 sentence analysis with the diagnosis with medications to take(keep in mind what medication allergy the user entered) also give medication dosage based on the , age , gender and the medication should be available over the counter(without doctors prescription) and in the next paragraph give the user a one line lifestyle changes based on their input"

    return formattedText
  }

  // Add this function to render the submit button
  const renderSubmitButton = () => {
    if (!assessmentCompleted) return null

    return (
      <div className="mt-4">
        <Button
          onClick={handleSubmitToPerplexity}
          disabled={isSubmitting || showValidationWarning}
          className="w-full bg-[#3b4c3a] hover:bg-[#2a382a] text-white py-2 flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing Responses...
            </>
          ) : (
            <>Submit Responses for Analysis</>
          )}
        </Button>

        {submitError && <p className="mt-2 text-sm text-red-600">Error: {submitError}</p>}
      </div>
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl h-[80vh] flex flex-col overflow-hidden shadow-xl">
        {/* Header */}
        <div className="bg-[#3b4c3a] text-white p-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Health Assessment</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "bot" ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-[80%] rounded-2xl p-3 ${
                  message.role === "bot" ? "bg-[#3b4c3a]/10 text-[#3b4c3a]" : "bg-[#3b4c3a] text-white"
                }`}
              >
                {editingMessageId === message.id ? (
                  <div className="flex flex-col space-y-2">
                    <Input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="border-[#3b4c3a] bg-white text-[#3b4c3a]"
                      autoFocus
                    />
                    <div className="flex justify-end space-x-2">
                      <Button size="sm" variant="outline" onClick={() => setEditingMessageId(null)} className="text-xs">
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSaveEdit}
                        className="bg-[#3b4c3a] hover:bg-[#2a382a] text-white text-xs"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start">
                    <p className="flex-1">{message.content}</p>
                    {message.role === "user" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-2 h-6 w-6 text-white/70 hover:text-white hover:bg-transparent"
                        onClick={() => handleEditMessage(message.id)}
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          {assessmentCompleted && renderValidationWarnings()}
          {renderSubmitButton()}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="border-t p-4 space-y-2">
          <div className="flex items-center space-x-2 mb-2">
            <Button
              variant="outline"
              size="sm"
              className={`${isListening ? "bg-red-100 text-red-600" : ""}`}
              onClick={isListening ? stopListening : startListening}
            >
              {isListening ? <MicOff className="h-4 w-4 mr-1" /> : <Mic className="h-4 w-4 mr-1" />}
              {isListening ? "Stop" : "Start"} Listening
            </Button>

            <Button
              variant="outline"
              size="sm"
              className={`${isSpeaking ? "bg-blue-100 text-blue-600" : ""}`}
              onClick={
                isSpeaking
                  ? stopSpeaking
                  : () => {
                      const lastBotMessage = [...messages].reverse().find((m) => m.role === "bot")
                      if (lastBotMessage) speakText(lastBotMessage.content)
                    }
              }
            >
              {isSpeaking ? <VolumeX className="h-4 w-4 mr-1" /> : <Volume2 className="h-4 w-4 mr-1" />}
              {isSpeaking ? "Stop" : "Repeat"} Question
            </Button>
          </div>

          <div className="flex space-x-2">
            <Input
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder={isListening ? "Listening..." : "Type your response..."}
              className="flex-1"
              onKeyPress={handleKeyPress}
              disabled={isListening}
            />
            <Button
              onClick={handleSendMessage}
              className="bg-[#3b4c3a] hover:bg-[#2a382a] text-white"
              disabled={!currentInput.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-xs text-gray-500 mt-1">
            Note: Speech recognition works best in Chrome/Edge on HTTPS. If you encounter issues, try typing your
            responses.
          </div>

          {isListening && (
            <p className="text-sm text-gray-500 animate-pulse">
              Listening...{" "}
              {currentInput &&
                (currentInput.startsWith("⚠️") ? (
                  <span className="text-amber-600 font-medium">{currentInput}</span>
                ) : (
                  `"${currentInput}"`
                ))}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

