"use client"

import { useEffect, useRef } from "react"

interface ScrollingMarqueeProps {
  items: string[]
  backgroundColor?: string
  textColor?: string
  speed?: number
  separator?: string
}

export default function ScrollingMarquee({
  items,
  backgroundColor = "#3b4c3a",
  textColor = "#ffffff",
  speed = 30,
  separator = "✕",
}: ScrollingMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const marqueeElement = marqueeRef.current
    if (!marqueeElement) return

    let animationId: number
    let position = 0

    const animate = () => {
      position -= 1
      if (position <= -marqueeElement.firstElementChild!.clientWidth) {
        position = 0
      }

      marqueeElement.style.transform = `translateX(${position}px)`
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  const marqueeContent = items.join(` ${separator} `)

  return (
    <div className="w-full overflow-hidden py-4" style={{ backgroundColor }}>
      <div className="relative flex whitespace-nowrap">
        <div ref={marqueeRef} className="flex items-center" style={{ color: textColor }}>
          <div className="flex items-center text-xl font-medium px-4">
            {items.map((item, index) => (
              <span key={index} className="flex items-center">
                <span>{item}</span>
                {index < items.length - 1 && <span className="mx-4">{separator}</span>}
              </span>
            ))}
          </div>
          <div className="flex items-center text-xl font-medium px-4">
            {items.map((item, index) => (
              <span key={`dup-${index}`} className="flex items-center">
                <span>{item}</span>
                {index < items.length - 1 && <span className="mx-4">{separator}</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

