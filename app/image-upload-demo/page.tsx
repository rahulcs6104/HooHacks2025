import ImageUpload from "../components/image-upload"

export default function ImageUploadDemo() {
  return (
    <main className="min-h-screen bg-[#f8f4ea] py-16 px-4 md:px-6">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-[#5c4f3c] mb-6">Upload Your Image</h1>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <p className="text-gray-700 mb-6">
            Upload an image to use in your hero section. The image will be displayed in the irregular shape container
            with overlays.
          </p>

          <h2 className="text-xl font-semibold text-[#5c4f3c] mb-4">Instructions:</h2>
          <ol className="list-decimal pl-5 space-y-2 text-gray-700 mb-6">
            <li>Click the "Upload Your Image" button below</li>
            <li>Select an image from your device</li>
            <li>Copy the generated code</li>
            <li>Replace the placeholder image in app/page.tsx with your image</li>
          </ol>

          <ImageUpload />
        </div>
      </div>
    </main>
  )
}

