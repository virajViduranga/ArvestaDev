import Link from "next/link";

const tools = [
  {
    name: "Image Compressor",
    description: "Compress JPG, PNG, and WebP images to smaller file sizes without quality loss.",
    href: "/tools/image-compressor",
    category: "Image Tool",
    icon: (
      <svg className="w-6 h-6 text-[#4F73F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: "Image to PDF",
    description: "Convert single or multiple image files into clean, shareable PDF documents.",
    href: "/tools/image-to-pdf",
    category: "PDF Tool",
    icon: (
      <svg className="w-6 h-6 text-[#4F73F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    name: "PDF Converter",
    description: "Quickly convert PDF documents to and from various editable formats.",
    href: "/tools/pdf-converter",
    category: "PDF Tool",
    icon: (
      <svg className="w-6 h-6 text-[#4F73F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    name: "Word Counter",
    description: "Count words, characters, sentences, and estimate reading time in real time.",
    href: "/tools/word-counter",
    category: "Text Tool",
    icon: (
      <svg className="w-6 h-6 text-[#4F73F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
    ),
  },
  {
    name: "JSON Formatter",
    description: "Validate, format, and beautify raw JSON data with clean indentation.",
    href: "/tools/json-formatter",
    category: "Developer Tool",
    icon: (
      <svg className="w-6 h-6 text-[#4F73F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    name: "UUID Generator",
    description: "Instantly create unique version 4 UUIDs (GUIDs) individually or in bulk.",
    href: "/tools/uuid-generator",
    category: "Developer Tool",
    icon: (
      <svg className="w-6 h-6 text-[#4F73F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
  },
];

export default function PopularTools() {
  return (
    <section className="bg-white py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-semibold tracking-wider uppercase text-[#4F73F6]">
            Featured Utilities
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mt-2">
            Popular Online Tools
          </h2>
          <p className="mt-3 text-slate-600 text-base max-w-xl mx-auto">
            Choose from our most popular free tools designed to save you time.
          </p>
        </div>

        {/* 6-Card Responsive Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#4F73F6] hover:bg-white hover:shadow-md"
            >
              <div>
                {/* Icon & Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 transition-colors group-hover:bg-[#4F73F6]/10">
                    {tool.icon}
                  </div>
                  <span className="rounded-full bg-slate-200/60 px-2.5 py-1 text-xs font-medium text-slate-600 group-hover:bg-[#ECBE13]/20 group-hover:text-amber-900 transition-colors">
                    {tool.category}
                  </span>
                </div>

                {/* Card Title & Description */}
                <h3 className="text-xl font-semibold text-slate-900 group-hover:text-[#4F73F6] transition-colors">
                  {tool.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {tool.description}
                </p>
              </div>

              {/* Action Link / Arrow */}
              <div className="mt-6 flex items-center text-sm font-medium text-[#4F73F6] group-hover:translate-x-1 transition-transform">
                Open Tool
                <svg className="ml-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}