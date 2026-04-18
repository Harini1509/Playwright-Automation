const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Set timeout to 60 seconds
setDefaultTimeout(60 * 1000);

/**
 * Before Hook - Runs before each scenario
 * - Launch browser
 * - Create context and page
 * - Initialize test data
 */
Before(async function () {
  console.log('\n🚀 [HOOK] Starting test scenario...');
  
  try {
    // Launch browser
    this.browser = await chromium.launch({ 
      headless: false,
      slowMo: 500, // Slow down actions for visibility
    });
    console.log('✅ [HOOK] Browser launched');
    
    // Create context with specific options
    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 },
      ignoreHTTPSErrors: true,
    });
    console.log('✅ [HOOK] Context created');
    
    // Create page
    this.page = await this.context.newPage();
    console.log('✅ [HOOK] Page created');
    
    // Set timeout for page operations (increased for parallel execution)
    this.page.setDefaultTimeout(60000); // 60 seconds
    this.page.setDefaultNavigationTimeout(60000); // 60 seconds
    
    // Initialize test data object for storing test state
    this.testData = {
      products: [],
      selectedCountry: null,
      confirmationMessage: null,
      totalProducts: 0,
    };
    console.log('✅ [HOOK] Test data initialized');
    
    console.log('🎯 [HOOK] Test environment ready\n');
  } catch (error) {
    console.error('❌ [HOOK] Before hook failed:', error);
    throw error;
  }
});

/**
 * After Hook - Runs after each scenario
 * - Take screenshot on failure
 * - Close page
 * - Close context
 * - Close browser
 */
After(async function (scenario) {
  console.log('\n🛑 [HOOK] Ending test scenario...');

  try {
    // Take screenshot after every scenario and embed in HTML report
    if (this.page) {
      try {
        const screenshot = await this.page.screenshot({ fullPage: true });
        // Embed screenshot inline into the Cucumber HTML report
        this.attach(screenshot, 'image/png');

        // Also save to disk on failure for reference
        if (scenario.result.status === 'FAILED') {
          console.log('📸 [HOOK] Taking screenshot of failed scenario...');
          const screenshotDir = path.join(__dirname, '../../test-results/screenshots');
          if (!fs.existsSync(screenshotDir)) {
            fs.mkdirSync(screenshotDir, { recursive: true });
          }
          const screenshotPath = path.join(
            screenshotDir,
            `${scenario.pickle.name.replace(/\s+/g, '-')}-${Date.now()}.png`
          );
          await this.page.screenshot({ path: screenshotPath });
          console.log(`✅ [HOOK] Screenshot saved: ${screenshotPath}`);
        }
      } catch (error) {
        console.log(`⚠️ [HOOK] Screenshot failed: ${error.message}`);
      }
    }
    
    // Close page
    if (this.page) {
      await this.page.close();
      console.log('✅ [HOOK] Page closed');
    }
    
    // Close context
    if (this.context) {
      await this.context.close();
      console.log('✅ [HOOK] Context closed');
    }
    
    // Close browser
    if (this.browser) {
      await this.browser.close();
      console.log('✅ [HOOK] Browser closed');
    }
    
    console.log('🎯 [HOOK] Cleanup complete\n');
  } catch (error) {
    console.error('❌ [HOOK] After hook failed:', error);
    throw error;
  }
});
