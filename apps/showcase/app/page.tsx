import Link from "next/link";

const ITEMS = [
  ["t02", "T02", "패션", "MAISON ÉCRU", "에디토리얼 타이포 · 룩북"],
  ["t05", "T05", "고급 부동산", "THE ARDEN", "인터랙티브 평면도 투어"],
  ["t06", "T06", "게임", "VOIDRUNNER", "3D 렐릭 인터랙션"],
  ["t07", "T07", "주얼리/뷰티", "LUMÉ", "액체 유리 · 포인터 하이라이트"],
  ["t08", "T08", "자동차", "VELOCE E1", "스크롤 드라이브 스크럽 · 컬러 구성기"],
  ["t09", "T09", "포트폴리오", "HANA SEO", "타이포 리빌 · 호버 프리뷰"],
  ["t10", "T10", "교육", "CODELAB 12", "트랙 진단 퀴즈 · 전환 퍼널"],
  ["t11", "T11", "B2B", "ORBITAL", "ROI 계산기 · 사례 탭"],
  ["t12", "T12", "행사", "SEOUL SOUND WEEK", "라이브 카운트다운 · 라인업 갤러리"],
];

export default function Index() {
  return (
    <main id="main" className="min-h-svh bg-[#0b0b0b] px-6 py-16 text-[#f5f5f0] md:px-14">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#a3a39b]">CineFlow Studio · Showcase</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">P1 템플릿 9종</h1>
      <p className="mt-4 max-w-xl text-[#a3a39b]">모든 브랜드, 수치, 인물은 가상입니다. 시각 요소는 코드로 자체 제작했습니다.</p>
      <ul className="mt-12 grid gap-3 md:grid-cols-3">
        {ITEMS.map(([slug, id, cat, name, sig]) => (
          <li key={slug}>
            <Link href={`/${slug}`} className="block rounded-xl border border-[#2a2a2a] p-6 transition-colors hover:border-[#f5f5f0]">
              <p className="font-mono text-xs text-[#a3a39b]">{id} · {cat}</p>
              <p className="mt-2 text-2xl font-bold tracking-tight">{name}</p>
              <p className="mt-1 text-sm text-[#a3a39b]">{sig}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
