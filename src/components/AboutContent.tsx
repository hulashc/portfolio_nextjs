"use client";

import { useTheme } from "./ThemeProvider";
import dynamic from "next/dynamic";
import Footer from "./Footer";
import CardGallery from "./CardGallery";
import TimelineSection from "./TimelineSection";
import SkillsSection from "./SkillsSection";
import CertificationsSection from "./CertificationsSection";

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
        <p className="text-sm md:text-xl mb-4 leading-relaxed max-w-3xl mx-auto" style={{ color: text }}>
          I build scalable data platforms, MLOps workflows, and AI-ready infrastructure across AWS and modern analytics stacks. My work spans pipeline orchestration, model deployment, and production engineering for data-intensive systems.
        </p>
        <div style={{ color: text }}>
          <p className="text-sm md:text-lg">London, United Kingdom</p>
          <ActivityButton text={text} borderColor={borderColor} isDark={isDark} />
        </div>
      </div>
      <TimelineSection isDark={isDark} text={text} borderColor={borderColor} />
      <CardGallery isDark={isDark} text={text} borderColor={borderColor} />
      <SkillsSection isDark={isDark} text={text} borderColor={borderColor} />
      <CertificationsSection isDark={isDark} text={text} borderColor={borderColor} />
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
