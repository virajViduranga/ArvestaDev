// Look, no "use client" here! This runs on the server for SEO.
import CompressorTool from "./imageCompressor";

export const metadata = {
  title: "Free Image Compressor - Reduce Image Size Online | ArvestaDev",
  description: "Compress JPG, PNG, and WebP images online for free without losing quality. Fast, secure, and runs locally in your browser.",
  alternates: {
    canonical: "https://arvestadev.com/tools/image-compressor",
  },
};

export default function ImageCompressorPage() {
  return (
    <div>
     
      <CompressorTool />
    </div>
  );
}