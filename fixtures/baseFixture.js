// fixtures/baseFixtures.js
const { test: baseTest, expect } = require('@playwright/test');
const { baseURL } = require('../config/global.config'); // Import your config
const { clickElement, checkElementVisible, waitForNetworkIdle } = require('../utils/actions');
const locators = require('../tests/locators/locators');

// Define your custom fixtures
exports.test = baseTest.extend({
  page: async ({ page }, use) => {
    await page.goto(baseURL); //  Uses baseURL
    await expect(page).toHaveURL(baseURL);// Verifying url is fetched or not
    await checkElementVisible(page, locators.navBar.htmlLink);
    await clickElement(page, locators.navBar.htmlLink);
    await expect(page).toHaveURL(/html\/default.asp/); 
    await use(page);
  },
  
  // Add other fixtures as needed
  /**user: async ({}, use) => {
    await use({ username: 'test', password: 'test123' });
  }
    **/
});