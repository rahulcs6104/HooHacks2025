"use client"

interface DualMarqueeProps {
  itemsTop: string[]
  itemsBottom: string[]
  textColor?: string
  separator?: string
}

export default function DualMarquee({
  itemsTop,
  itemsBottom,
  textColor = "#3b4c3a",
  separator = "✕",
}: DualMarqueeProps) {
  return (
    <div className="w-full overflow-hidden">
      {/* Top marquee - scrolls left to right */}
      <div className="relative flex mb-8">
        <div className="animate-marquee-reverse whitespace-nowrap flex items-center" style={{ color: textColor }}>
          {itemsTop.map((item, index) => (
            <span key={index} className="mx-6 text-2xl font-serif">
              {item} <span className="mx-3 opacity-70">{separator}</span>
            </span>
          ))}
        </div>

        <div
          className="absolute top-0 animate-marquee2-reverse whitespace-nowrap flex items-center"
          style={{ color: textColor }}
        >
          {itemsTop.map((item, index) => (
            <span key={`dup-${index}`} className="mx-6 text-2xl font-serif">
              {item} <span className="mx-3 opacity-70">{separator}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Space for the voice chat box */}
      <div className="h-64"></div>

      {/* Bottom marquee - scrolls right to left */}
      <div className="relative flex mt-8">
        <div className="animate-marquee whitespace-nowrap flex items-center" style={{ color: textColor }}>
          {itemsBottom.map((item, index) => (
            <span key={index} className="mx-6 text-2xl font-serif">
              {item} <span className="mx-3 opacity-70">{separator}</span>
            </span>
          ))}
        </div>

        <div
          className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center"
          style={{ color: textColor }}
        >
          {itemsBottom.map((item, index) => (
            <span key={`dup-${index}`} className="mx-6 text-2xl font-serif">
              {item} <span className="mx-3 opacity-70">{separator}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

