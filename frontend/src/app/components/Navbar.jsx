"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // 1. Imported the Next.js Image component

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-[var(--color-surface)] backdrop-blur-md border-b border-[var(--color-border)] shadow-sm transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              {/* 2. Added the responsive Image component */}
              <Image 
                src="/logo1.png" 
                alt="ArvestaDev Logo" 
                width={150}
                height={40} 
                className="w-auto h-8 md:h-10 object-contain" 
                priority
              />
              <p className='text-[#D18706] font-extrabold'>Arvesta<span className='text-[#007ACC]'>Dev</span></p>
            </Link>
          </div>

          {/* Desktop Menu Links */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">
              Home
            </Link>
            <Link href="/explore" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">
              All Tools
            </Link>
            <Link href="/about" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">
              About
            </Link>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex">
            <Link
              href="/explore"
              className="bg-[var(--color-primary)] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[var(--color-primary-hover)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-surface)]"
            >
              Explore Tools
            </Link>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-text-primary)] focus:outline-none transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
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
        <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-surface-elevated)] shadow-lg absolute w-full">
          <div className="space-y-1 px-4 pb-6 pt-2">
            <Link href="/" onClick={() => setIsOpen(false)} className="block rounded-md px-3 py-3 text-base font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors">
              Home
            </Link>
            <Link href="/tools" onClick={() => setIsOpen(false)} className="block rounded-md px-3 py-3 text-base font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors">
              All Tools
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="block rounded-md px-3 py-3 text-base font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors">
              About
            </Link>
            
            <div className="mt-4 px-3">
              <Link
                href="/explore"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center bg-[var(--color-primary)] px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-[var(--color-primary-hover)] transition-all duration-300"
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