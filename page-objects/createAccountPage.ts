import { expect, Page } from "@playwright/test";
import { getTranslation } from "../helpers/translations";

const createAccountTitle = (page: Page, lang = "en") =>
  page.getByRole("heading", {
    name: getTranslation(lang, "TitleCreateNewAccount"),
  });

export async function isOnCreateAccountPage(page: Page, lang?: string) {
  await expect.soft(createAccountTitle(page, lang)).toBeVisible();
}
