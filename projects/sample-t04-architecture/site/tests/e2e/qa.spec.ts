import { test, expect } from "@playwright/test";
import fs from "node:fs";

const viewports = [{ name: "mobile", width: 390, height: 844 }, { name: "tablet", width: 768, height: 1024 }, { name: "desktop", width: 1440, height: 900 }];
fs.mkdirSync("qa-evidence", { recursive: true });

const scrollThrough = (page: import("@playwright/test").Page) =>
  page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } });

for (const vp of viewports) {
  test(`${vp.name}: no console errors / 404, no horizontal overflow, screenshot`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    const errors: string[] = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("response", (r) => r.status() >= 400 && errors.push(`${r.status()} ${r.url()}`));
    await page.goto("/");
    await page.waitForTimeout(2200);
    await page.screenshot({ path: `qa-evidence/${vp.name}-hero.png` });
    await scrollThrough(page);
    await page.waitForTimeout(1500);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: `qa-evidence/${vp.name}.png`, fullPage: true });
    expect(errors).toEqual([]);
  });
}

test("structure: h1, alt, meta, CTA keyboard", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
  expect(await page.locator("img:not([alt])").count()).toBe(0);
  await expect(page).toHaveTitle(/STRATA Atelier/);
  await expect(page.locator('meta[name="description"]')).toHaveCount(1);
  const cta = page.locator("[data-cta]");
  await expect(cta).toHaveAttribute("href", /^mailto:/);
  await cta.focus();
  await expect(cta).toBeFocused();
});

test("GLB: <= 5MB, served 200, canvas renders (desktop)", async ({ page, request }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const res = await request.get("/models/building.glb");
  expect(res.status()).toBe(200);
  expect((await res.body()).length).toBeLessThanOrEqual(5 * 1024 * 1024);
  const poster = await request.get("/media/poster-building.svg");
  expect((await poster.body()).length).toBeLessThanOrEqual(150 * 1024);
  await page.goto("/");
  await page.locator("#process-h").scrollIntoViewIfNeeded();
  await expect(page.locator('[data-model="ready"]')).toHaveCount(1, { timeout: 15_000 });
  await expect(page.locator("canvas")).toBeVisible();
  await expect(page.locator("[data-poster]")).toHaveCount(0);
});

test("3D failure: blocked GLB falls back to poster, no page errors", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const pageErrors: string[] = [];
  page.on("pageerror", (e) => pageErrors.push(e.message));
  await page.route("**/models/building.glb", (r) => r.abort());
  await page.goto("/");
  await page.locator("#process-h").scrollIntoViewIfNeeded();
  await expect(page.locator('[data-model="poster-failed"]')).toHaveCount(1, { timeout: 15_000 });
  await expect(page.locator("[data-poster]")).toBeVisible();
  expect(pageErrors).toEqual([]);
});

test("reduced motion: no motion init, 3D not loaded, poster shown, pin off", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  let glb = 0;
  page.on("request", (r) => r.url().includes("building.glb") && glb++);
  await page.goto("/");
  await page.locator("#process-h").scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await expect(page.locator("[data-motion-ready]")).toHaveCount(0);
  await expect(page.locator("[data-pin-on]")).toHaveCount(0);
  await expect(page.locator('[data-model="poster-reduced"]')).toHaveCount(1);
  await expect(page.locator("[data-poster]")).toBeVisible();
  expect(glb).toBe(0);
  await ctx.close();
});

test("M04/M08 desktop: step 0 -> 1 -> 2 and model progress increases", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const pin = page.locator('[data-m="pin"]');
  await expect(pin).toHaveAttribute("data-pin-on", "");
  const top = await pin.evaluate((e) => e.getBoundingClientRect().top + window.scrollY);
  await page.evaluate((y) => window.scrollTo(0, y - 300), top);
  await expect(page.locator('[data-model="ready"]')).toHaveCount(1, { timeout: 15_000 });
  const at = async (off: number) => { await page.evaluate((y) => window.scrollTo(0, y), top + off); await page.waitForTimeout(900); return { step: await pin.getAttribute("data-active"), p: Number(await page.locator("[data-progress]").getAttribute("data-progress")) }; };
  const a = await at(10), b = await at(900 * 1.4), c = await at(900 * 2.9);
  expect([a.step, b.step, c.step]).toEqual(["0", "1", "2"]);
  expect(a.p).toBeLessThan(0.3);
  expect(b.p).toBeGreaterThan(a.p);
  expect(c.p).toBeGreaterThan(0.9);
  await page.screenshot({ path: "qa-evidence/desktop-model-final.png" });
});

test("mobile: no pin, 3 steps visible, static model", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator("[data-pin-on]")).toHaveCount(0);
  for (const s of await page.locator("[data-step]").all()) await expect(s).toBeVisible();
  await page.locator("#process-h").scrollIntoViewIfNeeded();
  await expect(page.locator('[data-model="ready"]')).toHaveCount(1, { timeout: 15_000 });
  await expect.poll(async () => page.locator("[data-progress]").getAttribute("data-progress")).toBe("1.00");
});

test("signature: time slider moves the light (keyboard + value)", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const hero = page.locator("header[data-hour]");
  await expect(hero).toHaveAttribute("data-hour", "16.67", { timeout: 5000 });
  const slider = page.getByRole("slider", { name: /시간대/ });
  const glow = async () => Number(await hero.evaluate((e) => getComputedStyle(e).getPropertyValue("--glow")));
  await slider.fill("8");
  await expect(hero).toHaveAttribute("data-hour", "8.00");
  const g8 = await glow();
  await slider.fill("12");
  await expect(hero).toHaveAttribute("data-hour", "12.00");
  expect(await glow()).toBeGreaterThan(g8);
  await slider.focus();
  await page.keyboard.press("ArrowRight");
  await expect(hero).toHaveAttribute("data-hour", "12.08");
  await expect(slider).toHaveAttribute("aria-valuetext", "12:05");
});

test("reduced motion: no intro light sweep (starts at 16:40)", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/");
  await expect(page.locator("header[data-hour]")).toHaveAttribute("data-hour", "16.67");
  await ctx.close();
});
test("Hero Kit: intro completes, chars at rest; reduced motion has no hidden states", async ({ page, browser }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "on");
  await expect(page.locator("[data-hero][data-hero-done]")).toHaveCount(1, { timeout: 8000 });
  expect(await page.locator("[data-hero-title] [data-char]").last().evaluate((e) => getComputedStyle(e).transform)).toMatch(/^(none|matrix\(1, 0, 0, 1, 0, 0\))$/);
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const p2 = await ctx.newPage();
  await p2.goto("/");
  expect(await p2.locator("html").getAttribute("data-motion")).toBeNull();
  await expect(p2.locator("[data-hero-ready]")).toHaveCount(0);
  expect(await p2.locator("[data-hero-title] [data-char]").first().evaluate((e) => getComputedStyle(e).transform)).toBe("none");
  await ctx.close();
});
