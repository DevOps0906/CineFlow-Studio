# STRATA Atelier — spec.md (v0.1, 승인됨)

## 0. Brief
- 타깃: 주거·상업 신축/리모델링을 검토하는 건축주 / 분위기: 구조적·고요한·입체적
- 핵심 메시지: "구조가 공간의 언어가 됩니다"
- CTA: "프로젝트 상담"
- 템플릿: T04 architecture v0.1 (가상 사무소 STRATA Atelier, 실제 브랜드 아님)

## 1. Stack & Files
Next.js App Router / TypeScript / Tailwind / GSAP / three + @react-three/fiber (R3F, MIT). drei 미사용. 앱 위치: `site/`
| 경로 | 소유자 | 내용 |
|---|---|---|
| app/*, components/sections/* | Implementation-A | 페이지·섹션 |
| components/three/* | Implementation-C | R3F 장면, GLB 로더, 폴백 |
| lib/motions/index.ts | Implementation-B | M01, M03, M04, M06 (+ M08 진행도 이벤트) |
| scripts/make-model.mjs, public/models/building.glb | Lead | 자체 생성 GLB (≤ 5MB) |
| tests/e2e/* | QA | Playwright |

## 2. Design Tokens
v0.2: **4B Light Study** — 정답 소스 `design/t04/tokens.css` (대비 검사 통과, 미리보기 `design/t04/preview.html`, 히어로 시안 `design/moodboard.html`). 사이트 `site/app/globals.css`는 이 토큰의 사본. 폰트는 OFL(next/font + pretendard 패키지 self-host).

## 3. Section Blueprint
v0.2 섹션 구성: Hero(시간 슬라이더 시그니처) → Proof → Principles(Features) → Process(Showcase, M04+M08) → Works → Contact(CTA) → Footer. 아래 표는 v0.1 기록.
| 섹션 | 목표 | 메시지 | 미디어 | 모션 | 반응형 |
|---|---|---|---|---|---|
| Hero | 첫인상 | 구조가 공간의 언어가 됩니다 | SVG 포스터(도면풍) | M01, M03 | 1열 |
| Proof | 신뢰 | 수치 3개 (프로젝트 수, 수상, 경력) | 없음 | M01 | 1열 |
| Features | 가치 | 구조·재료·빛 3가지 | SVG 3종 | M06, M03 | 1열 → 3열 |
| Showcase | 몰입 | 3단계 (대지 → 구조 → 완성), 단계별 GLB 건물이 아래부터 올라옴 | GLB + 포스터 | **M04 + M08** | 모바일: 핀 해제, 정적 모델 |
| CTA | 전환 | 프로젝트 상담 | 없음 | M01 | 전폭 버튼 |
| Footer | 정보 | 연락처, 가상 고지 | 없음 | 없음 | 1열 |

## 4. Motion Recipes
| ID | trigger | duration | easing | fallback | reduced motion |
|---|---|---|---|---|---|
| M01 Blur-in | scroll-enter | 800ms | power3.out | opacity만 | 즉시 표시 |
| M03 Parallax | scroll | scrub | none | <768px 비활성 | 비활성 |
| M04 Pinned story | scroll scrub | 뷰포트 × 3 | none | <768px 핀 해제, 단계 스택 | 핀 해제 |
| M06 Media reveal | scroll-enter | 900ms | power2.inOut | 페이드 | 즉시 표시 |
| M08 Model reveal | M04 진행도 | scrub | none | WebGL 실패/로드 실패 → 포스터 | 포스터(3D 미로드) |
M08: 건물 레벨이 아래에서 순서대로 올라오고 모델이 회전. <768px는 완성 모델을 정적으로 1회 렌더. 모델은 Showcase가 뷰포트 근처에 올 때 로드(지연 로드).

## 5. Media Manifest
| asset_id | source_url | rights_holder | license | redistribution_allowed | expiry |
|---|---|---|---|---|---|
| building.glb | scripts/make-model.mjs 로 생성 (외부 파일 없음) | 프로젝트 오너 | 자체 제작 | 예 | - |
| poster-*.svg, og.svg | 코드로 작성 | 프로젝트 오너 | 자체 제작 | 예 | - |
3D 라이브러리: three (MIT), @react-three/fiber (MIT).

## 6. Quality Budget
PRD §9 적용: GLB ≤ 5MB, 포스터 ≤ 150KB, 3D 청크는 초기 JS에서 제외(지연 로드). Lighthouse 접근성 ≥ 95.

## 7. Acceptance Tests
1. 3개 뷰포트에서 콘솔 에러·404 0건, 가로 넘침 없음
2. h1 1개, 이미지 alt, 메타 존재, CTA 키보드 접근
3. GLB가 5MB 이하이고 200으로 로드되며 캔버스가 렌더됨
4. GLB 요청 차단 시 포스터 표시, 페이지 오류 없음 (3D 실패 폴백)
5. reduced motion: 모션 초기화 안 함, 3D 미로드, 포스터 표시
6. M04/M08: 데스크톱 스크롤에 따라 단계 0→1→2, 모델 진행도(0→1) 증가
7. 모바일: 핀 없음, 3단계 표시

## 8. Approval
디자인 승인자: 프로젝트 오너 (2026-11-06 승인) / 코드 리뷰어: 미정 / QA 승인자: 미정 / 버전: v0.2 (승인됨, B안 디자인 승인 2026-11-06). 앱 위치: projects/sample-t04-architecture/site
