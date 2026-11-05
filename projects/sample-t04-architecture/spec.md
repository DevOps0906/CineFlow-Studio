# STRATA Atelier (샘플) — spec.md (초안, 미승인)

## 0. Brief
템플릿: T04 architecture v0.1 / CTA: 프로젝트 상담 / 분위기: 구조적, 고요한, 입체적

## 1. Stack & Files
Next.js App Router / TypeScript / Tailwind / GSAP / R3F(@react-three/fiber, drei) 지연 로드. 앱 위치: site/ (T01 구조 재사용). 파일 소유권은 승인 시 지정.

## 2. Design Tokens
TBD: 디자인 승인 시 확정 (T01 토큰 구조 --bg/--surface/--text/--muted/--accent 재사용, 대비 ≥ 7:1).

## 3. Section Blueprint
Hero → Proof → Features → Showcase → CTA → Footer. 섹션별 상세는 승인 전 작성.

## 4. Motion Recipes
사용 모션: M01, M03, M04, M06, M08. 시그니처: 스크롤로 건물 3D 모델이 드러나는 Model reveal(M08) + Pinned story(M04). 각 모션은 모바일 fallback과 reduced-motion fallback 필수.

## 5. Media Manifest
| asset_id | source_url | rights_holder | license | redistribution_allowed | expiry |
|---|---|---|---|---|---|
| TBD | TBD | 미정 | 미정 | 미확인 | - |
승인 전 외부 미디어 사용 금지.

## 6. Quality Budget
PRD §9 적용.

## 7. Acceptance Tests
T01 	ests/e2e/qa.spec.ts 공통 항목(콘솔/404, 넘침, alt, reduced motion) + 시그니처 모션 동작, 3D 실패 시 포스터 표시, GLB ≤ 5MB.

## 8. Approval
디자인 승인자: 미정 / 코드 리뷰어: 미정 / QA 승인자: 미정 / 버전: v0.1-draft (**구현 금지, 승인 대기**)
