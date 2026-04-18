/**
 * CheckoutPage - Page object for checkout and order placement functionality
 */

const BasePage = require('../BasePage');

class CheckoutPage extends BasePage {
  // Locators
  get countryInput() {
    return "input[placeholder*='Select Country']";
  }

  get countryDropdown() {
    return "//section[contains(@class,'ta-results')]";
  }

  get countryOptions() {
    return "button[class*='ta-item list']";
  }

  get placeOrderButton() {
    return "//a[normalize-space()='Place Order']";
  }

  get orderConfirmationTitle() {
    return "h1";
  }

  /**
   * Search for country
   * @param {string} country - Country name to search
   */
  async searchCountry(country) {
    await this.pressSequentially(this.countryInput, country, 100);
    await this.waitForElement(this.countryDropdown);
  }

  /**
   * Select country from dropdown
   * @param {string} country - Country name to select
   */
  async selectCountry(country) {
    await this.searchCountry(country);

    const options = this.page.locator(this.countryOptions);
    const count = await this.getElementCount(this.countryOptions);

    for (let i = 0; i < count; i++) {
      const optionText = await this.getNthElementText(this.countryOptions, i);
      console.log(`Country option: ${optionText}`);

      if (optionText.trim() === country) {
        await this.getNthElement(this.countryOptions, i).click();
        return true;
      }
    }

    console.log(`Country not found: ${country}`);
    return false;
  }

  /**
   * Place order
   */
  async placeOrder() {
    await this.clickElement(this.placeOrderButton);
    await this.waitForPageLoad('networkidle');
  }

  /**
   * Get order confirmation message
   * @returns {Promise<string>} - Confirmation message
   */
  async getConfirmationMessage() {
    return await this.getText(this.orderConfirmationTitle);
  }

  /**
   * Verify order confirmation
   * @param {string} expectedMessage - Expected confirmation message
   * @returns {Promise<boolean>} - True if order confirmed
   */
  async verifyOrderConfirmation(expectedMessage = 'Thankyou for the order.') {
    const message = await this.getConfirmationMessage();
    return message === expectedMessage;
  }
}

module.exports = CheckoutPage;
