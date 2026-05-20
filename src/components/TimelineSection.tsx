"use client";

import { useState, useEffect, useRef } from "react";

interface TimelineSectionProps {
  isDark: boolean;
  text: string;
  borderColor: string;
}

interface Experience {
  company: string;
  role: string;
  period: string;
  details: string;
  tags: string[];
  startYear: number;
  endYear: number;
}

const experienceData = [
  { company: "Innowise Solutions", role: "AWS Consultant / Data Engineer", period: "2024 - Present", details: "Designing and implementing scalable data platforms on AWS. Building ETL pipelines, infrastructure-as-code, and production data systems for enterprise clients.", tags: ["AWS", "Terraform", "Airflow", "Spark", "Python"] },
  { company: "Outlier", role: "AI Prompt Consultant", period: "2024 - 2026", details: "Developing and refining prompts for AI model training. Evaluating model outputs and improving response quality across diverse domains.", tags: ["LLM", "Prompt Engineering", "AI Evaluation"] },
  { company: "Education and Training Foundation", role: "Research and Teaching Assistant", period: "2023", details: "Assisted in data-driven education research and supported curriculum delivery. Worked with analytics tools to evaluate learning outcomes.", tags: ["Data Analysis", "Research", "Education"] },
  { company: "Deloitte USI", role: "Automation Analyst", period: "2020 - 2021", details: "Built automation solutions for audit and compliance workflows. Developed scripts and tools to streamline data processing and reporting.", tags: ["Automation", "Python", "VBA", "Process Optimization"] },
  { company: "Amazon", role: "Data Analyst", period: "2019", details: "Analyzed operational metrics to drive supply chain and logistics decisions. Created dashboards and reports for cross-functional stakeholders.", tags: ["SQL", "Excel", "Data Visualization", "Supply Chain"] },
  { company: "Qvantel", role: "People Analytics Intern", period: "2018", details: "Supported HR analytics initiatives by cleaning, analyzing, and visualizing workforce data. Contributed to reporting automation.", tags: ["HR Analytics", "Data Cleaning", "Visualization"] },
  { company: "Internshala", role: "Student Partner", period: "2017", details: "Promoted internship and training programs on campus. Organized events and engaged with student communities to drive awareness.", tags: ["Campus Outreach", "Event Management", "Communication"] },
];

function parseExperience(source: typeof experienceData): Experience[] {
  const currentYear = new Date().getFullYear();
  return source.map((e) => {
    const parts = e.period.split(" - ");
    const start = parseInt(parts[0]);
    const end = parts[1] === "Present" ? currentYear : parseInt(parts[1] ?? parts[0]);
    return { ...e, startYear: start, endYear: end };
  });
}

const startYear = 2015;
const endYear = 2030;
const totalYears = endYear - startYear;
const years = Array.from({ length: totalYears }, (_, i) => startYear + i);

const hoverBg = (isDark: boolean) => isDark ? "#DADADA" : "#161616";
const hoverText = (isDark: boolean) => isDark ? "#161616" : "#DADADA";

export default function TimelineSection({ isDark, text, borderColor }: TimelineSectionProps) {
  const experience = parseExperience(experienceData);
  const [selected, setSelected] = useState<number | null>(null);
  const [popoverPos, setPopoverPos] = useState<{ top: number; left: number } | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const popoverRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (selected !== null && barRefs.current[selected]) {
      const rect = barRefs.current[selected]!.getBoundingClientRect();
      const sectionRect = document.getElementById("timeline-section")?.getBoundingClientRect();
      if (sectionRect) {
        setPopoverPos({
          top: rect.bottom - sectionRect.top + 8,
          left: Math.max(0, Math.min(rect.left - sectionRect.left, (sectionRect.width - 360) / 2)),
        });
      }
    } else {
      setPopoverPos(null);
    }
  }, [selected]);

  useEffect(() => {
    if (selected === null) return;
    const handler = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        let clickedBar = false;
        for (const ref of barRefs.current) {
          if (ref && ref.contains(e.target as Node)) { clickedBar = true; break; }
        }
        if (!clickedBar) setSelected(null);
      }
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", keyHandler);
    };
  }, [selected]);

  return (
    <div ref={sectionRef} id="timeline-section" style={{ border: `1px solid ${borderColor}`, position: "relative" }} className="p-3 md:p-4">
      <h3 className="text-2xl md:text-3xl font-bold uppercase mb-4 pb-2" style={{ color: text, borderBottom: `2px solid ${borderColor}` }}>
        Experience
      </h3>
      <div className="overflow-x-auto w-full pb-2" style={{ scrollbarWidth: "auto", msOverflowStyle: "auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${totalYears}, minmax(75px, 1fr))`,
            gridTemplateRows: `repeat(${experience.length}, 48px) 22px`,
            minWidth: "100%",
          }}
        >
          {years.map((year, i) => (
            <div
              key={year}
              style={{
                gridRow: `${experience.length + 1}`,
                borderTop: `1px solid ${borderColor}`,
                borderLeft: i > 0 ? `1px solid ${borderColor}` : "none",
                color: text,
                opacity: 0.4,
                fontSize: "9px",
                padding: "2px 0 0 4px",
                height: "22px",
              }}
            >
              {year}
            </div>
          ))}
          {experience.map((exp, i) => {
            const startCol = exp.startYear - startYear + 1;
            const endCol = exp.endYear - startYear + 2;
            const isActive = selected === i;

            return (
              <div
                key={i}
                ref={(el) => { barRefs.current[i] = el; }}
                onClick={() => setSelected(selected === i ? null : i)}
                className="timeline-bar flex flex-col justify-center px-3 overflow-hidden rounded cursor-pointer"
                style={{
                  gridColumn: `${startCol} / ${endCol}`,
                  gridRow: `${i + 1}`,
                  border: hasAnimated ? `1px solid ${borderColor}` : "1px solid transparent",
                  color: text,
                  opacity: selected !== null && !isActive ? 0.35 : 1,
                  zIndex: isActive ? 10 : 1,
                  height: "36px",
                  marginTop: "6px",
                  animation: hasAnimated ? `pixelReveal 0.6s steps(6) ${i * 0.1}s both` : "none",
                  "--pixel-text": text,
                  "--pixel-bg": isDark ? "#161616" : "#DADADA",
                  "--pixel-border": borderColor,
                } as React.CSSProperties}
              >
                <p className="text-xs font-bold leading-tight truncate">{exp.company}</p>
                <p className="text-[10px] leading-tight truncate" style={{ opacity: 0.7 }}>{exp.role}</p>
              </div>
            );
          })}
        </div>
      </div>
      {selected !== null && popoverPos && (
        <div
          ref={popoverRef}
          className="absolute z-50 w-[340px] sm:w-[380px] rounded-2xl overflow-hidden shadow-lg"
          style={{
            top: `${popoverPos.top}px`,
            left: `${popoverPos.left}px`,
            border: `1px solid ${borderColor}`,
            backgroundColor: isDark ? "#1a1a1a" : "#ffffff",
          }}
        >
          <button
            className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full text-xs cursor-pointer z-10"
            style={{ backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)", color: text }}
            onClick={() => setSelected(null)}
          >
            ✕
          </button>
          <div className="p-5 pr-8">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                style={{ border: `1px solid ${borderColor}`, color: text }}
              >
                {experience[selected].period}
              </span>
              <span className="text-[9px] font-bold" style={{ color: text, opacity: 0.4 }}>
                {experience[selected].endYear >= new Date().getFullYear() ? "Active" : "Completed"}
              </span>
            </div>
            <p className="text-base font-semibold leading-tight mb-0.5" style={{ color: text }}>
              {experience[selected].company}
            </p>
            <p className="text-xs mb-3" style={{ color: text, opacity: 0.6 }}>
              {experience[selected].role}
            </p>
            <p className="text-[11px] leading-relaxed mb-3" style={{ color: text, opacity: 0.75 }}>
              {experience[selected].details}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {experience[selected].tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{ border: `1px solid ${borderColor}`, color: text, opacity: 0.8 }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
      <style>{`
        .timeline-bar {
          transition: background-color 0.3s ease, color 0.3s ease, opacity 0.3s ease !important;
          background-color: transparent;
        }
        .timeline-bar:hover {
          background-color: ${hoverBg(isDark)} !important;
          color: ${hoverText(isDark)} !important;
        }
        @keyframes pixelReveal {
          0% {
            clip-path: inset(50% 50% 50% 50%);
            background-color: var(--pixel-text);
            color: var(--pixel-bg);
            border-color: var(--pixel-text);
          }
          80% {
            background-color: var(--pixel-text);
            color: var(--pixel-bg);
            border-color: var(--pixel-text);
          }
          100% {
            clip-path: inset(0% 0% 0% 0%);
            background-color: transparent;
            color: var(--pixel-text);
            border-color: var(--pixel-border);
          }
        }
      `}</style>
    </div>
  );
}
