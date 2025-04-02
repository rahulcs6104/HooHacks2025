interface ImageContainerProps {
  src: string
  alt: string
}

export default function ImageContainer({ src, alt }: ImageContainerProps) {
  return (
    <div className="relative w-full" style={{ paddingBottom: "120%" }}>
      <div className="absolute inset-0 bg-[#e5e7eb] rounded-[24px] overflow-hidden">
        <div className="absolute top-[60px] left-0 w-[20px] h-[60px] bg-[#f8f4ea]"></div>
        <div className="absolute top-[60px] left-0 w-[20px] h-[20px] bg-[#e5e7eb] rounded-br-[20px]"></div>
        <div className="absolute top-[120px] left-0 w-[20px] h-[20px] bg-[#e5e7eb] rounded-tr-[20px]"></div>
        <img src={src || "/placeholder.svg"} alt={alt} className="w-full h-full object-cover" />
      </div>
    </div>
  )
}

