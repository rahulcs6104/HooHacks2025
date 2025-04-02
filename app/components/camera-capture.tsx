"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Camera, CameraIcon as FlipCamera, X, Loader2 } from "lucide-react"

interface CameraCaptureProps {
  onCapture: (imageData: string) => void
  onClose: () => void
}

export default function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [isCapturing, setIsCapturing] = useState(false)
  const [isFrontCamera, setIsFrontCamera] = useState(false)
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Initialize camera when component mounts
  useEffect(() => {
    startCamera()

    // Check if device has multiple cameras
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          const videoDevices = devices.filter((device) => device.kind === "videoinput")
          setHasMultipleCameras(videoDevices.length > 1)
        })
        .catch((err) => {
          console.error("Error checking for multiple cameras:", err)
        })
    }

    // Cleanup function to stop camera when component unmounts
    return () => {
      stopCamera()
    }
  }, [])

  const startCamera = async () => {
    try {
      setCameraError(null)

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera access not supported by your browser")
      }

      // Stop any existing stream
      if (streamRef.current) {
        stopCamera()
      }

      // Get camera stream with specified facing mode
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: isFrontCamera ? "user" : "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      })

      // Set the stream as the video source
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsCameraActive(true)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setCameraError(err instanceof Error ? err.message : "Failed to access camera")
      setIsCameraActive(false)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    setIsCameraActive(false)
  }

  const switchCamera = () => {
    setIsFrontCamera(!isFrontCamera)
    // Restart camera with new facing mode
    setTimeout(() => {
      startCamera()
    }, 300)
  }

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return

    setIsCapturing(true)

    try {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (!context) {
        throw new Error("Could not get canvas context")
      }

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Draw the current video frame to the canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height)

      // Convert canvas to data URL
      const imageData = canvas.toDataURL("image/jpeg")

      // Pass the image data to the parent component
      onCapture(imageData)

      // Stop the camera
      stopCamera()
    } catch (err) {
      console.error("Error capturing image:", err)
      setCameraError("Failed to capture image")
    } finally {
      setIsCapturing(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-xl">
        {/* Header */}
        <div className="bg-[#3b4c3a] text-white p-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold">Take a Photo</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Camera view */}
        <div className="relative bg-black aspect-[4/3] w-full">
          {cameraError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
              <div className="bg-red-500/80 p-4 rounded-lg max-w-xs text-center">
                <p className="mb-2">{cameraError}</p>
                <Button onClick={startCamera} className="bg-white text-red-500 hover:bg-gray-100 mt-2">
                  Try Again
                </Button>
              </div>
            </div>
          ) : (
            <>
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
              <canvas ref={canvasRef} className="hidden" />

              {/* Camera overlay with guidelines */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full border-2 border-white/30 rounded-lg"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 border-2 border-white/50 rounded-lg border-dashed"></div>
              </div>

              {/* Camera instructions */}
              <div className="absolute top-4 left-0 right-0 text-center">
                <p className="text-white text-sm bg-black/50 inline-block px-3 py-1 rounded-full">
                  Position the area clearly in the frame
                </p>
              </div>
            </>
          )}
        </div>

        {/* Controls */}
        <div className="p-4 bg-gray-100 flex justify-between items-center">
          {hasMultipleCameras ? (
            <Button
              variant="outline"
              size="icon"
              onClick={switchCamera}
              disabled={!isCameraActive || isCapturing}
              className="rounded-full h-10 w-10"
            >
              <FlipCamera className="h-5 w-5" />
            </Button>
          ) : (
            <div></div> // Empty div for spacing
          )}
          <Button
            onClick={captureImage}
            disabled={!isCameraActive || isCapturing}
            className="bg-[#3b4c3a] hover:bg-[#2a382a] text-white rounded-full h-14 w-14 flex items-center justify-center"
          >
            {isCapturing ? <Loader2 className="h-6 w-6 animate-spin" /> : <Camera className="h-6 w-6" />}
          </Button>
          <div></div> {/* Empty div for spacing */}
        </div>
      </div>
    </div>
  )
}

