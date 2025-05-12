# CoverGo Automation QA Assessment

This project is an automated test suite using [Playwright](https://playwright.dev/) with **JavaScript**. It tests various functionalities of the [W3Schools](https://www.w3schools.com/) website to showcase UI test automation practices.

---

## 📦 Project Structure

CoverGo/
├── tests/ # Test cases
├── fixtures/ # Playwright test fixtures
├── pages/ # Page objects (POM structure)
├── utils/ # Utility functions (helpers, constants)
├── locators/ # Centralized element locators
├── test-listeners/ # Listeners (e.g., hooks, navigation helpers)
├── playwright.config.ts # Playwright configuration
├── README.md # Project documentation
└── package.json # NPM dependencies


## 🛠️ Installation & Setup

1. **Clone the Repository**

```bash
https://github.com/grootste/playwright-framework.git

cd playwright-framework



## Setup Instructions

```bash
npm install
npx playwright install
```

## Run Tests

```bash
npx playwright test
```

## Run Test Suites

### Sequential
```bash
npm run test:sequential
```

### Parallel
```bash
npm run test:parallel
```

### Run a Specific Test

```bash
npx playwright test tests/specs/10_testcase.spec.js
```

### Generate HTML Report

```bash
npx playwright show-report
```