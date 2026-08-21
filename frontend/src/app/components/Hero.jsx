export default function Hero() {
  return (
    <section className="bg-stone-100 px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        
        {/* Main Heading */}
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
          Free Online Web Tools to <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F73F6] to-[#ECBE13]">
            Simplify Everyday Tasks
          </span>
        </h1>
        
        {/* Description Paragraph */}
        <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
          <strong className="font-bold text-amber-500">ArvestaDev</strong> brings useful online tools together in one place. 
          Work with images, PDFs, files, text, calculations, developer utilities, development and boost productivity today.
        </p>
        
        {/* Call to Action Button */}
        <div className="mt-10 flex items-center justify-center">
          <a
            href="/tools"
            className="bg-[#4F73F6] px-8 py-4 text-lg font-semibold text-white shadow-md hover:bg-[#ECBE13] hover:text-slate-900 transition-all duration-300"
          >
            Explore Tools
          </a>
        </div>

      </div>
    </section>
  );
}