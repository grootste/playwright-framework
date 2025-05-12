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
