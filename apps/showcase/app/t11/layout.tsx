import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import Shell from "@/components/Shell";
import "./theme.css";

const display = IBM_Plex_Sans({ variable: "--nf-display", subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });
const mono = IBM_Plex_Mono({ variable: "--nf-mono", subsets: ["latin"], weight: ["400", "500"], display: "swap" });

export const metadata: Metadata = {
  title: "ORBITAL — Logistics Cloud",
  description: "ORBITAL은 가상의 B2B 물류 SaaS 샘플입니다. CineFlow Studio T11 성과·사례 템플릿 데모.",
  openGraph: { title: "ORBITAL", description: "물류비 18% 절감 (샘플)", type: "website" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Shell theme="t11" fonts={`${display.variable} ${mono.variable}`}>{children}</Shell>;
}
