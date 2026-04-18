/**
 * Index file for exporting all page objects
 * Makes importing easier in test files
 */

const BasePage = require('./BasePage');
const LoginPage = require('./LoginPage/LoginPage');
const ProductsPage = require('./ProductsPage/ProductsPage');
const CartPage = require('./CartPage/CartPage');
const CheckoutPage = require('./CheckoutPage/CheckoutPage');

module.exports = {
  BasePage,
  LoginPage,
  ProductsPage,
  CartPage,
  CheckoutPage,
};
