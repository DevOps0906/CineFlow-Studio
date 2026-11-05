import { test, expect, type Page } from "@playwright/test";
import fs from "node:fs";

const ROUTES = ["t02", "t05", "t06", "t07", "t08", "t09", "t10", "t11", "t12"];
const VPS = [{ name: "mobile", width: 390, height: 844 }, { name: "tablet", width: 768, height: 1024 }, { name: "desktop", width: 1440, height: 900 }];
fs.mkdirSync("qa-evidence", { recursive: true });

const scrollThrough = (page: Page) =>
  page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 450) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 50)); } });

for (const r of ROUTES) {
  test.describe(r, () => {
    for (const vp of VPS) {
      test(`${vp.name}: no errors/4xx, no overflow, headings fit, screenshots`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        const errors: string[] = [];
        page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
        page.on("pageerror", (e) => errors.push(e.message));
        page.on("response", (res) => res.status() >= 400 && errors.push(`${res.status()} ${res.url()}`));
        await page.goto(`/${r}`);
        await page.waitForTimeout(1800);
        await page.screenshot({ path: `qa-evidence/${r}-${vp.name}-hero.png` });
        await scrollThrough(page);
        await page.waitForTimeout(1200);
        expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0);
        const clipped = await page.evaluate(() => [...document.querySelectorAll("h1, h2")]
          .filter((h) => { const b = h.getBoundingClientRect(); return b.width > 2 && !h.classList.contains("sr-only") && (b.right > window.innerWidth + 1 || b.left < -1 || h.scrollWidth > h.clientWidth + 2); })
          .map((h) => h.textContent?.slice(0, 40)));
        expect(clipped, "headings overflowing the viewport").toEqual([]);
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(500);
        await page.screenshot({ path: `qa-evidence/${r}-${vp.name}.png`, fullPage: true });
        expect(errors).toEqual([]);
      });
    }

    test("structure: one h1, alt text, meta, focusable CTA; reduced motion shows content", async ({ page, browser }) => {
      await page.goto(`/${r}`);
      await expect(page.locator("h1")).toHaveCount(1);
      expect(await page.locator("img:not([alt])").count()).toBe(0);
      expect((await page.title()).length).toBeGreaterThan(5);
      await expect(page.locator('meta[name="description"]')).toHaveCount(1);
      const cta = page.locator("[data-cta]").first();
      await cta.focus();
      await expect(cta).toBeFocused();
      await expect(page.locator("[data-motion-ready]")).toHaveCount(1);
      // Hero Kit: pre-paint flag, intro completes, chars land at rest
      await expect(page.locator("html")).toHaveAttribute("data-motion", "on");
      await expect(page.locator("[data-hero][data-hero-done]")).toHaveCount(1, { timeout: 8000 });
      expect(await page.locator("[data-hero-title] [data-char]").count()).toBeGreaterThan(2);
      expect(await page.locator("[data-hero-title] [data-char]").last().evaluate((e) => getComputedStyle(e).transform)).toMatch(/^(none|matrix\(1, 0, 0, 1, 0, 0\))$/);

      const ctx = await browser.newContext({ reducedMotion: "reduce" });
      const p2 = await ctx.newPage();
      await p2.goto(`/${r}`);
      await expect(p2.locator("[data-motion-ready]")).toHaveCount(0);
      await expect(p2.locator("[data-pin-on]")).toHaveCount(0);
      expect(await p2.locator("h1").evaluate((e) => getComputedStyle(e).opacity)).toBe("1");
      expect(await p2.locator("html").getAttribute("data-motion")).toBeNull();
      await expect(p2.locator("[data-hero-ready]")).toHaveCount(0);
      expect(await p2.locator("[data-hero-title] [data-char]").first().evaluate((e) => getComputedStyle(e).transform)).toBe("none");
      await ctx.close();
    });
  });
}

test.describe("signatures", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  const scrollPin = async (page: Page, sel: string, steps: number) => {
    const pin = page.locator(sel);
    await expect(pin).toHaveAttribute("data-pin-on", "");
    const top = await pin.evaluate((e) => e.getBoundingClientRect().top + window.scrollY);
    const seen: (string | null)[] = [];
    for (let i = 0; i < steps; i++) {
      await page.evaluate((y) => window.scrollTo(0, y), top + 10 + i * 900 * 0.9);
      await page.waitForTimeout(500);
      seen.push(await pin.getAttribute("data-active"));
    }
    return seen;
  };

  test("t05 floor-plan tour: pinned steps highlight rooms", async ({ page }) => {
    await page.goto("/t05");
    expect(await scrollPin(page, "#tour", 4)).toEqual(["0", "1", "2", "3"]);
    const fill = await page.locator('.plan-live [data-room="3"]').evaluate((e) => getComputedStyle(e).fill);
    expect(fill).not.toBe("none");
    expect(fill).not.toContain("rgba(0, 0, 0, 0)");
  });

  test("t06 relic: 3D renders and reveals; reduced motion shows poster", async ({ page, browser }) => {
    await page.goto("/t06");
    await expect(page.locator('[data-relic="ready"]')).toHaveCount(1, { timeout: 15_000 });
    await expect.poll(async () => Number(await page.locator("[data-reveal]").getAttribute("data-reveal")), { timeout: 8000 }).toBeGreaterThan(0.8);
    expect(await scrollPin(page, "#world", 3)).toEqual(["0", "1", "2"]);
    const ctx = await browser.newContext({ reducedMotion: "reduce" });
    const p2 = await ctx.newPage();
    await p2.goto("/t06");
    await expect(p2.locator('[data-relic="poster"]')).toHaveCount(1);
    await ctx.close();
  });

  test("t07 liquid glass: backdrop blur and pointer highlight", async ({ page }) => {
    await page.goto("/t07");
    const glass = page.locator(".glass").first();
    expect(await glass.evaluate((e) => getComputedStyle(e).backdropFilter)).toContain("blur");
    const box = await glass.boundingBox();
    await page.mouse.move(box!.x + 60, box!.y + 60);
    await expect.poll(() => glass.evaluate((e) => e.style.getPropertyValue("--spot"))).toBe("1");
  });

  test("t08 drive scrub: HUD phases + speed advance; configurator recolours", async ({ page }) => {
    await page.goto("/t08");
    const top = await page.locator("#drive").evaluate((e) => e.getBoundingClientRect().top + window.scrollY);
    await page.evaluate((y) => window.scrollTo(0, y + 50), top);
    await expect(page.locator('[data-hud="live"]')).toHaveCount(1);
    const at = async (f: number) => { await page.evaluate((y) => window.scrollTo(0, y), top + f * 900 * 2); await page.waitForTimeout(400); return { phase: await page.locator("[data-hud]").getAttribute("data-phase"), speed: Number(await page.locator("[data-speed]").textContent()) }; };
    const a = await at(0.1), b = await at(0.5), c = await at(0.95);
    expect([a.phase, b.phase, c.phase]).toEqual(["0", "1", "2"]);
    expect(b.speed).toBeGreaterThan(a.speed);
    await page.getByRole("button", { name: "Glacier" }).click();
    await expect(page.locator("[data-color-name]")).toHaveText("Glacier");
    await expect(page.getByRole("button", { name: "Glacier" })).toHaveAttribute("aria-pressed", "true");
  });

  test("t09 index: hovering a project shows its floating preview", async ({ page }) => {
    await page.goto("/t09");
    await page.locator("#index li").nth(2).hover();
    await expect(page.locator("[data-preview]")).toHaveAttribute("data-preview", "2");
  });

  test("t10 quiz: three answers produce a track recommendation", async ({ page }) => {
    await page.goto("/t10");
    await page.getByText("화면을 만들고 바로 결과를 보는 일").click();
    await page.getByText("동네 카페 매출 대시보드").click();
    await page.getByText("질문을 세우고 검증하며").click();
    await expect(page.locator("[data-quiz-result]")).toHaveAttribute("data-quiz-result", "data");
    await expect(page.getByText("Data Track")).toBeVisible();
  });

  test("t11 case tabs (keyboard) and ROI calculator", async ({ page }) => {
    await page.goto("/t11");
    const first = page.getByRole("tab").first();
    await first.focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("tab").nth(1)).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("tab").nth(1)).toBeFocused();
    const before = await page.locator("[data-roi]").textContent();
    await page.getByLabel("월 출고 건수").fill("50000");
    await expect(page.locator("[data-roi]")).not.toHaveText(before!);
  });

  test("t12 countdown is live and ticking", async ({ page }) => {
    await page.goto("/t12");
    const cd = page.locator('[data-countdown="live"]');
    await expect(cd).toHaveCount(1);
    const s1 = await cd.locator("p").nth(6).textContent();
    await page.waitForTimeout(1300);
    expect(await cd.locator("p").nth(6).textContent()).not.toBe(s1);
    expect(s1).toMatch(/^\d{2}$/);
  });
});
