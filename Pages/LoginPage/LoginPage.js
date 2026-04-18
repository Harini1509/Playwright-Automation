/**
 * LoginPage - Page object for login functionality
 */

const BasePage = require('../BasePage');

class LoginPage extends BasePage {
  // Locators
  get emailInput() {
    return "input[id='userEmail']";
  }

  get passwordInput() {
    return "#userPassword";
  }

  get loginButton() {
    return "#login";
  }

  /**
   * Navigate to login page
   */
  async goto() {
    await super.goto('https://rahulshettyacademy.com/client');
  }

  /**
   * Login with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   */
  async login(email, password) {
    await this.fillInput(this.emailInput, email);
    await this.fillInput(this.passwordInput, password);
    await this.wait(500);
    await this.waitForElement(this.loginButton);
    await this.scrollIntoView(this.loginButton);
    await this.clickElement(this.loginButton, { force: true });
    await this.waitForPageLoad('networkidle');
  }

  /**
   * Fill email field
   * @param {string} email - User email
   */
  async fillEmail(email) {
    await this.fillInput(this.emailInput, email);
  }

  /**
   * Fill password field
   * @param {string} password - User password
   */
  async fillPassword(password) {
    await this.fillInput(this.passwordInput, password);
  }

  /**
   * Click login button
   */
  async clickLogin() {
    await this.scrollIntoView(this.loginButton);
    await this.clickElement(this.loginButton, { force: true });
    await this.waitForPageLoad('networkidle');
  }
}

module.exports = LoginPage;
