import { Page } from "@playwright/test";
export * from '../page-objects/header';


export async function navigateToHomepage(page: Page) {
  await page.goto("/");
  await page.getByRole("button", { name: "Accept all cookies" }).click()
}


