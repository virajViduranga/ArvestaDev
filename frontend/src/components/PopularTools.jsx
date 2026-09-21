import Link from "next/link";
import { 
  Terminal, FileText, Image as ImageIcon, 
  FileImage, ImagePlus, Files
} from 'lucide-react';

const tools = [
  {
    name: "JSON Formatter",
    description: "Format, validate, minify, and inspect JSON instantly in your browser.",
    href: "/tools/json-formatter",
    category: "Developer Tool",
    cardColor: "#8045F5",
    icon: <Terminal className="w-6 h-6 text-[#ffffff]" />,
  },
  {
    name: "Word Counter",
    description: "Advanced real-time word, character, and sentence counting with keyword analysis.",
    href: "/tools/word-counter",
    category: "Text Tool",
    cardColor: "#455FF5",
    icon: <FileText className="w-6 h-6 text-[#ffffff]" />,
  },
  {
    name: "Image Compressor",
    description: "Compress JPG, PNG, and WebP images to smaller file sizes without quality loss.",
    href: "/tools/image-compressor",
    category: "Image Tool",
    cardColor: "#0AC756",
    icon: <ImageIcon className="w-6 h-6 text-[#ffffff]" />,
  },
  {
    name: "PDF to Word",
    description: "Convert PDFs into editable Word documents, preserving formatting.",
    href: "/tools/pdf-to-word",
    category: "PDF Tool",
    cardColor: "#F2700D",
    icon: <FileText className="w-6 h-6 text-[#ffffff]" />,
  },
  {
    name: "Word to PDF",
    description: "Securely convert Word documents to PDF formatting. Supports batch processing.",
    href: "/tools/word-to-pdf",
    category: "PDF Tool",
    cardColor: "#007acc",
    icon: <FileText className="w-6 h-6 text-[#ffffff]" />,
  },
  {
    name: "Merge PDF",
    description: "Combine multiple PDFs into one document directly in your browser.",
    href: "/tools/merge-pdf",
    category: "PDF Tool",
    cardColor: "#10B981",
    icon: <Files className="w-6 h-6 text-[#ffffff]" />,
  },
];

export default function PopularTools() {
  return (
    <section className="bg-gray-50 py-16 px-6 lg:px-8 transition-colors duration-300">
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-semibold tracking-wider uppercase text-[var(--color-primary)]">
            Featured Utilities
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl mt-2">
            Popular Online Tools
          </h2>
          <p className="mt-3 text-[var(--color-text-secondary)] text-base max-w-xl mx-auto">
            Choose from our most popular free tools designed to save you time.
          </p>
        </div>

        {/* 6-Card Responsive Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {tools.map((tool) => (
  <Link
    key={tool.name}
    href={tool.href}
    style={{ '--card-color': tool.cardColor }}
    className="group relative flex flex-col rounded-2xl bg-[var(--color-surface)] p-6 border border-[var(--color-border)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
  >
    {/* Clean Top Section: Subtle Icon & Category Pill */}
    <div className="flex items-start justify-between mb-6">
      
      {/* Soft Icon Container */}
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--card-color)] text-[var(--color-text-primary)] transition-colors duration-300 group-hover:text-white">
        {tool.icon}
      </div>

      {/* Minimal Category Pill - Updated hover background here */}
      <span className="rounded-full bg-[var(--color-secondary)] px-3 py-1 text-[10px] font-medium tracking-wide text-[var(--color-text-secondary)] uppercase transition-colors duration-300 group-hover:bg-[var(--card-color)] group-hover:text-white">
        {tool.category}
      </span>
      
    </div>

    {/* Content Section */}
    <div className="flex flex-col flex-1">
      {/* Title - Updated hover text color here */}
      <h3 className="mb-2 text-lg font-semibold text-[var(--color-text-primary)] transition-colors duration-300 group-hover:text-[var(--card-color)]">
        {tool.name}
      </h3>
      
      <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] line-clamp-2">
        {tool.description}
      </p>
    </div>

    {/* Sharp Action Button - Updated hover background here */}
    <div className="mt-8 flex justify-end">
      <button className="flex items-center gap-2 rounded-none border border-[var(--color-border)] bg-transparent px-4 py-2 text-xs font-semibold text-[var(--color-text-primary)] transition-all duration-300 group-hover:border-[var(--card-color)] group-hover:bg-[var(--card-color)] group-hover:text-white cursor-pointer">
        Open Tool
      </button>
    </div>
  </Link>
))}
        </div>

      </div>
    </section>
  );
}