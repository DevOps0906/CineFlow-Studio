# NOVA Flow — spec.md (v0.1, 승인됨)

## 0. Brief
- 타깃: 운영 자동화를 검토하는 스타트업/팀 리더 / 분위기: 명료한·지능적·가벼운
- 핵심 메시지: "반복 업무를 흐름으로 바꾸세요"
- CTA: "무료 데모 신청"
- 템플릿: T03 ai-saas v0.1 (가상 제품 NOVA Flow, 실제 브랜드 아님)

## 1. Stack & Files
Next.js App Router / TypeScript / Tailwind / GSAP (R3F 미사용). 앱 위치: `site/`
| 경로 | 소유자 | 내용 |
|---|---|---|
| app/*, components/sections/* | Implementation-A | 페이지·섹션 |
| lib/motions/index.ts | Implementation-B | M01, M02, M04, M07 |
| public/media/* | Lead | 자체 제작 SVG만 |
| tests/e2e/* | QA | Playwright |

## 2. Design Tokens
- 폰트: 제목 Space Grotesk(OFL), 본문 Inter(OFL), 한글은 시스템 폰트 fallback
- 크기(모바일/태블릿/데스크톱): H1 40/60/84px, H2 28/38/52px, 본문 16/17/18px / 자간 H1 -0.03em / 행간 H1 1.05, 본문 1.6
- 색상: bg #f7f8fc, surface #ffffff, ink #0b1020, muted #4b5266 (ink/bg 대비 ≥ 15:1, muted/bg ≥ 7:1), accent #3730a3 (accent/bg ≥ 9:1), accent-soft #e0e7ff
- 간격 8px 단위, 섹션 세로 패딩 80/112/144px
- 모션 규칙: transform/opacity 위주, 기본 easing power3.out

## 3. Section Blueprint
| 섹션 | 목표 | 메시지 | 미디어 | 모션 | 반응형 |
|---|---|---|---|---|---|
| Hero | 가치 전달 | 반복 업무를 흐름으로 바꾸세요 | UI 목업(HTML/SVG) | M02(h1), M01, M07 | 목업은 모바일에서 하단 배치 |
| Proof | 신뢰 | 수치 3개 + 가상 고객 이니셜 | 없음 | M01 | 1열 |
| Features | 가치 | 연결·자동화·관찰 3가지 | 없음 | M01 | 1열 → 3열 |
| Showcase | 제품 이해 | 3단계 스토리: 연결 → 설계 → 실행, 단계별 UI 목업 | 목업 3종 | **M04 Pinned story** | 모바일/reduced: 핀 해제, 단계별 스택 |
| CTA | 전환 | 무료 데모 신청 | 없음 | M01, M07 | 전폭 버튼 |
| Footer | 정보 | 연락처, 가상 제품 고지 | 없음 | 없음 | 1열 |

## 4. Motion Recipes
| ID | trigger | duration | easing | fallback(저성능/모바일) | reduced motion |
|---|---|---|---|---|---|
| M01 Blur-in | scroll-enter | 800ms | power3.out | opacity만 | 즉시 표시 |
| M02 Split reveal | load | 700ms, 단어당 stagger 60ms | power3.out | 모바일도 동일(경량) | 즉시 표시 |
| M04 Pinned story | scroll scrub | 뷰포트 높이 × 3 | none | ≥768px에서만 핀, 모바일은 스택 | 핀 해제, 스택 |
| M07 Magnetic CTA | pointer | 300ms | power2.out | 터치 기기 비활성 | 비활성 |
모든 모션은 언마운트 시 kill. M02는 단어를 span으로 분리하되 스크린리더용 전체 문장을 aria-label로 유지.

## 5. Media Manifest
| asset_id | source_url | rights_holder | license | redistribution_allowed | expiry |
|---|---|---|---|---|---|
| ui-mock-* | 코드 내 HTML/CSS 목업 (외부 파일 없음) | 프로젝트 오너 | 자체 제작 | 예 | - |
| og-image | public/media/og.svg (자체 제작) | 프로젝트 오너 | 자체 제작 | 예 | - |
외부 영상/이미지 사용 없음.

## 6. Quality Budget
PRD §9 적용. 뷰포트 390/768/1440. Lighthouse 접근성 ≥ 95, title/description/OG 필수, 포커스 링 표시.

## 7. Acceptance Tests
1. 3개 뷰포트에서 콘솔 에러·404 0건, 가로 넘침 없음
2. h1 1개, 이미지 alt, 헤딩 순서 정상, 메타 존재
3. CTA 키보드 접근 (Tab → mailto)
4. reduced motion: 모션 초기화 안 함, h1 단어가 모두 보임, 핀 해제
5. M04: 데스크톱에서 스크롤에 따라 활성 단계가 0→1→2로 바뀜. 모바일에서는 핀 없이 3단계 모두 표시
6. M02: 모션 활성 시 h1 단어가 모두 opacity 1로 도달

## 8. Approval
디자인 승인자: 프로젝트 오너 (2026-11-06 승인) / 코드 리뷰어: 미정 / QA 승인자: 미정 / 버전: v0.1 (승인됨). 앱 위치: projects/sample-t03-ai-saas/site
