# QA Report — AURUM Noir (T01 v0.1)

## v0.2 재검수 (B안 디자인 재구현, 2026-11-06)
| 항목 | 결과 |
|---|---|
| 390/768/1440 콘솔 에러·4xx 없음, 가로 넘침 없음 | Pass |
| h1 1개, alt, title/description, CTA(mailto) 포커스 가능 | Pass |
| 시그니처 다이얼: 현재 시각 반영, 바늘 회전, 스크롤 시 숫자 링 회전 | Pass |
| reduced motion: 모션 초기화 안 함, 바늘 정지, 콘텐츠 가시 | Pass |
| M01 Blur-in 동작 | Pass |
- 시각 QA: 스크린샷 2회 반복 (필름 포스터 상단 XII 잘림, 모바일 스펙 라벨 줄바꿈 수정)
- 남은 한계: Lighthouse 미측정, 사진·영상은 AI 프롬프트 패키지(design/AI_IMAGE_PROMPTS.md) 대기, 리뷰어/QA 승인자 미지정

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
