import { defineConfig, devices } from "@playwright/test";

/**
 * Lighthouse-specific configuration that extends the base Playwright config
 * but adds the necessary browser launch options for Lighthouse to connect.
 */
const config = defineConfig({
  testDir: "./tests/performance",

  // Lighthouse tests can be slow, so we increase the timeout
  timeout: 5 * 60 * 1000,

  // Set up the remote debugging port required for Lighthouse
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    baseURL: "https://tokero.dev",

    launchOptions: {
      // This is the port Lighthouse will use to connect to the browser
      args: ["--remote-debugging-port=9222"],
    },
    // Create directory for Lighthouse reports
    screenshot: "only-on-failure",
  },

  // Only run Lighthouse tests in Chromium
  projects: [
    {
      name: "chromium-lighthouse",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  // Directory for reports
  reporter: [
    ["html", { outputFolder: "lighthouse-reports" }],
    ["json", { outputFile: "lighthouse-reports/results.json" }],
  ],
});

export default config;
