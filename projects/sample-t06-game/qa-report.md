# QA Report — VOIDRUNNER (T06 v0.1)

- 일시: 2026-11-06 / 도구: Playwright (Chromium) / 대상: apps/showcase `next build` + `next start`
- 증빙: `apps/showcase/qa-evidence/t06-*.png` (git 제외, `npx playwright test`로 재생성), 컨택트 시트 `design/shots/p1/`

| 항목 | 결과 |
|---|---|
| 390/768/1440 콘솔 에러·4xx 없음 | Pass |
| 390/768/1440 가로 넘침 없음, 헤딩 잘림 없음 | Pass |
| h1 1개, 이미지 alt, 메타, CTA 포커스 | Pass |
| reduced motion: 모션 초기화 없음, 핀 해제, 콘텐츠 가시 | Pass |
| 시그니처: 3D ready + reveal > 0.8, reduced motion 포스터, 섹터 지도 단계 0→1→2 | Pass |

## 미검증 / 한계
- 시각 QA는 컨택트 시트 2회 반복(히어로 데스크톱·모바일, 전체 페이지). 세부 픽셀 검수는 아님
- 실사 이미지·영상 없음 (모든 시각 요소 코드 제작)
- Chromium만 실행, 코드 리뷰어/QA 승인자 미지정
- 수치·인물·브랜드는 모두 가상 샘플

## 판정: 조건부 통과 (샘플 데모 수준). 배포 불가: 리뷰어/QA 승인 필요.
