---
name: visual-qa
description: 구현된 랜딩페이지를 뷰포트별로 검사하고 시각적 결함과 수정 작업을 기록한다.
---

## 입력
승인된 spec.md, 실행 중인 프리뷰 URL, QA 기준 문서.

## 절차
1. 390/768/1440px 스크린샷 확보
2. 브라우저 콘솔 오류와 404 파일 검사
3. 가로 넘침, 폰트, 비디오/3D fallback, CTA 확인
4. reduced-motion 및 키보드 접근 확인
5. `templates/qa-report.template.md` 작성
6. 불합격 항목 수정 요청, 수정 후 재검사

## 완료 조건
치명 결함 0개, 라이선스 상태 승인, PM QA 승인.
