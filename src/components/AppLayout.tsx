"use client";

import { MainNav } from "@/components/MainNav";
import { SubNav } from "@/components/SubNav";
import { useTheme } from "@/components/ThemeProvider";

export function AppLayout() {
  const { isDark } = useTheme();

  const bg = isDark ? "#161616" : "#DADADA";

  return (
    <div className="w-full p-2 md:p-4 max-w-screen overflow-x-hidden" style={{ backgroundColor: bg }}>
      <MainNav />
      <SubNav />
    </div>
  );
}