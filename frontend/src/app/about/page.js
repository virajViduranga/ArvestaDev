import React from 'react';
import Link from 'next/link';
import { 
  Terminal, FileText, Image as ImageIcon, Calculator, 
  Zap, ShieldCheck, ArrowRight, Layers, Cpu, Code,
  FileImage, ImagePlus, Files
} from 'lucide-react';

// ==========================================
// 1. SEO Metadata & Structured Data
// ==========================================

export const metadata = {
  title: 'About ArvestaDev | Online Tools & Digital Utilities',
  description: 'ArvestaDev is a growing collection of fast, practical online tools designed to make everyday digital tasks simpler for developers, writers, and creators.',
  keywords: ['about ArvestaDev', 'online tools', 'developer utilities', 'free online tools', 'productivity tools', 'browser-based utilities'],
  openGraph: {
    title: 'About ArvestaDev',
    description: 'Practical online tools designed to make everyday digital tasks simpler.',
    type: 'website',
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://arvestadev.com/about'
  },
  name: 'About ArvestaDev | Online Tools & Digital Utilities',
  description: 'Learn about ArvestaDev, a platform providing fast, browser-based tools and utilities.',
  publisher: {
    '@type': 'Organization',
    name: 'ArvestaDev',
    url: 'https://arvestadev.com'
  }
};

// ==========================================
// 2. Modular Sub-Components
// ==========================================

const PrincipleBlock = ({ icon: Icon, title, description }) => (
  <div className="group flex gap-4 p-6 border-l-4 border-[var(--color-border)] hover:border-[var(--color-primary)] bg-[var(--color-surface)] cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg">
    
    {/* Icon Wrapper: Scales up and tilts slightly on card hover */}
    <div className="shrink-0 mt-1 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6">
      <Icon size={24} className="text-[var(--color-primary)]" />
    </div>
    
    <div>
      {/* Title: Changes color to your primary brand color on hover */}
      <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2 transition-colors duration-300 group-hover:text-[var(--color-primary)]">
        {title}
      </h3>
      <p className="text-[var(--color-text-secondary)] text-md leading-relaxed">
        {description}
      </p>
    </div>
    
  </div>
);
const ToolCard = ({ title, description, href, icon: Icon, cardColor }) => (
  <Link
    href={href}
    style={{ '--card-color': cardColor }}
    className="group relative flex flex-col rounded-2xl bg-[var(--color-surface)] p-6 border border-[var(--color-border)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] h-full"
  >
    <div className="flex items-start justify-between mb-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--card-color)] transition-colors duration-300">
        <Icon size={24} className="text-white" />
      </div>
    </div>
    
    <div className="flex flex-col flex-1">
      <h3 className="mb-2 text-lg font-semibold text-[var(--color-text-primary)] transition-colors duration-300 group-hover:text-[var(--card-color)]">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] line-clamp-2">
        {description}
      </p>
    </div>

    <div className="mt-8 flex justify-end">
      <button className="flex items-center gap-2 rounded-none border border-[var(--color-border)] bg-transparent px-4 py-2 text-xs font-semibold text-[var(--color-text-primary)] transition-all duration-300 group-hover:border-[var(--card-color)] group-hover:bg-[var(--card-color)] group-hover:text-white cursor-pointer">
        Open Tool
        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </Link>
);

// ==========================================
// 3. Main Page Component
// ==========================================

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
     <main className="min-h-screen bg-[var(--color-background)] font-sans text-[var(--color-text-primary)]">
        
        {/* HERO SECTION */}
        <section className="bg-[var(--color-surface)] border-b border-[var(--color-border)] pt-20 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-6 tracking-tight">
              About ArvestaDev
            </h1>
            <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] leading-relaxed border-l-4 border-[var(--color-warning)] pl-6 py-2">
              ArvestaDev is a growing collection of fast, practical online tools designed to make everyday digital tasks simpler.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-16 space-y-24">
          
          {/* OUR STORY & WHAT IS IT (Editorial Layout) */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-8">
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-3">
                <Layers className="text-[var(--color-primary)]" /> Our Story
              </h2>
              <div className="text-[var(--color-text-secondary)] text-md leading-loose space-y-4">
                <p>
                  ArvestaDev was built around a simple idea: useful software should be accessible, easy to understand, and convenient to use. 
                </p>
                <p>
                  Often, completing a small digital task—like formatting a JSON file, analyzing keyword density, or converting an image—requires hunting down disparate websites, navigating cluttered interfaces, or downloading heavy desktop software. 
                </p>
                <p>
                  We wanted to change that by creating a unified platform containing practical, reliable web-based utilities that respect your time and workflow.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-3">
                <Cpu className="text-[var(--color-primary)]" /> What Is ArvestaDev?
              </h2>
              <div className="text-[var(--color-text-secondary)] text-md leading-loose space-y-4">
                <p>
                  ArvestaDev brings useful tools into one streamlined platform. We provide an ecosystem of online utilities across multiple categories, meaning you do not need to search across the internet to solve simple technical problems.
                </p>
                <p>
                  From <Link href="/tools/developer" className="text-[var(--color-primary)] font-bold hover:underline">developer tools</Link> that format code, to <Link href="/tools/text" className="text-[var(--color-primary)] font-bold hover:underline">text utilities</Link> that analyze content, to <Link href="/tools/image" className="text-[var(--color-primary)] font-bold hover:underline">image converters</Link> that compress media, every tool is designed to load instantly and run efficiently directly within your web browser.
                </p>
              </div>
            </section>
          </div>

          {/* MISSION - Uses high-contrast inversion for modern dark/light compatibility */}
        <section 
  className="relative p-8 md:p-12 overflow-hidden bg-cover bg-center"
  style={{ backgroundImage: "url('/mission.webp')" }}
>
<div className="absolute inset-0 bg-black/55 z-0"></div>
  <div className="relative z-10 text-white">
    <h2 className="text-sm font-bold text-[var(--color-warning)] uppercase tracking-widest mb-4">
      Our Mission
    </h2>
    <p className="text-2xl md:text-3xl font-medium leading-relaxed max-w-2xl text-[var(--color-background)]">
      Make useful digital tools simpler, faster, and more accessible for everyone.
    </p>
  </div>
</section>

          {/* WHAT WE BELIEVE (Principles) */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8 border-b border-[var(--color-border)] pb-4">What We Believe</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <PrincipleBlock 
                icon={Zap}
                title="Speed & Simplicity"
                description="Tools should be easy to understand and use. Users should be able to complete tasks quickly without unnecessary friction, ads, or complex onboarding."
              />
              <PrincipleBlock 
                icon={ShieldCheck}
                title="Privacy First"
                description="We respect your data. For browser-based tools, we aim to process information locally on your device whenever technically possible, reducing unnecessary data transmission."
              />
              <PrincipleBlock 
                icon={Code}
                title="Practicality"
                description="We build tools that solve real problems. We focus on reliable functionality and thoughtful user experience rather than adding features simply for the sake of complexity."
              />
              <PrincipleBlock 
                icon={Layers}
                title="Continuous Improvement"
                description="Software is never truly finished. We are committed to refining existing tools based on usage and introducing better utilities over time."
              />
            </div>
          </section>

          {/* TOOLS */}
          <section className="bg-[var(--color-secondary)] p-8 md:p-12 -mx-4 md:mx-0">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8 text-center">Explore Our Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <ToolCard 
                title="JSON Formatter" 
                description="Format, validate, minify, and inspect JSON instantly in your browser." 
                href="/tools/json-formatter" 
                cardColor="#8045F5"
                icon={Terminal} 
              />
              <ToolCard 
                title="Word Counter" 
                description="Advanced real-time word, character, and sentence counting with keyword analysis." 
                href="/tools/word-counter" 
                cardColor="#455FF5"
                icon={FileText} 
              />
              <ToolCard 
                title="Image Compressor" 
                description="Compress JPG, PNG, and WebP images to smaller file sizes without quality loss." 
                href="/tools/image-compressor" 
                cardColor="#0AC756"
                icon={ImageIcon} 
              />
              <ToolCard 
                title="JPG to PDF" 
                description="Convert multiple JPG or PNG images into a single PDF document." 
                href="/tools/jpg-to-pdf" 
                cardColor="#F2A60D"
                icon={FileImage} 
              />
              <ToolCard 
                title="PDF to JPG" 
                description="Extract every page of your PDF into high-quality JPG images." 
                href="/tools/pdf-to-jpg" 
                cardColor="#F54577"
                icon={ImagePlus} 
              />
              <ToolCard 
                title="PDF to Word" 
                description="Convert PDFs into editable Word documents, preserving formatting." 
                href="/tools/pdf-to-word" 
                cardColor="#F2700D"
                icon={FileText} 
              />
              <ToolCard 
                title="Word to PDF" 
                description="Securely convert Word documents to PDF formatting. Supports batch processing." 
                href="/tools/word-to-pdf" 
                cardColor="#007acc"
                icon={FileText} 
              />
              <ToolCard 
                title="Merge PDF" 
                description="Combine multiple PDFs into one document directly in your browser." 
                href="/tools/merge-pdf" 
                cardColor="#10B981"
                icon={Files} 
              />
            </div>
          </section>

          {/* WHO IS IT FOR & FUTURE VISION */}
          <div className="grid md:grid-cols-2 gap-12">
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6 border-b border-[var(--color-border)] pb-4">Built for Everyone</h2>
              <ul className="space-y-4 text-md text-[var(--color-text-secondary)]">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[var(--color-warning)] mt-1.5 shrink-0"></div>
                  <span><strong className="text-[var(--color-text-primary)]">Developers</strong> streamlining their coding workflows.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[var(--color-warning)] mt-1.5 shrink-0"></div>
                  <span><strong className="text-[var(--color-text-primary)]">Writers & SEOs</strong> analyzing text and content density.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[var(--color-warning)] mt-1.5 shrink-0"></div>
                  <span><strong className="text-[var(--color-text-primary)]">Designers</strong> quickly converting and resizing media.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[var(--color-warning)] mt-1.5 shrink-0"></div>
                  <span><strong className="text-[var(--color-text-primary)]">Everyday Users</strong> solving practical tasks without installing heavy desktop software.</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6 border-b border-[var(--color-border)] pb-4">What's Next?</h2>
              <div className="text-[var(--color-text-secondary)] text-md leading-loose space-y-4">
                <p>
                  ArvestaDev is intended to be a continuously improving collection of digital tools. Our future vision includes expanding the tool collection, adding more advanced developer utilities, and integrating AI-powered features.
                </p>
                <p>
                  We are focused on bringing more useful, professional-grade workflows directly into the browser, making them accessible to anyone with an internet connection.
                </p>
              </div>
            </section>
          </div>

        </div>

        {/* CTA SECTION */}
        <section className="bg-[var(--color-surface)] border-t border-[var(--color-border)] py-20 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">Explore What ArvestaDev Can Do</h2>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Discover practical online tools designed to help you get things done faster.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/explore" 
                className="inline-flex justify-center items-center gap-2 bg-[var(--color-primary)] text-[var(--color-text-on-primary)] font-bold px-8 py-3 hover:bg-[var(--color-primary-hover)] transition-colors rounded-none"
              >
                Explore Tools <ArrowRight size={18} />
              </Link>
           
            </div>
          </div>
        </section>

      </main>
    </>
  );
}