import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  // Clean up any global resources
  // This is where you would clean up MSW, database connections, etc.
  console.log('Global teardown completed');
}

export default globalTeardown; 