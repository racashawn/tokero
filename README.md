# Tokero Testing Framework Assessment

This repository contains automated tests for the Tokero application using Playwright as part of an interview technical assessment.

> **Technology Choice**: I chose TypeScript due to my experience with the language, but as I've researched, there are many similarities between TypeScript and .NET, so an eventual switch would not be super impactful. Both are strongly-typed languages with similar syntax for many operations, making the transition relatively smooth if needed.

## Testing Overview

This test automation framework demo focuses on **top layer areas** of the Tokero platform to ensure quality and reliability:

### Functional Testing

- **Navigation**: Comprehensive tests for site navigation including header links, language switching, and user flow between pages
- **UI Verification**: Validation of critical UI elements and their localization across multiple languages
- **Cross-Browser Compatibility**: Tests run across Chromium, Firefox, Safari, and Microsoft Edge browsers

### Localization Testing

- Implementation of multi-language tests that verify content translation accuracy
- Support for 3 languages in the application (EN(default), RO, FR)
- Validation of language switching functionality

> **Note:** Some localization tests use soft assertions to continue test execution even when a language verification fails. This allows the test to check all languages instead of stopping at the first failure.

### Performance Testing

- Lighthouse audits that evaluate key pages against performance, accessibility, SEO, and best practices metrics

### Test Selection Rationale

Tests were prioritized based on:

1. **User Journeys**: Focusing on paths that users take through the application **_EXCEPT LOGIN FEATURE_**
2. **Risk Areas**: Pages and functions with high visibility
3. **Cross-Cutting Concerns**: Features like localization that affect the entire application

## TRADEOFFS

1. I didn't see a reason to use fixtures for this demo/assessment

## Design Pattern: Function-Based Page Organization

This project uses a functional approach to page organization that draws inspiration from the Page Object Model pattern but implements it differently. Unlike traditional POM which uses classes with constructors that need to be instantiated, this approach uses exported functions grouped by page.

### How This Differs From Traditional Page Object Model

Traditional Page Object Model implementations typically:

- Use classes to represent pages
- Have constructors that initialize the page object
- Require instantiation with `new HomePage()` or similar
- Store selectors as properties on class instances

This project instead uses:

- Module files organized by page functionality
- Exported functions that accept a `page` parameter
- No classes, constructors, or instantiation
- Selector functions that are co-located with the interaction functions

### Benefits of This Approach:

- **Simplicity**: No need to manage object instances or handle constructor logic
- **Direct Playwright Integration**: Functions directly accept and use the Playwright `page` object
- **Statelessness**: Functions are pure and don't maintain internal state
- **Easy Imports**: Can use named imports to access only what's needed

### Potential Optimizations:

As the test suite grows, this structure could be further optimized by:

1. **Separating Selectors**: Moving selectors to dedicated files (e.g., `selectors/academySelectors.ts`) to make page interaction files more focused
2. **Grouping by Domain**: Organizing functions by domain concepts rather than strictly by pages
3. **Creating UI Component Libraries**: Extracting common UI patterns (navigation, forms, etc.) into shared functions
4. **Adding Type Definitions**: Creating interfaces for expected page states and responses

### Project Structure

```
tokero/
├── page-objects/        # Page object classes
│   ├── academyPage.ts   # Academy page interactions
│   ├── header.ts        # Header interactions
│   ├── homePage.ts      # Home page interactions
│   └── ...              # Other page objects
├── tests/               # Test files
│   ├── localization.spec.ts   # Localization tests
│   └── performance/     # Performance tests
│       └── lighthouse.spec.ts # Lighthouse performance tests
├── helpers/             # Helper functions, utilities
│   └── translations.ts  # Translation support
├── lighthouse-reports/  # Generated Lighthouse reports
├── playwright.config.ts # Main Playwright configuration
└── lighthouse.config.ts # Lighthouse-specific configuration
```

### How Page Objects are Used in this Project

Each page object file typically contains:

1. **Locators**: Functions that return element locators for the page
2. **Actions**: Functions that perform actions on the page (click, type, etc.)
3. **Assertions**: Functions that verify the state of the page

Example from academyPage.ts:

```typescript
// Locators
const academyTitle = (page: Page) =>
  page.getByRole("heading", { name: "TOKERO Academy" });

// Actions & Assertions
export async function isOnAcademyPage(page: Page) {
  await expect(academyTitle(page)).toBeVisible();
  await expect(academyTitle(page)).toContainText("TOKERO");
  await expect(academyTitle(page)).toContainText("Academy");
}
```

### Notes on Localization Testing

As noted in the project:

```
/**
 * chose to handle the translations like this instead of using fixtures because:
 * 1. I don't have an api to call for translations so the fixture would only load up the translations that i saved instead of getting the json dynamically and using it
 * 2. I would rather use fixtures for setting up login sessions for tests
 * 3. Using language fixtures for a test might make it difficult to have multiple language checks within that test (I think its more flexible like this)
 *
 *
 * there were some placeholders in the translation info ( {0}) and i just edited them in order to pass the test. in a real world scenario i would have asked the devs how to use those or if they are bugs
 */
```

The translation approach allows for testing multiple languages within the same test by explicitly passing the language parameter to the page object functions, rather than using fixtures that would be fixed for the entire test.

## Performance Testing

This project includes Lighthouse performance tests that check key pages against performance, accessibility, best practices, and SEO thresholds.

## Running Tests

### Install Dependencies

```bash
npm install
```

### Run Tests (Chromium Only)

```bash
npm test
```

### Run Tests in Headed Mode (Chromium Only)

```bash
npm run test:headed
```

### Run Tests (All Browsers)

```bash
npm run test:allBrowsers
```

### Run Tests in Headed Mode (All Browsers)

```bash
npm run test:allBrowsers:headed
```

### Run Performance Tests (Lighthouse)

```bash
npm run test:lighthouse
```

## Generating Reports

Test reports are automatically generated in HTML format. Lighthouse reports are saved in the `lighthouse-reports` directory.

### Failure Artifacts

When tests fail, you'll get:

- **Screenshots** of the page at the time of failure
- **Traces** that show the step-by-step actions leading to the failure
- **Videos** of the test run so you can see what happened
