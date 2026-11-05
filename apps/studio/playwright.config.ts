import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  timeout: 30_000,
  use: { baseURL: "http://localhost:4318" },
  webServer: { command: "npm run build && npx next start -p 4318", url: "http://localhost:4318", reuseExistingServer: false, timeout: 240_000 },
});
