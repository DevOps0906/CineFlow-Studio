"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Status } from "@/lib/data";

export interface NavItem { id: string; slug: string; name: string; status: Status }

const DOT = { built: "bg-emerald-400", "spec-draft": "bg-amber-400", planned: "bg-zinc-600" } as const;

export default function Sidebar({ items }: { items: NavItem[] }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);

  const item = (href: string, label: string, extra?: React.ReactNode) => {
    const active = path === href;
    return (
      <Link key={href} href={href} aria-current={active ? "page" : undefined}
        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${active ? "bg-white/10 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"}`}>
        {extra}<span className="truncate">{label}</span>
      </Link>
    );
  };

  return (
    <>
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-zinc-950 px-4 py-3 lg:hidden">
        <span className="font-semibold">CineFlow Studio</span>
        <button aria-expanded={open} aria-controls="gnb" onClick={() => setOpen(!open)} className="rounded-md border border-white/20 px-3 py-1 text-sm">{open ? "닫기" : "메뉴"}</button>
      </div>
      <nav id="gnb" aria-label="주 메뉴"
        className={`${open ? "block" : "hidden"} fixed inset-x-0 top-[53px] bottom-0 z-20 overflow-y-auto bg-zinc-950 p-4 lg:sticky lg:top-0 lg:block lg:h-screen lg:w-64 lg:shrink-0 lg:border-r lg:border-white/10`}>
        <p className="mb-6 hidden px-3 text-lg font-semibold lg:block">CineFlow Studio</p>
        {item("/", "대시보드")}
        <p className="mt-6 mb-2 px-3 text-xs tracking-widest text-zinc-500 uppercase">카테고리</p>
        <div className="space-y-0.5">
          {items.map((t) => item(`/category/${t.slug}`, `${t.id} ${t.name}`, <span aria-hidden className={`h-2 w-2 shrink-0 rounded-full ${DOT[t.status]}`} />))}
        </div>
        <p className="mt-6 px-3 text-xs text-zinc-500">
          <span className="mr-1 inline-block h-2 w-2 rounded-full bg-emerald-400" />구현{" "}
          <span className="mr-1 ml-2 inline-block h-2 w-2 rounded-full bg-amber-400" />초안{" "}
          <span className="mr-1 ml-2 inline-block h-2 w-2 rounded-full bg-zinc-600" />계획
        </p>
      </nav>
    </>
  );
}
