import type { Metadata } from "next";
import { Space_Mono, Syne } from "next/font/google";
import Shell from "@/components/Shell";
import "./theme.css";
import "./t09.css";

const display = Syne({ variable: "--nf-display", subsets: ["latin"], weight: ["500", "700", "800"], display: "swap" });
const mono = Space_Mono({ variable: "--nf-mono", subsets: ["latin"], weight: ["400", "700"], display: "swap" });

export const metadata: Metadata = {
  title: "Hana Seo — Designer & Art Director",
  description: "Hana Seo는 가상의 디자이너 포트폴리오 샘플입니다. CineFlow Studio T09 템플릿 데모.",
  openGraph: { title: "Hana Seo", description: "Identity, interface, type (샘플)", type: "website" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Shell theme="t09" fonts={`${display.variable} ${mono.variable}`}>{children}</Shell>;
}
