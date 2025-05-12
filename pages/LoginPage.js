// pages/LoginPage.js
const locators = require('../tests/locators/locators');
const { fillInput, clickElement, takeScreenshot, checkElementVisible, checkTextEquals } = require('../utils/actions');

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