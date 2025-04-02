"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DiagnosticPage() {
  const [diagnosticData, setDiagnosticData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const runDiagnostic = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch("/api/diagnostic")
        const data = await response.json()

        setDiagnosticData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    runDiagnostic()
  }, [])

  const handleRefresh = () => {
    setLoading(true)
    window.location.reload()
  }

  const handleGoBack = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-[#3b4c3a] text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">System Diagnostic</h1>
        </div>
      </header>

      <main className="container mx-auto flex-1 p-4">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Connection Diagnostic</h2>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 text-[#3b4c3a] animate-spin mr-3" />
              <span>Running diagnostics...</span>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded mb-4">
              <p className="text-red-700">Error: {error}</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Backend Connection</h3>
                <div className="bg-gray-50 p-4 rounded border">
                  <div className="flex items-center mb-2">
                    <div
                      className={`h-3 w-3 rounded-full mr-2 ${
                        diagnosticData?.backend?.status === "available"
                          ? "bg-green-500"
                          : diagnosticData?.backend?.status === "unavailable"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                      }`}
                    ></div>
                    <span className="font-medium">Status: {diagnosticData?.backend?.status}</span>
                  </div>
                  <p className="text-sm text-gray-600">URL: {diagnosticData?.backend?.url}</p>
                  {diagnosticData?.backend?.error && (
                    <p className="text-sm text-red-600 mt-2">Error: {diagnosticData.backend.error}</p>
                  )}

                  {diagnosticData?.backend?.status !== "available" && (
                    <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-sm">
                      <p className="font-medium">Troubleshooting Steps:</p>
                      <ol className="list-decimal ml-5 mt-2 space-y-1">
                        <li>Ensure your backend server is running at {diagnosticData?.backend?.url}</li>
                        <li>Check that CORS is properly configured on your backend</li>
                        <li>If viewing in a preview environment, the backend won't be accessible via localhost</li>
                        <li>Consider deploying your backend to a publicly accessible URL</li>
                      </ol>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Environment Information</h3>
                <div className="bg-gray-50 p-4 rounded border">
                  <p>
                    <span className="font-medium">Node Environment:</span> {diagnosticData?.environment?.nodeEnv}
                  </p>
                  <p>
                    <span className="font-medium">Timestamp:</span> {diagnosticData?.environment?.timestamp}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Raw Diagnostic Data</h3>
                <pre className="bg-gray-800 text-gray-100 p-4 rounded text-xs overflow-auto max-h-[300px]">
                  {JSON.stringify(diagnosticData, null, 2)}
                </pre>
              </div>
            </>
          )}

          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={handleGoBack}>
              Back to Home
            </Button>
            <Button onClick={handleRefresh} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Running...
                </>
              ) : (
                "Run Diagnostic Again"
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

