# AGENTS.md — CineFlow Studio

## 운영 목표
고객 요구사항을 승인된 spec.md와 재사용 가능한 템플릿으로 구현한다.

## 책임
- Lead / Claude Code Opus: 작업 분해, 설계 승인, 최종 통합.
- Design Co-Lead / Claude Sonnet + Codex: 정보구조, 인터랙션 설계 상호 검토.
- Implementation / Sonnet 또는 Codex CLI: 할당한 파일만 구현.
- Reviewer / Codex 또는 독립 Claude: 접근성·성능·보안·저작권 리뷰.
- QA / Playwright: 화면별 스크린샷·콘솔·오버플로 검수.

## 변경 계약
1. `docs/PRD.md`와 프로젝트 `spec.md`가 우선.
2. 완료 정의 없는 코딩 금지. 범위 변경은 PRD에 반영.
3. 1 작업=1 담당자=1 브랜치/PR. 동일 파일 동시 수정 금지.
4. 외부 미디어 사용 전 라이선스와 재배포 권한 승인.
5. QA 불합격 시 배포 금지. 주 에이전트 최종 승인 필수.
6. 민감정보를 프롬프트, 로그, 저장소에 작성하지 말 것.

## Definition of Done
- 데스크톱/태블릿/모바일 시나리오 통과
- 접근성, reduced motion, 메타데이터 확인
- 필수 영상/이미지/3D 리소스 정상 로드
- 승인된 spec 일치, 문서 및 QA 증빙 포함
