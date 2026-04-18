/**
 * Wait utilities for Playwright operations
 */

class WaitUtil {
  /**
   * Wait for an element to be visible
   * @param {Page} page - Playwright page object
   * @param {string} selector - CSS selector
   * @param {number} timeout - Timeout in ms (default: 10000)
   */
  static async waitForElementVisible(page, selector, timeout = 10000) {
    console.log(`⏳ Waiting for element visible: ${selector}`);
    await page.waitForSelector(selector, { state: 'visible', timeout });
    console.log(`✅ Element visible: ${selector}`);
  }

  /**
   * Wait for an element to be hidden
   * @param {Page} page - Playwright page object
   * @param {string} selector - CSS selector
   * @param {number} timeout - Timeout in ms (default: 10000)
   */
  static async waitForElementHidden(page, selector, timeout = 10000) {
    console.log(`⏳ Waiting for element hidden: ${selector}`);
    await page.waitForSelector(selector, { state: 'hidden', timeout });
    console.log(`✅ Element hidden: ${selector}`);
  }

  /**
   * Wait for page to load
   * @param {Page} page - Playwright page object
   * @param {string} waitUntil - 'load' | 'domcontentloaded' | 'networkidle' (default: 'networkidle')
   */
  static async waitForPageLoad(page, waitUntil = 'networkidle') {
    console.log(`⏳ Waiting for page to load (${waitUntil})`);
    await page.waitForLoadState(waitUntil);
    console.log(`✅ Page loaded (${waitUntil})`);
  }

  /**
   * Wait for specific timeout
   * @param {number} ms - Milliseconds to wait
   */
  static async waitForTimeout(ms) {
    console.log(`⏳ Waiting for ${ms}ms`);
    await new Promise((resolve) => setTimeout(resolve, ms));
    console.log(`✅ Wait complete`);
  }

  /**
   * Wait for element count
   * @param {Page} page - Playwright page object
   * @param {string} selector - CSS selector
   * @param {number} expectedCount - Expected element count
   * @param {number} timeout - Timeout in ms (default: 10000)
   */
  static async waitForElementCount(page, selector, expectedCount, timeout = 10000) {
    console.log(`⏳ Waiting for ${expectedCount} elements: ${selector}`);
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      const count = await page.locator(selector).count();
      if (count === expectedCount) {
        console.log(`✅ Found ${count} elements matching ${selector}`);
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    
    throw new Error(`Timeout waiting for ${expectedCount} elements matching ${selector}`);
  }
}

module.exports = WaitUtil;
