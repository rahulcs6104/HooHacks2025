import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    // Use the environment variable for the API key
    const apiKey = process.env.PERPLEXITY_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "Perplexity API key is not configured" }, { status: 500 })
    }

    console.log("Making request to Perplexity API with model: sonar")

    // Make the request to Perplexity AI Sonar model
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
            role: "system",
            content:
              "You are a helpful healthcare assistant that analyzes injury assessments and provides insights. Be concise and clear in your responses. Format your response with clear sections for Severity, Assessment, Treatment, and When to Seek Medical Care. For high severity or severe cases, ONLY provide the severity assessment and advise seeking immediate medical attention - do not provide detailed treatment advice.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Perplexity API error:", response.status, errorText)

      let errorMessage = `Perplexity API error: ${response.status}`
      try {
        // Try to parse the error as JSON
        const errorData = JSON.parse(errorText)
        if (errorData.error) {
          errorMessage = `Perplexity API error: ${errorData.error}`
        }
      } catch (e) {
        // If parsing fails, use the raw error text
        errorMessage = `Perplexity API error: ${errorText.substring(0, 100)}`
      }

      return NextResponse.json({ error: errorMessage }, { status: response.status })
    }

    const data = await response.json()
    console.log("Perplexity API response received")

    // Extract the response text from the Perplexity API response
    const text = data.choices?.[0]?.message?.content || "No response from AI"

    return NextResponse.json({ text })
  } catch (error) {
    console.error("Error in Perplexity API route:", error)
    return NextResponse.json(
      { error: `Internal server error: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 },
    )
  }
}

