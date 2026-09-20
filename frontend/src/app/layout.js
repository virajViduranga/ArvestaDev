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
  return (
   <html lang="en">
      {/* We add min-h-screen flex flex-col so the footer always sticks to the bottom */}
      <body className={`${poppins.className} min-h-screen flex flex-col antialiased`}>
        
      <Navbar />
        
        {/* This is where your page content loads */}
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        
      </body>
    </html>
  );
}