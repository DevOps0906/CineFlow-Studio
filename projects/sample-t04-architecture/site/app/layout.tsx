import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["400", "600"], display: "swap" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "STRATA Atelier — 구조가 공간의 언어가 됩니다",
  description: "STRATA Atelier는 가상의 건축 사무소 샘플입니다. CineFlow Studio T04 템플릿 데모.",
  openGraph: { title: "STRATA Atelier", description: "구조가 공간의 언어가 됩니다 (샘플)", type: "website", images: ["/media/og.svg"] },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#e9e6e0" };

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
