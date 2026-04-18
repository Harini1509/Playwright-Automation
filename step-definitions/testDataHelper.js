const fs = require('fs');
const path = require('path');

/**
 * Load test data from JSON file
 * @returns {Object} Test data object
 */
function loadTestData() {
  const dataPath = path.join(__dirname, '../test-data/test-data.json');
  const data = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(data);
}

/**
 * Get user credentials
 * @param {string} userType - Type of user (e.g., 'validUser', 'invalidUser')
 * @returns {Object} User object with email and password
 */
function getUser(userType = 'validUser') {
  const data = loadTestData();
  return data.users[userType];
}

/**
 * Get product names
 * @param {string} productType - Type of product query
 * @returns {string|Array} Product name or array of products
 */
function getProduct(productType = 'single_product') {
  const data = loadTestData();
  return data.products[productType];
}

/**
 * Get checkout data
 * @returns {Object} Checkout data (country, expected confirmation, etc.)
 */
function getCheckoutData() {
  const data = loadTestData();
  return data.checkout;
}

/**
 * Get URL
 * @param {string} urlType - Type of URL (e.g., 'login_url')
 * @returns {string} URL string
 */
function getURL(urlType = 'login_url') {
  const data = loadTestData();
  return data.urls[urlType];
}

module.exports = {
  loadTestData,
  getUser,
  getProduct,
  getCheckoutData,
  getURL,
};
