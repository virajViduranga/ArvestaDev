import Link from "next/link";

const tools = [
  {
    name: "Image Compressor",
    description: "Compress JPG, PNG, and WebP images to smaller file sizes without quality loss.",
    href: "/tools/image-compressor",
    category: "Image Tool",
    cardColor: "#0AC756",
    icon: (
      <svg className="w-6 h-6 text-[#ffffff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: "Image to PDF",
    description: "Convert single or multiple image files into clean, shareable PDF documents.",
    href: "/tools/image-to-pdf",
    category: "PDF Tool",
    cardColor: "#F2A60D",
    icon: (
      <svg className="w-6 h-6 text-[#ffffff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    name: "PDF Converter",
    description: "Quickly convert PDF documents to and from various editable formats.",
    href: "/tools/pdf-converter",
    category: "PDF Tool",
    cardColor: "#F2700D",
    icon: (
      <svg className="w-6 h-6 text-[#ffffff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    name: "Word Counter",
    description: "Count words, characters, sentences, and estimate reading time in real time.",
    href: "/tools/word-counter",
    category: "Text Tool",
    cardColor: "#455FF5",
    icon: (
      <svg className="w-6 h-6 text-[#ffffff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
    ),
  },
  {
    name: "JSON Formatter",
    description: "Validate, format, and beautify raw JSON data with clean indentation.",
    href: "/tools/json-formatter",
    category: "Developer Tool",
    cardColor: "#8045F5",
    icon: (
      <svg className="w-6 h-6 text-[#ffffff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    name: "UUID Generator",
    description: "Instantly create unique version 4 UUIDs (GUIDs) individually or in bulk.",
    href: "/tools/uuid-generator",
    category: "Developer Tool",
    cardColor: "#F54577",
    icon: (
      <svg className="w-6 h-6 text-[#ffffff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
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
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  </Link>
))}
        </div>

      </div>
    </section>
  );
}