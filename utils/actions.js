// utils/actions.js
const { expect } = require('@playwright/test');
const path = require('path');

module.exports = {
  /**
   * Navigate to URL with validation
   * @param {Page} page - Playwright page object
   * @param {string} url - URL to navigate to
   */
  async navigateTo(page, url) {
    await page.goto(url);
    await expect(page).toHaveURL(url);
  },

  /**
 * Wait for element to become visible
 * @param {Page} page - Playwright page object
 * @param {string} selector - Element selector
 * @param {number} timeout - Maximum wait time in milliseconds (default: 15s)
 * @returns {Promise<Locator>} Element locator
 */
async waitForVisible(page, selector, timeout = 15000) {
  try {
    const element = page.locator(selector);
    await element.waitFor({ state: 'visible', timeout });
    console.log(`Element ${selector} became visible after ${timeout}ms`);
    return element;
  } catch (error) {
    console.error(`Element ${selector} not visible after ${timeout}ms`);
    throw new Error(`Visibility timeout for ${selector}: ${error.message}`);
  }
},


  /**
   * Click element with safety checks
   * @param {Page} page - Playwright page object
   * @param {string} selector - Element selector
   */
  async clickElement(page, selector) {
    await page.locator(selector).waitFor({ state: 'visible' });
    await page.locator(selector).click();
  },

  /**
   * Fill input field with validation
   * @param {Page} page - Playwright page object
   * @param {string} selector - Input selector
   * @param {string} value - Text to input
   */
  async fillInput(page, selector, value) {
    const input = page.locator(selector);
    await input.waitFor({ state: 'visible' });
    await input.fill(value);
    await expect(input).toHaveValue(value);
  },

  /**
   * Verify element visibility
   * @param {Page} page - Playwright page object
   * @param {string} selector - Element selector
   */
  async checkElementVisible(page, selector) {
    await expect(page.locator(selector)).toBeVisible();
  },

  /**
   * Verify text content
   * @param {Page} page - Playwright page object
   * @param {string} selector - Element selector
   * @param {string} expectedText - Expected text content
   */
  async checkTextEquals(page, selector, expectedText) {
    await expect(page.locator(selector)).toHaveText(expectedText);
  },

  /**
   * Scroll to element with retries
   * @param {Page} page - Playwright page object
   * @param {string} selector - Element selector
   */
  async scrollToElement(page, selector) {
    const element = page.locator(selector);
    await element.scrollIntoViewIfNeeded();
    await element.waitFor({ state: 'visible' });
  },

// utils/actions.js
 /**
   * Enter on the fields
   * @param {Page} page - Playwright page object
   * @param {string} selector - Element selector
   * @param {string} Text - Text content to enter
   */
async fillField(page, selector, value) {
  await page.locator(selector).click();
  await page.locator(selector).fill(value);
},


// utils/actions.js
 /**
   * Enter on the fields
   * @param {Page} page - Playwright page object
   * @param {string} name - name of image
   * @param {string} option
   */

async  takeScreenshot(page, name, options = {}) {
  try {
    const config = {
      path: path.join('screenshots', `${name}-${Date.now()}.png`),
      fullPage: true,
      ...options
    };
    
    await page.screenshot(config);
    return config.path;
  } catch (error) {
    console.error(`Failed to take screenshot: ${error}`);
    return null;
  }
},


  /**
   * Wait for network idle
   * @param {Page} page - Playwright page object
   */
  async waitForNetworkIdle(page) {
    await page.waitForLoadState('networkidle');
  }

  
};


/**
 * Author: Baibhav Singh
 * Role: Automation QA Engineer
 * GitHub: https://github.com/grootste
 * Email: singh.baibhav321@gmail.com
 */