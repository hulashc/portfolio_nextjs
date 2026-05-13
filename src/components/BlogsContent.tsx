"use client";

import { useTheme } from "./ThemeProvider";

export function BlogsContent() {
  const { isDark } = useTheme();

  const bg = isDark ? "#161616" : "#DADADA";
  const text = isDark ? "#DADADA" : "#161616";
  const borderColor = isDark ? "rgba(255,255,240,0.7)" : "rgba(0,0,0,0.6)";

  return (
    <div className="p-4 md:p-6" style={{ border: `1px solid ${borderColor}`, marginTop: "-2px" }}>
      <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold uppercase mb-4 md:mb-8" style={{ color: text }}>Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4" style={{ backgroundColor: bg }}>
        <div className="p-3 md:p-4" style={{ border: `1px solid ${borderColor}` }}>
          <h2 className="text-base md:text-xl lg:text-2xl font-bold uppercase mb-2" style={{ color: text }}>Building Scalable Data Pipelines</h2>
          <p className="text-xs md:text-sm" style={{ color: text }}>Apache Spark · Airflow · Python</p>
        </div>
        <div className="p-3 md:p-4" style={{ border: `1px solid ${borderColor}` }}>
          <h2 className="text-base md:text-xl lg:text-2xl font-bold uppercase mb-2" style={{ color: text }}>LLM Integration Patterns</h2>
          <p className="text-xs md:text-sm" style={{ color: text }}>RAG · Vector Databases · Prompt Engineering</p>
        </div>
      </div>
    </div>
  );
}