import { expect, Page } from "@playwright/test";
export * from '../page-objects/header'
import { getTranslation } from "../helpers/translations";


const loginTitle = (page: Page, lang = "en") =>
    page.getByRole("heading", {
      name: (getTranslation(lang, "WelcomeBack"))+"!",
    });


    


export async function isOnLoginPage(page: Page, lang?: string) {
  await expect(loginTitle(page, lang)).toBeVisible();
}
