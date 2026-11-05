import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "NOVA Flow — 반복 업무를 흐름으로",
  description: "NOVA Flow는 가상의 AI 워크플로 자동화 제품 샘플입니다. CineFlow Studio T03 템플릿 데모.",
  openGraph: { title: "NOVA Flow", description: "반복 업무를 흐름으로 바꾸세요 (샘플)", type: "website", images: ["/media/og.svg"] },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f7f8fc" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${inter.variable} ${grotesk.variable}`}>
      <body>
        <a className="skip-link" href="#main">본문으로 건너뛰기</a>
        {children}
      </body>
    </html>
  );
}
