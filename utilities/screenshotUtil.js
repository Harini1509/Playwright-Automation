/**
 * Utility for taking screenshots and storing test artifacts
 */
const fs = require('fs');
const path = require('path');

class ScreenshotUtil {
  /**
   * Take screenshot with a descriptive name
   * @param {Page} page - Playwright page object
   * @param {string} name - Screenshot name
   * @returns {string} - Path to screenshot file
   */
  static async takeScreenshot(page, name) {
    const screenshotDir = path.join(__dirname, '../../test-results/screenshots');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotPath = path.join(screenshotDir, `${name}-${timestamp}.png`);
    
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`📸 Screenshot saved: ${screenshotPath}`);
    
    return screenshotPath;
  }

  /**
   * Take screenshot only on failure
   * @param {Page} page - Playwright page object
   * @param {string} testName - Name of the test
   * @param {boolean} failed - Whether test failed
   * @returns {Promise<void>}
   */
  static async takeFailureScreenshot(page, testName, failed) {
    if (failed && page) {
      await this.takeScreenshot(page, `${testName}-FAILED`);
    }
  }
}

module.exports = ScreenshotUtil;
