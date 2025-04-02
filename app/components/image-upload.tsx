"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"

export default function ImageUpload() {
  const [image, setImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="mt-4">
      <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} className="hidden" />
      <Button onClick={triggerFileInput} className="bg-[#8dd3c7] hover:bg-[#7bc0b4] text-black">
        Upload Your Image
      </Button>

      {image && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Your image has been uploaded. Add this to your page:</p>
          <code className="bg-gray-100 p-2 rounded block overflow-x-auto text-sm">
            {`<img src="${image}" alt="Your image" className="custom-image" />`}
          </code>
        </div>
      )}
    </div>
  )
}

