import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["400", "600"], display: "swap" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "AURUM Noir — 시간을 빚는 정밀함",
  description: "AURUM Noir는 가상의 럭셔리 시계 브랜드 샘플입니다. CineFlow Studio T01 템플릿 데모.",
  openGraph: { title: "AURUM Noir", description: "시간을 빚는 정밀함 (샘플)", type: "website", images: ["/media/hero-poster.svg"] },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0a0a0b" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <a className="skip-link" href="#main">본문으로 건너뛰기</a>
        {children}
      </body>
    </html>
  );
}

