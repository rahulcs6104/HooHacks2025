"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Camera, Upload, ClipboardList, X } from "lucide-react"
import Navbar from "../components/navbar"
import Footer from "../components/footer"
import CameraCapture from "../components/camera-capture"
import ImageAnalysis from "../components/image-analysis"
import SelfDiagnosisModal from "../components/self-diagnosis-modal"

export default function PhysicalHealthPage() {
  const [showSelfDiagnosis, setShowSelfDiagnosis] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleCapture = (imageData: string) => {
    setCapturedImage(imageData)
    setShowCamera(false)
    setShowAnalysis(true)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0])
    }
  }

  const processFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          setCapturedImage(event.target.result)
          setShowUploadModal(false)
          setShowAnalysis(true)
        }
      }
      reader.readAsDataURL(file)
    }
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
      processFile(e.dataTransfer.files[0])
    }
  }

  const resetCapture = () => {
    setCapturedImage(null)
    setShowAnalysis(false)
  }

  return (
    <main className="min-h-screen bg-[#f8f4ea]">
      <Navbar />

      <div className="container mx-auto py-12 md:py-16 px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[#3b4c3a] mb-4 md:mb-6">Physical Health Check</h1>
        <p className="text-base md:text-lg text-[#3b4c3a]/80 mb-8 md:mb-10">
          Choose between symptom-based self-diagnosis or AI-powered image analysis to get insights about your physical
          health condition.
        </p>

        {/* Card options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Self Diagnosis Card */}
          <div className="rounded-[16px] p-8 shadow-lg relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] bg-[#4a614a]">
            <div className="flex flex-col h-full">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-3xl font-bold text-white">Self Diagnosis</h3>
                    <p className="mt-1 opacity-80 text-white">Symptom-Based Assessment (preferred)</p>
                  </div>
                </div>

                <p className="text-2xl font-medium mt-6 text-white">
                  Answer questions about your symptoms for a preliminary assessment
                </p>
              </div>

              <div className="mt-auto pt-6">
                <Button
                  onClick={() => setShowSelfDiagnosis(true)}
                  className="bg-white rounded-full w-14 h-14 flex items-center justify-center transition-transform hover:scale-110"
                >
                  <ClipboardList className="text-[#4a614a]" />
                </Button>
              </div>
            </div>
          </div>

          {/* Image Analysis Card */}
          <div className="rounded-[16px] p-8 shadow-lg relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] bg-[#3b4c3a]">
            <div className="flex flex-col h-full">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-3xl font-bold text-white">Image Analysis</h3>
                    <p className="mt-1 opacity-80 text-white">AI-Powered Detection (beta-stage)</p>
                  </div>
                </div>

                <p className="text-2xl font-medium mt-6 text-white">
                  Upload or take a photo for AI analysis of skin conditions
                </p>
              </div>

              <div className="mt-auto pt-6 flex space-x-4">
                <Button
                  onClick={() => setShowCamera(true)}
                  className="bg-white rounded-full w-14 h-14 flex items-center justify-center transition-transform hover:scale-110"
                >
                  <Camera className="text-[#3b4c3a]" />
                </Button>
                <Button
                  onClick={() => setShowUploadModal(true)}
                  className="bg-white rounded-full w-14 h-14 flex items-center justify-center transition-transform hover:scale-110"
                >
                  <Upload className="text-[#3b4c3a]" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Information section */}
        <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-[#3b4c3a] mb-4">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-[#3b4c3a] mb-2">Self Diagnosis</h3>
              <ul className="list-disc pl-5 space-y-1 text-[#3b4c3a]/80 text-sm">
                <li>Select symptoms you're experiencing from multiple categories</li>
                <li>Our system analyzes your selections and identifies potential conditions</li>
                <li>Review matched conditions with detailed information and recommendations</li>
                <li>Use results as a starting point for discussion with healthcare professionals</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-[#3b4c3a] mb-2">Image Analysis</h3>
              <ul className="list-disc pl-5 space-y-1 text-[#3b4c3a]/80 text-sm">
                <li>Take a clear photo of the affected area or upload an existing image</li>
                <li>Our AI analyzes the image to identify potential skin conditions</li>
                <li>Review detailed information about the identified condition</li>
                <li>Get recommendations for next steps and treatment options</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <p className="text-sm text-yellow-700">
              <strong>Medical Disclaimer:</strong> These tools provide preliminary assessments only and are not a
              substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your
              physician or other qualified health provider with any questions you may have regarding a medical
              condition.
            </p>
          </div>
        </div>
      </div>

      {/* Camera component */}
      {showCamera && <CameraCapture onCapture={handleCapture} onClose={() => setShowCamera(false)} />}

      {/* Analysis component */}
      {showAnalysis && capturedImage && (
        <ImageAnalysis
          imageData={capturedImage}
          onClose={() => resetCapture()}
          onReset={() => {
            setShowAnalysis(false)
            setShowCamera(true)
          }}
        />
      )}

      {/* Self Diagnosis Modal */}
      {showSelfDiagnosis && <SelfDiagnosisModal onClose={() => setShowSelfDiagnosis(false)} />}

      {/* File Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-xl">
            {/* Header */}
            <div className="bg-[#3b4c3a] text-white p-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Upload Image</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowUploadModal(false)}
                className="text-white hover:bg-[#2a382a] rounded-full h-8 w-8"
              >
                <X size={18} />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div
                className={`w-full h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-4 mb-4 transition-colors
                ${dragActive ? "border-[#3b4c3a] bg-[#3b4c3a]/10" : "border-gray-300"}`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="h-16 w-16 text-gray-400 mb-4" />
                <p className="text-gray-600 text-center mb-2 font-medium">Drag and drop your image here</p>
                <p className="text-gray-400 text-sm text-center mb-4">or</p>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-[#3b4c3a] hover:bg-[#2a382a] text-white"
                >
                  Select from device
                </Button>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
              </div>

              <div className="text-center text-sm text-gray-500">
                <p>Supported formats: JPG, PNG, GIF</p>
                <p>Maximum file size: 10MB</p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-100 flex justify-end">
              <Button variant="outline" onClick={() => setShowUploadModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}

