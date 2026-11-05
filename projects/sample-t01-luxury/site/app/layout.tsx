import type { Metadata, Viewport } from "next";
import { Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";

const serif = Instrument_Serif({ variable: "--font-instrument", subsets: ["latin"], weight: "400", style: ["normal", "italic"], display: "swap" });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "AURUM Noir — The weight of time",
  description: "AURUM Noir는 가상의 럭셔리 시계 브랜드 샘플입니다. CineFlow Studio T01 템플릿 데모.",
  openGraph: { title: "AURUM Noir", description: "The weight of time (샘플)", type: "website", images: ["/media/og.svg"] },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0b1020" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning className={`${serif.variable} ${mono.variable}`}>
      <head>
        {/* Hero Kit: mark motion-capable visitors before first paint so intro states never flash. */}
        <script dangerouslySetInnerHTML={{ __html: "if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.dataset.motion='on'" }} />
      </head>
      <body>
        <a className="skip-link" href="#main">본문으로 건너뛰기</a>
        {children}
      </body>
    </html>
  );
}
