import { test, expect } from "@playwright/test";
import fs from "node:fs";

const viewports = [{ name: "mobile", width: 390, height: 844 }, { name: "tablet", width: 768, height: 1024 }, { name: "desktop", width: 1440, height: 900 }];
fs.mkdirSync("qa-evidence", { recursive: true });

for (const vp of viewports) {
  test.describe(vp.name, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test("no console errors / 404, no horizontal overflow, screenshot", async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("response", (r) => r.status() >= 400 && errors.push(`${r.status()} ${r.url()}`));
      await page.goto("/");
      await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } });
      await page.waitForTimeout(1200);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
      await page.screenshot({ path: `qa-evidence/${vp.name}.png`, fullPage: true });
      expect(errors).toEqual([]);
    });
  });
}

test("structure: h1, alt text, meta, CTA keyboard", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
  expect(await page.locator("img:not([alt])").count()).toBe(0);
  await expect(page).toHaveTitle(/AURUM Noir/);
  await expect(page.locator('meta[name="description"]')).toHaveCount(1);
  await page.keyboard.press("Tab"); // skip link
  await page.keyboard.press("Tab"); // CTA
  const href = await page.evaluate(() => (document.activeElement as HTMLAnchorElement)?.href);
  expect(href).toContain("mailto:");
});

test("reduced motion: content visible, no motion init", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/");
  await expect(page.locator("[data-motion-ready]")).toHaveCount(0);
  await expect(page.locator("h1")).toBeVisible();
  expect(await page.locator("h1").evaluate((e) => getComputedStyle(e).opacity)).toBe("1");
  await ctx.close();
});

test("motion enabled: blur-in reveals h1", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("[data-motion-ready]")).toHaveCount(1);
  await expect.poll(() => page.locator("h1").evaluate((e) => getComputedStyle(e).opacity)).toBe("1");
});
