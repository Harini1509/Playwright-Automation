/**
 * ProductsPage - Page object for products/dashboard functionality
 */

const BasePage = require('../BasePage');

class ProductsPage extends BasePage {
  // Locators
  get productCards() {
    return ".card";
  }

  get productName() {
    return "h5";
  }

  get addToCartButton() {
    return "button:has-text(\"Add To Cart\")";
  }

  get cartButton() {
    return "button[routerlink*='/dashboard/cart']";
  }

  /**
   * Get product at specific index
   * @param {number} index - Product index
   * @returns {Locator} - The product card locator
   */
  getProductAtIndex(index) {
    return this.getNthElement(this.productCards, index);
  }

  /**
   * Get total number of products
   * @returns {Promise<number>} - Number of products
   */
  async getTotalProducts() {
    return await this.getElementCount(this.productCards);
  }

  /**
   * Get product name at specific index
   * @param {number} index - Product index
   * @returns {Promise<string>} - Product name
   */
  async getProductName(index) {
    const product = this.getProductAtIndex(index);
    return await product.locator(this.productName).textContent();
  }

  /**
   * Add product to cart by name
   * @param {string} productName - Name of the product to add
   * @returns {Promise<boolean>} - True if product found and added, false otherwise
   */
  async addProductToCart(productName) {
    const products = this.page.locator(this.productCards);
    const count = await this.getElementCount(this.productCards);

    for (let i = 0; i < count; i++) {
      const name = await this.getProductName(i);
      if (name === productName) {
        console.log(`Product found: ${productName}`);
        await this.getProductAtIndex(i).locator(this.addToCartButton).click();
        return true;
      }
    }

    console.log(`Product not found: ${productName}`);
    return false;
  }

  /**
   * Navigate to cart
   */
  async goToCart() {
    await this.clickElement(this.cartButton);
    await this.waitForPageLoad('networkidle');
  }
}

module.exports = ProductsPage;
