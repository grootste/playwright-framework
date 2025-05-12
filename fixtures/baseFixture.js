// fixtures/baseFixtures.js
const { test: baseTest, expect } = require('@playwright/test');
const { baseURL } = require('../config/global.config'); // Import your config
const { clickElement, checkElementVisible, waitForNetworkIdle } = require('../utils/actions');
const locators = require('../tests/locators/locators');

/**
 * Custom Playwright Fixture: baseFixture
 *
 * This fixture extends the default Playwright test context to include pre-test navigation setup.
 * It performs the following:
 * - Navigates to the base URL before each test.
 * - Verifies that the correct URL has been loaded.
 * - Confirms visibility of the "HTML" link in the navbar.
 * - Clicks the "HTML" link to navigate to the HTML tutorial home.
 * - Verifies that the URL now points to the HTML page (/html/default.asp).
 *
 * This ensures that all tests using this fixture start from a consistent,
 * pre-navigated state with the HTML tutorial page already loaded.
 */

exports.test = baseTest.extend({
  page: async ({ page }, use) => {
    await page.goto(baseURL); //  Uses baseURL
    await expect(page).toHaveURL(baseURL);// Verifying url is fetched or not
    await checkElementVisible(page, locators.navBar.htmlLink);
    await clickElement(page, locators.navBar.htmlLink);
    await expect(page).toHaveURL(/html\/default.asp/); 
    await use(page);
  },
  
});

/**
 * Author: Baibhav Singh
 * Role: Automation QA Engineer
 * GitHub: https://github.com/grootste
 * Email: singh.baibhav321@gmail.com
 */