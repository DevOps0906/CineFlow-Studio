import { test, expect, type Page } from "@playwright/test";
import fs from "node:fs";

const viewports = [{ name: "mobile", width: 390, height: 844 }, { name: "tablet", width: 768, height: 1024 }, { name: "desktop", width: 1440, height: 900 }];
fs.mkdirSync("qa-evidence", { recursive: true });

const scrollThrough = (page: Page) =>
  page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } });

for (const vp of viewports) {
  test(`${vp.name}: no console errors / 404, no horizontal overflow, screenshots`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    const errors: string[] = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("response", (r) => r.status() >= 400 && errors.push(`${r.status()} ${r.url()}`));
    await page.goto("/");
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `qa-evidence/${vp.name}-hero.png` });
    await scrollThrough(page);
    await page.waitForTimeout(1500);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);
    await page.screenshot({ path: `qa-evidence/${vp.name}.png`, fullPage: true });
    expect(errors).toEqual([]);
  });
}

test("structure: single h1, alt text, meta, focusable mailto CTA", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toContainText("The weight");
  expect(await page.locator("img:not([alt])").count()).toBe(0);
  await expect(page).toHaveTitle(/AURUM Noir/);
  await expect(page.locator('meta[name="description"]')).toHaveCount(1);
  const cta = page.locator("[data-cta]");
  await expect(cta).toHaveAttribute("href", /^mailto:/);
  await cta.focus();
  await expect(cta).toBeFocused();
});

test("signature dial: live time set, hands sweep, ring rotates on scroll", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator(".dial[data-live]")).toHaveCount(1);
  expect(await page.locator("[data-sec]").evaluate((e) => getComputedStyle(e).animationName)).toBe("dial-sweep");
  await page.evaluate(() => window.scrollTo(0, 700));
  await expect.poll(() => page.locator("[data-dial-ring]").evaluate((e) => getComputedStyle(e).transform)).not.toBe("none");
});

test("reduced motion: no motion init, content visible, hands static", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/");
  await expect(page.locator("[data-motion-ready]")).toHaveCount(0);
  expect(await page.locator("h1").evaluate((e) => getComputedStyle(e).opacity)).toBe("1");
  expect(await page.locator("[data-sec]").evaluate((e) => getComputedStyle(e).animationName)).toBe("none");
  await ctx.close();
});

test("motion enabled: M01 blur-in reveals h1", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("[data-motion-ready]")).toHaveCount(1);
  await expect.poll(() => page.locator("h1").evaluate((e) => getComputedStyle(e).opacity)).toBe("1");
});
