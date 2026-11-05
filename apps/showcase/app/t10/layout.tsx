import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import Shell from "@/components/Shell";
import "./theme.css";

const display = Plus_Jakarta_Sans({ variable: "--nf-display", subsets: ["latin"], weight: ["500", "700", "800"], display: "swap" });
const mono = JetBrains_Mono({ variable: "--nf-mono", subsets: ["latin"], weight: ["400", "500"], display: "swap" });

export const metadata: Metadata = {
  title: "CODELAB 12 — 12주 개발자 부트캠프",
  description: "CODELAB 12는 가상의 교육 프로그램 샘플입니다. CineFlow Studio T10 전환 퍼널 템플릿 데모.",
  openGraph: { title: "CODELAB 12", description: "12주 뒤, 개발자로 출근합니다 (샘플)", type: "website" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Shell theme="t10" fonts={`${display.variable} ${mono.variable}`}>{children}</Shell>;
}
