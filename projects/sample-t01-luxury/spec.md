# AURUM Noir — spec.md (샘플, 초안)

## 0. Brief
- 타깃: 30~55세 고소득 구매자 / 분위기: 어두운·정밀한·절제된
- 핵심 메시지: "시간을 빚는 정밀함"
- CTA: "컬렉션 문의하기"
- 템플릿: T01 luxury-product v0.1

## 1. Stack & Files
Next.js App Router / TypeScript / Tailwind / GSAP (R3F 미사용)
| 경로 | 소유자 | 내용 |
|---|---|---|
| app/page.tsx, app/layout.tsx | Implementation-A | 페이지 조립, 메타데이터 |
| components/sections/* | Implementation-A | 6개 섹션 |
| lib/motions/* | Implementation-B | M01, M03, M05, M06, M07 |
| public/media/* | Lead | 에셋 (매니페스트 기준) |
| tests/e2e/* | QA | Playwright |
동일 파일 동시 수정 금지.

## 2. Design Tokens
v0.2: **1B Midnight Ivory** — 정답 소스 `design/t01/tokens.css` (대비 검사 통과, 미리보기 `design/t01/preview.html`, 히어로 시안 `design/moodboard.html`). 사이트 `site/app/globals.css`는 이 토큰의 사본. 폰트는 OFL(next/font + pretendard 패키지 self-host).

## 3. Section Blueprint
v0.2 섹션 구성: Hero(다이얼 시그니처) → Manifesto(Proof) → Anatomy(Features) → Film(Showcase, M05) → Appointment(CTA) → Footer. 아래 표는 v0.1 기록.
| 섹션 | 목표 | 메시지 | 미디어 | 모션 | 반응형 |
|---|---|---|---|---|---|
| Hero | 첫인상 | 시간을 빚는 정밀함 | hero 영상 루프 + 포스터 | M05, M01, M07(CTA) | 모바일은 경량 영상 |
| Proof | 신뢰 | 수치 3개 (제작 시간, 부품 수, 보증) | 없음 | M01 | 1열 스택 |
| Features | 가치 | 소재·무브먼트·마감 3가지 | 이미지 3 | M03, M06 | 1열 → 3열 |
| Showcase | 몰입 | 제품 상세 영상 | showcase 영상 | M04 pin 대신 모바일 비핀 | 모바일은 핀 해제 |
| CTA | 전환 | 상담 예약 | 없음 | M07 | 전폭 버튼 |
| Footer | 정보 | 연락처, 법적 고지 | 없음 | 없음 | 1열 |

## 4. Motion Recipes
| ID | trigger | duration | easing | fallback(저성능/모바일) | reduced motion |
|---|---|---|---|---|---|
| M01 Blur-in | load/scroll-enter | 800ms | power3.out | opacity만 | 즉시 표시 |
| M03 Parallax | scroll | scrub | none | 모바일 비활성 | 비활성 |
| M04 Pinned story | scroll | scrub | none | 모바일 비핀, 순차 스택 | 비핀 스택 |
| M05 Seamless loop | load | loop | - | 포스터 + 경량 영상 | 포스터 정지 |
| M06 Media reveal | scroll-enter | 900ms | power2.inOut | 페이드 | 즉시 표시 |
| M07 Magnetic CTA | pointer | 300ms | power2.out | 터치 기기 비활성 | 비활성 |
모든 모션은 언마운트 시 ScrollTrigger/타임라인 kill.

## 5. Media Manifest
| asset_id | source_url | rights_holder | license | redistribution_allowed | expiry |
|---|---|---|---|---|---|
| hero-loop | TBD (자체 제작/CC0) | 미정 | 미정 | 미확인 | - |
| hero-poster | TBD | 미정 | 미정 | 미확인 | - |
| showcase-video | TBD | 미정 | 미정 | 미확인 | - |
| feature-img-1~3 | TBD | 미정 | 미정 | 미확인 | - |
**모든 항목이 승인(license 확정) 되기 전에는 구현 단계에서 플레이스홀더만 사용.**

## 6. Quality Budget
PRD §9 기준 적용. 뷰포트 390/768/1440. Lighthouse 접근성 ≥ 95, title/description/OG 메타 필수, 이미지 alt 필수, 포커스 링 표시.

## 7. Acceptance Tests
1. CTA 클릭 시 폼 링크로 이동, 키보드 Enter/Space 동작
2. 3개 뷰포트에서 가로 스크롤 없음
3. 히어로 영상 실패 시 포스터 표시
4. reduced motion 켜면 M01/M03/M04/M06/M07 비활성, 콘텐츠 가시
5. 콘솔 에러·404 0건
6. 폰트 로드 후 레이아웃 시프트 CLS ≤ 0.1
7. 모든 이미지 alt, 헤딩 순서 h1→h2 정상

## 8. Approval
디자인 승인자: 프로젝트 오너 (2026-11-06 승인) / 코드 리뷰어: 미정 / QA 승인자: 미정 / 버전: v0.2 (승인됨, B안 디자인 승인 2026-11-06, 에셋은 플레이스홀더 한정). 앱 위치: projects/sample-t01-luxury/site

