import SplitText from "./SplitText";
import { HeroMock, StepMock } from "./Mocks";

const CTA_HREF = "mailto:demo@example.com?subject=NOVA%20Flow%20%EB%AC%B4%EB%A3%8C%20%EB%8D%B0%EB%AA%A8%20%EC%8B%A0%EC%B2%AD";
const ctaBase = "inline-block rounded-full px-8 py-4 font-medium";

export function Hero() {
  return (
    <header className="section-pad">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
        <div>
          <p data-m="blur-in" className="mb-4 text-sm font-semibold tracking-widest text-accent uppercase">NOVA Flow</p>
          <h1><SplitText text="반복 업무를 흐름으로 바꾸세요" /></h1>
          <p data-m="blur-in" className="mt-6 max-w-lg text-muted">앱을 연결하고 규칙을 설계하면, 나머지는 NOVA Flow가 실행합니다. 팀은 판단이 필요한 일에만 집중하세요.</p>
          <a data-m="magnetic" href={CTA_HREF} className={`${ctaBase} mt-10 bg-accent text-white`}>무료 데모 신청</a>
        </div>
        <div data-m="blur-in"><HeroMock /></div>
      </div>
    </header>
  );
}

export function Proof() {
  const items = [["68%", "반복 업무 시간 절감"], ["12분", "평균 첫 워크플로 구축"], ["99.9%", "월간 실행 성공률"]];
  return (
    <section aria-labelledby="proof-h" className="section-pad bg-surface">
      <div className="mx-auto max-w-6xl px-6">
        <h2 id="proof-h" className="sr-only">성과 수치 (샘플 데이터)</h2>
        <ul className="grid gap-10 md:grid-cols-3">
          {items.map(([n, l]) => (
            <li key={l} data-m="blur-in"><p className="font-display text-6xl font-bold text-accent">{n}</p><p className="mt-2 text-muted">{l}</p></li>
          ))}
        </ul>
        <p className="mt-10 text-xs text-muted">※ 수치는 가상 제품 샘플 데이터입니다.</p>
      </div>
    </section>
  );
}

export function Features() {
  const f = [["연결", "메신저, 시트, CRM 등 주요 도구와 클릭 몇 번으로 연동합니다."], ["자동화", "조건과 예외를 규칙으로 정의하면 AI가 분류와 요약을 맡습니다."], ["관찰", "실행 로그와 실패 알림으로 흐름의 상태를 한눈에 확인합니다."]];
  return (
    <section aria-labelledby="feat-h" className="section-pad">
      <div className="mx-auto max-w-6xl px-6">
        <h2 id="feat-h" data-m="blur-in" className="mb-14 max-w-2xl">세 가지로 충분합니다</h2>
        <ul className="grid gap-6 md:grid-cols-3">
          {f.map(([t, d]) => (
            <li key={t} data-m="blur-in" className="rounded-2xl bg-surface p-8"><h3 className="text-2xl font-bold">{t}</h3><p className="mt-3 text-muted">{d}</p></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const STEPS = [
  ["01 연결", "자주 쓰는 도구를 연결하면 데이터가 한곳으로 모입니다."],
  ["02 설계", "조건과 예외를 규칙으로 구성합니다. 코드는 필요 없습니다."],
  ["03 실행", "흐름이 자동으로 돌고, 결과는 로그로 남습니다."],
] as const;

/** M04 Pinned story. md+: text list + stacked panels (pinned). <md or reduced-motion: each step stacked with its own mock. */
export function Showcase() {
  return (
    <section aria-labelledby="show-h" data-m="pin" className="bg-surface md:min-h-svh">
      <div className="mx-auto max-w-6xl px-6 py-20 md:flex md:min-h-svh md:flex-col md:justify-center">
        <h2 id="show-h" className="mb-12">연결에서 실행까지, 3단계</h2>
        <div className="md:grid md:grid-cols-2 md:items-center md:gap-12">
          <ol className="space-y-12 md:space-y-8">
            {STEPS.map(([t, d], i) => (
              <li key={t} data-step={i}>
                <h3 className="text-2xl font-bold">{t}</h3>
                <p className="mt-2 text-muted">{d}</p>
                <div className="mt-6 md:hidden"><StepMock step={i as 0 | 1 | 2} /></div>
              </li>
            ))}
          </ol>
          <div className="hidden md:grid [&>*]:[grid-area:1/1]">
            {STEPS.map((_, i) => <div key={i} data-panel={i}><StepMock step={i as 0 | 1 | 2} /></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section aria-labelledby="cta-h" className="section-pad text-center">
      <div className="mx-auto max-w-3xl px-6">
        <h2 id="cta-h" data-m="blur-in">지금 첫 흐름을 만들어 보세요</h2>
        <p data-m="blur-in" className="mt-6 text-muted">30분 데모에서 팀의 업무에 맞는 시나리오를 함께 설계합니다.</p>
        <a data-m="magnetic" href={CTA_HREF} className={`${ctaBase} mt-10 w-full bg-accent text-white md:w-auto`}>무료 데모 신청</a>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-accent/10 px-6 py-12 text-sm text-muted">
      <div className="mx-auto max-w-6xl">
        <p>demo@example.com</p>
        <p className="mt-2">NOVA Flow는 CineFlow Studio T03 템플릿 시연용 가상 제품입니다. 모든 화면은 자체 제작 목업입니다.</p>
      </div>
    </footer>
  );
}
