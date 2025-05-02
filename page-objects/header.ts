import { Locator, Page } from "@playwright/test";
import { getTranslation } from "../helpers/translations";
import { create } from "domain";

//========================== Locators ==========================

const languageSwitchBtn = async (page: Page) => {
  const lang = await getCurrentLangCode(page);
  return page.getByRole("button", {
    name: `${lang} flag ${lang.toUpperCase()}`,
    exact: true,
  });
};

const languages = (page: Page) => ({
  en: () => page.getByRole("button", { name: "en flag EN" }),
  ro: () => page.getByRole("button", { name: "ro flag RO" }),
  de: () => page.getByRole("button", { name: "de flag DE" }),
  fr: () => page.getByRole("button", { name: "fr flag FR" }),
  it: () => page.getByRole("button", { name: "it flag IT" }),
  pl: () => page.getByRole("button", { name: "pl flag PL" }),
  pt: () => page.getByRole("button", { name: "pt flag PT" }),
  tr: () => page.getByRole("button", { name: "tr flag TR" }),
});

const corporateBtn = (page: Page, lang?: string) =>
  page.getByRole("link", {
    name: lang ? getTranslation(lang!, "LabelCorporate") : "Corporate",
    exact: true,
  });
const exchangeBtn = (page: Page, lang?: string) =>
  page.getByLabel("Topbar menu").getByRole("link", {
    name: lang ? getTranslation(lang!, "LabelExchange") : "Exchange",
    exact: true,
  });

const academyBtn = (page: Page, lang?: string) =>
  page.getByLabel("Topbar menu").getByRole("link", {
    name: lang ? getTranslation(lang!, "LabelAcademy") : "Academy",
    exact: true,
  });

const contactUsBtn = (page: Page, lang?: string) => {
  return page.getByLabel("Topbar menu").getByRole("link", {
    name: lang ? getTranslation(lang!, "TitleContact") : "Contact us",
  });
};

const loginBtn = (page: Page) => page.getByRole("link", { name: "Login" });

const createAccountBtn = (page: Page, lang?: string) => {
  return page.getByLabel("Topbar menu").getByRole("link", {
    name: lang ? getTranslation(lang!, "LabelCreateAccount") : "Create account",
  });
};

//============================= functions ==============================

/**
 * Extracts the language code from the current page URL.
 * Defaults to 'en' if no language code segment is found.
 * @param page The Playwright Page object.
 * @returns The detected language code as a string.
 */
async function getCurrentLangCode(page: Page): Promise<string> {
  const currentUrl = page.url();
  const urlObject = new URL(currentUrl);
  const pathSegments = urlObject.pathname
    .split("/")
    .filter((segment) => segment !== "");

  if (pathSegments.length > 0) {
    return pathSegments[0];
  }
  return "en";
}

/**
 *
 * @param page  - the page
 * @param lang - use one of the language codes available in the FE
 */
export async function changeLanguageTo(page: Page, lang: string) {
  (await languageSwitchBtn(page)).click();
  const availableLanguages = languages(page);
  if (!(lang in availableLanguages)) {
    throw new Error(
      `Language code "${lang}" is not supported or defined in the languages object.`
    );
  }

  const languageLocatorFunction =
    availableLanguages[lang as keyof typeof availableLanguages];
  const languageLocator: Locator = languageLocatorFunction();

  console.log(`Attempting to click the button for language: ${lang}`);
  await languageLocator.click();
  await page.waitForLoadState("domcontentloaded");
}

export async function clickCorporate(page: Page, lang?: string) {
  await corporateBtn(page, lang).click();
}

export async function clickExchange(page: Page, lang?: string) {
  await exchangeBtn(page, lang).click();
}

export async function clickOnAcademy(page: Page, lang?: string) {
  await academyBtn(page, lang).click();
}

export async function clickContactUs(page: Page, lang?: string) {
  await contactUsBtn(page, lang).click();
}

export async function login(page: Page) {
  await loginBtn(page).click();
}

export async function clickOnCreateAccount(page: Page, lang?: string) {
  await createAccountBtn(page, lang).click();
}
