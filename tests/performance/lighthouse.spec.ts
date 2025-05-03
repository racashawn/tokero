import { test, expect } from "@playwright/test";
import { playAudit } from "playwright-lighthouse";
import * as academyPage from "../../page-objects/academyPage";
import * as homePage from "../../page-objects/header";
import * as homePageFunctions from "../../page-objects/homePage";
import lighthouseDesktopConfig from "lighthouse/core/config/lr-desktop-config.js";



const thresholds = {
  performance: 70, 
  accessibility: 90, 
  "best-practices": 85, 
  seo: 80, 
};

test.describe("lighthouse perf tests", () => {
  test("academy page perf audit", async ({ page }) => {
    await homePageFunctions.navigateToHomepage(page);
    await homePage.clickOnAcademy(page);
    await academyPage.isOnAcademyPage(page);

    await playAudit({
      page: page,
      port: 9222, // needs to match the port in config thing
      thresholds: thresholds,
      config: lighthouseDesktopConfig,
      reports: {
        formats: {
          html: true, // pretty html report w/ colors 
        },
        name: "academy-lighthouse-report",
        directory: "./lighthouse-reports",
      },
    });
  });
});
