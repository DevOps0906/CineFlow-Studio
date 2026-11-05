# CineFlow Studio

시네마틱 랜딩페이지를 브리프 → spec → 템플릿 → 모션 → QA 순으로 반복 제작하는 시스템. MotionSites 워크플로를 참고한 독립 설계.

## 현재 상태 (2026-11-06)
- 업종 템플릿 **12종 모두 샘플 구현** (P0 3종 단독 사이트 + P1 9종 공유 앱), MVP 모션 8/8
- 모든 히어로에 GSAP **Hero Kit** 적용 (`docs/HERO_KIT.md`)
- Playwright QA: 템플릿별 3개 뷰포트·reduced motion·시그니처 테스트 구성, Lighthouse 기록 [`docs/lighthouse/`](docs/lighthouse/)
- 배포 전 남은 게이트: 코드 리뷰어·QA 승인자 지정, 실사 미디어(라이선스 기록), 실기기 검수

## 개발 단계

현재는 **MVP 샘플 구현 후 품질 검증·제품화 준비 단계**다. 아래 상태는 [PRD](docs/PRD.md)의 범위와 진행 현황을 기준으로 하며, 샘플 구현 완료와 운영 배포 완료를 구분한다.

| 단계 | 상태 | 산출물 / 다음 조건 |
|---|---|---|
| 1. 요구사항·설계 | 문서화 | PRD, 프로젝트별 brief·spec, 디자인 토큰, 승인 절차 |
| 2. 우선 템플릿 P0 | 3종 샘플 구현 | T01 럭셔리, T03 AI SaaS, T04 건축의 단독 사이트 |
| 3. 확장 템플릿 P1 | 9종 샘플 구현 | T02·T05–T12를 공유 쇼케이스 앱으로 제공 |
| 4. 모션 통합 | MVP 8종 구현 | 전체 히어로에 Hero Kit 적용, 확장 목표는 모션 20종 |
| 5. 품질 검증 | 진행 중 | Playwright·화면 캡처·Lighthouse 기록, 실패 항목 재검증과 성능 개선 필요 |
| 6. 제작 도구 제품화 | 부분 구현 | 대시보드·카탈로그 제공, 명세 생성 UI·템플릿 버전 고정·PR/프리뷰 내보내기 필요 |
| 7. 운영 배포·파일럿 | 미완료 | 리뷰·QA 승인, 실기기 검수, 미디어 권리 확인 및 배포 연동 필요 |

## 완성도

완성도는 구현 수량과 검증 상태로 표시한다. **전체 제품의 완료율을 뜻하는 단일 백분율은 산정하지 않는다.**

| 영역 | 현재 수준 | 남은 작업 |
|---|---|---|
| 업종별 템플릿 | 목표 12종 중 12종 샘플 구현 | 고객 콘텐츠 적용, 템플릿별 최종 승인 |
| 모션 라이브러리 | MVP 8종 중 8종 구현 | 전체 계획 20종으로 확장, 성능 회귀 검증 |
| 제작 대시보드 | 카테고리·데모 링크·문서 기반 상태 집계 | 버전 고정, 자동 명세 생성 UI |
| 접근성 | 저장된 Lighthouse 접근성 96–100점 | T07 대비 개선, 키보드·실기기 최종 확인 |
| 성능 | 저장된 CLS 0–0.002 | 전 템플릿 LCP 목표 초과, 일부 TBT·JS 예산 초과 개선 |
| 자동 QA | 테스트·스크린샷·결과 기록 구성 | 아래 검증 기록의 미완료 항목 재실행 및 T07 실패 재검증 |
| 미디어 관리 | 라이선스 확인 절차 문서화 | 실제 고객 미디어 도입 시 권리·용량·대체 이미지 검증 |
| 배포 자동화 | 제품 내 PR/프리뷰 내보내기 미구현 | GitHub·Vercel 연동, 리뷰어·QA 승인자 지정 |

상용 운영 준비가 완료된 상태는 아니다. 다음 우선순위는 **QA 재검증 → 성능·접근성 보완 → 제품화 기능 구현 → 승인 후 배포 및 파일럿**이다. 결제·멀티테넌트·자체 AI 비디오 생성·대규모 마켓플레이스는 1차 범위에서 제외한다.

## 연관 저장소

| 저장소 | 관계 | 참고 범위 |
|---|---|---|
| [DevOps0906/CineFlow-Studio](https://github.com/DevOps0906/CineFlow-Studio) | 현재 프로젝트 | 템플릿 구현, 디자인 토큰, 모션, 제작 문서 및 QA 자료 |
| [DevOps0906/Interactive-hero-10-prd-markdown](https://github.com/DevOps0906/Interactive-hero-10-prd-markdown) | 히어로 인터랙션 설계 참고 | 히어로 PRD의 패턴을 독립 구현. 적용 매핑은 [Hero Kit](docs/HERO_KIT.md)에 기록 |
| [Motionsites-AI/claude-skill](https://github.com/Motionsites-AI/claude-skill) | 제작 워크플로 참고 | brief → spec → 구현 → QA 흐름의 참고 자료 |

연관 저장소는 설계·워크플로의 참고 출처이며, 이 프로젝트의 공식 제휴나 코드 재배포 권한을 의미하지 않는다. 외부 코드·미디어 도입 전에는 해당 라이선스와 사용 범위를 별도로 확인한다.

## 구조
| 경로 | 내용 | 로컬 주소 (`next start`) |
|---|---|---|
| `apps/studio` | 대시보드 + 카테고리 12종 (레지스트리가 `projects/*` 문서를 읽어 상태 자동 집계) | :3300 |
| `projects/sample-t01-luxury/site` | T01 럭셔리 (AURUM Noir) | :3301 |
| `projects/sample-t03-ai-saas/site` | T03 AI SaaS (NOVA Flow) | :3303 |
| `projects/sample-t04-architecture/site` | T04 건축 (STRATA Atelier, R3F) | :3304 |
| `apps/showcase` | P1 9종 라우트 `/t02`, `/t05`–`/t12` | :3305 |
| `projects/sample-tXX-*/` | 프로젝트별 brief · spec · qa-report |  |
| `design/tXX/tokens.css` | 템플릿별 디자인 토큰 (정답 소스, 대비 검사) |  |
| `docs/` | PRD, 아키텍처, 카탈로그, HERO_KIT, Lighthouse |  |

## 실행
저장소 루트에서 대상 앱으로 이동해 설치·빌드한 다음 서버를 실행한다. 아래 예시는 P1 쇼케이스다.

```bash
cd apps/showcase
npm install
npm run build
npx next start -p 3305
```
다른 앱도 위 구조 표의 경로에서 같은 명령을 실행하고 해당 포트를 지정한다.

Playwright는 각 앱 폴더에서 `npx playwright test`로 실행한다. 테스트 설정이 빌드와 전용 서버 실행을 처리하므로 테스트 포트(T01: 4317, T03: 4319, T04: 4320, 쇼케이스: 4321)를 비워 둔다.

Lighthouse는 T01·T03·T04·쇼케이스 서버를 각각 3301·3303·3304·3305 포트에서 실행한 뒤 **저장소 루트**에서 실행한다.

```bash
node scripts/lighthouse.mjs after
```

토큰 변경: `design/tXX/tokens.css` (P1은 `node design/p1-tokens.mjs`) → `node apps/showcase/scripts/sync-tokens.mjs`.

## 이번 변경 사항
- **공통 Hero Kit**: 글자별 제목 리빌, 포인터 깊이 효과·틸트, 스크롤 아웃과 템플릿별 인트로를 12종에 적용. 데이터 속성과 유지보수 규칙은 [Hero Kit 문서](docs/HERO_KIT.md)를 따른다.
- **접근성·복원력**: 제목 원문을 스크린리더에 제공하고, 문자소 단위로 글자를 분할하며, reduced motion과 JS 실패 시 콘텐츠 표시를 지원한다.
- **검증 자료**: [P1 화면 캡처](design/shots/p1/), [Lighthouse 기준 측정](docs/lighthouse/baseline/README.md), [변경 후 측정](docs/lighthouse/after/README.md)을 포함한다.

### 검증 결과와 남은 과제
저장된 Lighthouse 변경 후 측정에서 접근성은 96–100점, CLS는 0–0.002다. LCP는 모든 템플릿이 목표 2.5초를 초과하고, 일부 템플릿은 TBT 및 JS 예산도 초과하므로 성능 개선이 필요하다. T07에는 색상 대비 감점이 남아 있다.

`design/shots/p1/run3.txt`는 P1 QA의 이전 실행 기록(41개 통과, T07 제목 넘침 3개 실패)이다. 이 기록이나 Lighthouse 점수만으로 배포 승인을 의미하지 않으며, 최신 코드의 QA 결과와 PRD 승인 게이트를 함께 확인한다.

2026-11-06 커밋 전 확인: 쇼케이스·T01·T03·T04의 TypeScript 검사와 `git diff --check` 통과. T01 Playwright 테스트 8개 통과를 확인했으며, 쇼케이스·T03·T04의 QA 재실행은 테스트 결과 폴더 또는 빌드 잠금 파일의 접근 권한 오류로 완료하지 못했다.

## 작업 순서
1. `docs/PRD.md`로 범위·성공 기준 확정
2. `templates/brief.template.md` → `templates/spec.template.md`
3. `AGENTS.md` 기준으로 작업 분담
4. `templates/qa-report.template.md`와 승인 게이트로 검증

## 주의
- 모든 브랜드·인물·수치는 가상 샘플. 시각 요소는 코드(CSS/SVG/WebGL)로 자체 제작.
- MotionSites 예제 프롬프트·미디어는 저작권 대상. 무단 번들/재배포 금지.
- 외부 미디어는 `design/AI_IMAGE_PROMPTS.md` 절차(라이선스 기록 후 연결)를 따른다.

Source (workflow reference): https://github.com/Motionsites-AI/claude-skill
