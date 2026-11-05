# Architecture

## 모듈
- Template Registry: template_id, version, 업종, 타깃, CTA, sections
- Motion Recipes: motion_id, trigger, duration, easing, fallback
- Asset Manager: asset_id, source, rights_holder, license, redistribution_allowed
- Design Planner: brief → spec.md
- Multi-agent: Claude Code lead / Sonnet + Codex designers & workers
- QA: Playwright screenshot/console/overflow + 성능 체크
- Export: GitHub PR / Vercel preview / Next.js source

## 권장 모노레포 (정식 확장 단계)
- apps/studio
- apps/showcase
- packages/ui
- packages/templates
- packages/motions
- packages/agent-contracts
- skills/
- templates/
- docs/

## 관계
Organization → Project → Revision → Spec
Template → TemplateVersion → Section → Motion
Asset → License → AssetUsage
Project → GenerationJob → AgentRun → QAReport → Deployment

## 기술
Next.js App Router + TypeScript + Tailwind + shadcn/ui + GSAP + R3F + Supabase + Playwright. 알림·워크플로는 필요할 때 n8n/Make 연동.
