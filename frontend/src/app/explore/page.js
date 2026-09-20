import React from 'react';
import ExploreToolsClient from './ExploreToolsClient';

// 1. Strong SEO Meta Tags
export const metadata = {
  title: 'Explore Online Tools & Utilities | ArvestaDev',
  description: 'Discover free, fast, and secure online tools for developers, writers, and creators. Includes JSON formatters, word counters, image converters, and more.',
  keywords: ['online tools', 'developer utilities', 'free online tools', 'json formatter', 'word counter', 'image compressor'],
  openGraph: {
    title: 'Explore ArvestaDev Tools',
    description: 'Free browser-based tools to speed up your workflow.',
    type: 'website',
  }
};

export default function ExploreToolsPage() {
  
  // 2. Structured Data (JSON-LD) for Search Engines
  // This helps search engines understand the page content.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Explore Online Tools & Utilities | ArvestaDev',
    description: 'A collection of browser-based utilities for developers and everyday tasks.',
    url: 'https://arvestadev.com/explore', // Update with your actual domain later
    provider: {
      '@type': 'Organization',
      name: 'ArvestaDev'
    }
  };

  return (
    <>
      {/* Inject Structured Data silently into the page head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Render the interactive Client Component */}
      <ExploreToolsClient />
    </>
  );
}