import type { Metadata } from "next";
import { Bodoni_Moda, DM_Mono } from "next/font/google";
import Shell from "@/components/Shell";
import "./theme.css";
import "./t02.css";

const display = Bodoni_Moda({ variable: "--nf-display", subsets: ["latin"], style: ["normal", "italic"], display: "swap" });
const mono = DM_Mono({ variable: "--nf-mono", subsets: ["latin"], weight: ["400", "500"], display: "swap" });

export const metadata: Metadata = {
  title: "MAISON ÉCRU — SS27 Collection",
  description: "MAISON ÉCRU는 가상의 패션 하우스 샘플입니다. CineFlow Studio T02 에디토리얼 템플릿 데모.",
  openGraph: { title: "MAISON ÉCRU — SS27", description: "Undyed. Unhurried. (샘플)", type: "website" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Shell theme="t02" fonts={`${display.variable} ${mono.variable}`}>{children}</Shell>;
}
