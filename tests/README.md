# Testing Setup

This project includes a comprehensive testing setup with multiple testing frameworks and tools to ensure code quality, accessibility, and performance.

## Testing Stack

- **Jest** - Unit and integration testing
- **React Testing Library** - Component testing utilities
- **Playwright** - End-to-end testing
- **Lighthouse CI** - Performance and accessibility testing
- **MSW (Mock Service Worker)** - API mocking
- **Axe-core** - Accessibility testing

## Test Scripts

```bash
# Run unit tests in watch mode
npm run test

# Run unit tests in CI mode with coverage
npm run test:ci

# Run end-to-end tests
npm run test:e2e

# Run end-to-end tests with UI
npm run test:e2e:ui

# Run Lighthouse performance tests
npm run test:lighthouse

# Run accessibility tests
npm run test:accessibility

# Run visual regression tests
npm run test:visual

# Run all tests
npm run test:all
```

## Test Structure

```
tests/
├── e2e/                    # End-to-end tests
│   ├── navigation.spec.ts  # Navigation functionality
│   ├── accessibility.spec.ts # Accessibility tests
│   ├── visual.spec.ts      # Visual regression tests
│   ├── global-setup.ts     # Playwright global setup
│   └── global-teardown.ts  # Playwright global teardown
├── unit/                   # Unit tests
│   └── Hero.test.tsx       # Component unit tests
├── integration/            # Integration tests
├── mocks/                  # API mocks
│   └── handlers.ts         # MSW handlers
└── utils/                  # Test utilities
    └── test-utils.tsx      # Common test utilities
```

## Writing Tests

### Unit Tests (Jest + React Testing Library)

```tsx
import { render, screen } from '../utils/test-utils';
import Hero from '../../src/components/Hero';

describe('Hero Component', () => {
  it('renders hero content correctly', () => {
    render(
      <Hero onScrollToSection={mockOnScrollToSection} resumeUrl='/resume.pdf' />
    );

    expect(screen.getByText(/Kundan Pawar/i)).toBeInTheDocument();
    expect(screen.getByText(/Senior Frontend Developer/i)).toBeInTheDocument();
  });
});
```

### End-to-End Tests (Playwright)

```tsx
import { test, expect } from '@playwright/test';

test('should navigate to all sections', async ({ page }) => {
  await page.goto('/');

  await page.click('text=About');
  await expect(page.locator('#about')).toBeVisible();

  await page.click('text=Projects');
  await expect(page.locator('#projects')).toBeVisible();
});
```

### Accessibility Tests

```tsx
import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

test('should meet WCAG standards', async ({ page }) => {
  await page.goto('/');

  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
```

## API Mocking with MSW

The project uses MSW to mock API calls during testing:

```tsx
// In handlers.ts
http.post('/api/contact', async ({ request }) => {
  const body = (await request.json()) as ContactFormData;

  if (!body?.name || !body?.email || !body?.message) {
    return HttpResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  return HttpResponse.json(
    { message: 'Message sent successfully' },
    { status: 200 }
  );
});
```

## Visual Regression Testing

Visual regression tests capture screenshots and compare them against baseline images:

```tsx
test('should match homepage screenshot', async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(2000);

  await expect(page).toHaveScreenshot('homepage.png', {
    fullPage: true,
    animations: 'disabled',
  });
});
```

## Performance Testing

Lighthouse CI runs performance audits:

```bash
npm run test:lighthouse
```

This will:

- Start the development server
- Run Lighthouse audits
- Check performance, accessibility, best practices, and SEO scores
- Fail if scores are below thresholds

## Coverage Reports

Unit tests generate coverage reports:

```bash
npm run test:ci
```

Coverage thresholds:

- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

## Best Practices

1. **Test Behavior, Not Implementation**: Focus on what users see and do
2. **Use Semantic Queries**: Prefer `getByRole`, `getByLabelText` over `getByTestId`
3. **Test Accessibility**: Include accessibility tests for all components
4. **Mock External Dependencies**: Use MSW for API calls
5. **Keep Tests Fast**: Use proper mocks and avoid unnecessary setup
6. **Write Descriptive Test Names**: Use clear, descriptive test names
7. **Test Edge Cases**: Include error states and edge cases
8. **Maintain Test Data**: Keep test data realistic and up-to-date

## Continuous Integration

The testing setup is configured for CI/CD:

- Unit tests run on every commit
- E2E tests run on pull requests
- Performance tests run on deployment
- Coverage reports are generated and tracked

## Troubleshooting

### Common Issues

1. **Tests failing due to animations**: Disable animations in tests using `animations: 'disabled'`
2. **MSW not working**: Ensure MSW server is started in `beforeAll` and stopped in `afterAll`
3. **Playwright timeouts**: Increase timeout values in `playwright.config.ts`
4. **Coverage not generating**: Check that files are not excluded in `jest.config.js`

### Debugging

- Use `npm run test:e2e:ui` for interactive Playwright debugging
- Add `debugger` statements in tests for Jest debugging
- Use `console.log` in test files for debugging (will show in test output)

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [MSW Documentation](https://mswjs.io/docs/)
- [Axe-core Documentation](https://github.com/dequelabs/axe-core)
- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
