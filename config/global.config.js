/**
 * Global Configuration File
 *
 * This configuration file loads environment variables from a `.env` file
 * and exports them for use across your Playwright tests. This file contains:
 * - The base URL for the W3Schools website.
 * - Credentials for login (email and password), which are retrieved from environment variables.
 * - Hardcoded first and last name values used in the test scripts.
 * - Delay settings to control test execution pacing.
 *
 * Environment variables such as `EMAIL` and `PASSWORD` should be set in the `.env` file to avoid hardcoding sensitive information.
 * This approach ensures that the test suite can be executed in different environments with different configurations.
 */

// Load environment variables from the .env file
require('dotenv').config();

module.exports = {
  baseURL: 'https://www.w3schools.com/',
  email: process.env.EMAIL,
  password:process.env.PASSWORD,
  fname:'Play',
  lname:'right',
  delay10: 10000,
  delay20: 20000
};
