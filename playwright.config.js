
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/specs',
  fullyParallel: true,
  timeout: 30000,
  retries: 1,
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'off',
    storageState: undefined,
    launchOptions: {
      args: ['--incognito']      
    },
    viewport: { 
      width: 1920, 
      height: 1080 
    },
    // Force new context per test
    bypassCSP: true
     
  }
});
