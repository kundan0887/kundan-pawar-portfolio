import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should meet WCAG 2.1 AA standards', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper heading structure', async ({ page }) => {
    // Check for main heading (h1)
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    
    // Check for subheadings (h2)
    const h2s = page.locator('h2');
    const h2Count = await h2s.count();
    expect(h2Count).toBeGreaterThan(0);
    
    // Verify no heading levels are skipped
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    const headingLevels = await Promise.all(
      headings.map(async h => {
        const tagName = await h.evaluate(el => el.tagName);
        return parseInt(tagName.slice(1));
      })
    );
    
    // Check that heading levels are sequential
    for (let i = 1; i < headingLevels.length; i++) {
      expect(headingLevels[i] - headingLevels[i - 1]).toBeLessThanOrEqual(1);
    }
  });

  test('should have proper ARIA labels and roles', async ({ page }) => {
    // Check for navigation role
    const nav = page.locator('nav');
    await expect(nav).toHaveAttribute('role', 'navigation');
    
    // Check for main content area
    const main = page.locator('main');
    await expect(main).toHaveAttribute('role', 'main');
    
    // Check for proper button roles
    const buttons = page.locator('button');
    for (let i = 0; i < await buttons.count(); i++) {
      const button = buttons.nth(i);
      await expect(button).toHaveAttribute('type', 'button');
    }
  });

  test('should have proper color contrast', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['color-contrast'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should be keyboard navigable', async ({ page }) => {
    // Test tab navigation
    await page.keyboard.press('Tab');
    
    // Verify focus is visible
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Test tab through all interactive elements
    const interactiveElements = page.locator('a, button, input, textarea, select');
    const count = await interactiveElements.count();
    
    for (let i = 0; i < count; i++) {
      await page.keyboard.press('Tab');
      const focused = page.locator(':focus');
      await expect(focused).toBeVisible();
    }
  });

  test('should have proper alt text for images', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const image = images.nth(i);
      const alt = await image.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('should have proper form labels', async ({ page }) => {
    const inputs = page.locator('input, textarea, select');
    const count = await inputs.count();
    
    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const label = await input.getAttribute('aria-label');
      
      if (id) {
        const labelElement = page.locator(`label[for="${id}"]`);
        await expect(labelElement).toBeVisible();
      } else if (label) {
        // Input has aria-label
        expect(label).toBeTruthy();
      }
    }
  });

  test('should have skip links for keyboard users', async ({ page }) => {
    // Check for skip to main content link
    const skipLink = page.locator('a[href="#main"], a[href="#content"]');
    await expect(skipLink).toBeVisible();
    
    // Test skip link functionality
    await skipLink.focus();
    await page.keyboard.press('Enter');
    
    // Verify focus moved to main content
    const mainContent = page.locator('main');
    await expect(mainContent).toBeFocused();
  });

  test('should have proper focus management', async ({ page }) => {
    // Test that focus is trapped in modals (if any)
    const modals = page.locator('[role="dialog"], [role="modal"]');
    const modalCount = await modals.count();
    
    if (modalCount > 0) {
      for (let i = 0; i < modalCount; i++) {
        const modal = modals.nth(i);
        await modal.focus();
        
        // Verify focus stays within modal
        const focusedElement = page.locator(':focus');
        const modalHandle = await modal.elementHandle();
        if (modalHandle) {
          const isDescendant = await focusedElement.evaluate((el, modalEl) => {
            return modalEl.contains(el);
          }, modalHandle);
          expect(isDescendant).toBe(true);
        }
      }
    }
  });

  test('should announce dynamic content changes', async ({ page }) => {
    // Check for live regions
    const liveRegions = page.locator('[aria-live]');
    const count = await liveRegions.count();
    
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const region = liveRegions.nth(i);
        const live = await region.getAttribute('aria-live');
        expect(['polite', 'assertive']).toContain(live);
      }
    }
  });
}); 