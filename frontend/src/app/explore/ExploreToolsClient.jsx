'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, X, Terminal, FileText, Image as ImageIcon, 
  Calculator, ArrowRight, Zap, Star
} from 'lucide-react';
import Link from 'next/link';

// 1. Structured Data Array for all ArvestaDev tools
const toolsData = [
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    slug: '/tools/json-formatter',
    description: 'Format, validate, minify, and inspect JSON instantly in your browser.',
    category: 'Developer Tools',
    icon: Terminal,
    tags: ['json', 'developer', 'validator', 'format', 'minify'],
    isNew: true,
    isPopular: true,
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    slug: '/tools/word-counter',
    description: 'Advanced real-time word, character, and sentence counting with keyword analysis.',
    category: 'Text Tools',
    icon: FileText,
    tags: ['text', 'word count', 'writing', 'seo', 'analysis'],
    isNew: false,
    isPopular: true,
  },
  {
    id: 'image-converter',
    name: 'Image Converter',
    slug: '/tools/image-compressor',
    description: 'Batch convert and compress images to WebP, PNG, or JPEG locally.',
    category: 'Image Tools',
    icon: ImageIcon,
    tags: ['image', 'compressor', 'converter', 'webp', 'resize'],
    isNew: true,
    isPopular: false,
  },
  // Placeholders for your future tools
  {
    id: 'base64-encoder',
    name: 'Base64 Encoder',
    slug: '/tools/base64',
    description: 'Encode and decode text or files to Base64 format safely.',
    category: 'Developer Tools',
    icon: Terminal,
    tags: ['base64', 'encode', 'decode', 'developer'],
    isNew: false,
    isPopular: false,
  },
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    slug: '/tools/percentage-calculator',
    description: 'Calculate percentages, increases, and decreases quickly.',
    category: 'Calculators',
    icon: Calculator,
    tags: ['math', 'percentage', 'calculator', 'numbers'],
    isNew: false,
    isPopular: false,
  }
];

const categories = ['All Tools', 'Developer Tools', 'Text Tools', 'Image Tools', 'Calculators'];

export default function ExploreToolsClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Tools');

  // Fast client-side filtering logic
  const filteredTools = useMemo(() => {
    return toolsData.filter((tool) => {
      const matchesCategory = activeCategory === 'All Tools' || tool.category === activeCategory;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchLower) ||
        tool.description.toLowerCase().includes(searchLower) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchLower));
      
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const popularTools = toolsData.filter(t => t.isPopular);
  const newTools = toolsData.filter(t => t.isNew);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      
      {/* 1. Hero Section */}
      <section className="bg-white border-b border-gray-200 pt-16 pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Explore Powerful Tools for <span className="text-[#007acc]">Work & Development</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mb-10 leading-relaxed">
            Fast, accessible, browser-based utilities to help you solve everyday tasks. 
            No installations required. Everything processes securely on your device.
          </p>

          {/* 2. Search Experience */}
          <div className="relative w-full max-w-2xl group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400 group-focus-within:text-[#007acc] transition-colors" />
            </div>
            <input
              type="text"
              className="w-full p-4 pl-12 pr-12 text-lg border-2 border-gray-300 rounded-none focus:outline-none focus:border-[#007acc] shadow-sm transition-colors bg-white text-gray-900 placeholder-gray-400"
              placeholder="Search tools, utilities, converters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-700"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        
        {/* 3. Category Navigation */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-gray-200 pb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setSearchQuery(''); // Clear search when switching categories
              }}
              className={`px-4 py-2 text-sm font-bold rounded-none transition-colors border-2
                ${activeCategory === category 
                  ? 'bg-[#007acc] text-white border-[#4F73F6]' 
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#4F73F6] hover:text-[#007acc]'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 4. Tool Grids */}
        {searchQuery ? (
          /* Search Results State */
          <div>
            <h2 className="text-xl font-bold mb-6 text-gray-800">
              Search Results for "{searchQuery}"
            </h2>
            {filteredTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map(tool => <ToolCard key={tool.id} tool={tool} />)}
              </div>
            ) : (
              <div className="bg-white border-2 border-dashed border-gray-300 p-12 text-center flex flex-col items-center">
                <Search className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-bold text-gray-800 mb-2">No tools found</h3>
                <p className="text-gray-500">Try searching for another keyword or browse our categories above.</p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-6 px-6 py-2 bg-[#007acc] text-white font-bold rounded-none hover:bg-blue-700 transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Default Browse State */
          <div className="space-y-16">
            
            {/* Show Featured/Popular only if viewing 'All Tools' */}
            {activeCategory === 'All Tools' && (
              <>
                <section>
                  <div className="flex items-center gap-2 mb-6">
                    
                    <h2 className="text-2xl font-bold text-gray-900">Start With These Tools</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {popularTools.map(tool => <ToolCard key={tool.id} tool={tool} />)}
                  </div>
                </section>
                
                <hr className="border-gray-200" />
              </>
            )}

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {activeCategory === 'All Tools' ? 'All Available Tools' : activeCategory}
              </h2>
              {filteredTools.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTools.map(tool => <ToolCard key={tool.id} tool={tool} />)}
                </div>
              ) : (
                <div className="bg-white border border-gray-200 p-8 text-center text-gray-500">
                  More {activeCategory.toLowerCase()} are coming soon to ArvestaDev.
                </div>
              )}
            </section>
          </div>
        )}

        {/* 5. SEO Content Section (Bottom of page) */}
        <section className="mt-24 bg-white border-t-4 border-[#007acc] p-8 md:p-12 shadow-sm">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Free Online Tools for Everyday Tasks</h2>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                ArvestaDev provides a growing collection of fast, secure, and completely free online utilities designed to streamline your daily workflow. Whether you are writing code, writing essays, or editing media, our platform gives you the tools you need directly in your web browser.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Terminal size={20} className="text-[#007acc]" /> Developer Utilities
                  </h3>
                  <p className="text-sm">
                    Speed up your development process with our technical tools. Format messy JSON, encode data safely, generate hashes, and validate your code logic instantly. All processing happens on your machine to protect your sensitive data.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <FileText size={20} className="text-[#007acc]" /> Text & Content Tools
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

// 6. Reusable Tool Card Component
function ToolCard({ tool }) {
  const Icon = tool.icon;
  
  return (
    <Link href={tool.slug} className="group block h-full">
      <div className="bg-white border border-gray-200 h-full p-6 flex flex-col transition-all duration-200 hover:border-[#007acc] hover:shadow-md rounded-none relative">
        
        {/* Badges */}
        <div className="absolute top-4 right-4 flex gap-2">
          {tool.isNew && (
            <span className="bg-[#007acc] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-none flex items-center gap-1">
              <Zap size={10} /> New
            </span>
          )}
          {!tool.isNew && tool.isPopular && (
            <span className="bg-[#D18706] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-none">
              Popular
            </span>
          )}
        </div>

        {/* Card Header */}
        <div className="mb-4">
          <div className="w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center mb-4 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
            <Icon size={24} className="text-[#007acc]" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#007acc] transition-colors">
            {tool.name}
          </h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
            {tool.category}
          </p>
        </div>

        {/* Card Body */}
        <p className="text-gray-600 text-sm flex-grow mb-6 line-clamp-3">
          {tool.description}
        </p>

        {/* Card Footer / CTA */}
        <div className="flex items-center text-[#007acc] font-bold text-sm">
          Open Tool <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}