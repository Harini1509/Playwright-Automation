/**
 * CartPage - Page object for shopping cart functionality
 */

const BasePage = require('../BasePage');

class CartPage extends BasePage {
  // Locators
  get cartProductName() {
    return ".cartSection h3";
  }

  get checkoutButton() {
    return "//button[contains(text(),'Checkout')]";
  }

  /**
   * Get product name in cart
   * @returns {Promise<string>} - Product name in cart
   */
  async getProductInCart() {
    return await this.getText(this.cartProductName);
  }

  /**
   * Verify product is in cart
   * @param {string} productName - Product name to verify
   * @returns {Promise<boolean>} - True if product is in cart
   */
  async verifyProductInCart(productName) {
    const cartProduct = await this.getProductInCart();
    return cartProduct === productName;
  }

  /**
   * Proceed to checkout
   */
  async proceedToCheckout() {
    await this.clickElement(this.checkoutButton);
    await this.waitForPageLoad('networkidle');
  }
}

module.exports = CartPage;
