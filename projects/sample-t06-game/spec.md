# VOIDRUNNER — spec.md (v0.1, 승인됨)

## 0. Brief
- 타깃: PC/콘솔 액션 게이머 / 분위기: 네온·긴장감·SF
- 핵심 메시지: 공허를 달리는 자
- CTA: 사전예약
- 템플릿: T06 게임 v0.1

## 1. Stack & Files
Next.js App Router / TypeScript / Tailwind v4 / GSAP / three + @react-three/fiber (MIT, 지연 로드). 공유 앱의 라우트로 구현.
앱 위치: apps/showcase/app/t06
데모: http://localhost:3305/t06
| 경로 | 내용 |
|---|---|
| apps/showcase/app/t06/layout.tsx | 폰트(next/font), 메타데이터, 테마 래퍼 |
| apps/showcase/app/t06/page.tsx | 섹션 구성 |
| apps/showcase/app/t06/theme.css | 토큰 사본 (자동 생성, 직접 수정 금지) |
| apps/showcase/lib/motions.ts | 공유 모션 레시피 (M01–M07, scrub, count-up) |

## 2. Design Tokens
정답 소스 `design/t06/tokens.css` (WCAG 대비 검사 통과, 미리보기 `design/t06/preview.html`). `node design/p1-tokens.mjs` → `node apps/showcase/scripts/sync-tokens.mjs` 순으로 반영. 폰트는 Google Fonts(OFL) self-host + Pretendard(OFL).

## 3. Section Blueprint
Hero(렐릭 3D + HUD) → Pre-registrations(Proof, 카운트업) → Classes(Features) → World map(Showcase, M04) → Pre-register(CTA) → Footer

## 4. Motion Recipes
사용 모션: M01, M04, M07, M08. 시그니처: R3F 절차적 렐릭(외부 에셋 없음): 등장(scale-in)·회전·포인터 틸트, 폴백 포스터.
모든 모션은 공유 라이브러리의 matchMedia 게이트를 따름: reduced motion에서는 초기 숨김 상태가 적용되지 않고 최종 상태로 표시, 핀(M04)은 768px 이상에서만.

## 5. Media Manifest
| asset_id | source_url | rights_holder | license | redistribution_allowed | expiry |
|---|---|---|---|---|---|
| 전체 시각 요소 | 코드 내 CSS/SVG/WebGL 절차적 형상 | 프로젝트 오너 | 자체 제작 | 예 | - |
외부 이미지·영상 없음. 사진이 필요하면 design/AI_IMAGE_PROMPTS.md 절차(라이선스 기록 후 연결)를 따름.

## 6. Quality Budget
PRD §9 적용. 뷰포트 390/768/1440. 콘솔 에러·4xx 0건, 가로 넘침 0, 헤딩 잘림 0.

## 7. Acceptance Tests
1. 3개 뷰포트에서 콘솔 에러·4xx 없음, 가로 넘침 없음, h1/h2가 뷰포트 밖으로 잘리지 않음
2. h1 1개, 이미지 alt, title/description, CTA 포커스 가능
3. reduced motion: 모션 초기화 없음, 핀 해제, h1 가시
4. 시그니처: 3D ready + reveal > 0.8, reduced motion 포스터, 섹터 지도 단계 0→1→2

## 8. Approval
디자인 승인자: 프로젝트 오너 (2026-11-06 승인, "모두 진행" 지시에 따른 일괄 승인) / 코드 리뷰어: 미정 / QA 승인자: 미정 / 버전: v0.1 (승인됨)
