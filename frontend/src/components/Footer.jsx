import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-[var(--color-border)] px-6 py-8 mt-auto w-full">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* 1. Left: Brand & Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link href="/" className="text-xl font-extrabold tracking-tight text-white">
            Arvesta<span className="text-[var(--color-primary)]">Dev</span><span className="text-[var(--color-warning)]">.</span>
          </Link>
          <p className="mt-1 text-sm text-white">
            Built with love for everyday tasks.
          </p>
        </div>

        {/* 2. Center: Flattened Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          <Link 
            href="/explore" 
            className="text-sm font-medium text-white hover:text-[var(--color-primary)] transition-colors"
          >
            Explore Tools
          </Link>
          <Link 
            href="/about" 
            className="text-sm font-medium text-white hover:text-[var(--color-primary)] transition-colors"
          >
            About Us
          </Link>
          {/* You can easily add more links here, they will just flow horizontally */}
        </nav>

        {/* 3. Right: Copyright */}
        <div className="text-sm text-[var(--color-text-muted)] text-center md:text-right">
          <p>© {new Date().getFullYear()} ArvestaDev.</p>
          <p>All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}