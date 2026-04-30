"use client";

import { useTheme } from "./ThemeProvider";
import { Footer } from "./Footer";

export function AboutSection() {
  const { isDark } = useTheme();

  const bg = isDark ? "#161616" : "#DADADA";
  const text = isDark ? "white" : "black";
  const borderColor = isDark ? "rgba(255,255,240,0.7)" : "rgba(0,0,0,0.6)";

  return (
    <div id="about-section" className="w-full" style={{ backgroundColor: bg, marginTop: "-2px" }}>
      <div className="p-4 text-center" style={{ border: `1px solid ${borderColor}` }}>
        <h2 className="text-xl md:text-4xl lg:text-6xl font-bold uppercase mb-4" style={{ color: text }}>Data Engineer → AI/ML Engineer</h2>
        <p className="text-sm md:text-xl mb-2" style={{ color: text }}>AWS Consultant / Data Engineer · Cloud & Data Platforms</p>
        <p className="text-sm md:text-xl font-bold mb-4" style={{ color: text }}>AWS · Azure · GCP · MLOps · Spark · Python · Scalable AI Systems</p>
        <div className="space-y-1" style={{ color: text }}>
          <p className="text-xs md:text-lg">London, United Kingdom</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ backgroundColor: bg }}>
        <div style={{ border: `1px solid ${borderColor}` }} className="p-4">
          <h3 className="text-2xl md:text-3xl font-bold uppercase mb-4 pb-2" style={{ color: text, borderBottom: `2px solid ${borderColor}` }}>Experience</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-sm md:text-lg font-bold" style={{ color: text }}>Innowise Solutions</p>
                <p className="text-xs" style={{ color: text }}>AWS Consultant / Data Engineer</p>
              </div>
              <p className="text-xs" style={{ color: text, whiteSpace: "nowrap" }}>2024 - Present</p>
            </div>
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-sm md:text-lg font-bold" style={{ color: text }}>Outlier</p>
                <p className="text-xs" style={{ color: text }}>AI Prompt Consultant</p>
              </div>
              <p className="text-xs" style={{ color: text, whiteSpace: "nowrap" }}>2024 - 2026</p>
            </div>
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-sm md:text-lg font-bold" style={{ color: text }}>Education and Training Foundation</p>
                <p className="text-xs" style={{ color: text }}>Research and Teaching Assistant</p>
              </div>
              <p className="text-xs" style={{ color: text, whiteSpace: "nowrap" }}>2023</p>
            </div>
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-sm md:text-lg font-bold" style={{ color: text }}>Deloitte USI</p>
                <p className="text-xs" style={{ color: text }}>Automation Analyst</p>
              </div>
              <p className="text-xs" style={{ color: text, whiteSpace: "nowrap" }}>2020 - 2021</p>
            </div>
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-sm md:text-lg font-bold" style={{ color: text }}>Amazon</p>
                <p className="text-xs" style={{ color: text }}>Data Analyst</p>
              </div>
              <p className="text-xs" style={{ color: text, whiteSpace: "nowrap" }}>2019</p>
            </div>
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-sm md:text-lg font-bold" style={{ color: text }}>Qvantel</p>
                <p className="text-xs" style={{ color: text }}>People Analytics Intern</p>
              </div>
              <p className="text-xs" style={{ color: text, whiteSpace: "nowrap" }}>2018 - 2019</p>
            </div>
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-sm md:text-lg font-bold" style={{ color: text }}>Internshala</p>
                <p className="text-xs" style={{ color: text }}>Student Partner</p>
              </div>
              <p className="text-xs" style={{ color: text, whiteSpace: "nowrap" }}>2017</p>
            </div>
          </div>
        </div>
        <div style={{ border: `1px solid ${borderColor}` }} className="p-4">
          <h3 className="text-2xl md:text-3xl font-bold uppercase mb-4 pb-2" style={{ color: text, borderBottom: `2px solid ${borderColor}` }}>Education</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-sm md:text-lg font-bold" style={{ color: text }}>University of Bristol</p>
                <p className="text-xs" style={{ color: text }}>MSc Data Science with Financial Technology</p>
              </div>
              <p className="text-xs" style={{ color: text, whiteSpace: "nowrap" }}>2022 - 2023</p>
            </div>
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-sm md:text-lg font-bold" style={{ color: text }}>IIM Kozhikode</p>
                <p className="text-xs" style={{ color: text }}>Data Science for ML & AI</p>
              </div>
              <p className="text-xs" style={{ color: text, whiteSpace: "nowrap" }}>2021 - 2022</p>
            </div>
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-sm md:text-lg font-bold" style={{ color: text }}>Deloitte University</p>
                <p className="text-xs" style={{ color: text }}>Design Thinking & System Thinking</p>
              </div>
              <p className="text-xs" style={{ color: text, whiteSpace: "nowrap" }}>2020 - 2021</p>
            </div>
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-sm md:text-lg font-bold" style={{ color: text }}>ICFAI University</p>
                <p className="text-xs" style={{ color: text }}>BBA Finance & Banking</p>
              </div>
              <p className="text-xs" style={{ color: text, whiteSpace: "nowrap" }}>2016 - 2019</p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ border: `1px solid ${borderColor}` }} className="p-4">
        <h3 className="text-2xl md:text-3xl font-bold uppercase mb-4 pb-2" style={{ color: text, borderBottom: `2px solid ${borderColor}` }}>Skills</h3>
        <div className="grid grid-cols-2 gap-2">
          <p className="text-xs md:text-sm" style={{ color: text }}>Python · SQL · PySpark</p>
          <p className="text-xs md:text-sm" style={{ color: text }}>Spark · Kafka · Airflow</p>
          <p className="text-xs md:text-sm" style={{ color: text }}>AWS · Azure · GCP</p>
          <p className="text-xs md:text-sm" style={{ color: text }}>LLM · RAG · LangChain</p>
          <p className="text-xs md:text-sm" style={{ color: text }}>dbt · Snowflake · Delta</p>
          <p className="text-xs md:text-sm" style={{ color: text }}>Terraform · Docker · K8s</p>
          <p className="text-xs md:text-sm" style={{ color: text }}>MLflow · Vertex AI</p>
          <p className="text-xs md:text-sm" style={{ color: text }}>Git · DAGs · CI/CD</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}