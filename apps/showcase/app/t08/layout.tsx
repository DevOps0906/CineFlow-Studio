import type { Metadata } from "next";
import { JetBrains_Mono, Saira_Condensed } from "next/font/google";
import Shell from "@/components/Shell";
import "./theme.css";
import "./t08.css";

const display = Saira_Condensed({ variable: "--nf-display", subsets: ["latin"], weight: ["300", "600", "800"], display: "swap" });
const mono = JetBrains_Mono({ variable: "--nf-mono", subsets: ["latin"], weight: ["400", "500"], display: "swap" });

export const metadata: Metadata = {
  title: "VELOCE E1 — All-electric Grand Tourer",
  description: "VELOCE E1은 가상의 전기 그랜드 투어러 샘플입니다. CineFlow Studio T08 자동차 템플릿 데모.",
  openGraph: { title: "VELOCE E1", description: "0–100 km/h 2.9s (샘플)", type: "website" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Shell theme="t08" fonts={`${display.variable} ${mono.variable}`}>{children}</Shell>;
}
