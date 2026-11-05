import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";

const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"], weight: ["400", "600", "700"], display: "swap" });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["400", "500"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "NOVA Flow — Turn repetition into flow",
  description: "NOVA Flow는 가상의 AI 워크플로 자동화 제품 샘플입니다. CineFlow Studio T03 템플릿 데모.",
  openGraph: { title: "NOVA Flow", description: "반복 업무를, 흐름으로 (샘플)", type: "website", images: ["/media/og.svg"] },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0a0b10" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning className={`${grotesk.variable} ${mono.variable}`}>
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
