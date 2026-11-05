import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";

const tight = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"], weight: ["300", "500", "700"], display: "swap" });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["400", "500"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "STRATA Atelier — Light Study",
  description: "STRATA Atelier는 가상의 건축 사무소 샘플입니다. CineFlow Studio T04 템플릿 데모.",
  openGraph: { title: "STRATA Atelier", description: "빛이 구조를 완성합니다 (샘플)", type: "website", images: ["/media/og.svg"] },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#111111" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${tight.variable} ${mono.variable}`}>
      <body>
        <a className="skip-link" href="#main">본문으로 건너뛰기</a>
        {children}
      </body>
    </html>
  );
}
