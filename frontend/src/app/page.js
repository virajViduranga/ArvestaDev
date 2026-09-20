
import Hero from "../components/Hero";
import PopularTools from "../components/PopularTools";
import WhyArvestaDev from "../components/WhyArvestaDev";
import FAQ from "../components/FAQ";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://arvestadev.com/#website",
        "url": "https://arvestadev.com/",
        "name": "ArvestaDev",
        "description": "Free online web tools and utilities platform.",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://arvestadev.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        },
        "inLanguage": "en",
        
      },
      {
        "@type": "Organization",
        "@id": "https://arvestadev.com/#organization",
        "name": "ArvestaDev",
        "url": "https://arvestadev.com/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://arvestadev.com/logo.png"
        },
       "description": "ArvestaDev provides simple, useful, and reliable online tools and web-based utilities for everyday tasks.",
      },
    ]
  };

  return (
  <main className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />
     
      <PopularTools />
     
     
      <WhyArvestaDev />
      
      <FAQ />
    </main>
  );
}