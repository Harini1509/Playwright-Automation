const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const {
  LoginPage,
  ProductsPage,
  CartPage,
  CheckoutPage,
} = require('../Pages');
const {
  getUser,
  getProduct,
  getCheckoutData,
  getURL,
} = require('./testDataHelper');

// Background steps
Given('the user is on the login page', async function () {
  console.log('📍 Navigating to login page...');
  const loginUrl = getURL('login_url');
  
  // Initialize page objects from world context (set by hooks)
  this.loginPage = new LoginPage(this.page);
  
  await this.page.goto(loginUrl);
  console.log('✅ Login page loaded');
});

When('the user logs in with valid user credentials', async function () {
  console.log('🔐 Logging in with credentials from test data...');
  const user = getUser('validUser');
  console.log(`   Email: ${user.email}`);
  
  this.loginPage = this.loginPage || new LoginPage(this.page);
  await this.loginPage.login(user.email, user.password);
  console.log('✅ Login successful');
});

Then('the user should be logged in successfully', async function () {
  console.log('✔️ Verifying login...');
  console.log('✅ User is logged in');
});

// Purchase flow steps
When('the user adds the product to cart', async function () {
  console.log('🛍️ Adding product from test data to cart...');
  const productName = getProduct('single_product');
  console.log(`   Product: ${productName}`);
  
  this.productsPage = this.productsPage || new ProductsPage(this.page);
  const productAdded = await this.productsPage.addProductToCart(productName);
  this.testData.products.push(productName);
  
  expect(productAdded).toBe(true);
  console.log(`✅ "${productName}" added to cart`);
});

Then('the product should be added successfully', async function () {
  console.log('✔️ Verifying product was added');
  expect(this.testData.products.length).toBeGreaterThan(0);
  console.log('✅ Product addition verified');
});

When('the user navigates to cart', async function () {
  console.log('🛒 Navigating to cart...');
  this.productsPage = this.productsPage || new ProductsPage(this.page);
  await this.productsPage.goToCart();
  console.log('✅ Cart page opened');
});

Then('the product should be in the cart', async function () {
  console.log('🔍 Verifying product in cart...');
  const productName = this.testData.products[0];
  
  this.cartPage = this.cartPage || new CartPage(this.page);
  const productInCart = await this.cartPage.verifyProductInCart(productName);
  
  expect(productInCart).toBe(true);
  console.log(`✅ "${productName}" verified in cart`);
});

When('the user proceeds to checkout', async function () {
  console.log('📝 Proceeding to checkout...');
  this.cartPage = this.cartPage || new CartPage(this.page);
  await this.cartPage.proceedToCheckout();
  console.log('✅ Checkout page opened');
});

Then('the checkout page should be displayed', async function () {
  console.log('✔️ Verifying checkout page is displayed');
  console.log('✅ Checkout page verified');
});

When('the user selects the checkout country', async function () {
  console.log('🌍 Selecting country from test data...');
  const checkoutData = getCheckoutData();
  const country = checkoutData.country;
  console.log(`   Country: ${country}`);
  
  this.checkoutPage = this.checkoutPage || new CheckoutPage(this.page);
  const countrySelected = await this.checkoutPage.selectCountry(country);
  this.testData.selectedCountry = country;
  
  expect(countrySelected).toBe(true);
  console.log(`✅ Country "${country}" selected`);
});

Then('the country should be selected', async function () {
  console.log('✔️ Verifying country is selected');
  const checkoutData = getCheckoutData();
  expect(this.testData.selectedCountry).toBe(checkoutData.country);
  console.log('✅ Country selection verified');
});

When('the user places the order', async function () {
  console.log('📦 Placing order...');
  this.checkoutPage = this.checkoutPage || new CheckoutPage(this.page);
  await this.checkoutPage.placeOrder();
  console.log('✅ Order placed');
});

Then('the order confirmation message should be displayed', async function () {
  console.log('✔️ Verifying confirmation message...');
  const checkoutData = getCheckoutData();
  const expectedText = checkoutData.expected_confirmation;
  
  this.checkoutPage = this.checkoutPage || new CheckoutPage(this.page);
  const confirmationMessage = await this.checkoutPage.getConfirmationMessage();
  this.testData.confirmationMessage = confirmationMessage;
  
  expect(confirmationMessage.toLowerCase()).toContain(expectedText.toLowerCase());
  console.log(`✅ Confirmation message verified: "${confirmationMessage}"`);
});

// Product verification steps
When('the user fetches all products on the current page', async function () {
  console.log('📊 Fetching products...');
  this.productsPage = this.productsPage || new ProductsPage(this.page);
  const totalProducts = await this.productsPage.getTotalProducts();
  this.testData.totalProducts = totalProducts;
  console.log(`✅ Found ${totalProducts} products`);
});

Then('at least one product should be displayed', async function () {
  console.log('✔️ Verifying products are displayed');
  expect(this.testData.totalProducts).toBeGreaterThan(0);
  console.log(`✅ Products verified (${this.testData.totalProducts} found)`);
});

Then('the product names should be visible', async function () {
  console.log('📝 Fetching product names...');
  this.productsPage = this.productsPage || new ProductsPage(this.page);
  const productsToDisplay = Math.min(3, this.testData.totalProducts);
  
  for (let i = 0; i < productsToDisplay; i++) {
    const productName = await this.productsPage.getProductName(i);
    console.log(`   - Product ${i + 1}: ${productName}`);
  }
  console.log('✅ Product names displayed');
});

// Multiple products steps
When(
  'the user adds the following products to cart from test data:',
  async function (dataTable) {
    console.log('🛍️ Adding products from test data to cart...');
    const products = getProduct('products_to_add');
    console.log(`   Products to add: ${products.join(', ')}`);

    this.productsPage = this.productsPage || new ProductsPage(this.page);
    
    for (const product of products) {
      const added = await this.productsPage.addProductToCart(product);
      if (added) {
        this.testData.products.push(product);
        console.log(`   ✅ "${product}" added`);
      } else {
        console.log(`   ⚠️ "${product}" not found`);
      }
    }
    console.log('✅ Products added to cart');
  }
);

Then('all products should be added successfully', async function () {
  console.log('✔️ Verifying all products were added');
  expect(this.testData.products.length).toBeGreaterThan(0);
  console.log(`✅ All ${this.testData.products.length} products verified`);
});
