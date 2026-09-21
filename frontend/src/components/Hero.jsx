import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-[var(--color-background)] pt-20 pb-16 lg:pt-32 lg:pb-28 transition-colors duration-300"
      style={{
        backgroundImage: 'url("/bg02.webp")',
        backgroundRepeat: "repeat",
      }}
    >
      <div className="mx-auto max-w-[1500px] px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-16 lg:grid-cols-2 lg:items-center">
          <HeroContent />
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}


function HeroContent() {
  return (
    <div className="max-w-2xl lg:max-w-none">
      {/* Eyebrow */}
      <div className="mb-6 flex">
        <span className="relative rounded-full bg-transparent backdrop-blur-[3px] px-3 py-1 text-sm font-semibold leading-6 text-white">
          Practical Online Utilities
        </span>
      </div>

      <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl xl:text-6xl text-balance">
        Powerful Online Tools. <br className="hidden sm:block" />
        <span className="text-[var(--color-primary)]">
          Built to Get Things Done.
        </span>
      </h1>

      <p className="mt-6 text-lg leading-8 text-white text-balance">
        ArvestaDev brings practical developer, productivity, file, and text
        tools together in one fast, simple place. No installations or
        clutter, just high-quality utilities ready when you need them.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center sm:items-center gap-4">
        <Link
          href="/explore"
          className="group animate-shine relative overflow-hidden inline-flex items-center justify-center bg-[var(--color-primary)] px-16 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-[var(--color-primary-hover)] transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-background)]"
        >
          Explore Tools
        </Link>
      </div>

      <TrustIndicators />
    </div>
  );
}

function TrustIndicators() {
  const benefits = [
    "Fast browser-based tools",
    "No Sign-up required",
    "No installation required",
    "Developer-friendly",
  ];

  return (
    <div className="mt-10 border-t border-[var(--color-border)] pt-6">
      <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-y-3 gap-x-6">
        {benefits.map((benefit, index) => (
          <li
            key={index}
            className="flex items-center text-sm font-medium text-white"
          >
            <svg
              className="mr-2 h-5 w-5 text-[var(--color-primary)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="hidden sm:block relative w-full max-w-lg mx-auto lg:max-w-none">
      <div className="relative rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md shadow-2xl transition-colors duration-300 overflow-hidden group">
        {/* Top Bar */}
        <div className="flex items-center border-b border-white/10 bg-white/10 px-4 py-3">
          <div className="flex space-x-2">
            <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
            <div className="h-3 w-3 rounded-full bg-amber-500/80"></div>
            <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="ml-4 flex-1 text-center">
            <div className="inline-block rounded-md bg-black/20 px-3 py-1 text-xs font-medium text-gray-300 border border-white/10">
              arvestadev.com/tools/json-formatter
            </div>
          </div>
        </div>

        {/* Mockup Inner Interface */}
        <div className="flex h-72 sm:h-80 w-full bg-transparent">
          {/* Mockup Sidebar */}
          <div className="hidden sm:flex w-1/3 flex-col border-r border-white/10 bg-white/5 p-3 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 px-2 mt-1">
              Categories
            </div>

            <div className="flex items-center rounded-lg bg-[var(--color-primary)]/20 px-3 py-2 text-sm font-medium text-white">
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
              Developer
            </div>

            <div className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              File Tools
            </div>

            <div className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
              Text Tools
            </div>
          </div>

          {/* Mockup Main Editor Area */}
          <div className="flex-1 flex flex-col relative">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 bg-white/5">
              <span className="text-xs font-medium text-gray-300">
                input.json
              </span>
              <button className="text-xs rounded bg-[var(--color-primary)] px-2 py-1 text-white hover:opacity-80 transition-opacity">
                Format
              </button>
            </div>

            {/* Editor Content */}
            <div className="p-4 font-mono text-sm leading-relaxed overflow-hidden text-gray-200">
              <span className="text-yellow-400">{`{`}</span>
              <br />
              &nbsp;&nbsp;<span className="text-blue-400">"app"</span>:{" "}
              <span className="text-green-400">"ArvestaDev"</span>,<br />
              &nbsp;&nbsp;<span className="text-blue-400">"status"</span>:{" "}
              <span className="text-green-400">"online"</span>,<br />
              &nbsp;&nbsp;<span className="text-blue-400">
                "features"
              </span>: <span className="text-yellow-400">{`[`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-green-400">"Fast"</span>,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-green-400">"Secure"</span>,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-green-400">"Developer-friendly"</span>
              <br />
              &nbsp;&nbsp;<span className="text-yellow-400">{`]`}</span>
              <br />
              <span className="text-yellow-400">{`}`}</span>
              {/* Animated scanning line */}
              <div className="absolute top-10 left-0 w-full h-0.5 bg-[var(--color-primary)]/50 shadow-[0_0_8px_var(--color-primary)] opacity-0 group-hover:opacity-100 group-hover:animate-[scan_2s_ease-in-out_infinite] transition-opacity"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for the scanning animation */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes scan {
          0% { transform: translateY(0); }
          50% { transform: translateY(150px); }
          100% { transform: translateY(0); }
        }
      `,
        }}
      />
    </div>
  );
}
