"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { usePathname } from "next/navigation";

export function SubNav() {
  const { isDark } = useTheme();
  const pathname = usePathname();

  const bg = isDark ? "#161616" : "#DADADA";
  const text = isDark ? "white" : "black";
  const borderColor = isDark ? "rgba(255,255,240,0.7)" : "rgba(0,0,0,0.6)";
  const activeBg = isDark ? "#E3DACC" : "#000000";
  const activeText = isDark ? "#161616" : "#DADADA";

  const getLinkClass = (href: string) => {
    const isActive = pathname === href;
    return {
      backgroundColor: isActive ? activeBg : bg,
      color: isActive ? activeText : text,
    };
  };

  return (
    <div 
      className="w-full grid grid-cols-2 gap-0" 
      style={{ 
        backgroundColor: bg, 
        minHeight: "8vh", 
        border: `1px solid ${borderColor}`,
        marginTop: "-2px"
      }}
    >
      <Link 
        href="/projects"
        className="nav-box flex items-center justify-center cursor-pointer p-1 sm:p-2"
        style={{ 
          borderRight: `1px solid ${borderColor}`, 
          ...getLinkClass("/projects")
        }}
      >
        <span className="nav-text text-sm sm:text-lg md:text-2xl lg:text-4xl font-bold uppercase" style={{ color: getLinkClass("/projects").color }}>projects</span>
      </Link>
      <Link 
        href="/blogs"
        className="nav-box flex items-center justify-center cursor-pointer p-1 sm:p-2"
        style={{ 
          ...getLinkClass("/blogs")
        }}
      >
        <span className="nav-text text-sm sm:text-lg md:text-2xl lg:text-4xl font-bold uppercase" style={{ color: getLinkClass("/blogs").color }}>blogs</span>
      </Link>
    </div>
  );
}