import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { AboutContent } from "@/components/AboutContent";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hulash Chand | Data Engineer, MLOps & AI Engineer",
  description:
    "London-based Data Engineer and AI/ML Engineer building scalable data platforms, MLOps systems, and production-ready cloud infrastructure.",
  alternates: {
    canonical: "https://www.hulash.com",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Hulash Chand",
              jobTitle: "Data Engineer",
              url: "https://www.hulash.com/",
              address: {
                "@type": "PostalAddress",
                addressLocality: "London",
                addressCountry: "GB",
              },
              sameAs: [
                "https://www.linkedin.com/in/hulash",
                "https://instagram.com/hulash__chand",
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Hulash Chand",
              url: "https://www.hulash.com/",
            },
          ]),
        }}
      />
      <Navbar />
      <AboutContent />
    </>
  );
}