import HeroMedia from "./HeroMedia";

const CTA_HREF = "mailto:concierge@example.com?subject=AURUM%20Noir%20%EC%BB%AC%EB%A0%89%EC%85%98%20%EB%AC%B8%EC%9D%98";

export function Hero() {
  return (
    <header className="relative isolate flex min-h-svh items-end overflow-hidden">
      <HeroMedia />
      <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 md:pb-28">
        <p data-m="blur-in" className="mb-4 text-sm tracking-[0.3em] text-accent uppercase">AURUM Noir</p>
        <h1 data-m="blur-in" className="max-w-4xl">시간을 빚는 정밀함</h1>
        <p data-m="blur-in" className="mt-6 max-w-xl text-muted">장인의 손끝에서 완성되는 1,200개의 부품. 절제된 어둠 속에서 가장 정확한 시간을 만납니다.</p>
        <a data-m="magnetic" href={CTA_HREF} className="mt-10 inline-block rounded-full border border-accent px-8 py-4 text-accent transition-colors hover:bg-accent hover:text-black">컬렉션 문의하기</a>
      </div>
    </header>
  );
}

export function Proof() {
  const items = [["320h", "한 점당 제작 시간"], ["1,200", "정밀 부품 수"], ["10년", "공식 보증"]];
  return (
    <section aria-labelledby="proof-h" className="section-pad bg-surface">
      <div className="mx-auto max-w-6xl px-6">
        <h2 id="proof-h" className="sr-only">신뢰의 수치</h2>
        <ul className="grid gap-12 md:grid-cols-3">
          {items.map(([n, l]) => (
            <li key={l} data-m="blur-in"><p className="font-serif text-6xl text-accent">{n}</p><p className="mt-2 text-muted">{l}</p></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Features() {
  const f = [["소재", "사파이어 글라스와 904L 스틸, 손으로 마감한 케이스."], ["무브먼트", "자체 개발 칼리버, 72시간 파워리저브."], ["마감", "코트 드 제네브와 베벨링, 모든 면을 수작업으로."]];
  return (
    <section aria-labelledby="feat-h" className="section-pad">
      <div className="mx-auto max-w-6xl px-6">
        <h2 id="feat-h" data-m="blur-in" className="mb-16 max-w-2xl">세 가지 원칙이 하나의 시계를 만듭니다</h2>
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

export function Showcase() {
  return (
    <section aria-labelledby="show-h" className="section-pad bg-surface">
      <div className="mx-auto max-w-6xl px-6">
        <h2 id="show-h" data-m="blur-in" className="mb-12">디테일 속의 서사</h2>
        <div data-m="reveal" className="aspect-video overflow-hidden rounded-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/showcase-poster.svg" alt="제품 상세 영상 포스터 (플레이스홀더)" width={1600} height={900} className="h-full w-full object-cover" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section aria-labelledby="cta-h" className="section-pad text-center">
      <div className="mx-auto max-w-3xl px-6">
        <h2 id="cta-h" data-m="blur-in">당신의 시간을 예약하세요</h2>
        <p data-m="blur-in" className="mt-6 text-muted">컨시어지가 컬렉션 상담 일정을 안내해 드립니다.</p>
        <a data-m="magnetic" href={CTA_HREF} className="mt-10 inline-block w-full rounded-full bg-accent px-8 py-4 text-black md:w-auto">컬렉션 문의하기</a>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-12 text-sm text-muted">
      <div className="mx-auto max-w-6xl">
        <p>concierge@example.com</p>
        <p className="mt-2">AURUM Noir는 CineFlow Studio T01 템플릿 시연용 가상 브랜드입니다. 모든 미디어는 자체 제작 플레이스홀더입니다.</p>
      </div>
    </footer>
  );
}
