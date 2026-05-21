"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

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

interface ChartItem {
  label: string;
  skills: string[];
  skillCount: number;
}

function getThemePalette(isDark: boolean): string[] {
  if (isDark) return ["#222220", "#3d3d38", "#606058", "#8a8a80", "#b8b8b0"];
  return ["#b8b8b0", "#8a8a80", "#606058", "#3d3d38", "#222220"];
}

export default function SkillsSection({ isDark, text, borderColor }: SkillsSectionProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 480);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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

  useEffect(() => {
    if (hasAnimated) {
      requestAnimationFrame(() => setShowChart(true));
    }
  }, [hasAnimated]);

  useEffect(() => {
    if (!showChart || !svgRef.current || !containerRef.current) return;

    const svgEl = svgRef.current;
    const container = containerRef.current;
    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();

    const chartData: ChartItem[] = skillData.map((cat) => ({
      label: cat.label,
      skills: cat.skills.map((s) => s.name),
      skillCount: cat.skills.length,
    }));

    const width = container.offsetWidth;
    const height = Math.max(isMobile ? 280 : 360, Math.min(500, width * (isMobile ? 0.85 : 0.55)));
    const radius = Math.min(width, height) / (isMobile ? 1.7 : 2.0);
    const COLORS = getThemePalette(isDark);

    svg.attr("viewBox", `0 0 ${width} ${height}`)
      .style("width", "100%")
      .style("height", `${height}px`);

    const g = svg.append("g").attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie<ChartItem>().value((d) => d.skillCount).sort(null)(chartData);

    const innerR = radius * 0.30;
    const outerR = radius * (isMobile ? 0.55 : 0.58);
    const labelR = radius * (isMobile ? 0.75 : 0.88);

    const arc = d3.arc<d3.PieArcDatum<ChartItem>>()
      .innerRadius(innerR)
      .outerRadius(outerR);

    const outerArc = d3.arc<d3.PieArcDatum<ChartItem>>()
      .innerRadius(labelR)
      .outerRadius(labelR);

    const INITIAL_DELAY = 200;
    const STAGGER = 100;
    const ARC_DUR = 1500;
    const SEC_DUR = 600;

    const midAngle = (d: d3.PieArcDatum<ChartItem>) =>
      d.startAngle + (d.endAngle - d.startAngle) / 2;

    const sectionBg = isDark ? "#161616" : "#DADADA";
    const catFontSize = Math.max(isMobile ? 10 : 12, Math.min(16, radius * 0.08)) + "px";
    const skillFontSize = Math.max(isMobile ? 8 : 9, Math.min(12, radius * 0.055)) + "px";

    const path = g.append("g").attr("class", "slices")
      .selectAll("path")
      .data(pie)
      .enter().append("path")
      .attr("class", "donut-segment")
      .attr("fill", (_d, i) => COLORS[i % COLORS.length])
      .attr("d", arc)
      .attr("stroke", sectionBg)
      .attr("stroke-width", "25px")
      .attr("transform", "rotate(-180)")
      .attr("opacity", 0);

    if (!isMobile) {
      const labelsG = g.append("g").attr("class", "labels");

      labelsG.selectAll("text.category-label")
        .data(pie)
        .enter().append("text")
        .attr("class", "category-label")
        .attr("dy", "-0.2em")
        .attr("opacity", 0)
        .style("fill", text)
        .attr("font-size", catFontSize)
        .attr("font-weight", "bold")
        .attr("text-anchor", (d) => (midAngle(d) < Math.PI ? "start" : "end"))
        .attr("transform", (d) => {
          const pos = outerArc.centroid(d);
          pos[0] = radius * 0.96 * (midAngle(d) < Math.PI ? 1 : -1);
          return `translate(${pos})`;
        })
        .text((d) => d.data.label);

      labelsG.selectAll("text.skill-sub")
        .data(pie)
        .enter().append("text")
        .attr("class", "skill-sub")
        .attr("dy", "1.3em")
        .attr("opacity", 0)
        .style("fill", text)
        .attr("font-size", skillFontSize)
        .attr("text-anchor", (d) => (midAngle(d) < Math.PI ? "start" : "end"))
        .attr("transform", (d) => {
          const pos = outerArc.centroid(d);
          pos[0] = radius * 0.96 * (midAngle(d) < Math.PI ? 1 : -1);
          return `translate(${pos})`;
        })
        .text((d) => d.data.skills.join(" · "));

      const lines = g.append("g").attr("class", "lines")
        .selectAll<SVGPolylineElement, d3.PieArcDatum<ChartItem>>("polyline")
        .data(pie)
        .enter().append("polyline")
        .attr("opacity", 0.5)
        .attr("stroke", borderColor)
        .attr("stroke-width", 0.5)
        .attr("stroke-dasharray", "3,3")
        .attr("fill", "none")
        .attr("points", (d) => {
          const c = arc.centroid(d);
          return `${c[0]},${c[1]} ${c[0]},${c[1]} ${c[0]},${c[1]}`;
        });

      svg.style("opacity", 1);

      requestAnimationFrame(() => {
        path.transition()
          .delay((_d, i) => i * STAGGER + INITIAL_DELAY)
          .duration(ARC_DUR)
          .ease(d3.easeElasticOut)
          .attr("opacity", 1)
          .attr("transform", "rotate(0)");

        path.transition()
          .delay((_d, i) => i * STAGGER + INITIAL_DELAY + ARC_DUR + 100)
          .duration(SEC_DUR)
          .attr("stroke-width", "5px");

        labelsG.selectAll("text.category-label")
          .transition()
          .delay((_d, i) => ARC_DUR + i * STAGGER + 100)
          .duration(SEC_DUR)
          .attr("opacity", 1);

        labelsG.selectAll("text.skill-sub")
          .transition()
          .delay((_d, i) => ARC_DUR + i * STAGGER + 100 + SEC_DUR + 150)
          .duration(SEC_DUR)
          .attr("opacity", 0.65);

        lines.transition()
          .delay((_d, i) => ARC_DUR + i * STAGGER + 100)
          .duration(SEC_DUR)
          .attr("points", (d) => {
            const c = arc.centroid(d);
            const oc = outerArc.centroid(d);
            const pos = [...oc];
            pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
            return `${c[0]},${c[1]} ${oc[0]},${oc[1]} ${pos[0]},${pos[1]}`;
          });
      });
    } else {
      svg.style("opacity", 1);

      requestAnimationFrame(() => {
        path.transition()
          .delay((_d, i) => i * STAGGER + INITIAL_DELAY)
          .duration(ARC_DUR)
          .ease(d3.easeElasticOut)
          .attr("opacity", 1)
          .attr("transform", "rotate(0)");

        path.transition()
          .delay((_d, i) => i * STAGGER + INITIAL_DELAY + ARC_DUR + 100)
          .duration(SEC_DUR)
          .attr("stroke-width", "5px");
      });
    }

  }, [showChart, text, borderColor, isDark, isMobile]);

  const COLORS = getThemePalette(isDark);

  return (
    <div ref={sectionRef} style={{ border: `1px solid ${borderColor}` }} className="p-3 md:p-4">
      <h3 className="text-2xl md:text-3xl font-bold uppercase mb-6 pb-2" style={{ color: text, borderBottom: `2px solid ${borderColor}` }}>
        Skills
      </h3>
      <div ref={containerRef} className="w-full flex justify-center">
        <svg ref={svgRef} style={{ opacity: 0 }} />
      </div>
      {showChart && isMobile && (
        <div className="w-full mt-4 space-y-3">
          {skillData.map((cat, i) => (
            <div key={cat.label} className="flex items-start gap-3">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <div>
                <div className="font-bold" style={{ color: text, fontSize: "12px" }}>{cat.label}</div>
                <div style={{ color: text, fontSize: "10px", opacity: 0.65 }}>{cat.skills.map((s) => s.name).join(" · ")}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      <style>{`
        .donut-segment {
          cursor: pointer;
          transition: fill 0.25s ease !important;
        }
        .donut-segment:hover {
          fill: ${isDark ? "#DADADA" : "#161616"} !important;
        }
      `}</style>
    </div>
  );
}
