import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30_000,
  reporter: [["list"]],
  use: { baseURL: "http://localhost:4320" },
  webServer: { command: "npm run build && npx next start -p 4320", url: "http://localhost:4320", reuseExistingServer: false, timeout: 240_000 },
});

