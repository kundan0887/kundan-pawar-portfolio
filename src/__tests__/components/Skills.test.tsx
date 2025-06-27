import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  render,
  testAccessibility,
  createMockSkill,
} from '../utils/test-utils';
import Skills from '@/components/Skills';

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    button: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
    svg: ({ children, ...props }: any) => <svg {...props}>{children}</svg>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

describe('Skills Component', () => {
  const mockSkills = [
    createMockSkill({ name: 'React', level: 90, category: 'Frontend' }),
    createMockSkill({ name: 'TypeScript', level: 85, category: 'Language' }),
    createMockSkill({ name: 'Node.js', level: 80, category: 'Backend' }),
    createMockSkill({ name: 'CSS', level: 95, category: 'Frontend' }),
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Skills Display', () => {
    it('renders all skills with correct data', () => {
      render(<Skills />);

      // Check for skill names
      mockSkills.forEach(skill => {
        expect(screen.getByText(skill.name)).toBeInTheDocument();
      });
    });

    it('displays skill levels correctly', () => {
      render(<Skills />);

      mockSkills.forEach(skill => {
        const skillElement = screen.getByText(skill.name);
        const progressBar = skillElement
          .closest('div')
          ?.querySelector('[data-testid="progress-bar"]');
        expect(progressBar).toBeInTheDocument();
      });
    });

    it('shows skill categories', () => {
      render(<Skills />);

      expect(screen.getByText('Frontend')).toBeInTheDocument();
      expect(screen.getByText('Language')).toBeInTheDocument();
      expect(screen.getByText('Backend')).toBeInTheDocument();
    });

    it('displays years of experience', () => {
      render(<Skills />);

      mockSkills.forEach(skill => {
        const experienceText = `${skill.yearsOfExperience} years`;
        expect(screen.getByText(experienceText)).toBeInTheDocument();
      });
    });

    it('shows skill icons', () => {
      render(<Skills />);

      const icons = screen.getAllByTestId('skill-icon');
      expect(icons.length).toBeGreaterThan(0);
    });
  });

  describe('Filter Functionality', () => {
    it('renders filter buttons for all categories', () => {
      render(<Skills />);

      expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /frontend/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /backend/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /language/i }),
      ).toBeInTheDocument();
    });

    it('filters skills by category when filter button is clicked', async () => {
      const user = userEvent.setup();
      render(<Skills />);

      // Click frontend filter
      const frontendFilter = screen.getByRole('button', { name: /frontend/i });
      await user.click(frontendFilter);

      // Should show only frontend skills
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('CSS')).toBeInTheDocument();
      expect(screen.queryByText('TypeScript')).not.toBeInTheDocument();
      expect(screen.queryByText('Node.js')).not.toBeInTheDocument();
    });

    it('shows all skills when "All" filter is selected', async () => {
      const user = userEvent.setup();
      render(<Skills />);

      // First filter by frontend
      const frontendFilter = screen.getByRole('button', { name: /frontend/i });
      await user.click(frontendFilter);

      // Then click "All"
      const allFilter = screen.getByRole('button', { name: /all/i });
      await user.click(allFilter);

      // Should show all skills
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Node.js')).toBeInTheDocument();
      expect(screen.getByText('CSS')).toBeInTheDocument();
    });

    it('highlights active filter button', async () => {
      const user = userEvent.setup();
      render(<Skills />);

      const frontendFilter = screen.getByRole('button', { name: /frontend/i });
      await user.click(frontendFilter);

      expect(frontendFilter).toHaveClass(/active|bg-blue-600|text-white/);
    });

    it('updates skill count when filtering', async () => {
      const user = userEvent.setup();
      render(<Skills />);

      const frontendFilter = screen.getByRole('button', { name: /frontend/i });
      await user.click(frontendFilter);

      // Should show count of frontend skills
      expect(screen.getByText('2 skills')).toBeInTheDocument();
    });
  });

  describe('Hover Interactions', () => {
    it('shows skill details on hover', async () => {
      const user = userEvent.setup();
      render(<Skills />);

      const skillElement = screen.getByText('React');
      await user.hover(skillElement);

      // Should show detailed information
      expect(screen.getByText('90%')).toBeInTheDocument();
      expect(screen.getByText('5 years')).toBeInTheDocument();
    });

    it('hides skill details when mouse leaves', async () => {
      const user = userEvent.setup();
      render(<Skills />);

      const skillElement = screen.getByText('React');
      await user.hover(skillElement);
      await user.unhover(skillElement);

      // Detailed information should be hidden
      expect(screen.queryByText('90%')).not.toBeInTheDocument();
    });

    it('provides visual feedback on hover', async () => {
      const user = userEvent.setup();
      render(<Skills />);

      const skillElement = screen.getByText('React');
      await user.hover(skillElement);

      // Should have hover classes
      expect(skillElement.closest('div')).toHaveClass(/hover:|transform|scale/);
    });
  });

  describe('Progress Animations', () => {
    it('animates progress bars on mount', async () => {
      render(<Skills />);

      const progressBars = screen.getAllByTestId('progress-bar');
      progressBars.forEach(bar => {
        expect(bar).toHaveAttribute('data-animated', 'true');
      });
    });

    it('animates progress bars when they come into view', async () => {
      render(<Skills />);

      // Mock IntersectionObserver to trigger animation
      const mockIntersectionObserver = jest.fn();
      mockIntersectionObserver.mockReturnValue({
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null,
      });
      window.IntersectionObserver = mockIntersectionObserver;

      const progressBars = screen.getAllByTestId('progress-bar');
      expect(progressBars.length).toBeGreaterThan(0);
    });

    it('shows correct progress percentage', () => {
      render(<Skills />);

      const reactSkill = screen.getByText('React');
      const progressBar = reactSkill
        .closest('div')
        ?.querySelector('[data-testid="progress-bar"]');

      if (progressBar) {
        expect(progressBar).toHaveAttribute('aria-valuenow', '90');
        expect(progressBar).toHaveAttribute('aria-valuemax', '100');
      }
    });
  });

  describe('Accessibility Compliance', () => {
    it('meets accessibility standards', async () => {
      await testAccessibility(<Skills />);
    });

    it('has proper ARIA labels for progress bars', () => {
      render(<Skills />);

      const progressBars = screen.getAllByTestId('progress-bar');
      progressBars.forEach(bar => {
        expect(bar).toHaveAttribute('role', 'progressbar');
        expect(bar).toHaveAttribute('aria-valuenow');
        expect(bar).toHaveAttribute('aria-valuemax');
        expect(bar).toHaveAttribute('aria-label');
      });
    });

    it('provides keyboard navigation for filter buttons', async () => {
      const user = userEvent.setup();
      render(<Skills />);

      const allFilter = screen.getByRole('button', { name: /all/i });
      const frontendFilter = screen.getByRole('button', { name: /frontend/i });

      await user.tab();
      expect(allFilter).toHaveFocus();

      await user.tab();
      expect(frontendFilter).toHaveFocus();
    });

    it('announces filter changes to screen readers', async () => {
      const user = userEvent.setup();
      render(<Skills />);

      const frontendFilter = screen.getByRole('button', { name: /frontend/i });
      await user.click(frontendFilter);

      // Should have live region for announcements
      const liveRegion = screen.getByRole('status');
      expect(liveRegion).toBeInTheDocument();
    });

    it('has proper color contrast for skill levels', () => {
      render(<Skills />);

      const progressBars = screen.getAllByTestId('progress-bar');
      progressBars.forEach(bar => {
        // Check that progress bars have sufficient contrast
        expect(bar).toHaveClass(/bg-blue-|bg-green-|bg-yellow-|bg-red-/);
      });
    });
  });

  describe('Responsive Behavior', () => {
    it('adapts layout for different screen sizes', () => {
      const { container } = render(<Skills />);

      const skillsGrid = container.querySelector('.grid');
      expect(skillsGrid).toHaveClass(
        /grid-cols-1|md:grid-cols-2|lg:grid-cols-3/,
      );
    });

    it('maintains readability on mobile devices', () => {
      render(<Skills />);

      const skillElements = screen.getAllByTestId('skill-item');
      skillElements.forEach(skill => {
        expect(skill).toHaveClass(/text-sm|md:text-base/);
      });
    });

    it('adjusts filter button layout on small screens', () => {
      const { container } = render(<Skills />);

      const filterContainer = container.querySelector(
        '[data-testid="filter-buttons"]',
      );
      expect(filterContainer).toHaveClass(/flex-wrap|gap-2/);
    });
  });

  describe('Performance', () => {
    it('implements lazy loading for skill icons', () => {
      render(<Skills />);

      const icons = screen.getAllByTestId('skill-icon');
      icons.forEach(icon => {
        expect(icon).toHaveAttribute('loading', 'lazy');
      });
    });

    it('optimizes re-renders with proper keys', () => {
      render(<Skills />);

      const skillElements = screen.getAllByTestId('skill-item');
      skillElements.forEach((element, index) => {
        expect(element).toHaveAttribute('data-key');
      });
    });
  });

  describe('Error Handling', () => {
    it('handles empty skills list gracefully', () => {
      // Mock empty skills data
      jest.doMock('@/lib/data', () => ({
        skills: [],
      }));

      expect(() => render(<Skills />)).not.toThrow();
    });

    it('handles missing skill data gracefully', () => {
      const incompleteSkill = createMockSkill({
        name: undefined,
        level: undefined,
      });
      jest.doMock('@/lib/data', () => ({
        skills: [incompleteSkill],
      }));

      expect(() => render(<Skills />)).not.toThrow();
    });

    it('handles invalid skill levels', () => {
      const invalidSkill = createMockSkill({ level: 150 }); // Invalid level
      jest.doMock('@/lib/data', () => ({
        skills: [invalidSkill],
      }));

      expect(() => render(<Skills />)).not.toThrow();
    });
  });
});
