"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, Check } from "lucide-react"

interface AddPerplexityKeyProps {
  onKeyAdded: (key: string) => void
}

export default function AddPerplexityKey({ onKeyAdded }: AddPerplexityKeyProps) {
  const [apiKey, setApiKey] = useState("")
  const [isAdding, setIsAdding] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleAddKey = async () => {
    if (!apiKey.trim()) {
      setError("API key is required")
      return
    }

    setIsAdding(true)
    setError(null)

    try {
      // In a real app, you would securely store this key
      // For demo purposes, we're just passing it to the parent component
      onKeyAdded(apiKey)
      setSuccess(true)

      // Reset after success
      setTimeout(() => {
        setSuccess(false)
        setApiKey("")
      }, 3000)
    } catch (err) {
      setError("Failed to add API key")
      console.error(err)
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-lg font-medium text-[#3b4c3a] mb-2">Add Perplexity API Key</h3>
      <p className="text-sm text-gray-600 mb-4">To use the AI analysis feature, please add your Perplexity API key.</p>

      <div className="space-y-4">
        <div>
          <Input
            type="password"
            placeholder="Enter your Perplexity API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full"
          />
        </div>

        {error && (
          <div className="flex items-center text-red-600 text-sm">
            <AlertCircle className="h-4 w-4 mr-2" />
            {error}
          </div>
        )}

        {success && (
          <div className="flex items-center text-green-600 text-sm">
            <Check className="h-4 w-4 mr-2" />
            API key added successfully!
          </div>
        )}

        <Button
          onClick={handleAddKey}
          disabled={isAdding || !apiKey.trim()}
          className="w-full bg-[#3b4c3a] hover:bg-[#2a382a] text-white"
        >
          {isAdding ? "Adding..." : "Add API Key"}
        </Button>
      </div>
    </div>
  )
}

