# Motion Recipe v0.1

## 타이포(4)
Blur-in, Split reveal, Marquee, Mask wipe
## 스크롤(5)
Pinned story, Parallax, Step sequence, Video scrub, Horizontal gallery
## 포인터(4)
Spotlight, Magnetic CTA, Tilt card, Cursor trail
## 미디어(4)
Seamless video loop, Crossfade, Media reveal, Frame interpolation concept
## 3D(3)
Orbit focus, Model reveal, Lighting transition

각 레시피 필수 속성: `id`, `version`, `purpose`, `trigger`, `duration_ms`, `easing`, `supported_devices`, `reduced_motion_fallback`, `assets`, `cleanup`, `acceptance_tests`.

## MVP 우선 8종 (P0 템플릿 T01/T03/T04 커버)
| ID | 레시피 | 그룹 | 주 사용 템플릿 |
|---|---|---|---|
| M01 | Blur-in | 타이포 | T01, T03 |
| M02 | Split reveal | 타이포 | T03 |
| M03 | Parallax | 스크롤 | T01, T04 |
| M04 | Pinned story | 스크롤 | T04, T03 |
| M05 | Seamless video loop | 미디어 | T01 |
| M06 | Media reveal | 미디어 | T01, T04 |
| M07 | Magnetic CTA | 포인터 | T01, T03 |
| M08 | Model reveal | 3D | T04 |

선정 기준: P0 템플릿 3종을 최소 조합으로 충족, 그룹별 1개 이상(타이포·스크롤·미디어·포인터·3D), 모바일 대체 경로 정의 가능.
나머지 12종은 P1.

## Hero Kit (모든 템플릿 히어로 공통, docs/HERO_KIT.md)
인트로 타임라인(글자 마스크 리빌·순차 페이드·비주얼 등장·팝·선 그리기·막대), 포인터 깊이 패럴랙스·틸트·자석 글자·스포트라이트(정밀 포인터 전용), 스크롤 아웃 스크럽, 스크롤 속도 마키. reduced motion에서는 모두 비활성(정적 최종 상태).
