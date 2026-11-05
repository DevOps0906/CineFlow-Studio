import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  timeout: 30_000,
  use: { baseURL: "http://localhost:3218" },
  webServer: { command: "npm run build && npx next start -p 3218", url: "http://localhost:3218", reuseExistingServer: false, timeout: 240_000 },
});
