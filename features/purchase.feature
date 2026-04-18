Feature: E-Commerce Purchase Flow
  As a user
  I want to be able to purchase products
  So that I can complete my shopping experience

  Background:
    Given the user is on the login page
    When the user logs in with valid user credentials
    Then the user should be logged in successfully

  Scenario: Complete purchase flow - Login, add product, checkout, place order
    When the user adds the product to cart
    Then the product should be added successfully
    When the user navigates to cart
    Then the product should be in the cart
    When the user proceeds to checkout
    Then the checkout page should be displayed
    When the user selects the checkout country
    Then the country should be selected
    When the user places the order
    Then the order confirmation message should be displayed

  Scenario: Verify products are displayed after login
    When the user fetches all products on the current page
    Then at least one product should be displayed
    And the product names should be visible

  Scenario: Add multiple products to cart
    When the user adds the following products to cart from test data:
      | product_list |
    Then all products should be added successfully
