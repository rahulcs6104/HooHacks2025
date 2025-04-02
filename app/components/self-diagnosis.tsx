"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ClipboardList, Camera, Upload } from "lucide-react"
import SelfDiagnosisModal from "./self-diagnosis-modal"
import CameraCapture from "./camera-capture"
import ImageAnalysis from "./image-analysis"

export default function SelfDiagnosis() {
  const [showDiagnosisModal, setShowDiagnosisModal] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)

  const handleCapture = (imageData: string) => {
    setCapturedImage(imageData)
    setShowCamera(false)
  }

  const handleImageUpload = (imageData: string) => {
    setCapturedImage(imageData)
    setShowUploadModal(false)
  }

  const resetImage = () => {
    setCapturedImage(null)
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-[#3b4c3a] mb-6">Physical Health Assessment</h2>
      <p className="text-lg text-gray-600 mb-8">
        Choose between symptom-based self-diagnosis or AI-powered image analysis to get insights about your physical
        health condition.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Self Diagnosis Card */}
        <div className="bg-[#3b4c3a] text-white rounded-2xl p-8 flex flex-col h-full">
          <h3 className="text-3xl font-bold mb-2">Self Diagnosis</h3>
          <p className="text-xl font-light mb-6">Symptom-Based Assessment (preferred)</p>
          <p className="flex-grow text-lg mb-8">Answer questions about your symptoms for a preliminary assessment</p>
          <div className="flex justify-start">
            <Button
              onClick={() => setShowDiagnosisModal(true)}
              className="bg-white text-[#3b4c3a] hover:bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center"
            >
              <ClipboardList size={28} />
            </Button>
          </div>
        </div>

        {/* Image Analysis Card */}
        <div className="bg-[#3b4c3a] text-white rounded-2xl p-8 flex flex-col h-full">
          <h3 className="text-3xl font-bold mb-2">Image Analysis</h3>
          <p className="text-xl font-light mb-6">AI-Powered Detection (beta-stage)</p>
          <p className="flex-grow text-lg mb-8">Upload or take a photo for AI analysis of skin conditions</p>
          <div className="flex justify-start space-x-4">
            <Button
              onClick={() => setShowCamera(true)}
              className="bg-white text-[#3b4c3a] hover:bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center"
            >
              <Camera size={28} />
            </Button>
            <Button
              onClick={() => setShowUploadModal(true)}
              className="bg-white text-[#3b4c3a] hover:bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center"
            >
              <Upload size={28} />
            </Button>
          </div>
        </div>
      </div>

      {/* Self Diagnosis Modal */}
      {showDiagnosisModal && <SelfDiagnosisModal onClose={() => setShowDiagnosisModal(false)} />}

      {/* Camera Capture */}
      {showCamera && <CameraCapture onCapture={handleCapture} onClose={() => setShowCamera(false)} />}

      {/* Image Analysis */}
      {capturedImage && (
        <ImageAnalysis
          imageData={capturedImage}
          onClose={() => setCapturedImage(null)}
          onReset={() => {
            resetImage()
            setShowCamera(true)
          }}
        />
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-xl">
            <div className="bg-[#3b4c3a] text-white p-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Upload Image</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowUploadModal(false)}
                className="text-white hover:bg-white/20"
              >
                <span className="sr-only">Close</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-x"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </Button>
            </div>

            <div
              className="p-8 flex flex-col items-center justify-center"
              onDragOver={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onDrop={(e) => {
                e.preventDefault()
                e.stopPropagation()

                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  const file = e.dataTransfer.files[0]
                  if (file.type.startsWith("image/")) {
                    const reader = new FileReader()
                    reader.onload = (event) => {
                      if (event.target?.result) {
                        handleImageUpload(event.target.result as string)
                      }
                    }
                    reader.readAsDataURL(file)
                  }
                }
              }}
            >
              <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-4 mb-6 hover:border-[#3b4c3a] hover:bg-[#3b4c3a]/5 transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mb-2" />
                <p className="text-gray-500 text-center mb-2">Drag and drop your image here</p>
                <p className="text-gray-400 text-sm text-center">or</p>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const reader = new FileReader()
                      reader.onload = (event) => {
                        if (event.target?.result) {
                          handleImageUpload(event.target.result as string)
                        }
                      }
                      reader.readAsDataURL(e.target.files[0])
                    }
                  }}
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" className="mt-2 cursor-pointer">
                    Select from device
                  </Button>
                </label>
              </div>

              <Button variant="outline" onClick={() => setShowUploadModal(false)} className="w-full">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

