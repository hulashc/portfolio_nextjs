import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hulash Chand | Data Engineer → AI/ML Engineer",
  description: "Building scalable data infrastructure for AI/ML",
};

export default function HomePage() {
  return (
    <Navbar />
  );
}