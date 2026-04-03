class OrderPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // Login
    this.emailInput = page.locator("input[id='userEmail']");
    this.passwordInput = page.locator("#userPassword");
    this.loginButton = page.locator("#login");

    // Product list
    this.productCards = page.locator(".card-body");
    this.cartButton = page.locator("button[routerlink*='/dashboard/cart']");
    this.cartProductHeader = page.locator(".cartSection h3");

    // Checkout
    this.checkoutButton = page.locator("//button[contains(text(),'Checkout')]");
    this.countryInput = page.locator("input[placeholder*='Select Country']");
    this.countryResults = page.locator("button[class*='ta-item list']");
    this.placeOrderLink = page.locator("//a[normalize-space()='Place Order']");

    // Confirmation
    this.confirmationHeader = page.locator("h1");
    this.pageBody = page.locator('body');
  }

  async goto() {
    await this.page.goto('https://rahulshettyacademy.com/client');
    await this.page.waitForLoadState('networkidle');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.page.waitForTimeout(200);
    await this.loginButton.waitFor({ state: 'visible' });
    await this.loginButton.click({ force: true });
    await this.page.waitForLoadState('networkidle');
  }

  async addProductToCartByName(productName) {
    const products = this.productCards;
    for (let i = 0; i < await products.count(); i++) {
      const name = await products.nth(i).locator("b").textContent();
      if (name && name.trim() === productName) {
        await products.nth(i).locator("text= Add To Cart").click();
        return true;
      }
    }
    return false;
  }

  async openCart() {
    await this.cartButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyCartProduct(productName) {
    await this.cartProductHeader.waitFor({ state: 'visible' });
    return (await this.cartProductHeader.textContent())?.trim() === productName;
  }

  async checkout(countryName = 'India') {
    await this.checkoutButton.click();
    // fill will clear existing content; small timeout to allow UI
    await this.countryInput.fill(countryName, { timeout: 5000 }).catch(() => {});
    await this.page.waitForSelector("//section[contains(@class,'ta-results')]");
    const list = this.countryResults;
    for (let i = 0; i < await list.count(); i++) {
      const text = (await list.nth(i).textContent()) || '';
      if (text.trim() === ` ${countryName}` || text.trim() === countryName) {
        await list.nth(i).click();
        break;
      }
    }
    await this.placeOrderLink.click();
  }

  async waitForConfirmation() {
    await this.confirmationHeader.waitFor({ state: 'visible' });
    const message = (await this.confirmationHeader.textContent())?.trim();
    const bodyText = await this.pageBody.innerText();
    const orderMatch = bodyText.match(/Order(?:\sID)?[:#]?\s*#?\s*([A-Za-z0-9-]+)/i);
    const orderId = orderMatch ? orderMatch[1] : null;
    return { message, orderId, bodyText };
  }
}

module.exports = { OrderPage };
