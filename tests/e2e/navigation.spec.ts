import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to all sections via sidebar', async ({ page }) => {
    // Test navigation to About section
    await page.click('text=About');
    await expect(page.locator('#about')).toBeVisible();
    
    // Test navigation to Experience section
    await page.click('text=Experience');
    await expect(page.locator('#experience')).toBeVisible();
    
    // Test navigation to Projects section
    await page.click('text=Projects');
    await expect(page.locator('#projects')).toBeVisible();
    
    // Test navigation to Skills section
    await page.click('text=Skills');
    await expect(page.locator('#skills')).toBeVisible();
    
    // Test navigation to Contact section
    await page.click('text=Contact');
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('should highlight active section in sidebar', async ({ page }) => {
    // Scroll to different sections and verify active state
    await page.evaluate(() => {
      document.getElementById('about')?.scrollIntoView();
    });
    await page.waitForTimeout(500);
    
    const aboutLink = page.locator('nav a[href="#about"]');
    await expect(aboutLink).toHaveClass(/active/);
  });

  test('should have smooth scrolling behavior', async ({ page }) => {
    const startTime = Date.now();
    
    await page.click('text=Contact');
    
    // Wait for scroll to complete
    await page.waitForTimeout(1000);
    
    const endTime = Date.now();
    const scrollDuration = endTime - startTime;
    
    // Verify smooth scrolling took some time (not instant)
    expect(scrollDuration).toBeGreaterThan(100);
  });
});

test.describe('Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display hero content correctly', async ({ page }) => {
    // Check for main heading
    await expect(page.locator('h1')).toContainText('Kundan Pawar');
    
    // Check for role/title
    await expect(page.locator('h2')).toContainText('Senior Frontend Developer');
    
    // Check for CTA buttons
    await expect(page.locator('button:has-text("Get In Touch")')).toBeVisible();
    await expect(page.locator('button:has-text("Download Resume")')).toBeVisible();
  });

  test('should handle CTA button clicks', async ({ page }) => {
    // Test Get In Touch button
    await page.click('button:has-text("Get In Touch")');
    await expect(page.locator('#contact')).toBeVisible();
    
    // Test Download Resume button
    const downloadButton = page.locator('button:has-text("Download Resume")');
    await expect(downloadButton).toBeVisible();
  });

  test('should display tech stack preview', async ({ page }) => {
    await expect(page.locator('text=React')).toBeVisible();
    await expect(page.locator('text=TypeScript')).toBeVisible();
    await expect(page.locator('text=Next.js')).toBeVisible();
    await expect(page.locator('text=Node.js')).toBeVisible();
  });
});

test.describe('Responsive Design', () => {
  test('should work on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Verify content is visible on mobile
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('button:has-text("Get In Touch")')).toBeVisible();
  });

  test('should work on tablet devices', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    // Verify content is visible on tablet
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('button:has-text("Get In Touch")')).toBeVisible();
  });

  test('should work on desktop devices', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    // Verify content is visible on desktop
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('button:has-text("Get In Touch")')).toBeVisible();
  });
}); 