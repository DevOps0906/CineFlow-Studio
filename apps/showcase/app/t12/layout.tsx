import type { Metadata } from "next";
import { Anton, Space_Mono } from "next/font/google";
import Shell from "@/components/Shell";
import "./theme.css";
import "./t12.css";

const display = Anton({ variable: "--nf-display", subsets: ["latin"], weight: "400", display: "swap" });
const mono = Space_Mono({ variable: "--nf-mono", subsets: ["latin"], weight: ["400", "700"], display: "swap" });

export const metadata: Metadata = {
  title: "SEOUL SOUND WEEK 2027 — May 14—17",
  description: "SEOUL SOUND WEEK는 가상의 음악 페스티벌 샘플입니다. CineFlow Studio T12 행사 템플릿 데모.",
  openGraph: { title: "SEOUL SOUND WEEK 2027", description: "May 14—17 · Nodeul Island (샘플)", type: "website" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Shell theme="t12" fonts={`${display.variable} ${mono.variable}`}>{children}</Shell>;
}
