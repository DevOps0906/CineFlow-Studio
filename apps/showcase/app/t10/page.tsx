// T10 CODELAB 12 — motions: M01 Blur-in, M02 Split reveal, M07 Magnetic CTA (+ track-finder quiz funnel)
import MotionInit from "@/components/MotionInit";
import SplitText from "@/components/SplitText";
import Quiz from "./Quiz";

const CTA = "mailto:admissions@example.com?subject=CODELAB%2012%20%EC%83%81%EB%8B%B4";
const wrap = "mx-auto max-w-[1280px] px-6 md:px-10";
const btn = "inline-flex items-center justify-center rounded-xl bg-primary px-6 py-4 font-bold text-primary-fg transition-transform hover:-translate-y-0.5";

const PHASES = [
  ["Week 1—3", "Foundations", "Git, 웹 기초, JavaScript 문법과 알고리즘 기초."],
  ["Week 4—6", "Frontend", "React, TypeScript, 상태 관리와 테스트."],
  ["Week 7—9", "Backend", "Node.js API, 데이터베이스, 인증과 배포."],
  ["Week 10—12", "Capstone", "현업 멘토와 4인 팀 프로젝트, 데모데이 발표."],
];
const FAQ = [
  ["비전공자도 따라갈 수 있나요?", "수강생의 64%가 비전공자입니다. 사전 과제와 1:1 튜터링으로 기초를 맞춥니다."],
  ["일과 병행할 수 있나요?", "주 40시간 몰입 과정입니다. 병행이 필요하면 24주 파트타임 과정을 추천합니다."],
  ["취업 지원은 어떻게 하나요?", "이력서·포트폴리오 리뷰, 모의 면접, 연계 기업 추천을 수료 후 6개월까지 제공합니다."],
];

export default function Page() {
  return (
    <>
      <header id="top" className="relative overflow-hidden">
        <div aria-hidden className="absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(194,65,12,.12),transparent_65%)]" />
        <nav aria-label="주 메뉴" className={`${wrap} flex items-center justify-between py-6`}>
          <a href="#top" className="font-display text-xl font-extrabold tracking-tight">codelab<span className="text-primary">12</span></a>
          <ul className="hidden gap-8 text-sm font-medium md:flex"><li><a href="#curriculum">커리큘럼</a></li><li><a href="#quiz">트랙 진단</a></li><li><a href="#pricing">수강료</a></li><li><a href="#faq">FAQ</a></li></ul>
          <a href={CTA} className="rounded-lg border border-text px-4 py-2 text-sm font-semibold">상담 신청</a>
        </nav>
        <div className={`${wrap} relative grid gap-12 pb-20 pt-10 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:pb-28 lg:pt-16`}>
          <div>
            <p data-m="blur-in" className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 font-mono text-xs font-medium text-primary">● 2027년 1월 기수 모집 중</p>
            <h1 className="mt-6 font-display text-display font-extrabold leading-[1.08] tracking-display"><SplitText text="12주 뒤, 개발자로 출근합니다." accent={["개발자로"]} /></h1>
            <p data-m="blur-in" className="mt-6 max-w-lg text-lg text-text-muted">현업 개발자 멘토와 12주 몰입 과정. 수료 후 6개월 안에 87%가 개발자로 취업했습니다.</p>
            <div data-m="blur-in" className="mt-9 flex flex-wrap gap-3">
              <a data-m="magnetic" data-cta href="#quiz" className={btn}>무료 트랙 진단 시작</a>
              <a href="#curriculum" className="inline-flex items-center rounded-xl border border-border bg-surface px-6 py-4 font-semibold">커리큘럼 보기</a>
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4">
              {[["1,240", "누적 수료생"], ["87%", "6개월 내 취업"], ["4.9", "수강 만족도"]].map(([n, l]) => (
                <div key={l}><dd className="font-display text-3xl font-extrabold tracking-tight">{n}</dd><dt className="text-sm text-text-muted">{l}</dt></div>
              ))}
            </dl>
          </div>
          <aside data-m="blur-in" aria-label="다음 기수 정보" className="rounded-3xl border border-border bg-surface p-7 shadow-[0_30px_80px_-40px_rgba(27,27,58,.35)]">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-text-muted">Next cohort</p>
            <p className="mt-2 font-display text-3xl font-extrabold">2027.01.05 개강</p>
            <div className="mt-6">
              <div className="flex justify-between text-sm"><span className="font-semibold">잔여 17석</span><span className="text-text-muted">23 / 40 등록</span></div>
              <div className="mt-2 h-2.5 rounded-full bg-border" role="progressbar" aria-valuenow={23} aria-valuemin={0} aria-valuemax={40} aria-label="등록 현황"><div className="h-full w-[57.5%] rounded-full bg-primary" /></div>
            </div>
            <ul className="mt-6 space-y-3 text-sm">
              {[["얼리버드 마감", "12월 20일"], ["형태", "온라인 + 판교 캠퍼스"], ["시간", "주 5일 · 10:00—19:00"]].map(([k, v]) => <li key={k} className="flex justify-between border-b border-border pb-3"><span className="text-text-muted">{k}</span><span className="font-semibold">{v}</span></li>)}
            </ul>
            <a href={CTA} className={`${btn} mt-6 w-full`}>얼리버드로 신청하기</a>
          </aside>
        </div>
      </header>

      <main id="main">
        <section id="curriculum" aria-labelledby="cur-h" className="border-y border-border bg-surface">
          <div className={`${wrap} py-24 md:py-32`}>
            <p className="font-mono text-sm font-medium text-primary">Curriculum</p>
            <h2 id="cur-h" data-m="blur-in" className="mt-3 font-display text-h1 font-extrabold leading-tight tracking-display">12주, 네 단계로 완성합니다.</h2>
            <ol className="mt-12 grid gap-4 md:grid-cols-4">
              {PHASES.map(([w, t, d], i) => (
                <li key={t} data-m="blur-in" className="rounded-2xl border border-border bg-bg p-6">
                  <p className="font-mono text-xs text-text-muted">{w}</p>
                  <h3 className="mt-3 font-display text-2xl font-extrabold">{t}</h3>
                  <p className="mt-2 text-sm text-text-muted">{d}</p>
                  <div className="mt-6 h-1.5 rounded-full bg-border"><div className="h-full rounded-full bg-accent" style={{ width: `${(i + 1) * 25}%` }} /></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="quiz" aria-labelledby="quiz-h" className={`${wrap} py-24 md:py-32`}>
          <p className="font-mono text-sm font-medium text-primary">Track finder · 1분</p>
          <h2 id="quiz-h" data-m="blur-in" className="mb-10 mt-3 font-display text-h1 font-extrabold leading-tight tracking-display">나에게 맞는 트랙은?</h2>
          <Quiz cta={CTA} />
        </section>

        <section id="pricing" aria-labelledby="price-h" className="border-y border-border bg-surface">
          <div className={`${wrap} py-24 md:py-32`}>
            <h2 id="price-h" data-m="blur-in" className="font-display text-h1 font-extrabold leading-tight tracking-display">수강료</h2>
            <ul className="mt-10 grid gap-4 md:grid-cols-2">
              {[["일시불", "₩ 6,900,000", "₩ 4,830,000", true], ["12개월 분할", "월 ₩ 575,000", "월 ₩ 402,500", false]].map(([t, was, now, best]) => (
                <li key={t as string} data-m="blur-in" className={`relative rounded-2xl border p-8 ${best ? "border-primary bg-bg" : "border-border bg-bg"}`}>
                  {best && <span className="absolute right-6 top-6 rounded-full bg-primary px-3 py-1 font-mono text-xs text-primary-fg">얼리버드 30%</span>}
                  <h3 className="font-display text-xl font-bold">{t}</h3>
                  <p className="mt-6 text-text-muted line-through">{was}</p>
                  <p className="font-display text-4xl font-extrabold tracking-tight">{now}</p>
                  <p className="mt-4 text-sm text-text-muted">국민내일배움카드 적용 시 추가 지원 가능</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="faq" aria-labelledby="faq-h" className={`${wrap} py-24 md:py-32`}>
          <h2 id="faq-h" className="font-display text-h1 font-extrabold leading-tight tracking-display">자주 묻는 질문</h2>
          <div className="mt-10 divide-y divide-border border-y border-border">
            {FAQ.map(([q, a]) => (
              <details key={q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg font-bold">{q}<span className="text-primary transition-transform group-open:rotate-45">+</span></summary>
                <p className="mt-3 max-w-2xl text-text-muted">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section aria-labelledby="cta-h" className="bg-primary text-primary-fg">
          <div className={`${wrap} flex flex-col items-start justify-between gap-8 py-20 md:flex-row md:items-center`}>
            <div>
              <h2 id="cta-h" className="font-display text-h2 font-extrabold leading-tight">얼리버드 30%, 12월 20일 마감</h2>
              <p className="mt-2 opacity-90">잔여 17석 · 상담 후 결정해도 늦지 않아요.</p>
            </div>
            <a data-m="magnetic" href={CTA} className="rounded-xl bg-white px-7 py-4 font-bold text-primary">무료 상담 신청</a>
          </div>
        </section>
      </main>

      <footer className={`${wrap} grid gap-3 py-8 text-sm text-text-muted md:grid-cols-3`}>
        <span className="font-display font-extrabold text-text">codelab12</span>
        <a href="mailto:admissions@example.com">admissions@example.com</a>
        <span className="md:text-right">CineFlow Studio T10 시연용 가상 교육 · 수치는 샘플</span>
      </footer>
      <MotionInit />
    </>
  );
}
