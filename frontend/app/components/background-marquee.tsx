"use client"

interface BackgroundMarqueeProps {
  items: string[]
  textColor?: string
  separator?: string
  reducedRows?: boolean
}

export default function BackgroundMarquee({
  items,
  textColor = "#3b4c3a",
  separator = "✕",
  reducedRows = false,
}: BackgroundMarqueeProps) {
  // If reducedRows is true, we'll only show 5 rows instead of 11
  const rowsToShow = reducedRows ? 5 : 11

  return (
    <div className="w-full overflow-hidden py-4 md:py-8">
      {/* First row - scrolls left to right */}
      {rowsToShow >= 1 && (
        <div className="relative flex mb-4 md:mb-6">
          <div className="animate-marquee-reverse whitespace-nowrap flex items-center" style={{ color: textColor }}>
            {items.map((item, index) => (
              <span key={index} className="mx-4 md:mx-10 text-3xl md:text-5xl font-serif">
                {item} <span className="mx-2 md:mx-5 opacity-70">{separator}</span>
              </span>
            ))}
          </div>

          <div
            className="absolute top-0 animate-marquee2-reverse whitespace-nowrap flex items-center"
            style={{ color: textColor }}
          >
            {items.map((item, index) => (
              <span key={`dup-${index}`} className="mx-4 md:mx-10 text-3xl md:text-5xl font-serif">
                {item} <span className="mx-2 md:mx-5 opacity-70">{separator}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Second row - scrolls right to left */}
      {rowsToShow >= 2 && (
        <div className="relative flex mb-4 md:mb-6">
          <div className="animate-marquee whitespace-nowrap flex items-center" style={{ color: textColor }}>
            {items
              .slice()
              .reverse()
              .map((item, index) => (
                <span key={index} className="mx-4 md:mx-10 text-3xl md:text-5xl font-serif">
                  {item} <span className="mx-2 md:mx-5 opacity-70">{separator}</span>
                </span>
              ))}
          </div>

          <div
            className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center"
            style={{ color: textColor }}
          >
            {items
              .slice()
              .reverse()
              .map((item, index) => (
                <span key={`dup-${index}`} className="mx-4 md:mx-10 text-3xl md:text-5xl font-serif">
                  {item} <span className="mx-2 md:mx-5 opacity-70">{separator}</span>
                </span>
              ))}
          </div>
        </div>
      )}

      {/* Third row - scrolls left to right (slower) */}
      {rowsToShow >= 3 && (
        <div className="relative flex mb-4 md:mb-6">
          <div className="animate-marquee-slow whitespace-nowrap flex items-center" style={{ color: textColor }}>
            {[...items, ...items.slice(0, 3)].map((item, index) => (
              <span key={index} className="mx-4 md:mx-10 text-3xl md:text-5xl font-serif">
                {item} <span className="mx-2 md:mx-5 opacity-70">{separator}</span>
              </span>
            ))}
          </div>

          <div
            className="absolute top-0 animate-marquee2-slow whitespace-nowrap flex items-center"
            style={{ color: textColor }}
          >
            {[...items, ...items.slice(0, 3)].map((item, index) => (
              <span key={`dup-${index}`} className="mx-4 md:mx-10 text-3xl md:text-5xl font-serif">
                {item} <span className="mx-2 md:mx-5 opacity-70">{separator}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Fourth row - scrolls right to left (faster) */}
      {rowsToShow >= 4 && (
        <div className="relative flex mb-4 md:mb-6">
          <div className="animate-marquee-fast whitespace-nowrap flex items-center" style={{ color: textColor }}>
            {items
              .slice(3, 8)
              .concat(items.slice(0, 3))
              .map((item, index) => (
                <span key={index} className="mx-4 md:mx-10 text-3xl md:text-5xl font-serif">
                  {item} <span className="mx-2 md:mx-5 opacity-70">{separator}</span>
                </span>
              ))}
          </div>

          <div
            className="absolute top-0 animate-marquee2-fast whitespace-nowrap flex items-center"
            style={{ color: textColor }}
          >
            {items
              .slice(3, 8)
              .concat(items.slice(0, 3))
              .map((item, index) => (
                <span key={`dup-${index}`} className="mx-4 md:mx-10 text-3xl md:text-5xl font-serif">
                  {item} <span className="mx-2 md:mx-5 opacity-70">{separator}</span>
                </span>
              ))}
          </div>
        </div>
      )}

      {/* Fifth row - scrolls left to right */}
      {rowsToShow >= 5 && (
        <div className="relative flex mb-4 md:mb-6">
          <div className="animate-marquee-reverse whitespace-nowrap flex items-center" style={{ color: textColor }}>
            {items
              .slice()
              .reverse()
              .slice(2, 7)
              .map((item, index) => (
                <span key={index} className="mx-4 md:mx-10 text-3xl md:text-5xl font-serif">
                  {item} <span className="mx-2 md:mx-5 opacity-70">{separator}</span>
                </span>
              ))}
          </div>

          <div
            className="absolute top-0 animate-marquee2-reverse whitespace-nowrap flex items-center"
            style={{ color: textColor }}
          >
            {items
              .slice()
              .reverse()
              .slice(2, 7)
              .map((item, index) => (
                <span key={`dup-${index}`} className="mx-4 md:mx-10 text-3xl md:text-5xl font-serif">
                  {item} <span className="mx-2 md:mx-5 opacity-70">{separator}</span>
                </span>
              ))}
          </div>
        </div>
      )}

      {/* Sixth row - scrolls right to left */}
      {rowsToShow >= 6 && (
        <div className="relative flex mb-4 md:mb-6">
          <div className="animate-marquee whitespace-nowrap flex items-center" style={{ color: textColor }}>
            {items.slice(1, 6).map((item, index) => (
              <span key={index} className="mx-4 md:mx-10 text-3xl md:text-5xl font-serif">
                {item} <span className="mx-2 md:mx-5 opacity-70">{separator}</span>
              </span>
            ))}
          </div>

          <div
            className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center"
            style={{ color: textColor }}
          >
            {items.slice(1, 6).map((item, index) => (
              <span key={`dup-${index}`} className="mx-4 md:mx-10 text-3xl md:text-5xl font-serif">
                {item} <span className="mx-2 md:mx-5 opacity-70">{separator}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Seventh row - scrolls left to right (medium speed) */}
      {rowsToShow >= 7 && (
        <div className="relative flex mb-4 md:mb-6">
          <div className="animate-marquee-medium whitespace-nowrap flex items-center" style={{ color: textColor }}>
            {items
              .slice(4, 9)
              .concat(items.slice(0, 2))
              .map((item, index) => (
                <span key={index} className="mx-4 md:mx-10 text-3xl md:text-5xl font-serif">
                  {item} <span className="mx-2 md:mx-5 opacity-70">{separator}</span>
                </span>
              ))}
          </div>

          <div
            className="absolute top-0 animate-marquee2-medium whitespace-nowrap flex items-center"
            style={{ color: textColor }}
          >
            {items
              .slice(4, 9)
              .concat(items.slice(0, 2))
              .map((item, index) => (
                <span key={`dup-${index}`} className="mx-4 md:mx-10 text-3xl md:text-5xl font-serif">
                  {item} <span className="mx-2 md:mx-5 opacity-70">{separator}</span>
                </span>
              ))}
          </div>
        </div>
      )}

      {/* Eighth row - scrolls right to left (slower) */}
      {rowsToShow >= 8 && (
        <div className="relative flex mb-4 md:mb-6">
          <div className="animate-marquee-slower whitespace-nowrap flex items-center" style={{ color: textColor }}>
            {items
              .slice(2, 7)
              .reverse()
              .map((item, index) => (
                <span key={index} className="mx-4 md:mx-10 text-3xl md:text-5xl font-serif">
                  {item} <span className="mx-2 md:mx-5 opacity-70">{separator}</span>
                </span>
              ))}
          </div>

          <div
            className="absolute top-0 animate-marquee2-slower whitespace-nowrap flex items-center"
            style={{ color: textColor }}
          >
            {items
              .slice(2, 7)
              .reverse()
              .map((item, index) => (
                <span key={`dup-${index}`} className="mx-4 md:mx-10 text-3xl md:text-5xl font-serif">
                  {item} <span className="mx-2 md:mx-5 opacity-70">{separator}</span>
                </span>
              ))}
          </div>
        </div>
      )}

      {/* Ninth row - scrolls left to right (very fast) */}
      {rowsToShow >= 9 && (
        <div className="relative flex mb-4 md:mb-6">
          <div className="animate-marquee-very-fast whitespace-nowrap flex items-center" style={{ color: textColor }}>
            {items.slice(0, 5).map((item, index) => (
              <span key={index} className="mx-4 md:mx-10 text-3xl md:text-5xl font-serif">
                {item} <span className="mx-2 md:mx-5 opacity-70">{separator}</span>
              </span>
            ))}
          </div>

          <div
            className="absolute top-0 animate-marquee2-very-fast whitespace-nowrap flex items-center"
            style={{ color: textColor }}
          >
            {items.slice(0, 5).map((item, index) => (
              <span key={`dup-${index}`} className="mx-4 md:mx-10 text-3xl md:text-5xl font-serif">
                {item} <span className="mx-2 md:mx-5 opacity-70">{separator}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tenth row - scrolls right to left (very slow) */}
      {rowsToShow >= 10 && (
        <div className="relative flex mb-4 md:mb-6">
          <div className="animate-marquee-very-slow whitespace-nowrap flex items-center" style={{ color: textColor }}>
            {items.slice(5, 10).map((item, index) => (
              <span key={index} className="mx-4 md:mx-10 text-3xl md:text-5xl font-serif">
                {item} <span className="mx-2 md:mx-5 opacity-70">{separator}</span>
              </span>
            ))}
          </div>

          <div
            className="absolute top-0 animate-marquee2-very-slow whitespace-nowrap flex items-center"
            style={{ color: textColor }}
          >
            {items.slice(5, 10).map((item, index) => (
              <span key={`dup-${index}`} className="mx-4 md:mx-10 text-3xl md:text-5xl font-serif">
                {item} <span className="mx-2 md:mx-5 opacity-70">{separator}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Eleventh row - scrolls left to right (alternating items) */}
      {rowsToShow >= 11 && (
        <div className="relative flex">
          <div className="animate-marquee-alternating whitespace-nowrap flex items-center" style={{ color: textColor }}>
            {items
              .filter((_, i) => i % 2 === 0)
              .map((item, index) => (
                <span key={index} className="mx-4 md:mx-10 text-3xl md:text-5xl font-serif">
                  {item} <span className="mx-2 md:mx-5 opacity-70">{separator}</span>
                </span>
              ))}
          </div>

          <div
            className="absolute top-0 animate-marquee2-alternating whitespace-nowrap flex items-center"
            style={{ color: textColor }}
          >
            {items
              .filter((_, i) => i % 2 === 0)
              .map((item, index) => (
                <span key={`dup-${index}`} className="mx-4 md:mx-10 text-3xl md:text-5xl font-serif">
                  {item} <span className="mx-2 md:mx-5 opacity-70">{separator}</span>
                </span>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

