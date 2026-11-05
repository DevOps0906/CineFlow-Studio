import ModelStage from "../three/ModelStage";

const CTA_HREF = "mailto:studio@example.com?subject=STRATA%20Atelier%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%83%81%EB%8B%B4";

export function Hero() {
  return (
    <header className="relative isolate flex min-h-svh items-end overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/hero.svg" alt="" className="h-full w-full object-cover" data-m="parallax" />
      </div>
      <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 md:pb-28">
        <p data-m="blur-in" className="mb-4 text-sm font-semibold tracking-[0.3em] text-accent uppercase">STRATA Atelier</p>
        <h1 data-m="blur-in" className="max-w-4xl">구조가 공간의 언어가 됩니다</h1>
        <p data-m="blur-in" className="mt-6 max-w-xl text-muted">대지에서 시작해 구조로 말하는 건축. 견고한 뼈대 위에 빛과 재료를 더합니다.</p>
        <a href={CTA_HREF} className="mt-10 inline-block rounded-sm bg-dark px-8 py-4 text-bg">프로젝트 상담</a>
      </div>
    </header>
  );
}

export function Proof() {
  const items = [["48", "완공 프로젝트"], ["7", "건축 수상"], ["15년", "설계 경력"]];
  return (
    <section aria-labelledby="proof-h" className="section-pad bg-surface">
      <div className="mx-auto max-w-6xl px-6">
        <h2 id="proof-h" className="sr-only">신뢰의 수치 (샘플 데이터)</h2>
        <ul className="grid gap-12 md:grid-cols-3">
          {items.map(([n, l]) => (
            <li key={l} data-m="blur-in"><p className="font-serif text-6xl text-accent">{n}</p><p className="mt-2 text-muted">{l}</p></li>
          ))}
        </ul>
        <p className="mt-10 text-xs text-muted">※ 수치는 가상 사무소 샘플 데이터입니다.</p>
      </div>
    </section>
  );
}

export function Features() {
  const f = [["구조", "하중의 흐름이 보이는 정직한 구조를 설계합니다."], ["재료", "노출 콘크리트와 목재, 시간이 지날수록 깊어지는 재료를 씁니다."], ["빛", "시간대별 빛의 각도를 계산해 공간의 표정을 만듭니다."]];
  return (
    <section aria-labelledby="feat-h" className="section-pad">
      <div className="mx-auto max-w-6xl px-6">
        <h2 id="feat-h" data-m="blur-in" className="mb-16 max-w-2xl">세 가지 원칙으로 짓습니다</h2>
        <ul className="grid gap-12 md:grid-cols-3">
          {f.map(([t, d], i) => (
            <li key={t}>
              <div data-m="reveal" className="aspect-[4/3] overflow-hidden rounded-sm bg-surface">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/media/feature-${i + 1}.svg`} alt={`${t} 이미지 (플레이스홀더)`} width={800} height={600} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <h3 className="mt-6 text-3xl">{t}</h3>
              <p className="mt-2 text-muted">{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const STEPS = [
  ["01 대지", "땅의 경사와 바람, 햇빛을 읽는 것에서 시작합니다. 기초가 놓입니다."],
  ["02 구조", "하중이 지나는 길을 따라 층이 쌓입니다. 구조가 곧 공간의 형태가 됩니다."],
  ["03 완성", "지붕이 덮이고 빛이 들어오면, 구조는 공간의 언어가 됩니다."],
] as const;

/** M04 Pinned story + M08 Model reveal. */
export function Showcase() {
  return (
    <section aria-labelledby="show-h" data-m="pin" className="bg-surface md:min-h-svh">
      <div className="mx-auto max-w-6xl px-6 py-20 md:flex md:min-h-svh md:flex-col md:justify-center">
        <h2 id="show-h" className="mb-12">대지에서 완성까지</h2>
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-12">
          <ol className="order-2 space-y-10 md:order-1 md:space-y-8">
            {STEPS.map(([t, d], i) => (
              <li key={t} data-step={i}><h3 className="text-2xl">{t}</h3><p className="mt-2 text-muted">{d}</p></li>
            ))}
          </ol>
          <div className="order-1 md:order-2"><ModelStage /></div>
        </div>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section aria-labelledby="cta-h" className="section-pad text-center">
      <div className="mx-auto max-w-3xl px-6">
        <h2 id="cta-h" data-m="blur-in">당신의 대지를 이야기해 주세요</h2>
        <p data-m="blur-in" className="mt-6 text-muted">첫 상담에서 대지와 예산, 일정을 함께 검토합니다.</p>
        <a href={CTA_HREF} className="mt-10 inline-block w-full rounded-sm bg-dark px-8 py-4 text-bg md:w-auto">프로젝트 상담</a>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-ink/10 px-6 py-12 text-sm text-muted">
      <div className="mx-auto max-w-6xl">
        <p>studio@example.com</p>
        <p className="mt-2">STRATA Atelier는 CineFlow Studio T04 템플릿 시연용 가상 사무소입니다. 모든 미디어와 3D 모델은 자체 제작입니다.</p>
      </div>
    </footer>
  );
}
