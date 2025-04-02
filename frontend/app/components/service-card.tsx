"use client"

import Link from "next/link"
import type { ReactNode } from "react"

interface ServiceCardProps {
  backgroundColor: string
  title: string
  subtitle: string
  description: string
  linkPath: string
  isNew?: boolean
  highlight?: boolean
  highlightWord?: string
  highlightColor?: string
  textColor?: string
  children?: ReactNode
}

export default function ServiceCard({
  backgroundColor,
  title,
  subtitle,
  description,
  linkPath,
  isNew = false,
  highlight = false,
  highlightWord = "",
  highlightColor = "#d7e84c",
  textColor = "#333333",
  children,
}: ServiceCardProps) {
  // Split description to highlight a specific word if needed
  const renderDescription = () => {
    if (!highlight || !highlightWord) {
      return (
        <p className={`text-2xl font-medium mt-6`} style={{ color: textColor }}>
          {description}
        </p>
      )
    }

    const parts = description.split(highlightWord)
    return (
      <p className={`text-2xl font-medium mt-6`} style={{ color: textColor }}>
        {parts[0]}
        <span className="px-1" style={{ backgroundColor: highlightColor, color: "#333333" }}>
          {highlightWord}
        </span>
        {parts[1]}
      </p>
    )
  }

  return (
    <div
      className="rounded-[16px] p-8 shadow-lg relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]"
      style={{ backgroundColor }}
    >
      <div className="flex flex-col h-full">
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-3xl font-bold" style={{ color: textColor }}>
                {title}
              </h3>
              <p className="mt-1 opacity-80" style={{ color: textColor }}>
                {subtitle}
              </p>
            </div>
            {isNew && (
              <div className="bg-white/80 rounded-full px-4 py-1 border border-white/20">
                <span className="text-sm" style={{ color: backgroundColor }}>
                  new
                </span>
              </div>
            )}
          </div>

          {renderDescription()}

          {children}
        </div>

        <div className="mt-auto pt-6">
          <Link href={linkPath} className="inline-block">
            <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center transition-transform hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke={backgroundColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transform rotate-45"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

