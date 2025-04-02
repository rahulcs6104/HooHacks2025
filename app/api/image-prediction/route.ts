import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { imageData } = await request.json()

    if (!imageData) {
      return NextResponse.json({ error: "Image data is required" }, { status: 400 })
    }

    // Convert base64 to blob/file
    const base64Response = await fetch(imageData)
    const blob = await base64Response.blob()

    // Create FormData and append the file
    const formData = new FormData()
    formData.append("file", blob, "image.jpg")

    console.log("Attempting to connect to backend server...")

    // Send the image to your backend server using FormData with a timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Backend prediction error:", response.status, errorText)
        return NextResponse.json({ error: `Backend prediction error: ${response.status}` }, { status: response.status })
      }

      const data = await response.json()
      console.log("Received prediction from backend:", data)
      return NextResponse.json(data)
    } catch (fetchError) {
      console.error("Backend connection failed:", fetchError)

      // Return error instead of fallback data
      return NextResponse.json(
        { error: "Failed to connect to the backend server. Please ensure it's running and accessible." },
        { status: 503 }, // Service Unavailable
      )
    }
  } catch (error) {
    console.error("Error in image prediction API route:", error)
    return NextResponse.json(
      { error: `Internal server error: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 },
    )
  }
}

