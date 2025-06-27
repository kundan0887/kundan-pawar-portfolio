import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

// Extend expect with axe matchers
expect.extend(toHaveNoViolations);

// Custom render function with providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <div id='test-root' data-testid='test-root'>
      {children}
    </div>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  const user = userEvent.setup();
  return {
    user,
    ...render(ui, { wrapper: AllTheProviders, ...options }),
  };
};

// Re-export everything from testing library
export * from '@testing-library/react';

// Override render method
export { customRender as render };

// Accessibility testing helper
export const testAccessibility = async (component: ReactElement) => {
  const { container } = render(component);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
};

// Test environment setup
beforeAll(() => {
  // Mock IntersectionObserver
  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
  } as any;

  // Mock ResizeObserver
  global.ResizeObserver = class ResizeObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
  };

  // Mock PerformanceObserver
  global.PerformanceObserver = class PerformanceObserver {
    constructor() {}
    observe() {}
    disconnect() {}
    static supportedEntryTypes: readonly string[] = [];
  } as any;
});

afterEach(() => {
  // Clear all mocks
  jest.clearAllMocks();
});
