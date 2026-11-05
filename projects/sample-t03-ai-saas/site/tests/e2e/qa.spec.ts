import { test, expect } from "@playwright/test";
import fs from "node:fs";

const viewports = [{ name: "mobile", width: 390, height: 844 }, { name: "tablet", width: 768, height: 1024 }, { name: "desktop", width: 1440, height: 900 }];
fs.mkdirSync("qa-evidence", { recursive: true });

for (const vp of viewports) {
  test(`${vp.name}: no console errors / 404, no horizontal overflow, screenshot`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    const errors: string[] = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("response", (r) => r.status() >= 400 && errors.push(`${r.status()} ${r.url()}`));
    await page.goto("/");
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } });
    await page.waitForTimeout(1200);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: `qa-evidence/${vp.name}.png`, fullPage: true });
    expect(errors).toEqual([]);
  });
}

test("structure: h1, alt/aria for mocks, meta, CTA keyboard", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toContainText("반복 업무를 흐름으로 바꾸세요");
  expect(await page.locator("img:not([alt])").count()).toBe(0);
  await expect(page).toHaveTitle(/NOVA Flow/);
  await expect(page.locator('meta[name="description"]')).toHaveCount(1);
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  expect(await page.evaluate(() => (document.activeElement as HTMLAnchorElement)?.href)).toContain("mailto:");
});

test("reduced motion: no motion init, split words visible, pin off", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto("/");
  await expect(page.locator("[data-motion-ready]")).toHaveCount(0);
  await expect(page.locator("[data-pin-on]")).toHaveCount(0);
  for (const w of await page.locator("[data-split-word]").all()) expect(await w.evaluate((e) => getComputedStyle(e).opacity)).toBe("1");
  await ctx.close();
});

test("M02: split words all reach opacity 1 when motion is on", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("[data-motion-ready]")).toHaveCount(1);
  await expect.poll(async () => (await page.locator("[data-split-word]").evaluateAll((els) => els.map((e) => getComputedStyle(e).opacity))).every((o) => o === "1")).toBe(true);
});

test("M04 desktop: pinned and active step advances 0 -> 1 -> 2", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const pin = page.locator('[data-m="pin"]');
  await expect(pin).toHaveAttribute("data-pin-on", "");
  const top = await pin.evaluate((e) => e.getBoundingClientRect().top + window.scrollY);
  const at = async (offset: number) => { await page.evaluate((y) => window.scrollTo(0, y), top + offset); await page.waitForTimeout(500); return pin.getAttribute("data-active"); };
  expect(await at(10)).toBe("0");
  expect(await at(900 * 1.4)).toBe("1");
  expect(await at(900 * 2.6)).toBe("2");
  await expect(page.locator('[data-panel="2"]')).toHaveCSS("opacity", "1");
  await expect(page.locator('[data-panel="0"]')).toHaveCSS("opacity", "0");
});

test("M04 mobile: no pin, all 3 steps and mocks visible", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator("[data-pin-on]")).toHaveCount(0);
  await expect(page.locator("[data-step]")).toHaveCount(3);
  for (const s of await page.locator("[data-step]").all()) await expect(s).toBeVisible();
  await expect(page.locator("[data-step] [role=img]:visible")).toHaveCount(3);
});
