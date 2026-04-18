# Page Object Model (POM) Structure

This document explains the Page Object Model structure created for your Playwright automation project.

## Overview

The Page Object Model is a design pattern that creates an abstraction layer for page elements and interactions. This makes tests more maintainable, readable, and reduces code duplication.

## Folder Structure

```
Pages/
├── BasePage.js              # Base class with common methods
├── LoginPage/
│   └── LoginPage.js         # Login page object
├── ProductsPage/
│   └── ProductsPage.js      # Products/Dashboard page object
├── CartPage/
│   └── CartPage.js          # Shopping cart page object
├── CheckoutPage/
│   └── CheckoutPage.js      # Checkout and order placement page object
└── index.js                 # Export all page objects
```

## Components

### 1. **BasePage.js**
The base class that all page objects inherit from. Contains common utility methods:

- `goto(url)` - Navigate to a URL
- `waitForPageLoad(state)` - Wait for page to load
- `fillInput(selector, text)` - Fill input fields
- `clickElement(selector, options)` - Click elements
- `getText(selector)` - Get element text
- `waitForElement(selector, timeout)` - Wait for element visibility
- `scrollIntoView(selector)` - Scroll element into view
- `getElementCount(selector)` - Count elements
- And more utility methods...

### 2. **LoginPage.js** (`Pages/LoginPage/`)
Manages login functionality:

**Locators:**
- `emailInput` - Email field
- `passwordInput` - Password field
- `loginButton` - Login button

**Methods:**
- `goto()` - Navigate to login page
- `login(email, password)` - Complete login process
- `fillEmail(email)` - Fill email field
- `fillPassword(password)` - Fill password field
- `clickLogin()` - Click login button

### 3. **ProductsPage.js** (`Pages/ProductsPage/`)
Manages product browsing and cart addition:

**Locators:**
- `productCards` - Product card elements
- `productName` - Product name selector
- `addToCartButton` - Add to cart button
- `cartButton` - Navigate to cart button

**Methods:**
- `getTotalProducts()` - Get count of products
- `getProductName(index)` - Get name of product at index
- `addProductToCart(productName)` - Add specific product to cart
- `goToCart()` - Navigate to shopping cart

### 4. **CartPage.js** (`Pages/CartPage/`)
Manages shopping cart interactions:

**Locators:**
- `cartProductName` - Product name in cart
- `checkoutButton` - Checkout button

**Methods:**
- `getProductInCart()` - Get product name from cart
- `verifyProductInCart(productName)` - Verify product exists in cart
- `proceedToCheckout()` - Move to checkout page

### 5. **CheckoutPage.js** (`Pages/CheckoutPage/`)
Manages checkout and order placement:

**Locators:**
- `countryInput` - Country search input
- `countryDropdown` - Country options dropdown
- `countryOptions` - Individual country options
- `placeOrderButton` - Place order button
- `orderConfirmationTitle` - Order confirmation message

**Methods:**
- `searchCountry(country)` - Search for country
- `selectCountry(country)` - Select country from options
- `placeOrder()` - Place the order
- `getConfirmationMessage()` - Get order confirmation text
- `verifyOrderConfirmation(expectedMessage)` - Verify order confirmation

## Usage Example

See [endtoendautomation-pom.spec.js](../tests/endtoendautomation-pom.spec.js) for a complete example.

### Basic Usage:

```javascript
const { LoginPage, ProductsPage, CartPage, CheckoutPage } = require('../Pages');

test('My Test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  // Initialize page objects
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  // Use page objects
  await loginPage.goto();
  await loginPage.login('user@example.com', 'password');
  await productsPage.addProductToCart('ADIDAS ORIGINAL');
  
  await context.close();
});
```

## Benefits of POM

1. **Maintainability** - Locators are centralized in page classes
2. **Reusability** - Methods can be reused across multiple tests
3. **Readability** - Tests read like business logic, not technical implementation
4. **Reduced Maintenance** - UI changes only require updates in page objects
5. **Better Organization** - Logical separation of concerns
6. **Scalability** - Easy to add new pages and methods

## Adding New Page Objects

To create a new page object:

1. Create a new folder in `Pages/` with the page name
2. Create a new file inside that folder (e.g., `NewPage/NewPage.js`)
3. Extend `BasePage` class
4. Define locators as getters
5. Add methods for page interactions
6. Export the class in `Pages/index.js`

Example:

```javascript
const BasePage = require('../BasePage');

class MyNewPage extends BasePage {
  get someElement() {
    return "#selector";
  }

  async doSomething() {
    await this.clickElement(this.someElement);
  }
}

module.exports = MyNewPage;
```

## Best Practices

1. **Descriptive Method Names** - Use clear, business-oriented method names
2. **Single Responsibility** - Each method should do one thing
3. **DRY Principle** - Reuse common functionality via BasePage
4. **Encapsulation** - Keep locators and methods private were appropriate
5. **Return Values** - Return meaningful values (booleans, text) to support assertions
6. **Error Handling** - Add appropriate waits and error messages
7. **Documentation** - Use JSDoc comments for all methods

## Refactoring Existing Tests

You can refactor your existing `endtoendautomation.spec.js` to use the new POM. Compare it with the POM example to see how much cleaner the code becomes.

---

**Created:** 2026
**Project:** Playwright Automation
