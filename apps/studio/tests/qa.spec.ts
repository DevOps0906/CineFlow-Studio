import { test, expect } from "@playwright/test";
import fs from "node:fs";

const vps = [{ n: "mobile", w: 390, h: 844 }, { n: "tablet", w: 768, h: 1024 }, { n: "desktop", w: 1440, h: 900 }];
const slugs = Array.from({ length: 12 }, (_, i) => `t${String(i + 1).padStart(2, "0")}`);
fs.mkdirSync("qa-evidence", { recursive: true });

for (const vp of vps) {
  test(`${vp.n}: dashboard + 12 category pages have no errors/overflow`, async ({ page }) => {
    test.setTimeout(90_000);
    await page.setViewportSize({ width: vp.w, height: vp.h });
    const errors: string[] = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("response", (r) => r.status() >= 400 && errors.push(`${r.status()} ${r.url()}`));
    for (const path of ["/", ...slugs.map((s) => `/category/${s}`)]) {
      await page.goto(path);
      await expect(page.locator("h1")).toHaveCount(1);
      const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(over, `overflow on ${path}`).toBeLessThanOrEqual(0);
    }
    await page.goto("/"); await page.screenshot({ path: `qa-evidence/${vp.n}-dashboard.png`, fullPage: true });
    await page.goto("/category/t01"); await page.screenshot({ path: `qa-evidence/${vp.n}-t01.png`, fullPage: true });
    expect(errors).toEqual([]);
  });
}

test("desktop GNB lists 12 categories and navigates", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "주 메뉴" });
  await expect(nav.locator('a[href^="/category/"]')).toHaveCount(12);
  await nav.getByRole("link", { name: /T04 건축/ }).click();
  await expect(page).toHaveURL(/\/category\/t04$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("건축");
  await expect(nav.getByRole("link", { name: /T04/ })).toHaveAttribute("aria-current", "page");
});

test("mobile menu toggles and navigates", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator("#gnb")).toBeHidden();
  await page.getByRole("button", { name: "메뉴" }).click();
  await expect(page.locator("#gnb")).toBeVisible();
  await page.locator("#gnb").getByRole("link", { name: /T03 AI SaaS/ }).click();
  await expect(page).toHaveURL(/\/category\/t03$/);
  await expect(page.locator("#gnb")).toBeHidden();
});

test("unknown category shows not-found page", async ({ page }) => {
  await page.goto("/category/t99");
  await expect(page.getByText("404").first()).toBeVisible();
  await expect(page.getByText("This page could not be found.")).toBeVisible();
});

test("registry reflects project files (T01 built, T03/T04 drafts, 5/8 motions)", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const row = (id: string) => page.locator(`main a[href="/category/${id}"]`);
  await expect(row("t01")).toContainText("구현됨");
  await expect(row("t03")).toContainText("Spec 초안");
  await expect(row("t04")).toContainText("Spec 초안");
  await expect(row("t02")).toContainText("계획");
  await expect(page.getByText("5/8", { exact: true })).toBeVisible();
  await expect(page.getByText("테스트 6/6 통과")).toBeVisible();
  await page.goto("/category/t03");
  await expect(page.getByText("projects/sample-t03-ai-saas/spec.md")).toBeVisible();
  await expect(page.getByText("사이트 미구현 (spec 승인 대기)")).toBeVisible();
});
