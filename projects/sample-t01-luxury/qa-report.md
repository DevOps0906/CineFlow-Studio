# QA Report — AURUM Noir (T01 v0.1)

- 일시: 2026-11-06 / 도구: Playwright (Chromium) / 대상: `next build` + `next start`
- 증빙: `site/qa-evidence/{mobile,tablet,desktop}.png` (git 제외, `npx playwright test`로 재생성)

| 항목 | 390 | 768 | 1440 | 결과 |
|---|---|---|---|---|
| 콘솔 에러 / 4xx | 0 | 0 | 0 | Pass |
| 가로 넘침 | 없음 | 없음 | 없음 | Pass |
| h1 1개, 이미지 alt, title/description | - | - | - | Pass |
| CTA 키보드 접근 (Tab → mailto) | - | - | - | Pass |
| reduced motion: 모션 초기화 안 함, 콘텐츠 가시 | - | - | - | Pass |
| 모션 활성: M01 Blur-in으로 h1 표시 | - | - | - | Pass |

## 미검증 / 한계
- Lighthouse(LCP, CLS, INP, 접근성 ≥ 95) 미측정
- 히어로/쇼케이스 영상: 라이선스 미확정으로 미탑재 (포스터만 표시). 영상 실패 fallback은 코드 경로만 존재, 자동 테스트 없음
- M04 Pinned story 미구현 (쇼케이스는 비핀 레이아웃)
- Playwright는 Chromium만 실행 (Safari/Firefox 미검증)
- 코드 리뷰어, QA 승인자 미지정

## 판정: 조건부 통과 (샘플 데모 수준). 배포 불가: 에셋 라이선스, Lighthouse, 리뷰어 승인 필요.
