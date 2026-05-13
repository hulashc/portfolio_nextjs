"use client";

import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import { useState } from "react";
import { blogs, Blog } from "@/data/blogs";
import DetailPopup from "@/components/DetailPopup";
import { useLanguage } from "@/components/LanguageProvider";
import Footer from "@/components/Footer";

export default function BlogsPage() {
  const { isDark, toggleDark } = useTheme();
  const { getFirstName, getLastName, getName, cycleLang } = useLanguage();
  const [hoveredBox, setHoveredBox] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const bg = isDark ? "#161616" : "#DADADA";
  const text = isDark ? "white" : "black";
  const borderColor = isDark ? "rgba(255,255,240,0.7)" : "rgba(0,0,0,0.6)";
  const hoverBg = isDark ? "#E3DACC" : "black";
  const hoverText = isDark ? "#161616" : "#DADADA";

  return (
    <div className="w-full p-2 md:p-4 min-h-screen" style={{ backgroundColor: bg }}>
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
        <span className="flex items-center justify-center px-1 sm:px-2 md:px-4 overflow-hidden" style={{ borderRight: `1px solid ${borderColor}`, cursor: 'pointer' }}>
          <span className="text-center" style={{ color: text }}>
            <span className="block sm:hidden text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold tracking-wide uppercase whitespace-nowrap" onClick={cycleLang}>
              {getFirstName()}
            </span>
            <span className="block sm:hidden text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold tracking-wide uppercase whitespace-nowrap" onClick={cycleLang}>
              {getLastName()}
            </span>
            <span className="hidden sm:block text-sm sm:text-base md:text-3xl lg:text-6xl font-bold tracking-wider md:tracking-widest uppercase whitespace-nowrap" onClick={cycleLang}>
              {getName()}
            </span>
          </span>
        </span>
        <div className="flex items-center justify-center h-full" style={{ width: "70px" }}>
          <button className="flex items-center justify-center" onClick={toggleDark} style={{ cursor: "pointer", background: "none", border: `2px solid ${text}`, width: "50px", height: "50px" }}>
            <div style={{ width: "20px", height: "20px", backgroundColor: text }}></div>
          </button>
        </div>
      </nav>

      <div className="w-full" style={{ backgroundColor: bg, marginTop: "-2px" }}>
        <div className="grid grid-cols-2 gap-0" style={{ backgroundColor: bg, minHeight: "8vh", border: `1px solid ${borderColor}` }}>
          <Link href="/" className="flex items-center justify-center cursor-pointer" style={{ borderRight: `1px solid ${borderColor}`, color: hoveredBox === "home" ? hoverText : text, backgroundColor: hoveredBox === "home" ? hoverBg : bg, transition: 'background-color 0.3s ease, color 0.3s ease' }} 
            onMouseEnter={() => setHoveredBox("home")}
            onMouseLeave={() => setHoveredBox(null)}>
            <span className="text-sm sm:text-lg md:text-2xl lg:text-4xl font-bold uppercase" style={{ color: hoveredBox === "home" ? hoverText : text, transition: 'color 0.3s ease' }}>home</span>
          </Link>
          <Link href="/projects" className="flex items-center justify-center cursor-pointer" style={{ color: hoveredBox === "projects" ? hoverText : text, backgroundColor: hoveredBox === "projects" ? hoverBg : bg, transition: 'background-color 0.3s ease, color 0.3s ease' }} 
            onMouseEnter={() => setHoveredBox("projects")}
            onMouseLeave={() => setHoveredBox(null)}>
            <span className="text-sm sm:text-lg md:text-2xl lg:text-4xl font-bold uppercase" style={{ color: hoveredBox === "projects" ? hoverText : text, transition: 'color 0.3s ease' }}>projects</span>
          </Link>
        </div>
        <div className="p-4 md:p-6" style={{ border: `1px solid ${borderColor}`, minHeight: "calc(90vh - 10vh)", marginTop: "-2px" }}>
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold uppercase mb-4 md:mb-8" style={{ color: text }}>Blogs</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4" style={{ backgroundColor: bg }}>
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="p-3 md:p-4 cursor-pointer"
                style={{ border: `1px solid ${borderColor}`, backgroundColor: hoveredItem === blog.id ? hoverBg : bg, transition: 'background-color 0.3s ease, color 0.3s ease' }}
                onMouseEnter={() => setHoveredItem(blog.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => setSelectedBlog(blog)}
              >
                <h2 className="text-base md:text-xl lg:text-2xl font-bold uppercase mb-1" style={{ color: hoveredItem === blog.id ? hoverText : text, transition: 'color 0.3s ease' }}>{blog.title}</h2>
                {blog.subtitle && (
                  <p className="text-xs md:text-sm" style={{ color: hoveredItem === blog.id ? hoverText : text, opacity: hoveredItem === blog.id ? 1 : 0.6, transition: 'color 0.3s ease, opacity 0.3s ease' }}>{blog.subtitle}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <DetailPopup
        isOpen={selectedBlog !== null}
        onClose={() => setSelectedBlog(null)}
        title={selectedBlog?.title || ''}
        sections={selectedBlog?.sections || []}
      />

      <Footer isDark={isDark} text={text} borderColor={borderColor} />
    </div>
  );
}