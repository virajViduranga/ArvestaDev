"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-extrabold tracking-tight text-slate-900">
              Arvesta<span className="text-[#4F73F6]">Dev</span><span className="text-[#ECBE13]">.</span>
            </Link>
          </div>

          {/* Desktop Menu Links */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-[#4F73F6] transition-colors">
              Home
            </Link>
            <Link href="/tools" className="text-sm font-medium text-slate-600 hover:text-[#4F73F6] transition-colors">
              All Tools
            </Link>
            <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-[#4F73F6] transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium text-slate-600 hover:text-[#4F73F6] transition-colors">
              Contact
            </Link>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex">
            <Link
              href="/tools"
              className="bg-[#4F73F6] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#ECBE13] hover:text-slate-900 transition-all duration-300"
            >
              Explore Tools
            </Link>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:outline-none transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon changes based on 'isOpen' state (Hamburger vs X) */}
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white shadow-lg absolute w-full">
          <div className="space-y-1 px-4 pb-6 pt-2">
            <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-[#4F73F6]">
              Home
            </Link>
            <Link href="/tools" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-[#4F73F6]">
              All Tools
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-[#4F73F6]">
              About
            </Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-[#4F73F6]">
              Contact
            </Link>
            <div className="mt-4 px-3">
              <Link
                href="/tools"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center bg-[#4F73F6] px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-[#ECBE13] hover:text-slate-900 transition-all duration-300"
              >
                Explore Tools
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}