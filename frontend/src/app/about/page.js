import React from 'react';
import Link from 'next/link';
import { 
  Terminal, FileText, Image as ImageIcon, Calculator, 
  Zap, ShieldCheck, ArrowRight, Layers, Cpu, Code
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
  <div className="flex gap-4 p-6 border-l-4 border-gray-200 hover:border-[#4F73F6] transition-colors bg-white">
    <div className="shrink-0 mt-1">
      <Icon size={24} className="text-[#4F73F6]" />
    </div>
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

const CategoryLink = ({ title, description, href, icon: Icon }) => (
  <Link href={href} className="group block bg-white border border-gray-200 p-6 hover:border-[#4F73F6] transition-colors">
    <div className="flex items-start justify-between mb-4">
      <div className="w-10 h-10 bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
        <Icon size={20} className="text-[#4F73F6]" />
      </div>
      <ArrowRight size={16} className="text-gray-400 group-hover:text-[#4F73F6] group-hover:translate-x-1 transition-all" />
    </div>
    <h3 className="text-md font-bold text-gray-900 mb-2 group-hover:text-[#4F73F6] transition-colors">{title}</h3>
    <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
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
      
      <main className="min-h-screen bg-gray-50 font-sans text-gray-800">
        
        {/* HERO SECTION */}
        <section className="bg-white border-b border-gray-200 pt-20 pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              About ArvestaDev
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed border-l-4 border-[#ECBE13] pl-6 py-2">
              ArvestaDev is a growing collection of fast, practical online tools designed to make everyday digital tasks simpler.
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-16 space-y-24">
          
          {/* OUR STORY & WHAT IS IT (Editorial Layout) */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Layers className="text-[#4F73F6]" /> Our Story
              </h2>
              <div className="prose prose-gray text-gray-600 text-sm leading-loose">
                <p>
                  ArvestaDev was built around a simple idea: useful software should be accessible, easy to understand, and convenient to use. 
                </p>
                <p className="mt-4">
                  Often, completing a small digital task—like formatting a JSON file, analyzing keyword density, or converting an image—requires hunting down disparate websites, navigating cluttered interfaces, or downloading heavy desktop software. 
                </p>
                <p className="mt-4">
                  We wanted to change that by creating a unified platform containing practical, reliable web-based utilities that respect your time and workflow.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Cpu className="text-[#4F73F6]" /> What Is ArvestaDev?
              </h2>
              <div className="prose prose-gray text-gray-600 text-sm leading-loose">
                <p>
                  ArvestaDev brings useful tools into one streamlined platform. We provide an ecosystem of online utilities across multiple categories, meaning you do not need to search across the internet to solve simple technical problems.
                </p>
                <p className="mt-4">
                  From <Link href="/tools/developer" className="text-[#4F73F6] font-bold hover:underline">developer tools</Link> that format code, to <Link href="/tools/text" className="text-[#4F73F6] font-bold hover:underline">text utilities</Link> that analyze content, to <Link href="/tools/image" className="text-[#4F73F6] font-bold hover:underline">image converters</Link> that compress media, every tool is designed to load instantly and run efficiently directly within your web browser.
                </p>
              </div>
            </section>
          </div>

          {/* MISSION */}
          <section className="bg-gray-900 text-white p-8 md:p-12 relative overflow-hidden">
            {/* Subtle decorative accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#4F73F6] opacity-10 translate-x-1/2 -translate-y-1/2"></div>
            
            <h2 className="text-sm font-bold text-[#ECBE13] uppercase tracking-widest mb-4">Our Mission</h2>
            <p className="text-2xl md:text-3xl font-medium leading-relaxed max-w-2xl relative z-10">
              Make useful digital tools simpler, faster, and more accessible for everyone.
            </p>
          </section>

          {/* WHAT WE BELIEVE (Principles) */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-4">What We Believe</h2>
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

          {/* CATEGORIES */}
          <section className="bg-gray-100 p-8 md:p-12 -mx-4 md:mx-0 border-y md:border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Explore Our Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <CategoryLink 
                title="Developer Tools" 
                description="Format, validate, encode, and transform data." 
                href="/explore" 
                icon={Terminal} 
              />
              <CategoryLink 
                title="Text Tools" 
                description="Count, transform, clean, and analyze text." 
                href="/explore" 
                icon={FileText} 
              />
              <CategoryLink 
                title="Image Tools" 
                description="Practical utilities for common image-related tasks." 
                href="/explore" 
                icon={ImageIcon} 
              />
              <CategoryLink 
                title="Calculators" 
                description="Calculators for mathematical and productivity tasks." 
                href="/explore" 
                icon={Calculator} 
              />
            </div>
          </section>

          {/* WHO IS IT FOR & FUTURE VISION */}
          <div className="grid md:grid-cols-2 gap-12">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">Built for Everyone</h2>
              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#ECBE13] mt-1.5 shrink-0"></div>
                  <span><strong>Developers</strong> streamlining their coding workflows.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#ECBE13] mt-1.5 shrink-0"></div>
                  <span><strong>Writers & SEOs</strong> analyzing text and content density.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#ECBE13] mt-1.5 shrink-0"></div>
                  <span><strong>Designers</strong> quickly converting and resizing media.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#ECBE13] mt-1.5 shrink-0"></div>
                  <span><strong>Everyday Users</strong> solving practical tasks without installing heavy desktop software.</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">What's Next?</h2>
              <div className="text-gray-600 text-sm leading-loose">
                <p>
                  ArvestaDev is intended to be a continuously improving collection of digital tools. Our future vision includes expanding the tool collection, adding more advanced developer utilities, and integrating AI-powered features.
                </p>
                <p className="mt-4">
                  We are focused on bringing more useful, professional-grade workflows directly into the browser, making them accessible to anyone with an internet connection.
                </p>
              </div>
            </section>
          </div>

        </div>

        {/* CTA SECTION */}
        <section className="bg-white border-t border-gray-200 py-20 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore What ArvestaDev Can Do</h2>
            <p className="text-gray-600 mb-8">
              Discover practical online tools designed to help you get things done faster.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/explore" 
                className="inline-flex justify-center items-center gap-2 bg-[#4F73F6] text-white font-bold px-8 py-3 hover:bg-blue-700 transition-colors rounded-none"
              >
                Explore Tools <ArrowRight size={18} />
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex justify-center items-center gap-2 bg-gray-100 text-gray-800 font-bold px-8 py-3 hover:bg-gray-200 transition-colors border border-gray-200 rounded-none"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}