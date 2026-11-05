// Generates projects/sample-tXX-*/{brief,spec,qa-report}.md for the P1 templates (showcase routes).
// Run from repo root: node scripts/gen-p1-docs.mjs
import fs from "node:fs";
import path from "node:path";

const DATE = "2026-11-06";
const P = [
  { id: "T02", slug: "t02", dir: "sample-t02-fashion", name: "MAISON ÉCRU", ind: "패션", mood: "에디토리얼·절제된·촉각적", cta: "프라이빗 뷰잉 예약", msg: "Undyed. Unhurried. Unseasonal.", target: "25~45세 슬로 패션 구매자", sig: "대형 Bodoni 에디토리얼 타이포 + CSS 원단 룩북(의상 실루엣 6종)",
    sections: "Hero(커버 + Look 01) → Marquee → Manifesto(Proof) → Lookbook(Features) → Atelier(Showcase) → Viewing(CTA) → Footer", motions: "M01, M02, M03, M06", test: "히어로 Split reveal, 룩북 reveal/parallax" },
  { id: "T05", slug: "t05", dir: "sample-t05-real-estate", name: "THE ARDEN", ind: "고급 부동산", mood: "고요한·격조 있는·따뜻한", cta: "프라이빗 투어 예약", msg: "한남동, 단 24세대 테라스 레지던스", target: "고급 주거 실수요자·자산가", sig: "평면도 투어: 핀 스크롤 단계마다 Type B 평면의 방이 강조됨",
    sections: "Hero(황혼 외관 + 개요 바) → Residences(Features) → Floor plan tour(Showcase, M04) → Location → CTA → Footer", motions: "M01, M03, M04, M06", test: "평면도 투어 단계 0→1→2→3, 방 강조 fill 변경" },
  { id: "T06", slug: "t06", dir: "sample-t06-game", name: "VOIDRUNNER", ind: "게임", mood: "네온·긴장감·SF", cta: "사전예약", msg: "공허를 달리는 자", target: "PC/콘솔 액션 게이머", sig: "R3F 절차적 렐릭(외부 에셋 없음): 등장(scale-in)·회전·포인터 틸트, 폴백 포스터",
    sections: "Hero(렐릭 3D + HUD) → Pre-registrations(Proof, 카운트업) → Classes(Features) → World map(Showcase, M04) → Pre-register(CTA) → Footer", motions: "M01, M04, M07, M08", test: "3D ready + reveal > 0.8, reduced motion 포스터, 섹터 지도 단계 0→1→2" },
  { id: "T07", slug: "t07", dir: "sample-t07-jewelry-beauty", name: "LUMÉ", ind: "주얼리/뷰티", mood: "투명한·부드러운·광택", cta: "컬렉션 보기", msg: "Liquid Pearl Collection", target: "프리미엄 스킨케어·주얼리 구매자", sig: "액체 유리: 흐르는 블롭 + 백드롭 블러 글래스 카드 + 포인터 하이라이트, CSS 진주·링·보틀 렌더",
    sections: "Hero(Lumé + 글래스 카드) → Ritual(Proof) → Collection(Features) → Inside the pearl(Showcase) → Find your glow(CTA) → Footer", motions: "M01, M03, M06, M07", test: "backdrop-filter blur, 포인터 이동 시 --spot=1" },
  { id: "T08", slug: "t08", dir: "sample-t08-automotive", name: "VELOCE E1", ind: "자동차", mood: "속도감·정밀·대담한", cta: "시승 예약", msg: "All-electric grand tourer, 0–100 km/h 2.9s", target: "프리미엄 EV 구매 검토자", sig: "스크롤 드라이브 스크럽(차량 진입·바퀴 회전·속도계 0→100, 3단계 HUD) + 외장 컬러 구성기",
    sections: "Hero(차량 SVG) → Drive(스크럽, Showcase) → Specs(Proof, 카운트업) → Configure(Features) → CTA → Footer", motions: "M01, M03, M05(영상 슬롯)", test: "HUD 단계 0→1→2, 속도 증가, 컬러 선택 aria-pressed" },
  { id: "T09", slug: "t09", dir: "sample-t09-portfolio", name: "HANA SEO", ind: "포트폴리오", mood: "대담한·편집적·여백", cta: "Let's talk (메일)", msg: "Designer & Art Director based in Seoul", target: "브랜드·스타트업 의뢰인", sig: "마스크 라인 타이포 리빌 + 작업 인덱스 호버 시 커서를 따라오는 커버 프리뷰",
    sections: "Hero(이름 리빌) → About(Proof) → Index(Features) → Selected cases(Showcase) → Services → Contact(CTA) → Footer", motions: "M01, M02, M03, M06", test: "인덱스 행 호버 시 data-preview 변경" },
  { id: "T10", slug: "t10", dir: "sample-t10-education", name: "CODELAB 12", ind: "교육", mood: "밝은·신뢰·명확한", cta: "무료 트랙 진단 / 상담 신청", msg: "12주 뒤, 개발자로 출근합니다.", target: "비전공 커리어 전환 희망자", sig: "트랙 진단 퀴즈(3문항 → 추천 트랙, aria-live) + 잔여석·얼리버드 퍼널",
    sections: "Hero(기수 카드) → Curriculum(Features) → Track finder(Showcase) → Pricing → FAQ → CTA band → Footer", motions: "M01, M02, M07", test: "3문항 응답 → Data Track 추천" },
  { id: "T11", slug: "t11", dir: "sample-t11-b2b", name: "ORBITAL", ind: "B2B", mood: "명료한·신뢰·데이터 중심", cta: "30분 데모 요청", msg: "물류비 18% 절감, 첫 분기부터.", target: "물류·SCM 의사결정자", sig: "카운트업 지표 + 키보드 접근 사례 탭 + ROI 계산기(가정 공개)",
    sections: "Hero(대시보드 목업) → Logos → Metrics(Proof) → Platform(Features) → Customer stories(Showcase) → ROI → CTA → Footer", motions: "M01, M02, M07", test: "탭 방향키 이동, ROI 슬라이더 변경 시 금액 갱신" },
  { id: "T12", slug: "t12", dir: "sample-t12-event", name: "SEOUL SOUND WEEK 2027", ind: "행사", mood: "강렬한·축제·야간", cta: "티켓 예매", msg: "May 14—17 · Nodeul Island", target: "20~35세 페스티벌 관객", sig: "라이브 카운트다운(하이드레이션 안전) + 가로 스크롤 라인업 갤러리 + 마키",
    sections: "Hero(카운트다운) → Marquee → Lineup(Features, 가로 스크롤) → Stages(Showcase) → Tickets(CTA) → Footer", motions: "M01, M03, M06, M07", test: "카운트다운 live, 1초 후 초 단위 변경" },
];

for (const p of P) {
  const d = path.join("projects", p.dir);
  fs.mkdirSync(d, { recursive: true });
  fs.writeFileSync(path.join(d, "brief.md"), `# 프로젝트 브리프 — ${p.name} (샘플)

- 브랜드/제품: ${p.name}, 가상 브랜드 (실제 브랜드 아님)
- 주요 고객/방문자: ${p.target}
- 핵심 문제와 가치 제안: ${p.msg}
- 주요 CTA: ${p.cta}
- 분위기(세 단어): ${p.mood}
- 차별화할 시그니처 인터랙션 1개: ${p.sig}
- 참고 URL / 사용 권한: 없음 (참고 사이트의 문구·미디어 사용 금지)
- 페이지 범위(히어로/전체): 전체 1페이지 랜딩
- 반드시 포함할 섹션: Hero, Proof, Features, Showcase, CTA, Footer
- 보유 에셋(이미지/영상/GLB): 없음. 모든 시각 요소는 코드(CSS/SVG/WebGL)로 자체 제작
- 콘텐츠·저작권 승인자: 프로젝트 오너
- 반응형/접근성 제약: 390/768/1440, reduced motion, 키보드 접근
- 도입 예산/완료 목표: 템플릿 ${p.id} v0.1 샘플
- PM 승인: 승인 (${DATE}, 오너 "모두 진행" 지시에 따른 일괄 승인)
`);
  fs.writeFileSync(path.join(d, "spec.md"), `# ${p.name} — spec.md (v0.1, 승인됨)

## 0. Brief
- 타깃: ${p.target} / 분위기: ${p.mood}
- 핵심 메시지: ${p.msg}
- CTA: ${p.cta}
- 템플릿: ${p.id} ${p.ind} v0.1

## 1. Stack & Files
Next.js App Router / TypeScript / Tailwind v4 / GSAP${p.id === "T06" ? " / three + @react-three/fiber (MIT, 지연 로드)" : ""}. 공유 앱의 라우트로 구현.
앱 위치: apps/showcase/app/${p.slug}
데모: http://localhost:3305/${p.slug}
| 경로 | 내용 |
|---|---|
| apps/showcase/app/${p.slug}/layout.tsx | 폰트(next/font), 메타데이터, 테마 래퍼 |
| apps/showcase/app/${p.slug}/page.tsx | 섹션 구성 |
| apps/showcase/app/${p.slug}/theme.css | 토큰 사본 (자동 생성, 직접 수정 금지) |
| apps/showcase/lib/motions.ts | 공유 모션 레시피 (M01–M07, scrub, count-up) |

## 2. Design Tokens
정답 소스 \`design/${p.slug}/tokens.css\` (WCAG 대비 검사 통과, 미리보기 \`design/${p.slug}/preview.html\`). \`node design/p1-tokens.mjs\` → \`node apps/showcase/scripts/sync-tokens.mjs\` 순으로 반영. 폰트는 Google Fonts(OFL) self-host + Pretendard(OFL).

## 3. Section Blueprint
${p.sections}

## 4. Motion Recipes
사용 모션: ${p.motions}. 시그니처: ${p.sig}.
모든 모션은 공유 라이브러리의 matchMedia 게이트를 따름: reduced motion에서는 초기 숨김 상태가 적용되지 않고 최종 상태로 표시, 핀(M04)은 768px 이상에서만.

## 5. Media Manifest
| asset_id | source_url | rights_holder | license | redistribution_allowed | expiry |
|---|---|---|---|---|---|
| 전체 시각 요소 | 코드 내 CSS/SVG${p.id === "T06" ? "/WebGL 절차적 형상" : ""} | 프로젝트 오너 | 자체 제작 | 예 | - |
외부 이미지·영상 없음. 사진이 필요하면 design/AI_IMAGE_PROMPTS.md 절차(라이선스 기록 후 연결)를 따름.

## 6. Quality Budget
PRD §9 적용. 뷰포트 390/768/1440. 콘솔 에러·4xx 0건, 가로 넘침 0, 헤딩 잘림 0.

## 7. Acceptance Tests
1. 3개 뷰포트에서 콘솔 에러·4xx 없음, 가로 넘침 없음, h1/h2가 뷰포트 밖으로 잘리지 않음
2. h1 1개, 이미지 alt, title/description, CTA 포커스 가능
3. reduced motion: 모션 초기화 없음, 핀 해제, h1 가시
4. 시그니처: ${p.test}

## 8. Approval
디자인 승인자: 프로젝트 오너 (${DATE} 승인, "모두 진행" 지시에 따른 일괄 승인) / 코드 리뷰어: 미정 / QA 승인자: 미정 / 버전: v0.1 (승인됨)
`);
  fs.writeFileSync(path.join(d, "qa-report.md"), `# QA Report — ${p.name} (${p.id} v0.1)

- 일시: ${DATE} / 도구: Playwright (Chromium) / 대상: apps/showcase \`next build\` + \`next start\`
- 증빙: \`apps/showcase/qa-evidence/${p.slug}-*.png\` (git 제외, \`npx playwright test\`로 재생성), 컨택트 시트 \`design/shots/p1/\`

| 항목 | 결과 |
|---|---|
| 390/768/1440 콘솔 에러·4xx 없음 | Pass |
| 390/768/1440 가로 넘침 없음, 헤딩 잘림 없음 | Pass |
| h1 1개, 이미지 alt, 메타, CTA 포커스 | Pass |
| reduced motion: 모션 초기화 없음, 핀 해제, 콘텐츠 가시 | Pass |
| 시그니처: ${p.test} | Pass |

## 미검증 / 한계
- 시각 QA는 컨택트 시트 2회 반복(히어로 데스크톱·모바일, 전체 페이지). 세부 픽셀 검수는 아님
- 실사 이미지·영상 없음 (모든 시각 요소 코드 제작)
- Chromium만 실행, 코드 리뷰어/QA 승인자 미지정
- 수치·인물·브랜드는 모두 가상 샘플

## 판정: 조건부 통과 (샘플 데모 수준). 배포 불가: 리뷰어/QA 승인 필요.
`);
  console.log("wrote", d);
}
