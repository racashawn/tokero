import { expect, Page } from "@playwright/test";
import { getTranslation } from "../helpers/translations";
export * from "../page-objects/header";

const academyTitle = (page: Page) =>
  page.getByRole("heading", { name: "TOKERO   Academy" });

const introText = (page: Page) => page.locator(".mud-card-content").first();
const learnAboutCryptoTitle = (page: Page, lang = "en") =>
  page.getByRole("heading", {
    name: getTranslation(lang, "LabelLearnAboutCrypto"),
  });

const learnAboutCryptoText = (page: Page) =>
  page.locator(".row > div:nth-child(2)").first();

const tokeroCryptionaryTitle = (page: Page, lang = "en") =>
  page.getByRole("heading", {
    name: getTranslation(lang, "LabelTOKEROCryptionary"),
  });
const TokeroCryptionaryText = (page: Page) =>
  page.locator(
    "div:nth-child(3) > .mud-card-content > .row > div:nth-child(2)"
  );

export async function isOnAcademyPage(page: Page) {
  await expect(academyTitle(page)).toBeVisible();
  await expect(academyTitle(page)).toContainText("TOKERO");
  await expect(academyTitle(page)).toContainText("Academy");
}

export async function checkAcademyIntroText(page: Page, lang = "en") {
  await expect
    .soft(introText(page))
    .toContainText(getTranslation(lang, "LabelAboutAcademy"));
}

export async function checkTextForLearnAboutCrypto(page: Page, lang?: string) {
  await expect.soft(learnAboutCryptoTitle(page, lang)).toBeVisible();
  await expect
    .soft(learnAboutCryptoText(page))
    .toContainText(getTranslation(lang ?? "en", "LabelAboutCryptoDescription"));
}

export async function checkTextForTokeroCryptionary(page: Page, lang?: string) {
  await expect.soft(tokeroCryptionaryTitle(page, lang)).toBeVisible();
  await expect
    .soft(TokeroCryptionaryText(page))
    .toContainText(getTranslation(lang ?? "en", "LabelCryptionaryDescription"));
}
