import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { siteConfig } from "@/config/site";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/coach.jpg",
        width: 800,
        height: 1000,
        alt: "Hypertrex Fitness Coaching Protocol",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/assets/coach.jpg"],
    creator: "@y.xsh_m",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  
  // JSON-LD Structured Data
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HealthClub",
    "name": "Hypertrex Fitness Elite Coaching",
    "image": `${siteConfig.url}/assets/coach.jpg`,
    "@id": `${siteConfig.url}/#localbusiness`,
    "url": siteConfig.url,
    "telephone": siteConfig.contact.phone,
    "priceRange": "$$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.contact.address,
      "addressLocality": "Los Angeles",
      "addressRegion": "CA",
      "postalCode": "90210",
      "addressCountry": "US"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "06:00",
      "closes": "22:00"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does online coaching work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Online coaching is our most comprehensive optimization system. We start with detailed biological and lifestyle mapping, construct bespoke programming, and perform weekly biofeedback audits to adjust your protocol."
        }
      },
      {
        "@type": "Question",
        "name": "Do I get a nutrition plan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We construct a dynamic cellular nutrition framework that details exact macronutrients, nutrient timing, and target supplementation tailored for your body and schedule."
        }
      },
      {
        "@type": "Question",
        "name": "Can beginners join?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Beginning with elite biomechanical guidance ensures correct habits and rapid, injury-free development."
        }
      }
    ]
  };

  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <head>
        {/* Local Business JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {/* FAQ JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-primary-bg text-white">
        <SmoothScroll>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
