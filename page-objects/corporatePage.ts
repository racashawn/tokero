import { expect, Page } from "@playwright/test";
export * from "../page-objects/header";
import { getTranslation } from "../helpers/translations";

const corporateTitle = (page: Page) => page.locator("h1");



export async function isOnCorporatePage(page: Page, lang='en') {
  await expect(corporateTitle(page)).toBeVisible();
  await expect(corporateTitle(page)).toHaveText(
    getTranslation(lang, "TitleOpenCorporateAccountToday")
  );
}
