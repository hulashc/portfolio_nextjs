"use client";

import { useEffect, useRef, useState } from "react";

interface CardGalleryProps {
  isDark: boolean;
  text: string;
  borderColor: string;
}

const cards = [
  { description: "MSc Data Science with Financial Technology", imageAlt: "University of Bristol logo", imageSrc: "/images/university-of-bristol-logo.png", period: "2022 - 2023", title: "University of Bristol" },
  { description: "Data Science for ML & AI", imageAlt: "IIM Kozhikode logo", imageSrc: "/images/iim-kozhikode-logo.png", period: "2021 - 2022", title: "IIM Kozhikode" },
  { description: "Design Thinking & System Thinking", imageAlt: "Deloitte University logo", imageSrc: "/images/deloitte-university-logo.png", period: "2020 - 2021", title: "Deloitte University" },
  { description: "BBA Finance & Banking", imageAlt: "ICFAI University logo", imageSrc: "/images/icfai-university-logo.jpg", period: "2016 - 2019", title: "ICFAI University" },
];

export default function CardGallery({ isDark, text, borderColor }: CardGalleryProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} style={{ border: `1px solid ${borderColor}` }} className="p-3 md:p-4">
      <h3 className="text-2xl md:text-3xl font-bold uppercase mb-6 pb-2" style={{ color: text, borderBottom: `2px solid ${borderColor}` }}>
        Education
      </h3>
      <div
        className="flex max-lg:flex-row max-lg:overflow-x-auto max-lg:snap-x max-lg:snap-mandatory max-lg:gap-4 lg:gap-4 max-lg:pb-2 max-w-full"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {cards.map((card, i) => (
          <div
            key={card.title}
            className="flex flex-col max-lg:snap-center max-lg:w-[82vw] max-lg:flex-shrink-0 lg:flex-1 overflow-hidden rounded-lg"
            style={{
              border: `1px solid ${borderColor}`,
              opacity: hasAnimated ? undefined : 0,
              animation: hasAnimated ? `slideInRight 0.5s ease-out ${i * 0.08}s backwards` : "none",
            }}>
            <div
              className="w-full flex items-center justify-center p-5 md:p-6"
              style={{ backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)" }}
            >
              <img
                src={card.imageSrc}
                alt={card.imageAlt}
                className="w-full h-28 md:h-32 object-contain"
              />
            </div>
            <div className="p-3 md:p-4 space-y-2 flex flex-col flex-1">
              <h4 className="text-base md:text-lg font-bold uppercase leading-tight" style={{ color: text }}>
                {card.title}
              </h4>
              <p className="text-[11px] md:text-xs font-medium tracking-wider" style={{ color: text, opacity: 0.5 }}>
                {card.period}
              </p>
              <p className="text-xs md:text-sm leading-relaxed mt-auto" style={{ color: text }}>
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes slideInRight {
          0% { transform: translateX(80px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
