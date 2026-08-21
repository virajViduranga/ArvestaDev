import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 px-6 py-12 lg:px-8 mt-auto mt-6">
      <div className="mx-auto max-w-7xl">
        
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand & Description (Takes up 2 columns on large screens) */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-extrabold tracking-tight text-white">
              Arvesta<span className="text-[#4F73F6]">Dev</span><span className="text-[#ECBE13]">.</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 max-w-sm">
              Your all-in-one platform for fast, free online web tools. We simplify everyday tasks with reliable browser-based utilities for developers, students, and professionals.
            </p>
            
            {/* Social Icons (GitHub, X/Twitter, Discord) */}
            <div className="mt-6 flex space-x-5">
              <a href="#" className="text-slate-400 hover:text-[#4F73F6] transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-[#4F73F6] transition-colors">
                <span className="sr-only">X / Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link Column 1: Popular Tools */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Media Tools</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/tools/image-compressor" className="hover:text-[#ECBE13] transition-colors">Image Compressor</Link></li>
              <li><Link href="/tools/image-to-pdf" className="hover:text-[#ECBE13] transition-colors">Image to PDF</Link></li>
              <li><Link href="/tools/pdf-converter" className="hover:text-[#ECBE13] transition-colors">PDF Converter</Link></li>
            </ul>
          </div>

          {/* Link Column 2: Developer Utilities */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Dev Tools</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/tools/json-formatter" className="hover:text-[#ECBE13] transition-colors">JSON Formatter</Link></li>
              <li><Link href="/tools/uuid-generator" className="hover:text-[#ECBE13] transition-colors">UUID Generator</Link></li>
              <li><Link href="/tools/word-counter" className="hover:text-[#ECBE13] transition-colors">Word Counter</Link></li>
            </ul>
          </div>

          {/* Link Column 3: Company / Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-[#ECBE13] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[#ECBE13] transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-[#ECBE13] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#ECBE13] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} ArvestaDev. All rights reserved.</p>
          <p className="mt-4 md:mt-0">
            Built with love for everyday tasks.
          </p>
        </div>
        
      </div>
    </footer>
  );
}