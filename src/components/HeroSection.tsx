"use client";

import { useTheme } from "./ThemeProvider";
import HeroAnimation from "./HeroAnimation";

export function HeroSection() {
  const { isDark } = useTheme();

  const bg = isDark ? "#161616" : "#DADADA";
  const borderColor = isDark ? "rgba(255,255,240,0.7)" : "rgba(0,0,0,0.6)";

  return (
    <div style={{ backgroundColor: bg, marginTop: "-2px" }}>
      <HeroAnimation />
    </div>
  );
}