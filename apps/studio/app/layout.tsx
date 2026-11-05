import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = { title: "CineFlow Studio — 대시보드", description: "템플릿·모션·QA 현황을 관리하는 CineFlow Studio 내부 대시보드" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased lg:flex">
        <Sidebar />
        <main className="min-w-0 flex-1 p-4 md:p-8">{children}</main>
      </body>
    </html>
  );
}
