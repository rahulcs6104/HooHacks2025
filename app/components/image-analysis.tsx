"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, AlertCircle, CheckCircle2, ArrowRight, RefreshCw, Upload, Camera } from "lucide-react"

interface ImageAnalysisProps {
  imageData: string
  onClose: () => void
  onReset: () => void
}

export default function ImageAnalysis({ imageData, onClose, onReset }: ImageAnalysisProps) {
  const [analysisStage, setAnalysisStage] = useState<"loading" | "prediction" | "details">("loading")
  const [prediction, setPrediction] = useState<string | null>(null)
  const [confidence, setConfidence] = useState<number>(0)
  const [detailedInfo, setDetailedInfo] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState<boolean>(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Get prediction from backend
  useEffect(() => {
    const getPrediction = async () => {
      try {
        setError(null)

        const response = await fetch("/api/image-prediction", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageData: uploadedImage || imageData }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to get prediction from backend")
        }

        const data = await response.json()
        setPrediction(data.prediction)
        setConfidence(data.confidence || 75)
        setAnalysisStage("prediction")

        // Automatically get detailed information
        getDetailedInfo(data.prediction)
      } catch (err) {
        console.error("Error getting prediction:", err)
        setError(err instanceof Error ? err.message : "Failed to analyze image. Please try again.")
        // Don't proceed to next stages when there's an error
      }
    }

    if (uploadedImage || imageData) {
      getPrediction()
    }
  }, [imageData, uploadedImage])

  // Get detailed information about the condition
  const getDetailedInfo = async (condition: string) => {
    try {
      const response = await fetch("/api/condition-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ condition }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to get detailed information")
      }

      const data = await response.json()
      setDetailedInfo(data.text)
      setAnalysisStage("details")
    } catch (err) {
      console.error("Error getting detailed information:", err)
      setError(err instanceof Error ? err.message : "Failed to get condition details. Please try again.")
      // Keep the prediction stage visible but show error for details
    }
  }

  const getSeverityLevel = (confidence: number) => {
    if (confidence < 50) return "low"
    if (confidence < 80) return "medium"
    return "high"
  }

  const getSeverityColor = (severity: "low" | "medium" | "high") => {
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

  // Format the detailed information with markdown-like styling
  const formatDetailedInfo = (text: string) => {
    if (!text) return null

    // Split by lines and process
    const lines = text.split("\n")
    const formattedLines = lines.map((line, index) => {
      // Headers
      if (line.startsWith("# ")) {
        return (
          <h3 key={index} className="text-xl font-bold text-[#3b4c3a] mt-4 mb-2">
            {line.replace("# ", "")}
          </h3>
        )
      }
      if (line.startsWith("## ")) {
        return (
          <h4 key={index} className="text-lg font-semibold text-[#3b4c3a] mt-3 mb-1">
            {line.replace("## ", "")}
          </h4>
        )
      }

      // List items
      if (line.startsWith("- ")) {
        return (
          <div key={index} className="flex items-start ml-2 my-1">
            <CheckCircle2 className="h-4 w-4 text-[#3b4c3a] mr-2 flex-shrink-0 mt-0.5" />
            <span>{line.replace("- ", "")}</span>
          </div>
        )
      }

      // Empty lines
      if (line.trim() === "") {
        return <div key={index} className="h-2" />
      }

      // Regular text
      return (
        <p key={index} className="my-1">
          {line}
        </p>
      )
    })

    return <div className="space-y-1">{formattedLines}</div>
  }

  // Handle drag events
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  // Handle drop event
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  // Handle file input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  // Process the files
  const handleFiles = (files: FileList) => {
    const file = files[0]
    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setUploadedImage(result)
        setAnalysisStage("loading")
      }
      reader.readAsDataURL(file)
    }
  }

  // Trigger file input click
  const onButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-xl">
        {/* Header */}
        <div className="bg-[#3b4c3a] text-white p-4">
          <h3 className="text-lg font-semibold">Image Analysis</h3>
        </div>

        {/* Content */}
        <div className="p-4 max-h-[70vh] overflow-y-auto">
          {/* Image upload options */}
          {uploadedImage || imageData ? (
            <div className="rounded-lg overflow-hidden border-2 border-gray-200 mb-4">
              <img src={uploadedImage || imageData} alt="Uploaded image" className="w-full h-auto" />
            </div>
          ) : (
            <div className="w-full flex flex-col items-center">
              <p className="text-gray-500 text-center mb-4">Choose how to add your image:</p>

              <div className="flex w-full gap-3">
                {/* Take Photo Button */}
                <Button onClick={onReset} className="flex-1 bg-[#3b4c3a] hover:bg-[#2a382a] text-white">
                  <Camera className="mr-2 h-5 w-5" />
                  Take a Photo
                </Button>

                {/* Drag & Drop Button */}
                <Button
                  onClick={() => {
                    // Show drag & drop modal or activate drag area
                    setDragActive(true)
                  }}
                  variant="outline"
                  className="flex-1 border-[#3b4c3a] text-[#3b4c3a]"
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Image
                </Button>
              </div>
            </div>
          )}

          {/* Drag & Drop Modal */}
          {dragActive && !uploadedImage && !imageData && (
            <div
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setDragActive(false)}
            >
              <div
                className="bg-white rounded-lg p-8 max-w-md w-full flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg font-medium text-[#3b4c3a] mb-4">Upload Image</h3>

                <div
                  className={`w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-4 mb-4
          ${dragActive ? "border-[#3b4c3a] bg-[#3b4c3a]/10" : "border-gray-300"}`}
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-gray-500 text-center mb-2">Drag and drop your image here</p>
                  <p className="text-gray-400 text-sm text-center">or</p>
                  <Button variant="outline" onClick={onButtonClick} className="mt-2">
                    Select from device
                  </Button>
                </div>

                <Button variant="outline" onClick={() => setDragActive(false)} className="w-full">
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleChange} />

          {/* Error message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded mb-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-red-700">{error}</p>
                  <Button variant="outline" size="sm" className="mt-2 text-red-600 border-red-200" onClick={onReset}>
                    <RefreshCw className="h-4 w-4 mr-2" /> Try Again
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Analysis section */}
          {!error && analysisStage === "loading" ? (
            <div className="py-8 flex flex-col items-center justify-center">
              <Loader2 className="h-10 w-10 text-[#3b4c3a] animate-spin mb-4" />
              <p className="text-gray-600 text-center">
                Analyzing image...
                <br />
                <span className="text-sm text-gray-500">This may take a few moments</span>
              </p>
            </div>
          ) : !error ? (
            <div className="space-y-4">
              {/* Prediction result */}
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xl font-semibold text-[#3b4c3a]">
                    {prediction ? `Potential ${prediction}` : "Analysis Complete"}
                  </h4>
                  <p className="text-sm text-gray-500">Confidence: {confidence}%</p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(getSeverityLevel(confidence))}`}
                >
                  {getSeverityLevel(confidence) === "low"
                    ? "Low Concern"
                    : getSeverityLevel(confidence) === "medium"
                      ? "Moderate Concern"
                      : "High Concern"}
                </div>
              </div>

              {/* Medical disclaimer */}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0" />
                  <p className="text-sm text-yellow-700">
                    This is an AI-assisted analysis and should not replace professional medical advice. Please consult
                    with a healthcare provider for proper diagnosis.
                  </p>
                </div>
              </div>

              {/* Detailed information */}
              {analysisStage === "details" ? (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h5 className="font-medium text-[#3b4c3a] mb-3">Detailed Information:</h5>
                  <div className="text-sm space-y-2 text-gray-700">
                    {detailedInfo ? (
                      formatDetailedInfo(detailedInfo)
                    ) : (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="h-5 w-5 text-[#3b4c3a] animate-spin mr-2" />
                        <span>Loading detailed information...</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-5 w-5 text-[#3b4c3a] animate-spin mr-2" />
                  <span className="text-sm text-gray-600">Getting detailed information...</span>
                </div>
              )}

              <div className="bg-[#3b4c3a]/10 p-4 rounded-lg mt-4">
                <p className="text-sm text-[#3b4c3a]">
                  <strong>Next Steps:</strong> We recommend scheduling a consultation with a healthcare provider to
                  discuss these findings. Would you like to book an appointment?
                </p>
              </div>
            </div>
          ) : null}
        </div>

        {/* Actions */}
        <div className="p-4 bg-gray-100 flex justify-between">
          <div className="flex gap-2">
            {uploadedImage || imageData ? (
              <>
                <Button variant="outline" onClick={onReset}>
                  <Camera className="mr-2 h-4 w-4" />
                  Take Photo
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setDragActive(true)}
                  className="border-[#3b4c3a] text-[#3b4c3a]"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Image
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={onReset}>
                Take a Photo
              </Button>
            )}
          </div>

          {!error && analysisStage === "details" && (
            <Button className="bg-[#3b4c3a] hover:bg-[#2a382a] text-white" onClick={onClose}>
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

