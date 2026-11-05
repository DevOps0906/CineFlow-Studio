# QA Report — STRATA Atelier (T04 v0.1)

## v0.2 재검수 (B안 디자인 재구현, 2026-11-06)
| 항목 | 결과 |
|---|---|
| 390/768/1440 콘솔 에러·4xx 없음, 가로 넘침 없음 | Pass |
| h1 1개, alt, 메타, CTA(mailto) 포커스 가능 | Pass |
| GLB ≤ 5MB 렌더, 차단 시 포스터 폴백, reduced motion 시 3D 미로드 | Pass |
| M04/M08 단계 0→1→2와 모델 진행도 증가, 모바일 정적 모델 | Pass |
| 시그니처 시간 슬라이더: 값·키보드로 빛 변화(--glow), aria-valuetext 갱신 | Pass |
| reduced motion: 인트로 빛 이동 없음(16:40 고정) | Pass |
- 시각 QA: 스크린샷 2회 반복 (주석·빛줄기 겹침, 모바일 카피·건물 겹침, 모델 재질 톤 수정)
- 남은 한계: 3D 모델은 박스 매싱 수준, Lighthouse·번들 미측정, 리뷰어/QA 승인자 미지정

- 일시: 2026-11-06 / 도구: Playwright (Chromium) / 대상: `next build` + `next start`
- 증빙: `site/qa-evidence/*.png` (git 제외, `npx playwright test`로 재생성)

| 항목 | 결과 |
|---|---|
| 390/768/1440 콘솔 에러·4xx 없음 | Pass |
| 390/768/1440 가로 넘침 없음 | Pass |
| h1 1개, 이미지 alt, title/description, CTA 키보드 접근 | Pass |
| GLB 8KB (≤ 5MB), 200 응답, 캔버스 렌더, 포스터 150KB 이하 | Pass |
| 3D 실패(GLB 요청 차단) 시 포스터 표시, 페이지 오류 없음 | Pass |
| reduced motion: 모션 초기화 안 함, GLB 요청 0건, 포스터 표시, 핀 해제 | Pass |
| M04/M08 데스크톱: 단계 0→1→2, 모델 진행도 증가(완성 시 > 0.9) | Pass |
| 모바일: 핀 없음, 3단계 표시, 정적 모델(진행도 1.00) | Pass |

## 미검증 / 한계
- Lighthouse(LCP, CLS, INP, 접근성 ≥ 95) 미측정. 3D 청크가 초기 JS에서 분리됐는지 번들 크기 미측정
- 모델은 단순 박스 조합의 자체 생성 GLB (실제 건축 품질 아님). 텍스처·조명 연출 없음
- headless Chromium(소프트웨어 렌더)에서만 검증. 실기기 GPU 성능, 저사양 모바일 프레임레이트 미검증
- 핀 모드에서 비활성 단계 텍스트(opacity 0.4)의 대비는 WCAG 기준 미검증
- 3D 캔버스는 aria-hidden, 단계 설명 텍스트로 대체. 스크린리더 수동 검증 안 함
- Chromium만 실행, 코드 리뷰어/QA 승인자 미지정
- 수치(48, 7, 15년)는 가상 샘플 데이터

## 판정: 조건부 통과 (샘플 데모 수준). 배포 불가: Lighthouse·번들 측정, 접근성 대비 확인, 리뷰어/QA 승인 필요.
