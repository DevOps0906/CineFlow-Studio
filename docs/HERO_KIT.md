# Hero Kit — GSAP 히어로 패턴

12개 템플릿 히어로에 공통 적용한 GSAP 패턴 모음. 사용자 레포 [Interactive-hero-10-prd-markdown](https://github.com/DevOps0906/Interactive-hero-10-prd-markdown)의 히어로 PRD 10종에서 **패턴만** 가져와 다시 구현했다(해당 레포에 LICENSE가 없어 코드는 복사하지 않음).

- 구현: `apps/showcase/lib/hero.ts` (원본). T01·T03·T04 사이트의 `lib/hero.ts`는 사본이며 동기화 필요.
- 제목 분할: `components/HeroTitle.tsx` (서버 컴포넌트, NFC 정규화 + `Intl.Segmenter` 문자소 분할)
- 호출: 각 사이트의 `initMotions()` 첫 줄에서 `initHero(root)` 호출. 히어로 인트로는 즉시, 나머지 스크롤 모션은 `requestIdleCallback`(최대 1.2s) 뒤에 초기화.

## 참고 레포 → 적용 매핑
| 참고 히어로 | 가져온 패턴 | 적용 |
|---|---|---|
| 01 Particle Universe | 인트로 타임라인, 제목은 숨기지 않음, 벽시계 안전 데드라인 | 전 템플릿 인트로, 4초 후 `tl.progress(1)` |
| 03 Magnetic Typography | 글자별 `gsap.quickTo` x/y, n² 감쇠, rAF 스로틀 | T09 이름 글자가 커서에 끌림 (`data-hero-magnetic-chars`) |
| 04 Spotlight Reveal | 커서 위치를 CSS 변수로 전달 | 히어로에 `--hx/--hy/--hn` quickTo → T01 구리빛 스포트라이트 |
| 05 Depth Parallax | 레이어별 깊이 계수, 포인터 + 스크롤 스크럽 | `data-hero-depth`, `data-hero-out` |
| 06 Kinetic Type | 글자 무작위 회전 스태거, 스크롤 속도 마키 | T06·T12 `kinetic` 제목, T02·T12 `data-marquee` |
| 08 3D Product | 3D 등장(scale-in) | T06 렐릭 |
| 09 Scroll Storytelling | 스크럽 타임라인 | 히어로 스크롤 아웃 |

## 데이터 속성 계약
| 속성 | 동작 |
|---|---|
| `data-hero` | 히어로 루트 |
| `data-hero-title` (`="kinetic"`) | `[data-char]` 글자 마스크 리빌 (yPercent 112→0, expo.out, 35ms 스태거) |
| `data-hero-fade` | 순차 페이드업 |
| `data-hero-visual="scale\|rise\|clip\|drive"` | 메인 비주얼 등장 |
| `data-hero-pop` | back.out 팝인 (노드, 타일, 켜지는 창문) |
| `data-hero-draw` | SVG 선 그리기 |
| `data-hero-bar` | 막대 scaleX 0→1 |
| `data-hero-spin` | 비주얼과 함께 회전 감속 (T08 바퀴) |
| `data-hero-depth="0.5"` | 포인터 패럴랙스 (정밀 포인터 전용) |
| `data-hero-tilt` | 포인터 3D 틸트 |
| `data-hero-magnetic-chars` | 글자 자석 효과 |
| `data-hero-out="0.4"` | 히어로를 벗어날 때 위로 흩어지며 흐려짐 (scrub) |
| `data-marquee="40"` | 스크롤 속도에 따라 빨라지고 역방향 전환 |

## 템플릿별 시그니처 인트로
| 템플릿 | 인트로 / 인터랙션 |
|---|---|
| T01 | 다이얼 scale-in, 구리빛 스포트라이트가 커서 추적, 다이얼·광원 깊이 패럴랙스 |
| T02 | 룩 패널 clip 리빌, 의상 깊이 패럴랙스, 속도 반응 마키 |
| T03 | 터미널 rise + 3D 틸트, 노드 순차 팝인, 로그 순차 등장 |
| T04 | 빛 12:00→16:40 GSAP 스윕(DOM 직접 갱신), 슬랩·빛줄기 깊이 레이어 |
| T05 | 외관 rise, 창문 불이 하나씩 켜짐(pop), 테라스 3단 깊이 패럴랙스 |
| T06 | kinetic 제목, 렐릭 scale-in, HUD 코너 팝 |
| T07 | 글래스 카드 rise + 틸트, 진주 팝, 블롭 역방향 깊이 |
| T08 | 차량 drive-in + 바퀴 회전 감속, 차체 깊이 패럴랙스 |
| T09 | 이름 리빌 + 자석 글자, 구분선 bar |
| T10 | 기수 카드 rise + 틸트, 잔여석 bar 채움 |
| T11 | 대시보드 rise + 틸트, 차트 선 그리기, KPI 팝 |
| T12 | kinetic 제목, 태양 scale-in + 역방향 깊이, 속도 반응 마키 |

## 접근성·성능 규칙
- `<html data-motion="on">`을 첫 페인트 전에 인라인 스크립트로 설정 → 초기 숨김 상태가 CSS로 적용되어 깜빡임이 없다. reduced motion 사용자는 플래그가 없어 숨김 상태가 전혀 없다.
- JS가 실패하면 3초 뒤 CSS `hero-fallback` 애니메이션이 모든 요소를 드러낸다.
- 제목 원문은 `sr-only`로 한 번만 노출, 분할 글자는 `aria-hidden`.
- 포인터 효과는 `(hover: hover) and (pointer: fine)`에서만. 터치·키보드 사용자는 인트로만.
- 함정: CSS 사전 상태 `translateY(112%)`를 GSAP가 px `y`로 읽어 남는 문제 → `gsap.set`에서 `x: 0, y: 0`을 명시. 분해형 유니코드(É = E + U+0301)는 문자소 단위로 분할.
