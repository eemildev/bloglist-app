import { defineConfig } from "@playwright/test"

export default defineConfig({
  use: {
    baseURL: "http://localhost:3000",
  },
  // This tells Playwright to start your Next.js server automatically
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, // Gives Next.js 2 minutes to boot up and compile
  },
})