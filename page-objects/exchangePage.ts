import { expect, Page } from "@playwright/test";
export * from "../page-objects/header";
import { getTranslation } from "../helpers/translations";

const exchangeTitle = (page: Page, lang: string) =>
  page.getByRole("heading", {
    name: getTranslation(lang, "TitleExchange"),
  });

export async function isOnExchangePage(page: Page, lang = "en") {
  await expect(exchangeTitle(page, lang)).toBeVisible();
}
