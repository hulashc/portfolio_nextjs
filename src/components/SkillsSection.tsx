"use client";

import { useState, useEffect, useRef } from "react";

interface SkillsSectionProps {
  isDark: boolean;
  text: string;
  borderColor: string;
}

interface Skill {
  name: string;
  detail: string;
}

interface SkillCategory {
  label: string;
  skills: Skill[];
}

const skillData: SkillCategory[] = [
  {
    label: "Pipeline Orchestration",
    skills: [
      { name: "Airflow", detail: "Workflow orchestration and scheduling for complex data pipelines" },
      { name: "Kafka", detail: "Real-time data streaming and event-driven architectures" },
      { name: "Spark", detail: "Distributed data processing and analytics at scale" },
      { name: "dbt", detail: "Data transformation and modeling in the warehouse" },
    ],
  },
  {
    label: "ML Deployment",
    skills: [
      { name: "MLflow", detail: "ML lifecycle management and model registry" },
      { name: "Docker", detail: "Containerized application deployment and packaging" },
      { name: "K8s", detail: "Container orchestration for scalable ML services" },
      { name: "CI/CD", detail: "Automated testing and deployment pipelines" },
    ],
  },
  {
    label: "Cloud Infrastructure",
    skills: [
      { name: "AWS", detail: "Cloud infrastructure, data services, and serverless computing" },
      { name: "Terraform", detail: "Infrastructure-as-code for reproducible cloud environments" },
      { name: "Serverless", detail: "Event-driven compute without server management" },
      { name: "GCP", detail: "Google Cloud data and ML platform services" },
    ],
  },
  {
    label: "LLM Applications",
    skills: [
      { name: "RAG", detail: "Retrieval-augmented generation for grounded LLM responses" },
      { name: "LangChain", detail: "Framework for building LLM-powered applications" },
      { name: "Vector DBs", detail: "Semantic search and embedding storage for LLMs" },
      { name: "LLM APIs", detail: "Integration with OpenAI, Anthropic, and open-source models" },
    ],
  },
  {
    label: "Data Engineering",
    skills: [
      { name: "Python", detail: "Primary language for data processing, scripting, and ML" },
      { name: "SQL", detail: "Relational data querying, transformation, and analytics" },
      { name: "PySpark", detail: "Python API for Spark distributed computing" },
      { name: "Snowflake", detail: "Cloud data warehouse and data lake solutions" },
      { name: "Delta", detail: "Delta Lake for reliable data lakehouse architecture" },
    ],
  },
];

export default function SkillsSection({ isDark, text, borderColor }: SkillsSectionProps) {
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const hoverBg = isDark ? "#DADADA" : "#161616";
  const hoverText = isDark ? "#161616" : "#DADADA";

  return (
    <div ref={sectionRef} style={{ border: `1px solid ${borderColor}` }} className="p-3 md:p-4">
      <h3 className="text-2xl md:text-3xl font-bold uppercase mb-6 pb-2" style={{ color: text, borderBottom: `2px solid ${borderColor}` }}>
        Skills
      </h3>
      <div className="space-y-4">
        {skillData.map((cat, ci) => (
          <div
            key={cat.label}
            style={{
              animation: hasAnimated ? `skillRowReveal 0.5s steps(6) ${ci * 0.12}s both` : "none",
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
              <span
                className="text-xs md:text-sm font-bold uppercase tracking-wider whitespace-nowrap pt-1"
                style={{ color: text, opacity: 0.6, minWidth: "9rem" }}
              >
                {cat.label}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => {
                  const key = `${ci}-${skill.name}`;
                  const isExpanded = expandedSkill === key;

                  return (
                    <button
                      key={skill.name}
                      onClick={() => setExpandedSkill(isExpanded ? null : key)}
                      className="skill-pill rounded-full px-3 py-1 text-xs md:text-sm font-medium cursor-pointer transition-all"
                      style={{
                        border: `1px solid ${borderColor}`,
                        color: text,
                        backgroundColor: isExpanded ? hoverBg : "transparent",
                      }}
                    >
                      {skill.name}
                    </button>
                  );
                })}
              </div>
            </div>
            {cat.skills.map((skill) => {
              const key = `${ci}-${skill.name}`;
              if (expandedSkill !== key) return null;
              return (
                <div
                  key={key}
                  className="mt-2 p-3 rounded-lg text-xs md:text-sm leading-relaxed"
                  style={{
                    border: `1px solid ${borderColor}`,
                    backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                    color: text,
                  }}
                >
                  {skill.detail}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <style>{`
        .skill-pill {
          transition: background-color 0.3s ease, color 0.3s ease !important;
        }
        .skill-pill:hover {
          background-color: ${hoverBg} !important;
          color: ${hoverText} !important;
        }
        @keyframes skillRowReveal {
          0% {
            clip-path: inset(50% 50% 50% 50%);
            opacity: 0;
          }
          60% {
            opacity: 1;
          }
          100% {
            clip-path: inset(0% 0% 0% 0%);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
