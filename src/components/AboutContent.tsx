"use client";

import { useTheme } from "./ThemeProvider";
import dynamic from "next/dynamic";
import Footer from "./Footer";

const ActivityButton = dynamic(() => import("./ActivityButton"), { ssr: false });

export function AboutContent() {
  const { isDark } = useTheme();

  const bg = isDark ? "#161616" : "#DADADA";
  const text = isDark ? "#DADADA" : "#161616";
  const borderColor = isDark ? "rgba(255,255,240,0.7)" : "rgba(0,0,0,0.6)";

  return (
    <div id="about-section" className="w-full p-3 md:p-4 max-w-screen overflow-x-hidden" style={{ backgroundColor: bg, marginTop: "-2px" }}>
      <div className="text-center p-3 md:p-4" style={{ border: `1px solid ${borderColor}` }}>
        <h2 className="text-xl md:text-4xl lg:text-6xl font-bold uppercase mb-4" style={{ color: text }}>Data Engineer → AI/ML Engineer</h2>
        <p className="text-sm md:text-xl mb-2" style={{ color: text }}>AWS Consultant / Data Engineer · Cloud & Data Platforms</p>
        <p className="text-sm md:text-xl font-bold mb-4" style={{ color: text }}>AWS · Azure · GCP · MLOps · Spark · Python · Scalable AI Systems</p>
        <div style={{ color: text }}>
          <p className="text-sm md:text-lg">London, United Kingdom</p>
          <ActivityButton text={text} borderColor={borderColor} isDark={isDark} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ backgroundColor: bg }}>
        <div style={{ border: `1px solid ${borderColor}` }} className="p-3 md:p-4">
          <h3 className="text-2xl md:text-3xl font-bold uppercase mb-4 pb-2" style={{ color: text, borderBottom: `2px solid ${borderColor}` }}>Experience</h3>
          <div className="space-y-4">
            {[
              { company: "Innowise Solutions", role: "AWS Consultant / Data Engineer", period: "2024 - Present" },
              { company: "Outlier", role: "AI Prompt Consultant", period: "2024 - 2026" },
              { company: "Education and Training Foundation", role: "Research and Teaching Assistant", period: "2023" },
              { company: "Deloitte USI", role: "Automation Analyst", period: "2020 - 2021" },
              { company: "Amazon", role: "Data Analyst", period: "2019" },
              { company: "Qvantel", role: "People Analytics Intern", period: "2018 - 2019" },
              { company: "Internshala", role: "Student Partner", period: "2017" },
            ].map((exp, i) => (
              <div key={i} className="flex justify-between items-start gap-4">
                <div>
                  <p className="text-sm md:text-lg font-bold" style={{ color: text }}>{exp.company}</p>
                  <p className="text-sm" style={{ color: text }}>{exp.role}</p>
                </div>
                <p className="text-sm" style={{ color: text, whiteSpace: "nowrap" }}>{exp.period}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ border: `1px solid ${borderColor}` }} className="p-3 md:p-4">
          <h3 className="text-2xl md:text-3xl font-bold uppercase mb-4 pb-2" style={{ color: text, borderBottom: `2px solid ${borderColor}` }}>Education</h3>
          <div className="space-y-4">
            {[
              { school: "University of Bristol", degree: "MSc Data Science with Financial Technology", period: "2022 - 2023" },
              { school: "IIM Kozhikode", degree: "Data Science for ML & AI", period: "2021 - 2022" },
              { school: "Deloitte University", degree: "Design Thinking & System Thinking", period: "2020 - 2021" },
              { school: "ICFAI University", degree: "BBA Finance & Banking", period: "2016 - 2019" },
            ].map((edu, i) => (
              <div key={i} className="flex justify-between items-start gap-4">
                <div>
                  <p className="text-sm md:text-lg font-bold" style={{ color: text }}>{edu.school}</p>
                  <p className="text-sm" style={{ color: text }}>{edu.degree}</p>
                </div>
                <p className="text-sm" style={{ color: text, whiteSpace: "nowrap" }}>{edu.period}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ border: `1px solid ${borderColor}` }} className="p-3 md:p-4">
        <h3 className="text-2xl md:text-3xl font-bold uppercase mb-6 pb-2" style={{ color: text, borderBottom: `2px solid ${borderColor}` }}>Skills</h3>
        <div className="grid grid-cols-2 gap-4">
          <p className="text-sm md:text-base" style={{ color: text }}>Python · SQL · PySpark</p>
          <p className="text-sm md:text-base" style={{ color: text }}>Spark · Kafka · Airflow</p>
          <p className="text-sm md:text-base" style={{ color: text }}>AWS · Azure · GCP</p>
          <p className="text-sm md:text-base" style={{ color: text }}>LLM · RAG · LangChain</p>
          <p className="text-sm md:text-base" style={{ color: text }}>dbt · Snowflake · Delta</p>
          <p className="text-sm md:text-base" style={{ color: text }}>Terraform · Docker · K8s</p>
          <p className="text-sm md:text-base" style={{ color: text }}>MLflow · Vertex AI</p>
          <p className="text-sm md:text-base" style={{ color: text }}>Git · DAGs · CI/CD</p>
        </div>
      </div>
      <div style={{ border: `1px solid ${borderColor}` }} className="p-3 md:p-4">
        <h3 className="text-2xl md:text-3xl font-bold uppercase mb-6 pb-2" style={{ color: text, borderBottom: `2px solid ${borderColor}` }}>Certifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p className="text-sm md:text-base" style={{ color: text }}>AWS Certified Data Engineer – Associate</p>
          <p className="text-sm md:text-base" style={{ color: text }}>AWS Certified Developer – Associate</p>
          <p className="text-sm md:text-base" style={{ color: text }}>AWS Certified Cloud Practitioner</p>
          <p className="text-sm md:text-base" style={{ color: text }}>Microsoft Certified: Azure Fundamentals (AZ-900)</p>
          <p className="text-sm md:text-base" style={{ color: text }}>Anthropic - Model Context Protocol: Advanced Topics</p>
          <p className="text-sm md:text-base" style={{ color: text }}>DataBricks - Fundamentals</p>
          <p className="text-sm md:text-base" style={{ color: text }}>Tableau Certified Data Analyst</p>
          <p className="text-sm md:text-base" style={{ color: text }}>MongoDB Certified Developer</p>
          <p className="text-sm md:text-base" style={{ color: text }}>UK GDPR Practitioner Certificate · Online</p>
        </div>
      </div>
      <div style={{ border: `1px solid ${borderColor}` }} className="p-3 md:p-4">
        <h3 className="text-2xl md:text-3xl font-bold uppercase mb-6 pb-2" style={{ color: text, borderBottom: `2px solid ${borderColor}` }}>Volunteering</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Rotary International · Tech & Digital Support", desc: "Website management, event coordination, partnership communication" },
            { title: "Art Fund · Digital Outreach Volunteer", desc: "Online engagement, collaboration support, campaign coordination" },
            { title: "Hyderabad Literature Festival · Tech & Partnerships", desc: "Website operations, sponsor communication, guest coordination" },
            { title: "Data for Good · Volunteer", desc: "Data initiatives, nonprofit collaboration, analytics support" },
            { title: "Open Source · Contributor", desc: "Code contributions, documentation support, community collaboration" },
            { title: "Tech Meetups · Co-organiser", desc: "Event planning, speaker coordination, community engagement" },
          ].map((vol, i) => (
            <div key={i}>
              <p className="text-sm md:text-base font-semibold" style={{ color: text }}>{vol.title}</p>
              <p className="text-sm opacity-70" style={{ color: text }}>{vol.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer isDark={isDark} text={text} borderColor={borderColor} />
    </div>
  );
}
