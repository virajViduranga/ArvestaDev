'use client';

import React from 'react';
import { 
  Terminal, FileText, Image as ImageIcon, 
  FileImage, ImagePlus, Files
} from 'lucide-react';
import Link from 'next/link';

const tools = [
  {
    name: "JSON Formatter",
    description: "Format, validate, minify, and inspect JSON instantly in your browser.",
    href: "/tools/json-formatter",
    category: "Developer Tool",
    cardColor: "#8045F5",
    icon: <Terminal className="w-6 h-6 text-white" />,
  },
  {
    name: "Word Counter",
    description: "Advanced real-time word, character, and sentence counting with keyword analysis.",
    href: "/tools/word-counter",
    category: "Text Tool",
    cardColor: "#455FF5",
    icon: <FileText className="w-6 h-6 text-white" />,
  },
  {
    name: "Image Compressor",
    description: "Compress JPG, PNG, and WebP images to smaller file sizes without quality loss.",
    href: "/tools/image-compressor",
    category: "Image Tool",
    cardColor: "#0AC756",
    icon: <ImageIcon className="w-6 h-6 text-white" />,
  },
  {
    name: "JPG to PDF",
    description: "Convert multiple JPG or PNG images into a single PDF document.",
    href: "/tools/jpg-to-pdf",
    category: "PDF Tool",
    cardColor: "#F2A60D",
    icon: <FileImage className="w-6 h-6 text-white" />,
  },
  {
    name: "PDF to JPG",
    description: "Extract every page of your PDF into high-quality JPG images.",
    href: "/tools/pdf-to-jpg",
    category: "PDF Tool",
    cardColor: "#F54577",
    icon: <ImagePlus className="w-6 h-6 text-white" />,
  },
  {
    name: "PDF to Word",
    description: "Convert PDFs into editable Word documents, preserving formatting.",
    href: "/tools/pdf-to-word",
    category: "PDF Tool",
    cardColor: "#F2700D",
    icon: <FileText className="w-6 h-6 text-white" />,
  },
  {
    name: "Word to PDF",
    description: "Securely convert Word documents to PDF formatting. Supports batch processing.",
    href: "/tools/word-to-pdf",
    category: "PDF Tool",
    cardColor: "#007acc",
    icon: <FileText className="w-6 h-6 text-white" />,
  },
  {
    name: "Merge PDF",
    description: "Combine multiple PDFs into one document directly in your browser.",
    href: "/tools/merge-pdf",
    category: "PDF Tool",
    cardColor: "#10B981",
    icon: <Files className="w-6 h-6 text-white" />,
  },
];

export default function ExploreToolsClient() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] font-sans">
      
      {/* Hero Section */}
      <section className="bg-[var(--color-surface)] border-b border-[var(--color-border)] pt-16 pb-12 px-4 transition-colors duration-200">
        <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-6 tracking-tight">
            Explore Powerful Tools for <span className="text-[var(--color-primary)]">Work & Development</span>
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
            Fast, accessible, browser-based utilities to help you solve everyday tasks. 
            No installations required. Everything processes securely on your device.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <h2 className='font-bold mb-4 text-2xl'>All Available Tools</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              style={{ '--card-color': tool.cardColor }}
              className="group relative flex flex-col rounded-2xl bg-[var(--color-surface)] p-6 border border-[var(--color-border)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--card-color)] transition-colors duration-300">
                  {tool.icon}
                </div>
                <span className="rounded-full bg-[var(--color-secondary)] px-3 py-1 text-[10px] font-medium tracking-wide text-[var(--color-text-secondary)] uppercase transition-colors duration-300 group-hover:bg-[var(--card-color)] group-hover:text-white">
                  {tool.category}
                </span>
              </div>
              
              <div className="flex flex-col flex-1">
                <h3 className="mb-2 text-lg font-semibold text-[var(--color-text-primary)] transition-colors duration-300 group-hover:text-[var(--card-color)]">
                  {tool.name}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] line-clamp-2">
                  {tool.description}
                </p>
              </div>

              <div className="mt-8 flex justify-end">
                <button className="flex items-center gap-2 rounded-none border border-[var(--color-border)] bg-transparent px-4 py-2 text-xs font-semibold text-[var(--color-text-primary)] transition-all duration-300 group-hover:border-[var(--card-color)] group-hover:bg-[var(--card-color)] group-hover:text-white cursor-pointer">
                  Open Tool
                </button>
              </div>
            </Link>
          ))}
        </div>

        {/* SEO Content Section (Bottom of page) */}
        <section className="mt-24 bg-cover bg-center border-l-4 border-[var(--color-primary)] p-8 md:p-12 shadow-sm"
        style={{ backgroundImage: "url('/explore.webp')" }}>
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">Free Online Tools for Everyday Tasks</h2>
            <div className="space-y-6 text-[var(--color-text-secondary)] leading-relaxed">
              <p>
                ArvestaDev provides a growing collection of fast, secure, and completely free online utilities designed to streamline your daily workflow. Whether you are writing code, writing essays, or editing media, our platform gives you the tools you need directly in your web browser.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                    <Terminal size={20} className="text-[var(--color-primary)]" /> Developer Utilities
                  </h3>
                  <p className="text-sm">
                    Speed up your development process with our technical tools. Format messy JSON, encode data safely, generate hashes, and validate your code logic instantly. All processing happens on your machine to protect your sensitive data.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                    <FileText size={20} className="text-[var(--color-primary)]" /> Text & Content Tools
                  </h3>
                  <p className="text-sm">
                    Perfect for writers, students, and SEO professionals. Count words, analyze keyword density, change text casing, and clean up messy formatting with a single click.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
