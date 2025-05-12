# CoverGo Automation QA Assessment

This project is an automated test suite using [Playwright](https://playwright.dev/) with **JavaScript**. It tests various functionalities of the [W3Schools](https://www.w3schools.com/) website to showcase UI test automation practices.

---

## 📦 Project Structure

Covergo/
├── config/ # Global configuration files

├── fixtures/ # Custom Playwright test fixtures

├── pages/ # Page Object Models (POM)

├── tests/ # Main test directory

│ ├── locators/ # Central element locators

│ ├── specs/ # Test files (10 test cases)

├── utils/ # Utilities/helpers

├── playwright-report/ # HTML reports generated

├── test-results/ # Test output

├── .env # Environment variables

├── playwright.config.js # Playwright global config

├── package.json # NPM dependencies

└── README.md # This documentation



## 🛠️ Installation & Setup

1. **Clone the Repository**

```bash
https://github.com/grootste/playwright-framework.git

cd playwright-framework

```

## 🚀 Getting Started

### 1. 📥 Install Node.js

Make sure Node.js (v16 or higher) is installed:

https://nodejs.org/

### 2. 📦 Install Dependencies

```bash
npm install
npx playwright install
```

## 3. 🧪 Run All Tests

```bash
npx playwright test
```

## Run Test Suites

###  Sequential
```bash
npm run test:sequential
```

### Parallel
```bash
npm run test:parallel
```

### 🔍 Run a Specific Test

```bash
npx playwright test tests/specs/10_testcase.spec.js
```

### 📊 Generate HTML Report

```bash
npx playwright show-report
```

### ✅ Features Tested




### ✍️ Author
Baibhav

Automation QA Engineer

GitHub: grootste

Email: singh.baibhav@321@gamil.com