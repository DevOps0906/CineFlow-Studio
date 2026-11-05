import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30_000,
  reporter: [["list"]],
  use: { baseURL: "http://localhost:3217" },
  webServer: { command: "npm run build && npx next start -p 3217", url: "http://localhost:3217", reuseExistingServer: false, timeout: 240_000 },
});

