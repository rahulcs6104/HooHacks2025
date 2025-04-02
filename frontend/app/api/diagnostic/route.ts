import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Test connection to backend
    const backendUrl = "https://hoohacks-dcfbf13db422.herokuapp.com/"
    let backendStatus = "unknown"
    let backendError = null

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3000)

      const response = await fetch(`${backendUrl}/health`, {
        method: "GET",
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (response.ok) {
        backendStatus = "available"
      } else {
        backendStatus = "error"
        backendError = `Status: ${response.status} ${response.statusText}`
      }
    } catch (error) {
      backendStatus = "unavailable"
      backendError = error instanceof Error ? error.message : "Unknown error"
    }

    // Get environment information
    const environment = {
      nodeEnv: process.env.NODE_ENV || "unknown",
      // Removed the Vercel-specific environment variables
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json({
      status: "ok",
      backend: {
        url: backendUrl,
        status: backendStatus,
        error: backendError,
      },
      environment,
    })
  } catch (error) {
    return NextResponse.json({
      status: "error",
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    })
  }
}

