import React, { ReactElement } from 'react';
import { render, RenderOptions, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

// Extend expect with axe matchers
expect.extend(toHaveNoViolations);

// Mock data factories
export const createMockProject = (overrides = {}) => ({
  id: 1,
  title: 'Test Project',
  description: 'A test project description',
  technologies: ['React', 'TypeScript'],
  image: '/test-project.jpg',
  githubUrl: 'https://github.com/test/project',
  liveUrl: 'https://test-project.com',
  featured: false,
  category: 'web',
  ...overrides,
});

export const createMockSkill = (overrides = {}) => ({
  name: 'React',
  level: 90,
  category: 'Frontend',
  yearsOfExperience: 5,
  icon: 'react',
  ...overrides,
});

export const createMockExperience = (overrides = {}) => ({
  id: 1,
  title: 'Senior Frontend Developer',
  company: 'Test Company',
  period: '2022 - Present',
  description: 'Leading frontend development',
  technologies: ['React', 'TypeScript'],
  achievements: ['Led development of 3 major applications'],
  ...overrides,
});

export const mockPersonalInfo = {
  name: 'Kundan Pawar',
  title: 'Senior Frontend Developer',
  email: 'kundan@example.com',
  phone: '+1234567890',
  location: 'San Francisco, CA',
  shortBio:
    'Crafting exceptional digital experiences with modern web technologies.',
  longBio:
    'Experienced frontend developer with expertise in React, TypeScript, and modern web development.',
  resumeUrl: '/resume.pdf',
  github: 'https://github.com/kundanpawar',
  linkedin: 'https://linkedin.com/in/kundanpawar',
  twitter: 'https://twitter.com/kundanpawar',
};

// Mock functions
export const mockOnScrollToSection = jest.fn();
export const mockOnSubmit = jest.fn();
export const mockOnFilterChange = jest.fn();
export const mockOnSearch = jest.fn();

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
  options?: Omit<RenderOptions, 'wrapper'>
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

// Helper functions for testing animations
export const waitForAnimation = async (duration = 1000) => {
  await new Promise(resolve => setTimeout(resolve, duration));
};

export const mockAnimationFrame = () => {
  const originalRequestAnimationFrame = global.requestAnimationFrame;
  const originalCancelAnimationFrame = global.cancelAnimationFrame;

  const mockRAF = jest.fn(callback => {
    return setTimeout(callback, 0);
  });

  const mockCAF = jest.fn(id => {
    clearTimeout(id);
  });

  global.requestAnimationFrame = mockRAF;
  global.cancelAnimationFrame = mockCAF;

  return {
    mockRAF,
    mockCAF,
    restore: () => {
      global.requestAnimationFrame = originalRequestAnimationFrame;
      global.cancelAnimationFrame = originalCancelAnimationFrame;
    },
  };
};

// Accessibility testing helpers
export const testAccessibility = async (component: ReactElement) => {
  const { container } = render(component);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
};

export const testKeyboardNavigation = async (
  component: ReactElement,
  testCases: Array<{
    key: string;
    expectedFocus?: string;
    description: string;
  }>
) => {
  const { user } = render(component);

  for (const testCase of testCases) {
    await user.keyboard(testCase.key);

    if (testCase.expectedFocus) {
      const focusedElement = screen.getByTestId(testCase.expectedFocus);
      expect(focusedElement).toHaveFocus();
    }
  }
};

// Form testing helpers
export const testFormValidation = async (
  form: ReactElement,
  validationTests: Array<{
    fieldName: string;
    value: string;
    shouldBeValid: boolean;
    errorMessage?: string;
  }>
) => {
  const { user } = render(form);

  for (const test of validationTests) {
    const field = screen.getByLabelText(new RegExp(test.fieldName, 'i'));
    await user.clear(field);
    await user.type(field, test.value);
    await user.tab(); // Trigger blur event

    if (!test.shouldBeValid && test.errorMessage) {
      expect(screen.getByText(test.errorMessage)).toBeInTheDocument();
    }
  }
};

// Responsive testing helpers
export const testResponsiveBehavior = (
  component: ReactElement,
  viewportTests: Array<{
    width: number;
    height: number;
    description: string;
    assertions: () => void;
  }>
) => {
  for (const test of viewportTests) {
    it(`should behave correctly on ${test.description}`, () => {
      // Mock viewport size
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: test.width,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: test.height,
      });

      render(component);
      test.assertions();
    });
  }
};

// Mock IntersectionObserver for scroll animations
export const mockIntersectionObserver = () => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
  return mockIntersectionObserver;
};

// Mock ResizeObserver for responsive components
export const mockResizeObserver = () => {
  const mockResizeObserver = jest.fn();
  mockResizeObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.ResizeObserver = mockResizeObserver;
  return mockResizeObserver;
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
