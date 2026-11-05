import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30_000,
  reporter: [["list"]],
  use: { baseURL: "http://localhost:4319" },
  webServer: { command: "npm run build && npx next start -p 4319", url: "http://localhost:4319", reuseExistingServer: false, timeout: 240_000 },
});

