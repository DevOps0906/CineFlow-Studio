export type Status = "built" | "spec-draft" | "planned";

export const STATUS_LABEL: Record<Status, string> = { built: "구현됨 (샘플)", "spec-draft": "Spec 초안", planned: "계획" };

export interface Template {
  id: string; slug: string; name: string; hero: string; priority: "P0" | "P1";
  status: Status; summary: string; motions: string[]; motionsNote: string;
  specPath?: string; demoNote?: string;
}

export interface Motion { id: string; name: string; group: string; mvp: boolean; implemented: boolean }

export const SECTIONS = ["Hero", "Proof", "Features", "Showcase", "CTA", "Footer"];

export const MOTIONS: Motion[] = [
  { id: "M01", name: "Blur-in", group: "타이포", mvp: true, implemented: true },
  { id: "M02", name: "Split reveal", group: "타이포", mvp: true, implemented: false },
  { id: "M03", name: "Parallax", group: "스크롤", mvp: true, implemented: true },
  { id: "M04", name: "Pinned story", group: "스크롤", mvp: true, implemented: false },
  { id: "M05", name: "Seamless video loop", group: "미디어", mvp: true, implemented: true },
  { id: "M06", name: "Media reveal", group: "미디어", mvp: true, implemented: true },
  { id: "M07", name: "Magnetic CTA", group: "포인터", mvp: true, implemented: true },
  { id: "M08", name: "Model reveal", group: "3D", mvp: true, implemented: false },
];

export const TEMPLATES: Template[] = [
  { id: "T01", slug: "t01", name: "럭셔리 제품", hero: "다크 시네마틱 비디오", priority: "P0", status: "built",
    summary: "어두운 톤과 영상 루프로 소재감과 정밀함을 전달하는 프리미엄 제품 랜딩.",
    motions: ["M01", "M03", "M05", "M06", "M07"], motionsNote: "승인된 spec 기준",
    specPath: "projects/sample-t01-luxury/spec.md", demoNote: "샘플 사이트 AURUM Noir (projects/sample-t01-luxury/site). Playwright 6/6 통과, 영상은 라이선스 확정 전 포스터만." },
  { id: "T02", slug: "t02", name: "패션", hero: "에디토리얼 타이포", priority: "P1", status: "planned",
    summary: "대형 타이포와 이미지 리듬으로 룩북을 보여주는 에디토리얼 랜딩.", motions: ["M01", "M02", "M03"], motionsNote: "제안 (미승인)" },
  { id: "T03", slug: "t03", name: "AI SaaS", hero: "UI 데모와 스토리", priority: "P0", status: "spec-draft",
    summary: "스크롤에 따라 제품 UI 데모가 단계별로 바뀌는 SaaS 스토리 랜딩.",
    motions: ["M01", "M02", "M04", "M07"], motionsNote: "spec 초안 기준 (미승인)", specPath: "projects/sample-t03-ai-saas/spec.md" },
  { id: "T04", slug: "t04", name: "건축", hero: "GLB 모델 + 스크롤", priority: "P0", status: "spec-draft",
    summary: "스크롤로 건물 3D 모델이 드러나는 건축 사무소 랜딩. 3D 실패 시 포스터 필수.",
    motions: ["M01", "M03", "M04", "M06", "M08"], motionsNote: "spec 초안 기준 (미승인)", specPath: "projects/sample-t04-architecture/spec.md" },
  { id: "T05", slug: "t05", name: "고급 부동산", hero: "프로젝트 투어", priority: "P1", status: "planned",
    summary: "단지·세대 투어 중심의 분양/매물 랜딩.", motions: ["M01", "M04", "M06"], motionsNote: "제안 (미승인)" },
  { id: "T06", slug: "t06", name: "게임", hero: "3D 인터랙션", priority: "P1", status: "planned",
    summary: "3D 캐릭터·세계관 인터랙션으로 사전예약을 유도하는 랜딩.", motions: ["M01", "M04", "M08"], motionsNote: "제안 (미승인)" },
  { id: "T07", slug: "t07", name: "주얼리/뷰티", hero: "액체 유리", priority: "P1", status: "planned",
    summary: "유리·액체 질감의 시각 효과로 제품 광택을 강조하는 랜딩.", motions: ["M01", "M03", "M06", "M07"], motionsNote: "제안 (미승인)" },
  { id: "T08", slug: "t08", name: "자동차", hero: "영상 스크럽", priority: "P1", status: "planned",
    summary: "스크롤로 영상 프레임을 제어하는 차량 소개 랜딩.", motions: ["M01", "M03", "M05"], motionsNote: "제안 (미승인). Video scrub 레시피는 P1 확정 필요" },
  { id: "T09", slug: "t09", name: "포트폴리오", hero: "타이포 리빌", priority: "P1", status: "planned",
    summary: "타이포 리빌과 프로젝트 갤러리 중심의 개인/스튜디오 포트폴리오.", motions: ["M01", "M02", "M06"], motionsNote: "제안 (미승인)" },
  { id: "T10", slug: "t10", name: "교육", hero: "전환 퍼널", priority: "P1", status: "planned",
    summary: "커리큘럼과 신청 흐름에 집중한 수강 전환 랜딩.", motions: ["M01", "M02", "M07"], motionsNote: "제안 (미승인)" },
  { id: "T11", slug: "t11", name: "B2B", hero: "성과·사례", priority: "P1", status: "planned",
    summary: "수치와 고객 사례로 신뢰를 쌓는 B2B 솔루션 랜딩.", motions: ["M01", "M02", "M07"], motionsNote: "제안 (미승인)" },
  { id: "T12", slug: "t12", name: "행사", hero: "갤러리/카운트다운", priority: "P1", status: "planned",
    summary: "일정 카운트다운과 갤러리로 참가 등록을 유도하는 행사 랜딩.", motions: ["M01", "M03", "M06", "M07"], motionsNote: "제안 (미승인)" },
];

export const GATES = [
  { name: "브리프 승인", done: 1, total: 3 },
  { name: "디자인 명세 승인", done: 1, total: 3 },
  { name: "구현 리뷰", done: 0, total: 1 },
  { name: "QA 승인", done: 0, total: 1 },
  { name: "배포", done: 0, total: 1 },
];

export const QA_LATEST = {
  project: "AURUM Noir (T01 v0.1)", date: "2026-11-06", passed: 6, total: 6, verdict: "조건부 통과 (배포 불가)",
  gaps: ["Lighthouse 미측정", "에셋 라이선스 미확정", "M04 Pinned story 미구현", "코드 리뷰어/QA 승인자 미지정"],
};
