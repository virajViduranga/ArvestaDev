"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Is ArvestaDev completely free to use?",
    answer: "Yes! ArvestaDev is a 100% free platform. You can use all of our online web tools, including our image compressors, PDF utilities, and developer tools, without any hidden fees or subscriptions."
  },
  {
    question: "Do I need to create an account or log in?",
    answer: "No registration is required. We believe in saving you time, so you can access and use every software utility directly in your browser instantly without signing up."
  },
  {
    question: "Do I need to download software to use it?",
    answer:
      "No. All of our software utilities operate entirely within your web browser. You do not need to download any apps or register for an account. Just open the tool and start working immediately.",
  },
  {
    question: "Are my files and data safe?",
    answer: "Absolutely. Your privacy and security are our top priorities. Most of our tools process data locally within your browser. If a file does need to be uploaded for conversion, it is processed securely and automatically deleted from our servers immediately after."
  },
  {
    question: "Can I use these web tools on my mobile phone?",
    answer: "Yes! ArvestaDev is fully responsive and mobile-friendly. You can comfortably convert files, compress images, and use our developer utilities on any smartphone, tablet, or desktop device."
  },
  {
    question: "What kind of online tools do you offer?",
    answer: "We offer a wide variety of browser-based tools categorized into Media Tools (Image to PDF, Image Compressors), Developer Tools (JSON Formatters, UUID Generators), and Text Utilities (Word Counters). We are always adding new tools to help simplify your everyday tasks."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-slate-50 py-16 px-6 lg:px-8 border-t border-slate-200">
      <div className="mx-auto max-w-3xl">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Everything you need to know about using our free web tools.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-slate-200 bg-white rounded-xl overflow-hidden transition-all duration-200 hover:border-[#4F73F6]/50"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none"
              >
                <span className="text-base font-semibold text-slate-900">
                  {faq.question}
                </span>
                
                {/* Chevron Icon (Flips when open) */}
                <span className={`ml-6 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-slate-50 transition-transform duration-300 ${openIndex === index ? "rotate-180 bg-blue-50 text-[#4F73F6]" : "text-slate-400"}`}>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              
              {/* Expandable Answer */}
              <div 
                className={`px-6 text-slate-600 text-sm leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-96 pb-5 opacity-100" : "max-h-0 opacity-0"}`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}