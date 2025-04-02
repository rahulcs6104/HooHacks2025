"use client"

interface AutoScrollingMarqueeProps {
  items: string[]
  backgroundColor?: string
  textColor?: string
  separator?: string
}

export default function AutoScrollingMarquee({
  items,
  backgroundColor = "#3b4c3a",
  textColor = "#ffffff",
  separator = "✕",
}: AutoScrollingMarqueeProps) {
  return (
    <div className="w-full overflow-hidden py-4" style={{ backgroundColor }}>
      <div className="relative flex">
        <div className="animate-marquee whitespace-nowrap flex items-center" style={{ color: textColor }}>
          {items.map((item, index) => (
            <span key={index} className="mx-4 text-xl font-medium">
              {item} <span className="mx-2">{separator}</span>
            </span>
          ))}
        </div>

        <div
          className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center"
          style={{ color: textColor }}
        >
          {items.map((item, index) => (
            <span key={`dup-${index}`} className="mx-4 text-xl font-medium">
              {item} <span className="mx-2">{separator}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

