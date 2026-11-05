# AI 이미지 프롬프트 패키지 (T01 / T04)

이 환경에는 이미지 생성 도구가 없습니다. 아래 프롬프트로 직접 생성한 뒤 파일명대로 `site/public/media/`에 넣으면 연결합니다.
T03은 사진이 필요 없습니다(모든 시각 요소가 코드).

## 사용 전 확인 (AGENTS.md 4번: 외부 미디어 사용 전 라이선스 승인)
1. 사용한 생성 도구의 이용 약관에서 **상업적 사용**과 **재배포 가능 여부**를 확인합니다.
2. 실존 브랜드·로고·인물·저작물 스타일 모방을 프롬프트에 넣지 않습니다.
3. 각 파일을 `spec.md` §5 Media Manifest에 기록합니다: `asset_id, source_url(도구명+생성일), rights_holder, license(약관 링크), redistribution_allowed, expiry`.
4. 기록과 승인 전에는 코드에 연결하지 않습니다(현재는 자체 제작 SVG 사용 중).

## 공통 스타일 꼬리말
- T01: `deep navy (#0b1020) and warm ivory palette, copper accents (#c98a5a), low-key studio lighting, shallow depth of field, cinematic, fine film grain, no text, no logo`
- T04: `dark interior (#111111), single warm beam of late-afternoon sunlight (#f2b872), exposed concrete and oak, minimal architecture, long shadows, quiet, cinematic, no people, no text`
- 네거티브(지원 시): `text, watermark, logo, brand name, people, hands, lowres, oversaturated, cartoon`

## T01 AURUM Noir
| 파일명 | 크기/비율 | 사용 위치 | 프롬프트 |
|---|---|---|---|
| `film-poster.webp` | 2560×1100 (21:9) | Film 프레임 포스터 (현재 `film-poster.svg` 대체) | `extreme close-up of a luxury mechanical wristwatch dial, roman numerals, polished copper hands, sapphire crystal reflections, dial fills the right two-thirds of the frame` + T01 꼬리말 |
| `film-loop.mp4` | 1920×820, 6–8초, 무음, 루프 | Film 프레임 영상 (M05, `NEXT_PUBLIC_FILM_VIDEO`) | 위 장면에서 `slow camera push-in, light sweeping across the dial, seamless loop` (영상 생성 도구 사용 시) |
| `anatomy-sapphire.webp` | 1200×1500 (4:5) | Anatomy 01 | `macro shot of a domed sapphire watch crystal, edge reflections, dark navy background` + T01 꼬리말 |
| `anatomy-movement.webp` | 1200×1500 (4:5) | Anatomy 02 | `macro shot of a hand-finished mechanical watch movement, gears and jewels, copper and steel tones` + T01 꼬리말 |
| `anatomy-finishing.webp` | 1200×1500 (4:5) | Anatomy 03 | `macro shot of Côtes de Genève striping on a watch bridge, raking light` + T01 꼬리말 |

예산: 포스터 ≤ 150KB(WebP 품질 70~75), 영상 모바일 변형 ≤ 4MB (PRD §9).

## T04 STRATA Atelier
| 파일명 | 크기/비율 | 사용 위치 | 프롬프트 |
|---|---|---|---|
| `hero-light.webp` | 2560×1440 (16:9) | 히어로 배경 (현재 CSS 장면 위에 블렌드 예정) | `tall concrete wall with a narrow vertical slit, warm sunbeam cutting diagonally across a dark room, light pooling on the floor` + T04 꼬리말 |
| `principle-structure.webp` | 1200×1500 (4:5) | Principles 01 | `exposed concrete columns and beams, raw structure, raking light` + T04 꼬리말 |
| `principle-material.webp` | 1200×1500 (4:5) | Principles 02 | `close-up where board-formed concrete meets oiled oak, soft side light` + T04 꼬리말 |
| `principle-light.webp` | 1200×1500 (4:5) | Principles 03 | `sunlight through a skylight drawing a sharp rectangle on a concrete wall` + T04 꼬리말 |
| `works-01..04.webp` | 1600×1000 | Works 목록 호버 이미지(추가 예정) | `minimal residential / pavilion / office / library exterior at dusk` + T04 꼬리말 |

생성 후 파일명과 Manifest 기록을 알려 주시면, `<img>`/`next/image`로 연결하고 시각 QA를 다시 돌립니다.
