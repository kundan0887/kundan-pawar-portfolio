import { chromium, FullConfig } from '@playwright/test';

// Extend Window interface for MSW
declare global {
  interface Window {
    __MSW_ENABLED__?: boolean;
  }
}

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set up MSW for API mocking
  await page.addInitScript(() => {
    // MSW setup will be handled in individual test files
    window.__MSW_ENABLED__ = true;
  });
  
  await browser.close();
}

export default globalSetup; 