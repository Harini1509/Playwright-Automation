/**
 * BasePage - Base class for all page objects
 * Contains common methods and properties used across all pages
 */

class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * @param {string} url - The URL to navigate to
   */
  async goto(url) {
    await this.page.goto(url);
  }

  /**
   * Wait for page to load
   * @param {string} state - Load state (load, domcontentloaded, networkidle)
   */
  async waitForPageLoad(state = 'networkidle') {
    await this.page.waitForLoadState(state);
  }

  /**
   * Fill an input field
   * @param {string} selector - The element selector
   * @param {string} text - The text to fill
   */
  async fillInput(selector, text) {
    await this.page.locator(selector).fill(text);
  }

  /**
   * Click on an element
   * @param {string} selector - The element selector
   * @param {object} options - Click options
   */
  async clickElement(selector, options = {}) {
    await this.page.locator(selector).click(options);
  }

  /**
   * Get text content of an element
   * @param {string} selector - The element selector
   * @returns {Promise<string>} - The text content
   */
  async getText(selector) {
    return await this.page.locator(selector).textContent();
  }

  /**
   * Wait for selector to be visible
   * @param {string} selector - The element selector
   * @param {number} timeout - Timeout in milliseconds
   */
  async waitForElement(selector, timeout = 5000) {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
  }

  /**
   * Scroll element into view if needed
   * @param {string} selector - The element selector
   */
  async scrollIntoView(selector) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  /**
   * Wait for timeout
   * @param {number} ms - Milliseconds to wait
   */
  async wait(ms) {
    await this.page.waitForTimeout(ms);
  }

  /**
   * Press keys sequentially
   * @param {string} selector - The element selector
   * @param {string} text - Text to press sequentially
   * @param {number} delay - Delay between key presses
   */
  async pressSequentially(selector, text, delay = 100) {
    await this.page.locator(selector).pressSequentially(text, { delay });
  }

  /**
   * Get count of elements matching selector
   * @param {string} selector - The element selector
   * @returns {Promise<number>} - Count of elements
   */
  async getElementCount(selector) {
    return await this.page.locator(selector).count();
  }

  /**
   * Get nth element locator
   * @param {string} selector - The element selector
   * @param {number} index - Index of the element
   * @returns {Locator} - The locator object
   */
  getNthElement(selector, index) {
    return this.page.locator(selector).nth(index);
  }

  /**
   * Get text of nth element
   * @param {string} selector - The element selector
   * @param {number} index - Index of the element
   * @returns {Promise<string>} - The text content
   */
  async getNthElementText(selector, index) {
    return await this.getNthElement(selector, index).textContent();
  }
}

module.exports = BasePage;
