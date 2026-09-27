import "./globals.css";
import { Poppins } from "next/font/google";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";



const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  themeColor: "#ECBE13",
};

export const metadata = {
  title: "ArvestaDev: Free Online Web Tools & Utilities",
  description: "Discover ArvestaDev, your all-in-one platform for fast, free online web tools. Convert PDFs, compress images, calculations, AI, development and boost productivity today.",
  authors: [{ name: "ArvestaDev" }],
  alternates: {
    canonical: "https://arvestadev.com/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "ArvestaDev: Free Online Web Tools & Utilities",
    description: "Access fast, reliable online software utilities directly from your browser. No downloads or Logins required..",
    type: "website",
    url: "https://arvestadev.com/",
    siteName: "ArvestaDev",
    images: [
      {
        url: "https://arvestadev.com/images/og-image.png",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://arvestadev.com/#person",
        "name": "I P Viraj Viduranga",
        "alternateName": "Viraj Viduranga",
        "jobTitle": "Full Stack Developer",
        "url": "https://arvestadev.com",
        "sameAs": [
          "https://www.linkedin.com/in/viraj-viduranga-9b5086344",
          "https://github.com/virajViduranga"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://arvestadev.com/#website",
        "url": "https://arvestadev.com",
        "name": "ArvestaDev",
        "publisher": {
          "@id": "https://arvestadev.com/#person"
        }
      }
    ]
  };

  return (
   <html lang="en">
      <body className={`${poppins.className} min-h-screen flex flex-col antialiased`}>
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        <Navbar />
        
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
        
      </body>
    </html>
  );
}