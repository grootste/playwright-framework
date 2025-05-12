// pages/LoginPage.js
const locators = require('../tests/locators/locators');
const { fillInput, clickElement, takeScreenshot, checkElementVisible, checkTextEquals } = require('../utils/actions');

/**
 * LoginPage - Page Object Model
 *
 * This class encapsulates login functionality for the application.
 * It includes:
 * - Navigation to the login page
 * - Filling in the email and password inputs
 * - Masked screenshot capture before login (for security)
 * - Clicking the login button
 * - Taking a post-login screenshot for audit/troubleshooting
 * - Navigating to the HTML page and verifying visibility and labels
 *
 * This abstraction allows clean reuse of login logic in tests and adheres to
 * the Page Object Model (POM) best practices.
 */


class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async login(email, password) {
    await clickElement(this.page, locators.navBar.loginLink)
    await fillInput(this.page, locators.loginPage.emailInput, email);
    await fillInput(this.page, locators.loginPage.passwordInput, password);
    await takeScreenshot(this.page, 'pre-login', { mask: [this.page.locator(locators.loginPage.passwordInput)]});
    await clickElement(this.page, locators.loginPage.submitButton)
    await takeScreenshot(this.page, 'post-login', { fullPage: false });
    await clickElement(this.page, locators.htmlPage.htmlHome);
    await checkElementVisible(this.page, locators.htmlPage.htmlHome);
    await checkTextEquals(this.page, locators.htmlPage.htmlHome, "HTML HOME");
    await checkElementVisible(this.page, locators.htmlPage.Homepage.Dashboard);
    await checkTextEquals(this.page, locators.htmlPage.Homepage.Dashboard,"Tutorial");
  }
}

module.exports = LoginPage;

/**
 * Author: Baibhav Singh
 * Role: Automation QA Engineer
 * GitHub: https://github.com/grootste
 * Email: singh.baibhav321@gmail.com
 */