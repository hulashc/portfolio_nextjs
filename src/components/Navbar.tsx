"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import HeroAnimation from "./HeroAnimation";
import Footer from "./Footer";
import { useLanguage } from "./LanguageProvider";

export function Navbar() {
  const { isDark, toggleDark } = useTheme();
  const { getFirstName, getLastName, getName, cycleLang } = useLanguage();

  const bg = isDark ? "#161616" : "#DADADA";
  const text = isDark ? "white" : "black";
  const borderColor = isDark ? "rgba(255,255,240,0.7)" : "rgba(0,0,0,0.6)";
  const hoverBg = isDark ? "#E3DACC" : "black";
  const hoverText = isDark ? "#161616" : "#DADADA";

  return (
    <div className="w-full p-2 md:p-4 max-w-screen overflow-x-hidden" style={{ backgroundColor: bg }}>
      <nav
        className="grid w-full overflow-hidden"
        style={{
          height: "70px",
          backgroundColor: bg,
          border: `1px solid ${borderColor}`,
          gridTemplateColumns: "70px 1fr 70px"
        }}
      >
        <div className="flex items-center justify-center h-full" style={{ width: "70px", borderRight: `1px solid ${borderColor}` }}>
          <img src="/logo.svg" alt="DHC Logo" style={{ width: "50px", height: "50px" }} className={isDark ? 'dark-logo' : 'light-logo'} />
        </div>
        <div className="flex items-center justify-center px-1 sm:px-2 md:px-4 overflow-hidden" style={{ borderRight: `1px solid ${borderColor}` }}>
          <span className="text-center" style={{ color: text }}>
            <span className="block sm:hidden text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold tracking-wide uppercase whitespace-nowrap" onClick={cycleLang} style={{ cursor: 'pointer' }}>
              {getFirstName()}
            </span>
            <span className="block sm:hidden text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold tracking-wide uppercase whitespace-nowrap" onClick={cycleLang} style={{ cursor: 'pointer' }}>
              {getLastName()}
            </span>
            <span className="hidden sm:block text-sm sm:text-base md:text-3xl lg:text-6xl font-bold tracking-wider md:tracking-widest uppercase whitespace-nowrap" onClick={cycleLang} style={{ cursor: 'pointer' }}>
              {getName()}
            </span>
          </span>
        </div>
        <div className="flex items-center justify-center h-full" style={{ width: "70px" }}>
          <button className="flex items-center justify-center" onClick={toggleDark} style={{ cursor: "pointer", background: "none", border: `2px solid ${text}`, width: "50px", height: "50px" }}>
            <div style={{ width: "20px", height: "20px", backgroundColor: text }}></div>
          </button>
        </div>
      </nav>

      <div className={`w-full ${isDark ? 'dark' : 'light'}`} style={{ backgroundColor: bg, marginTop: "-2px" }}>
        <div className="grid grid-cols-2 gap-0" style={{ backgroundColor: bg, minHeight: "8vh", border: `1px solid ${borderColor}` }}>
          <Link 
            href="/projects"
            className="nav-box flex items-center justify-center cursor-pointer p-1 sm:p-2"
            style={{ borderRight: `1px solid ${borderColor}`, color: text, backgroundColor: bg }}
          >
            <span className="nav-text text-sm sm:text-lg md:text-2xl lg:text-4xl font-bold uppercase" style={{ color: text }}>projects</span>
          </Link>
          <Link 
            href="/blogs"
            className="nav-box flex items-center justify-center cursor-pointer p-1 sm:p-2"
            style={{ color: text, backgroundColor: bg }}
          >
            <span className="nav-text text-sm sm:text-lg md:text-2xl lg:text-4xl font-bold uppercase" style={{ color: text }}>blogs</span>
          </Link>
        </div>
        <HeroAnimation />
      </div>

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
        <div style={{ border: `1px solid ${borderColor}` }} className="p-8">
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
        <div style={{ border: `1px solid ${borderColor}` }} className="p-8">
          <h3 className="text-2xl md:text-3xl font-bold uppercase mb-6 pb-2" style={{ color: text, borderBottom: `2px solid ${borderColor}` }}>Certifications</h3>
          <div className="grid grid-cols-2 gap-4">
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
        <div style={{ border: `1px solid ${borderColor}` }} className="p-8">
          <h3 className="text-2xl md:text-3xl font-bold uppercase mb-6 pb-2" style={{ color: text, borderBottom: `2px solid ${borderColor}` }}>Volunteering</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm md:text-base font-semibold" style={{ color: text }}>Rotary International · Tech & Digital Support</p>
              <p className="text-xs md:text-sm opacity-70" style={{ color: text }}>Website management, event coordination, partnership communication</p>
            </div>
            <div>
              <p className="text-sm md:text-base font-semibold" style={{ color: text }}>Art Fund · Digital Outreach Volunteer</p>
              <p className="text-xs md:text-sm opacity-70" style={{ color: text }}>Online engagement, collaboration support, campaign coordination</p>
            </div>
            <div>
              <p className="text-sm md:text-base font-semibold" style={{ color: text }}>Hyderabad Literature Festival · Tech & Partnerships Volunteer</p>
              <p className="text-xs md:text-sm opacity-70" style={{ color: text }}>Website operations, sponsor communication, guest coordination</p>
            </div>
            <div>
              <p className="text-sm md:text-base font-semibold" style={{ color: text }}>Data for Good · Volunteer</p>
              <p className="text-xs md:text-sm opacity-70" style={{ color: text }}>Data initiatives, nonprofit collaboration, analytics support</p>
            </div>
            <div>
              <p className="text-sm md:text-base font-semibold" style={{ color: text }}>Open Source · Contributor</p>
              <p className="text-xs md:text-sm opacity-70" style={{ color: text }}>Code contributions, documentation support, community collaboration</p>
            </div>
            <div>
              <p className="text-sm md:text-base font-semibold" style={{ color: text }}>Tech Meetups · Co-organiser</p>
              <p className="text-xs md:text-sm opacity-70" style={{ color: text }}>Event planning, speaker coordination, community engagement</p>
            </div>
          </div>
        </div>
        <Footer isDark={isDark} text={text} borderColor={borderColor} />
      </div>
    </div>
  );
}