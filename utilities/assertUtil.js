/**
 * Assertion utilities for testing
 */
const { expect } = require('@playwright/test');

class AssertUtil {
  /**
   * Assert element is visible
   * @param {Page} page - Playwright page object
   * @param {string} selector - CSS selector
   */
  static async assertElementVisible(page, selector) {
    console.log(`🔍 Asserting element is visible: ${selector}`);
    const element = page.locator(selector);
    await expect(element).toBeVisible();
    console.log(`✅ Element is visible: ${selector}`);
  }

  /**
   * Assert element is hidden
   * @param {Page} page - Playwright page object
   * @param {string} selector - CSS selector
   */
  static async assertElementHidden(page, selector) {
    console.log(`🔍 Asserting element is hidden: ${selector}`);
    const element = page.locator(selector);
    await expect(element).toBeHidden();
    console.log(`✅ Element is hidden: ${selector}`);
  }

  /**
   * Assert element contains text
   * @param {Page} page - Playwright page object
   * @param {string} selector - CSS selector
   * @param {string} text - Expected text
   */
  static async assertElementContainsText(page, selector, text) {
    console.log(`🔍 Asserting element contains text: "${text}"`);
    const element = page.locator(selector);
    await expect(element).toContainText(text);
    console.log(`✅ Element contains text: "${text}"`);
  }

  /**
   * Assert element has attribute
   * @param {Page} page - Playwright page object
   * @param {string} selector - CSS selector
   * @param {string} attribute - Attribute name
   * @param {string} value - Expected value
   */
  static async assertElementHasAttribute(page, selector, attribute, value) {
    console.log(`🔍 Asserting element has attribute ${attribute}="${value}"`);
    const element = page.locator(selector);
    await expect(element).toHaveAttribute(attribute, value);
    console.log(`✅ Element has attribute ${attribute}="${value}"`);
  }

  /**
   * Assert element count
   * @param {Page} page - Playwright page object
   * @param {string} selector - CSS selector
   * @param {number} count - Expected count
   */
  static async assertElementCount(page, selector, count) {
    console.log(`🔍 Asserting element count: ${count}`);
    const elements = page.locator(selector);
    await expect(elements).toHaveCount(count);
    console.log(`✅ Element count is ${count}`);
  }

  /**
   * Assert URL
   * @param {Page} page - Playwright page object
   * @param {string|RegExp} url - Expected URL or regex
   */
  static async assertURL(page, url) {
    console.log(`🔍 Asserting URL: ${url}`);
    await expect(page).toHaveURL(url);
    console.log(`✅ URL is correct: ${url}`);
  }

  /**
   * Assert title
   * @param {Page} page - Playwright page object
   * @param {string|RegExp} title - Expected title
   */
  static async assertTitle(page, title) {
    console.log(`🔍 Asserting page title: "${title}"`);
    await expect(page).toHaveTitle(title);
    console.log(`✅ Page title is: "${title}"`);
  }
}

module.exports = AssertUtil;
