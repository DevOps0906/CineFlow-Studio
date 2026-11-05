import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Mono } from "next/font/google";
import Shell from "@/components/Shell";
import "./theme.css";
import "./t05.css";

const display = Cormorant_Garamond({ variable: "--nf-display", subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], display: "swap" });
const mono = DM_Mono({ variable: "--nf-mono", subsets: ["latin"], weight: ["400", "500"], display: "swap" });

export const metadata: Metadata = {
  title: "The Arden — Han-nam Residences",
  description: "The Arden은 가상의 고급 주거 단지 샘플입니다. CineFlow Studio T05 부동산 템플릿 데모.",
  openGraph: { title: "The Arden", description: "한남동, 단 24세대 (샘플)", type: "website" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Shell theme="t05" fonts={`${display.variable} ${mono.variable}`}>{children}</Shell>;
}
