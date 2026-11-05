import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30_000,
  reporter: [["list"]],
  use: { baseURL: "http://localhost:3219" },
  webServer: { command: "npm run build && npx next start -p 3219", url: "http://localhost:3219", reuseExistingServer: false, timeout: 240_000 },
});

