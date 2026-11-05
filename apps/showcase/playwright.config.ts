import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  timeout: 60_000,
  reporter: [["list"]],
  use: { baseURL: "http://localhost:4321" },
  webServer: { command: "npm run build && npx next start -p 4321", url: "http://localhost:4321", reuseExistingServer: false, timeout: 300_000 },
});
