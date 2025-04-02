import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Hardcoded API key - same as in the main API route
    const apiKey = "YOUR_PERPLEXITY_API_KEY_HERE" // Replace with your actual API key

    // Simple test request
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "sonar", // Using the correct model name
        messages: [
          {
            role: "user",
            content: "Hello, this is a test message. Please respond with a simple greeting.",
          },
        ],
        max_tokens: 100,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        {
          error: `API error: ${response.status}`,
          details: errorText,
        },
        { status: 500 },
      )
    }

    const data = await response.json()
    return NextResponse.json({
      success: true,
      message: "API connection successful",
      response: data,
    })
  } catch (error) {
    console.error("Test API error:", error)
    return NextResponse.json(
      {
        error: "Test failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

