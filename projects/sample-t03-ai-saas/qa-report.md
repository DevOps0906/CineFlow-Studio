# QA Report — NOVA Flow (T03 v0.1)

- 일시: 2026-11-06 / 도구: Playwright (Chromium) / 대상: `next build` + `next start`
- 증빙: `site/qa-evidence/{mobile,tablet,desktop}.png` (git 제외, `npx playwright test`로 재생성)

| 항목 | 결과 |
|---|---|
| 390/768/1440 콘솔 에러·4xx 없음 | Pass |
| 390/768/1440 가로 넘침 없음 | Pass |
| h1 1개, 이미지 alt, title/description, CTA 키보드 접근 | Pass |
| reduced motion: 모션 초기화 안 함, 분할 단어 모두 가시, 핀 해제 | Pass |
| M02 Split reveal: 모션 활성 시 모든 단어 opacity 1 도달 | Pass |
| M04 Pinned story 데스크톱: 스크롤에 따라 활성 단계 0→1→2, 패널 전환 | Pass |
| M04 모바일: 핀 없음, 3단계와 목업 모두 표시 | Pass |

## 미검증 / 한계
- Lighthouse(LCP, CLS, INP, 접근성 ≥ 95) 미측정
- M04 핀 구간은 스크린리더·키보드 사용자 경험 수동 검증 안 함 (DOM에는 3단계 텍스트가 항상 존재)
- 768px 태블릿에서 핀 모드 동작 확인은 스크린샷 수준, 상호작용 테스트는 1440px만
- Chromium만 실행, 코드 리뷰어/QA 승인자 미지정
- 수치(68% 등)는 가상 샘플 데이터

## 판정: 조건부 통과 (샘플 데모 수준). 배포 불가: Lighthouse, 리뷰어/QA 승인 필요.
