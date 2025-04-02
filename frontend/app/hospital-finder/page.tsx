import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HospitalFinderPage() {
  return (
    <main className="min-h-screen bg-[#f8f4ea] py-16 px-4 md:px-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-[#5c4f3c] mb-8">Nearest Health Facility</h1>
        <p className="text-lg text-[#7a6c5d] mb-8">
          This page will contain the hospital finder feature with an interactive map. Coming soon!
        </p>
        <Button asChild className="bg-[#c8b6a6] hover:bg-[#a89985] text-[#3c3429]">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </main>
  )
}

