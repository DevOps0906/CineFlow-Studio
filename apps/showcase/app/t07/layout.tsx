import type { Metadata } from "next";
import { DM_Mono, Italiana } from "next/font/google";
import Shell from "@/components/Shell";
import "./theme.css";
import "./t07.css";

const display = Italiana({ variable: "--nf-display", subsets: ["latin"], weight: "400", display: "swap" });
const mono = DM_Mono({ variable: "--nf-mono", subsets: ["latin"], weight: ["400", "500"], display: "swap" });

export const metadata: Metadata = {
  title: "LUMÉ — Liquid Pearl Collection",
  description: "LUMÉ는 가상의 주얼리·뷰티 브랜드 샘플입니다. CineFlow Studio T07 템플릿 데모.",
  openGraph: { title: "LUMÉ", description: "Liquid Pearl Collection (샘플)", type: "website" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Shell theme="t07" fonts={`${display.variable} ${mono.variable}`}>{children}</Shell>;
}
