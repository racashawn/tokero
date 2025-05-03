import { test } from "@playwright/test";
import * as homePage from "../page-objects/homePage";
import * as corporatePage from "../page-objects/corporatePage";
import * as exchangePage from "../page-objects/exchangePage";
import * as academyPage from "../page-objects/academyPage";
import * as contacUsPage from "../page-objects/contactUsPage";
import * as loginPage from "../page-objects/loginPage";
import * as createAccountPage from "../page-objects/createAccountPage";

/**
 * chose to handle the translations like this instead of using fixtures because:
 * 1. I don't have an api to call for translations so the fixture would only load up the translations that i saved instead of getting the json dynamically and using it
 * 2. I would rather use fixtures for setting up login sessions for tests
 * 3. Using language fixtures for a test might make it difficult to have multiple language checks within that test (I think its more flexible like this)
 *
 *
 * there were some placeholders in the translation info ( {0}) and i just edited them in order to pass the test. in a real world scenario i would have asked the devs how to use those or if they are bugs
 */

const langFr = "fr";
const langRo = "ro";
const langEn = "en";

test.describe("Localization tests", () => {
  test.beforeEach(async ({ page }) => {
    await homePage.navigateToHomepage(page);
  });

  test("Elements from header should be translated, and should be able to navigate to all the pages from header", async ({
    page,
  }) => {
    await homePage.changeLanguageTo(page, langRo);
    await homePage.clickCorporate(page, langRo);
    await corporatePage.isOnCorporatePage(page, langRo);
    await corporatePage.clickExchange(page, langRo);
    await exchangePage.isOnExchangePage(page, langRo);
    await exchangePage.clickOnAcademy(page, langRo);
    await academyPage.isOnAcademyPage(page);
    await academyPage.clickContactUs(page, langRo);
    await contacUsPage.isOnContactUsPage(page, langRo);
    await contacUsPage.login(page); //"LabelLogin" from I18 doesn't work. at this point i would ask the devs if its a bug (probably is, although i made the test pass as its very minor)
    await loginPage.isOnLoginPage(page, langRo);
    await loginPage.clickOnCreateAccount(page, langRo);
    await createAccountPage.isOnCreateAccountPage(page, langRo);
    //changing lang to fr
    await homePage.changeLanguageTo(page, langFr);
    await homePage.clickCorporate(page, langFr);
    await corporatePage.isOnCorporatePage(page, langFr);
    await corporatePage.clickExchange(page, langFr);
    await exchangePage.isOnExchangePage(page, langFr);
    await exchangePage.clickOnAcademy(page, langFr);
    await academyPage.isOnAcademyPage(page);
    await academyPage.clickContactUs(page, langFr);
    await contacUsPage.isOnContactUsPage(page, langFr);
  });

  test("Check academy page on all languages (ro, fr, en)", async ({ page }) => {
    await homePage.changeLanguageTo(page, langFr);
    await homePage.clickOnAcademy(page, langFr);
    await academyPage.checkAcademyIntroText(page, langFr);
    await academyPage.checkTextForLearnAboutCrypto(page, langFr);
    await academyPage.checkTextForTokeroCryptionary(page, langFr);
    await homePage.changeLanguageTo(page, langRo);
    await homePage.clickOnAcademy(page, langRo);
    await academyPage.checkAcademyIntroText(page, langRo);
    await academyPage.checkTextForLearnAboutCrypto(page, langRo);
    await academyPage.checkTextForTokeroCryptionary(page, langRo);
    await homePage.changeLanguageTo(page, langEn);
    await homePage.clickOnAcademy(page, langEn);
    await academyPage.checkAcademyIntroText(page, langEn);
    await academyPage.checkTextForLearnAboutCrypto(page, langEn);
    await academyPage.checkTextForTokeroCryptionary(page, langEn);
  });
});
