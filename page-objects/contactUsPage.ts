import { expect, Page } from "@playwright/test";
export * from '../page-objects/header'
import { getTranslation } from "../helpers/translations";

const contactUsTitle = (page: Page, lang = "en") =>
  page.getByRole("heading", {
    name: getTranslation(lang, "TitleContact"),
  });


  
export async function isOnContactUsPage(page: Page, lang?: string) {
  await expect(contactUsTitle(page, lang)).toBeVisible();
}
