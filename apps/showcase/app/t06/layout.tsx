import type { Metadata } from "next";
import { Chakra_Petch, Share_Tech_Mono } from "next/font/google";
import Shell from "@/components/Shell";
import "./theme.css";
import "./t06.css";

const display = Chakra_Petch({ variable: "--nf-display", subsets: ["latin"], weight: ["500", "700"], display: "swap" });
const mono = Share_Tech_Mono({ variable: "--nf-mono", subsets: ["latin"], weight: "400", display: "swap" });

export const metadata: Metadata = {
  title: "VOIDRUNNER — Pre-register",
  description: "VOIDRUNNER는 가상의 게임 샘플입니다. CineFlow Studio T06 게임 템플릿 데모.",
  openGraph: { title: "VOIDRUNNER", description: "공허를 달리는 자 (샘플)", type: "website" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Shell theme="t06" fonts={`${display.variable} ${mono.variable}`}>{children}</Shell>;
}
