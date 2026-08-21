export default function WhyArvestaDev() {
  const features = [
    {
      title: "No Sign-Ups Required",
      description: "Skip the hassle. Access all our free online web tools instantly from your browser without creating an account or remembering passwords.",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      ),
    },
    {
      title: "Secure & Private",
      description: "Your data is safe. Many of our utilities process files locally on your device, meaning your sensitive documents never even reach our servers.",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.956 11.956 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "Fast & Reliable",
      description: "Built with modern web technologies, our platform delivers lightning-fast performance for everything from image compression to complex developer tasks.",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: "100% Free to Use",
      description: "Enjoy premium-quality software utilities, PDF converters, and calculators completely free of charge. No hidden fees or strict daily limits.",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-white py-16 px-6 lg:px-8 border-t border-slate-100">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Why Use Arvesta<span className="text-[#4F73F6]">Dev</span>?
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            We designed our platform to be the easiest, fastest way to get your everyday digital tasks done. Here is why users trust our tools.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 transition-all duration-300 hover:shadow-md hover:border-[#4F73F6]/30 hover:-translate-y-1"
            >
              {/* Icon Circle */}
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#4F73F6] shadow-md group-hover:bg-[#ECBE13] transition-colors duration-300">
                {feature.icon}
              </div>
              
              {/* Feature Text */}
              <h3 className="mb-3 text-lg font-bold text-slate-900">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}