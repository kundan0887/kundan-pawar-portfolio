import { test, expect } from '@playwright/test';

test.describe('Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for animations to complete
    await page.waitForTimeout(2000);
  });

  test('should match homepage screenshot', async ({ page }) => {
    // Take screenshot of the entire page
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('should match hero section screenshot', async ({ page }) => {
    // Take screenshot of hero section
    const heroSection = page.locator('#home');
    await expect(heroSection).toHaveScreenshot('hero-section.png', {
      animations: 'disabled',
    });
  });

  test('should match about section screenshot', async ({ page }) => {
    // Navigate to about section
    await page.click('text=About');
    await page.waitForTimeout(500);

    const aboutSection = page.locator('#about');
    await expect(aboutSection).toHaveScreenshot('about-section.png', {
      animations: 'disabled',
    });
  });

  test('should match experience section screenshot', async ({ page }) => {
    // Navigate to experience section

    await page.click('text=Experience');
    await page.waitForTimeout(500);

    const experienceSection = page.locator('#experience');
    await expect(experienceSection).toHaveScreenshot('experience-section.png', {
      animations: 'disabled',
    });
  });

  test('should match projects section screenshot', async ({ page }) => {
    // Navigate to projects section
    await page.click('text=Projects');
    await page.waitForTimeout(500);

    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toHaveScreenshot('projects-section.png', {
      animations: 'disabled',
    });
  });

  test('should match skills section screenshot', async ({ page }) => {
    // Navigate to skills section
    await page.click('text=Skills');
    await page.waitForTimeout(500);

    const skillsSection = page.locator('#skills');
    await expect(skillsSection).toHaveScreenshot('skills-section.png', {
      animations: 'disabled',
    });
  });

  test('should match contact section screenshot', async ({ page }) => {
    // Navigate to contact section
    await page.click('text=Contact');
    await page.waitForTimeout(500);

    const contactSection = page.locator('#contact');
    await expect(contactSection).toHaveScreenshot('contact-section.png', {
      animations: 'disabled',
    });
  });

  test('should match sidebar navigation screenshot', async ({ page }) => {
    const sidebar = page.locator('nav');
    await expect(sidebar).toHaveScreenshot('sidebar-navigation.png', {
      animations: 'disabled',
    });
  });

  test('should match mobile layout screenshot', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('mobile-layout.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('should match tablet layout screenshot', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('tablet-layout.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('should match desktop layout screenshot', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('desktop-layout.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('should match button hover states', async ({ page }) => {
    // Hover over primary CTA button
    const primaryButton = page.locator('button:has-text("Get In Touch")');
    await primaryButton.hover();
    await page.waitForTimeout(500);

    await expect(primaryButton).toHaveScreenshot('primary-button-hover.png', {
      animations: 'disabled',
    });
  });

  test('should match navigation hover states', async ({ page }) => {
    // Hover over navigation links
    const aboutLink = page.locator('nav a[href="#about"]');
    await aboutLink.hover();
    await page.waitForTimeout(500);

    await expect(aboutLink).toHaveScreenshot('nav-link-hover.png', {
      animations: 'disabled',
    });
  });

  test('should match form elements screenshot', async ({ page }) => {
    // Navigate to contact section
    await page.click('text=Contact');
    await page.waitForTimeout(500);

    const contactForm = page.locator('#contact form');
    await expect(contactForm).toHaveScreenshot('contact-form.png', {
      animations: 'disabled',
    });
  });

  test('should match loading states', async ({ page }) => {
    // Trigger loading state (if any)
    await page.reload();
    await page.waitForTimeout(100);

    await expect(page).toHaveScreenshot('loading-state.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });
});
